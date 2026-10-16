import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/hero'
import CapabilityCards from '@/components/capability-cards'
import Care from '@/components/home/care'
import WhySixJars from '@/components/home/why-six-jars'
import ProcessSteps from '@/components/home/process-steps'
import EnquiryBlock from '@/components/enquiry-block'
import InsightList from '@/components/insight-list'


/** Homepage service-card images and alt text (change guide, 01 03). */
const homeImages: Record<string, { src: string; alt: string }> = {
  publishing: {
    src: '/Allimages/sixjars-home-publishing.png',
    alt: 'Illustration of an Indian author and editorial colleague reviewing her book beside a marked manuscript.',
  },
  media: {
    src: '/Allimages/sixjars-home-media.png',
    alt: 'Illustration of an Indian production team preparing a camera and microphone for a speaker.',
  },
  'digital-platforms': {
    src: '/Allimages/sixjars-home-digital.png',
    alt: 'An Indian business owner and developer reviewing a mobile page and website.',
  },
  'data-operations': {
    src: '/Allimages/sixjars-home-data.png',
    alt: 'An Indian coordinator organising registration forms by status.',
  },
  'ai-academy': {
    src: '/Allimages/sixjars-home-academy.png',
    alt: 'Illustration of Indian learners practising a laptop task with a worksheet and facilitator feedback.',
  },
  'cybersecurity-forensics': {
    src: '/Allimages/sixjars-home-security.png',
    alt: 'An Indian professional discussing account access with a security adviser.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Care />
      <CapabilityCards images={homeImages} compactTop />
      <WhySixJars />
      <ProcessSteps />

      <section
        id="insights"
        className="py-8 lg:py-10"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-wine)' }}
              >
                Insights
              </p>
              <h2
                className="mt-3 font-bold tracking-tight leading-tight"
                style={{
                  color: 'var(--color-plum)',
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                }}
              >
                Useful ideas for the work in front of you.
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
              style={{ color: 'var(--color-wine)' }}
            >
              All articles
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <InsightList filterable={false} limit={3} />
        </div>
      </section>

      <EnquiryBlock />
    </>
  )
}
