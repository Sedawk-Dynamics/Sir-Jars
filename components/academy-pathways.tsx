'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react'

/**
 * Academy spotlight — four role-based pathways. Every program states its
 * format, applied assessment, capstone and completion evidence up front, so a
 * visitor can compare routes before asking for anything.
 *
 * "View pathway" expands the card in place; the full detail is always in the
 * DOM, so it stays readable and indexable without JavaScript state.
 */

type Pathway = {
  id: string
  role: string
  promise: string
  color: string
  icon: typeof GraduationCap
  format: string
  assessment: string
  capstone: string
  evidence: string
  modules: string[]
}

const pathways: Pathway[] = [
  {
    id: 'student',
    role: 'Student',
    promise: 'Build foundations',
    color: '#3A0A24',
    icon: GraduationCap,
    format: 'Cohort + lab',
    assessment: 'Applied',
    capstone: 'A small AI-assisted project solving a real study or community problem',
    evidence: 'Assessed capstone, facilitator review and skills record',
    modules: ['AI literacy and responsible use', 'Prompt and workflow basics', 'Communication and teamwork'],
  },
  {
    id: 'educator',
    role: 'Educator',
    promise: 'Teach with confidence',
    color: '#6A1438',
    icon: BookOpen,
    format: 'Cohort + lab',
    assessment: 'Applied',
    capstone: 'A classroom-ready lesson plan using AI safely, taught and observed',
    evidence: 'Observed lesson, trainer-guide sign-off and completion record',
    modules: ['Responsible AI in the classroom', 'Train the Trainer', 'Assessment design'],
  },
  {
    id: 'professional',
    role: 'Professional',
    promise: 'Apply at work',
    color: '#9A3070',
    icon: Briefcase,
    format: 'Cohort + lab',
    assessment: 'Applied',
    capstone: 'An improved workflow from your own job, with before-and-after measures',
    evidence: 'Reviewed workflow capstone and improvement plan',
    modules: ['Prompt and workflow design', 'Lean Six Sigma foundations', 'Process automation'],
  },
  {
    id: 'organization',
    role: 'Organization',
    promise: 'Build team capability',
    color: '#8E2640',
    icon: Users,
    format: 'Cohort + lab',
    assessment: 'Applied',
    capstone: 'A team project on a live business process, agreed with your leadership',
    evidence: 'Team capstone review, completion evidence and capability improvement plan',
    modules: ['Role-based curriculum', 'Workshops and practice labs', 'Governance for AI use'],
  },
]

export default function AcademyPathways() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section
      id="academy-pathways"
      className="py-16 lg:py-24"
      style={{ background: 'var(--color-parchment)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-6 py-10 sm:px-10 lg:px-12 lg:py-12"
          style={{ background: '#FFFFFF', border: '1.5px solid rgba(75,13,36,0.55)' }}
        >
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-wine)' }}
          >
            Academy spotlight
          </p>
          <h2
            className="mt-3 font-semibold tracking-tight leading-tight"
            style={{
              color: 'var(--color-plum)',
              fontFamily: 'var(--font-source-serif)',
              fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)',
            }}
          >
            AI &amp; Future Skills Academy
          </h2>
          <p
            className="mt-3 text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(75,13,36,0.8)' }}
          >
            Choose the route that matches your role. Every program states format, applied
            assessment, capstone and completion evidence.
          </p>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {pathways.map((p) => {
              const Icon = p.icon
              const isOpen = open === p.id
              const panelId = `pathway-${p.id}-detail`
              return (
                <li
                  key={p.id}
                  id={`pathway-${p.id}`}
                  className="flex flex-col rounded-2xl p-5 transition-shadow duration-200 hover:shadow-lg"
                  style={{ border: `2px solid ${p.color}` }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                      style={{ background: p.color, color: '#FFFFFF' }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                      {p.role}
                    </h3>
                  </div>

                  <p className="mt-5 text-sm font-bold" style={{ color: 'var(--color-plum)' }}>
                    {p.promise}
                  </p>

                  <dl className="mt-6 space-y-1.5 text-sm" style={{ color: 'rgba(75,13,36,0.8)' }}>
                    <div className="flex gap-1.5">
                      <dt>Format:</dt>
                      <dd className="font-semibold">{p.format}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt>Assessment:</dt>
                      <dd className="font-semibold">{p.assessment}</dd>
                    </div>
                  </dl>

                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="mt-4 pt-4 space-y-3 text-sm leading-relaxed"
                    style={{ borderTop: '1px solid var(--color-line)', color: 'rgba(75,13,36,0.8)' }}
                  >
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: p.color }}>
                        What you cover
                      </p>
                      <ul className="mt-1 list-disc pl-4">
                        {p.modules.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: p.color }}>
                        Capstone
                      </p>
                      <p className="mt-1">{p.capstone}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: p.color }}>
                        Completion evidence
                      </p>
                      <p className="mt-1">{p.evidence}</p>
                    </div>
                    <Link
                      href="/contact?route=AI%20Academy"
                      className="inline-flex items-center gap-1.5 font-bold"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      Enquire about this pathway
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group mt-3 inline-flex items-center gap-1.5 self-start text-sm font-bold"
                    style={{ color: p.color, minHeight: 32 }}
                  >
                    {isOpen ? 'Hide pathway' : 'View pathway'}
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(90deg)' : undefined }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
