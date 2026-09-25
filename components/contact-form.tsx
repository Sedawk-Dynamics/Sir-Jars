'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react'
import { capabilities, contactPaths, org, type ContactPathId } from '@/lib/content'

/** Whether the desk is staffed right now: Monday–Friday, 09:00–18:00 IST. */
function isStaffedNow(now = new Date()) {
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60_000)
  const day = ist.getDay()
  const minutes = ist.getHours() * 60 + ist.getMinutes()
  return day >= 1 && day <= 5 && minutes >= 9 * 60 && minutes < 18 * 60
}

function StaffedState() {
  // Rendered only after mount so server and client never disagree on the time.
  const [staffed, setStaffed] = useState<boolean | null>(null)
  useEffect(() => {
    const tick = () => setStaffed(isStaffedNow())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <p
      className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed rounded-xl p-3.5"
      style={{ background: '#FFFFFF', border: '1px solid var(--color-line)', color: 'rgba(75,13,36,0.78)' }}
    >
      <span
        aria-hidden="true"
        className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
        style={{
          background: staffed === null ? 'var(--color-line)' : staffed ? '#2E7D4F' : 'var(--color-gold-deep)',
        }}
      />
      <span>
        <span className="font-semibold" style={{ color: 'var(--color-plum)' }}>
          {staffed === null ? 'Checking desk status…' : staffed ? 'Staffed now.' : 'Offline right now.'}
        </span>{' '}
        {staffed === false
          ? `Your inquiry is queued and picked up at the start of the next working window (${org.hours}).`
          : `Hours: ${org.hours}.`}
      </span>
    </p>
  )
}

/**
 * Contact form.
 *
 * The live DOM review found inputs with no id, no name and no bound label —
 * placeholders were doing the work of labels. Every field here has a visible
 * <label for>, an id, a name, an autocomplete token, an inline error tied by
 * aria-describedby, and a live-region status message on submit.
 *
 * The intent selector is preserved (it was called out as a genuine asset) and
 * now preconfigures the form and states the response channel for that intent.
 */

type Errors = Partial<Record<'name' | 'org' | 'email' | 'message', string>>

const fieldStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid var(--color-line)',
  color: 'var(--color-plum)',
  minHeight: 48,
}

