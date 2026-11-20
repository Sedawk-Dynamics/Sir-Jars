/**
 * The contact form is delivered by Web3Forms (https://web3forms.com), which
 * emails each submission to the inbox registered against this access key.
 *
 * The access key is public by design: Web3Forms expects it in browser code,
 * and it can only send to the inbox it was created for. The free plan rejects
 * submissions that do not come from a browser (HTTP 403, "Pro plan is
 * required"), so this must be called from client components, never from an
 * API route or server action.
 *
 * Server-side protection is enforced by Web3Forms: hCaptcha (switched on for
 * this key in the Web3Forms dashboard, so a submission without a valid token
 * is rejected), the Advanced Spam Filter, and the botcheck honeypot.
 */
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = 'bdafb4f8-4bef-4106-901d-0598a9e3a927'

/** Every field becomes a line in the email; `subject` sets the email subject. */
export type FormFields = { subject: string } & Record<string, string | boolean>

/** Fields allowed to span several lines; everything else is single-line. */
const MULTILINE = new Set(['message'])
const MAX_LINE = 200
const MAX_EMAIL = 320
const MAX_MESSAGE = 5000
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/*
 * Normalise what goes into the email. Line breaks are stripped from
 * single-line fields (subject, name, email...) so they cannot inject extra
 * email headers, control characters are removed, and lengths are capped.
 * Web3Forms escapes HTML in its notification emails; this is defence in depth,
 * since anything in the browser can be bypassed by posting to the API directly.
 *
 * Built from strings: as regex literals the bundler emits U+2028/2029 raw,
 * which terminates the literal and breaks the chunk.
 */
const CONTROL_CHARS = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const LINE_BREAKS = new RegExp('[\\r\\n\\u2028\\u2029]+', 'g')

function clean(key: string, value: string | boolean): string | boolean {
  if (typeof value === 'boolean') return value
  let v = value.replace(CONTROL_CHARS, '')
  if (MULTILINE.has(key)) return v.replace(/\r\n?/g, '\n').trim().slice(0, MAX_MESSAGE)
  v = v.replace(LINE_BREAKS, ' ').replace(/\s+/g, ' ')
  return v.trim().slice(0, key === 'email' ? MAX_EMAIL : MAX_LINE)
}

export async function submitForm(fields: FormFields, captchaToken: string): Promise<void> {
  if (!captchaToken) {
    throw new Error('Please complete the captcha check.')
  }
  const cleaned = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, clean(k, v)]),
  ) as FormFields

  if (typeof cleaned.email === 'string' && !EMAIL.test(cleaned.email)) {
    throw new Error('Please enter a valid email address.')
  }

  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...cleaned,
        // Sent as-is: the token is long and must not be cleaned or truncated.
        'h-captcha-response': captchaToken,
        access_key: ACCESS_KEY,
        from_name: 'Six Jars Global website',
      }),
    })
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.')
  }

  const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || 'Your enquiry could not be sent.')
  }
}
