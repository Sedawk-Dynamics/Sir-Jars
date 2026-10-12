import { NextResponse } from 'next/server'
import { contactPaths } from '@/lib/content'

/**
 * Enquiry handler for the contact form.
 *
 * Validates the submission and forwards it as JSON to ENQUIRY_WEBHOOK_URL
 * (e.g. a Formspree, Make, Zapier or Slack webhook). The form shows success
 * only when this returns 2xx, so if the webhook is not configured or fails,
 * the visitor is told plainly and offered the email address instead.
 */

const MAX = { name: 200, email: 320, enquiringFor: 40, org: 200, route: 100, message: 5000 }
const paths = contactPaths.map((p) => p.id) as string[]

export async function POST(request: Request) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL
  if (!webhook) {
    console.error('ENQUIRY_WEBHOOK_URL is not set; enquiry not delivered.')
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const field = (key: keyof typeof MAX) =>
    typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, MAX[key]) : ''

  const enquiry = {
    path: paths.includes(body.path as string) ? (body.path as string) : 'project',
    name: field('name'),
    email: field('email'),
    enquiringFor: field('enquiringFor'),
    organisation: field('org'),
    service: field('route'),
    message: field('message'),
    receivedAt: new Date().toISOString(),
  }

  if (!enquiry.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) || !enquiry.message) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(enquiry),
    })
    if (!res.ok) {
      console.error(`Enquiry webhook responded ${res.status}.`)
      return NextResponse.json({ ok: false }, { status: 502 })
    }
  } catch (err) {
    console.error('Enquiry webhook request failed.', err)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