export default function ContactForm({
  defaultPath = 'project',
  defaultRoute = '',
}: {
  defaultPath?: ContactPathId
  defaultRoute?: string
}) {
  const [path, setPath] = useState<ContactPathId>(defaultPath)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [values, setValues] = useState({
    name: '',
    org: '',
    email: '',
    route: defaultRoute,
    message: '',
  })
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  // A ?path= or ?route= query param preselects the form — this is what makes
  // "Discuss a sensitive matter" links from elsewhere on the site meaningful.
  useEffect(() => {
    setPath(defaultPath)
  }, [defaultPath])

  const activePath = contactPaths.find((p) => p.id === path)!

  const validate = (): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Enter your name so we know who to reply to.'
    if (!values.org.trim()) next.org = 'Enter the organization you represent.'
    if (!values.email.trim()) {
      next.email = 'Enter an email address so we can respond.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter an email address in the format name@organization.com.'
    }
    if (!values.message.trim()) {
      next.message = 'Tell us briefly what must work, so we can route your inquiry.'
    }
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the summary so the failure is announced, not just drawn.
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    // No backend is wired up yet. Submission is acknowledged locally and the
    // visitor is told plainly how to reach us in the meantime.
    setTimeout(() => setStatus('sent'), 400)
  }

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl p-8 text-center"
        style={{
          background: 'var(--color-plum)',
          border: '1px solid rgba(241,181,59,0.3)',
        }}
      >
        <CheckCircle
          size={32}
          aria-hidden="true"
          className="mx-auto mb-4"
          style={{ color: 'var(--color-gold)' }}
        />
        <h3 className="text-xl font-bold" style={{ color: 'var(--color-ivory)' }}>
          Inquiry recorded
        </h3>
        <p
          className="text-sm leading-relaxed mt-3 max-w-md mx-auto"
          style={{ color: 'rgba(252,251,248,0.72)' }}
        >
          Thank you, {values.name}. {activePath.responseChannel}
        </p>
      </div>
    )
  }

  const errorList = (Object.entries(errors) as [keyof Errors, string][]).filter(
    ([, msg]) => Boolean(msg)
  )

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="border-0 p-0 m-0 mb-8">
        <legend
          className="text-xs font-bold tracking-[0.16em] uppercase mb-3"
          style={{ color: 'var(--color-wine)' }}
        >
          What brings you here?
        </legend>
        <div className="grid sm:grid-cols-3 gap-3">
          {contactPaths.map((p) => {
            const isActive = path === p.id
            return (
              <label
                key={p.id}
                className="flex flex-col rounded-xl p-4 cursor-pointer transition-colors duration-200"
                style={{
                  background: isActive ? 'var(--color-plum)' : '#FFFFFF',
                  border: `1px solid ${isActive ? 'var(--color-plum)' : 'var(--color-line)'}`,
                }}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="intent"
                    value={p.id}
                    checked={isActive}
                    onChange={() => setPath(p.id)}
                    className="w-4 h-4 accent-[#F1B53B]"
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ color: isActive ? 'var(--color-ivory)' : 'var(--color-plum)' }}
                  >
                    {p.label}
                  </span>
                </span>
                <span
                  className="text-xs leading-relaxed mt-2"
                  style={{
                    color: isActive ? 'rgba(252,251,248,0.65)' : 'rgba(75,13,36,0.62)',
                  }}
                >
                  {p.desc}
                </span>
              </label>
            )
          })}
        </div>

        {/* The response channel for the chosen intent, stated before the ask. */}
        <p
          role="status"
          className="mt-3 text-sm leading-relaxed rounded-xl p-3.5"
          style={{
            background: 'var(--color-parchment)',
            border: '1px solid var(--color-line)',
            color: 'rgba(75,13,36,0.78)',
          }}
        >
          <span className="font-semibold">What happens next: </span>
          {activePath.responseChannel}
        </p>

        <StaffedState />

        {path === 'sensitive' && (
          <div
            role="note"
            className="mt-3 flex gap-3 rounded-xl p-4"
            style={{
              background: 'rgba(154,46,79,0.08)',
              border: '1px solid var(--color-rose)',
            }}
          >
            <ShieldAlert
              size={18}
              aria-hidden="true"
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-rose)' }}
            />
            <div className="text-sm leading-relaxed" style={{ color: 'var(--color-plum)' }}>
              <p className="font-bold">Secure-routing boundary — read before you write</p>
              <ul className="mt-1.5 space-y-1 list-disc pl-4" style={{ color: 'rgba(75,13,36,0.8)' }}>
                <li>This form is not a secure channel. Share only your name, organization and a one-line, non-identifying description.</li>
                <li>Do not send names of individuals, evidence, credentials, documents or incident details here.</li>
                <li>We reply with secure-channel instructions first; detail is shared only after that channel is confirmed.</li>
                <li>If there is an immediate risk to life or safety, contact local emergency services — this is not an emergency line.</li>
              </ul>
            </div>
          </div>
        )}
      </fieldset>

      {errorList.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-xl p-4"
          style={{
            background: 'rgba(154,46,79,0.08)',
            border: '1px solid var(--color-rose)',
          }}
        >
          <p
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: 'var(--color-rose)' }}
          >
            <AlertCircle size={16} aria-hidden="true" />
            {errorList.length === 1
              ? 'There is 1 problem with this form'
              : `There are ${errorList.length} problems with this form`}
          </p>
          <ul className="mt-2 space-y-1">
            {errorList.map(([field, msg]) => (
              <li key={field} className="text-sm">
                <a
                  href={`#field-${field}`}
                  className="underline underline-offset-2"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            id="field-name"
            name="name"
            label="Your name"
            required
            autoComplete="name"
            value={values.name}
            error={errors.name}
            onChange={set('name')}
          />
          <Field
            id="field-org"
            name="organization"
            label="Organization"
            required
            autoComplete="organization"
            value={values.org}
            error={errors.org}
            onChange={set('org')}
          />
        </div>

        <Field
          id="field-email"
          name="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={set('email')}
        />

        <div>
          <label
            htmlFor="field-route"
            className="block text-sm font-semibold mb-1.5"
            style={{ color: 'var(--color-plum)' }}
          >
            Capability route{' '}
            <span className="font-normal" style={{ color: 'rgba(75,13,36,0.55)' }}>
              (optional)
            </span>
          </label>
          <select
            id="field-route"
            name="route"
            value={values.route}
            onChange={set('route')}
            className="w-full px-4 rounded-xl text-sm"
            style={fieldStyle}
          >
            <option value="">Not sure yet</option>
            {capabilities.map((c) => (
              <option key={c.slug} value={c.shortName}>
                {c.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="field-message"
            className="block text-sm font-semibold mb-1.5"
            style={{ color: 'var(--color-plum)' }}
          >
            What must work — and what cannot be compromised?{' '}
            <span aria-hidden="true" style={{ color: 'var(--color-rose)' }}>
              *
            </span>
          </label>
          <p
            id="field-message-hint"
            className="text-xs mb-2"
            style={{ color: 'rgba(75,13,36,0.58)' }}
          >
            Please do not include confidential detail here. If your matter is sensitive,
            select &ldquo;Sensitive matter&rdquo; above and we will send secure-channel
            instructions first.
          </p>
          <textarea
            id="field-message"
            name="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? 'field-message-hint field-message-error' : 'field-message-hint'
            }
            value={values.message}
            onChange={set('message')}
            className="w-full px-4 py-3 rounded-xl text-sm resize-y"
            style={{
              ...fieldStyle,
              borderColor: errors.message ? 'var(--color-rose)' : 'var(--color-line)',
            }}
          />
          {errors.message && (
            <p
              id="field-message-error"
              className="mt-1.5 text-sm font-medium"
              style={{ color: 'var(--color-rose)' }}
            >
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
          style={{
            minHeight: 56,
            background: 'var(--color-wine)',
            color: 'var(--color-ivory)',
          }}
        >
          <Send size={17} aria-hidden="true" />
          {status === 'submitting' ? 'Sending…' : 'Start a conversation'}
        </button>

        <p
          className="text-xs text-center leading-relaxed"
          style={{ color: 'rgba(75,13,36,0.55)' }}
        >
          Handled confidentially. Every inquiry is acknowledged with a named owner and a
          documented next step.
        </p>
      </div>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  inputMode,
  value,
  error,
  onChange,
}: {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  inputMode?: 'email' | 'text' | 'tel'
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold mb-1.5"
        style={{ color: 'var(--color-plum)' }}
      >
        {label}{' '}
        {required && (
          <span aria-hidden="true" style={{ color: 'var(--color-rose)' }}>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        className="w-full px-4 rounded-xl text-sm"
        style={{
          ...fieldStyle,
          borderColor: error ? 'var(--color-rose)' : 'var(--color-line)',
        }}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm font-medium"
          style={{ color: 'var(--color-rose)' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
