import { NextResponse } from 'next/server'
import { capabilities, contactPaths } from '@/lib/content'

/**
 * Enquiry intake for the contact form. The browser posts here; this route
 * validates and sanitises the submission, then delivers it to Web3Forms from
 * the server. The form shows success only when this returns { ok: true }, so
 * a visitor is never told a message was sent when it was not, and is offered
 * the email address instead.
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
// Public by design: the key can only send to the inbox it is registered to.
const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || 'bdafb4f8-4bef-4106-901d-0598a9e3a927'

const MAX_BODY_BYTES = 20_000
const MAX = { name: 200, email: 320, org: 200, message: 5000 }
const ENQUIRING_FOR = ['', 'Myself', 'An organisation']
const SERVICES = ['', ...capabilities.map((c) => c.shortName)]

/* ── Rate limit: 5 submissions per IP per 10 minutes ──────────────────────
   Best effort. Each serverless instance keeps its own count, so this slows
   casual flooding but is not a hard limit. Add a Vercel Firewall rate-limit
   rule for the /api/enquiry path for a limit that holds across instances. */
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function overLimit(ip: string): boolean {
  const now = Date.now()
  if (hits.size > 5000) hits.clear()
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > LIMIT
}

/* ── Sanitising ───────────────────────────────────────────────────────────
   Single-line fields lose every control character, including CR and LF, so
   nothing a visitor types can add headers or lines to a mail message. */
const singleLine = (value: unknown, max: number) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
    : ''

const multiLine = (value: unknown, max: number) =>
  typeof value === 'string'
    ? value
        .replace(/\r\n?/g, '\n')
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
        .trim()
        .slice(0, max)
    : ''

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false }, { status: 413 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (overLimit(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot: the hidden checkbox is ticked only by bots. Report success so
  // the bot learns nothing, and send nothing.
  if (body.botcheck === true) {
    return NextResponse.json({ ok: true })
  }

  const pathId = contactPaths.some((p) => p.id === body.path) ? (body.path as string) : 'project'
  const pathLabel = contactPaths.find((p) => p.id === pathId)?.label ?? 'Project'

  const enquiry = {
    name: singleLine(body.name, MAX.name),
    email: singleLine(body.email, MAX.email),
    enquiringFor: ENQUIRING_FOR.includes(body.enquiringFor as string) ? (body.enquiringFor as string) : '',
    organisation: singleLine(body.org, MAX.org),
    service: SERVICES.includes(body.route as string) ? (body.route as string) : '',
    message: multiLine(body.message, MAX.message),
  }

  if (!enquiry.name || !EMAIL.test(enquiry.email) || !enquiry.message) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `New enquiry (${pathLabel}) from ${enquiry.name}`,
        from_name: 'Six Jars Global website',
        name: enquiry.name,
        email: enquiry.email,
        enquiry_type: pathLabel,
        enquiring_for: enquiry.enquiringFor || 'Not stated',
        organisation: enquiry.organisation || 'Not stated',
        service: enquiry.service || 'Help me choose',
        message: enquiry.message,
      }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.success) {
      console.error(`Enquiry delivery failed with status ${res.status}.`)
      return NextResponse.json({ ok: false }, { status: 502 })
    }
  } catch (err) {
    console.error('Enquiry delivery request failed.', err)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
}
