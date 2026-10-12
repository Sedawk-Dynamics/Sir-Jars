import Link from 'next/link'
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from 'lucide-react'

/**
 * Academy spotlight — four role-based pathways. Every program states its
 * format, applied assessment, capstone and completion evidence up front, so a
 * visitor can compare routes before asking for anything.
 *
 * Every detail is visible without interaction (change guide, 28 Sep 2026).
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
    format: 'Group sessions with guided practice',
    assessment: 'Practical task review',
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
    format: 'Group sessions with guided practice',
    assessment: 'Practical task review',
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
    format: 'Group sessions with guided practice',
    assessment: 'Practical task review',
    capstone: 'An improved workflow from your own job, with before-and-after measures',
    evidence: 'Reviewed workflow capstone and improvement plan',
    modules: ['Prompt and workflow design', 'Lean Six Sigma foundations', 'Process automation'],
  },
  {
    id: 'organisation',
    role: 'Organisation',
    promise: 'Build team capability',
    color: '#8E2640',
    icon: Users,
    format: 'Group sessions with guided practice',
    assessment: 'Practical task review',
    capstone: 'A team project on a live business process, agreed with your leadership',
    evidence: 'Team capstone review, completion evidence and capability improvement plan',
    modules: ['Role-based curriculum', 'Workshops and practice labs', 'Governance for AI use'],
  },
]

export default function AcademyPathways() {
  return (
    <section
      id="academy-pathways"
      className="py-16 lg:py-24"
      style={{ background: 'var(--color-parchment)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-6 py-10 sm:px-10 lg:px-12 lg:py-12"
          style={{ background: '#FFFFFF', border: '1.5px solid rgba(58,13,39,0.55)' }}
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
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)',
            }}
          >
            Choose your learning pathway
          </h2>
          <p
            className="mt-3 text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(0,0,0,0.8)' }}
          >
            Choose the pathway closest to your role. Each programme explains how you will
            learn, what you will practise and how your final project will be reviewed.
          </p>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pathways.map((p) => {
              const Icon = p.icon
              return (
                <li
                  key={p.id}
                  id={`pathway-${p.id}`}
                  className="flex flex-col h-full rounded-2xl p-5 transition-shadow duration-200 hover:shadow-lg"
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

                  <dl className="mt-6 space-y-1.5 text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>
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
                    className="mt-4 pt-4 space-y-3 text-sm leading-relaxed"
                    style={{ borderTop: '1px solid var(--color-line)', color: 'rgba(0,0,0,0.8)' }}
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
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
