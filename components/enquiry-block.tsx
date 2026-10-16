import Link from 'next/link'
import { ArrowRight, Mail, Scale, UserRound } from 'lucide-react'
import { JAR_PATH, JAR_VIEWBOX } from '@/components/brand/jar'

/**
 * Shared enquiry block. A gradient card drawn from the logo palette — plum
 * through wine to burgundy, lit by a gold glow and a rose glow — inside a
 * thin gold-gradient frame, with the brand jar as a faint watermark. It sits
 * on a light band so it stays clear of the plum footer below.
 */

const promises = [
  { icon: Scale, text: 'Scope and price agreed with you before work begins' },
  { icon: UserRound, text: 'One contact from first brief to finished result' },
  { icon: Mail, text: 'A reply by email with the next step' },
]

export default function EnquiryBlock() {
  return (
    <section
      className="py-8 lg:py-10"
      style={{ background: 'linear-gradient(180deg, var(--color-parchment) 0%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Gold-gradient frame: 1.5px of padding shows through as the border. */}
        <div
          className="rounded-[30px] p-[1.5px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(239,184,60,0.95) 0%, rgba(154,46,79,0.35) 45%, rgba(239,184,60,0.7) 100%)',
            boxShadow: '0 40px 80px -44px rgba(58,13,39,0.75)',
          }}
        >
          <div
            className="on-dark relative overflow-hidden rounded-[28.5px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10"
            style={{
              background: [
                'radial-gradient(circle at 88% 0%, rgba(239,184,60,0.30), transparent 42%)',
                'radial-gradient(circle at 0% 100%, rgba(154,46,79,0.70), transparent 55%)',
                'linear-gradient(135deg, #3A0D27 0%, #6B153F 52%, #872143 100%)',
              ].join(', '),
            }}
          >
            {/* Brand jar watermark. */}
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${JAR_VIEWBOX.w} ${JAR_VIEWBOX.h}`}
              className="pointer-events-none absolute -right-16 -bottom-20 w-75 lg:w-95 opacity-[0.13]"
            >
              <defs>
                <linearGradient id="enquiry-jar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD37A" />
                  <stop offset="100%" stopColor="#E0A21F" />
                </linearGradient>
              </defs>
              <path d={JAR_PATH} fill="url(#enquiry-jar)" />
            </svg>

            <div className="relative grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-center">
              <div>
                <p
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase"
                  style={{
                    color: 'var(--color-gold)',
                    background: 'rgba(239,184,60,0.12)',
                    border: '1px solid rgba(239,184,60,0.35)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--color-gold)' }}
                  />
                  Start a conversation
                </p>
                <h2
                  className="mt-4 font-bold tracking-tight leading-[1.05]"
                  style={{ color: 'var(--color-ivory)', fontSize: 'clamp(1.9rem, 4vw, 2.75rem)' }}
                >
                  Tell us what you want to <span className="text-gold-gradient">achieve</span>
                </h2>
                <p
                  className="mt-3 max-w-xl text-base leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  Tell us what you are working on and where you need help. We will discuss what is
                  involved, what it will cost and how to get started.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-6 rounded-full text-[15px] font-bold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(96deg, #EFB83C 0%, #FFD37A 50%, #E0A21F 100%)',
                      color: '#000000',
                      minHeight: 50,
                      boxShadow: '0 12px 28px -12px rgba(239,184,60,0.7)',
                    }}
                  >
                    Tell us what you want to achieve
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/capabilities"
                    className="inline-flex items-center justify-center px-6 rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-white/10"
                    style={{
                      border: '1px solid rgba(255,255,255,0.5)',
                      color: 'var(--color-ivory)',
                      minHeight: 50,
                    }}
                  >
                    Explore our services
                  </Link>
                </div>
              </div>

              <ul className="space-y-2.5">
                {promises.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-sm"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #EFB83C 0%, #E0A21F 100%)',
                        color: 'var(--color-plum)',
                      }}
                    >
                      <Icon size={18} />
                    </span>
                    <span
                      className="text-sm font-semibold leading-snug"
                      style={{ color: 'var(--color-ivory)' }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
