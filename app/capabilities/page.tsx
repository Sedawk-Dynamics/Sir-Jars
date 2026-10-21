import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import CapabilityCards from '@/components/capability-cards'
import EnquiryBlock from '@/components/enquiry-block'
import BackToHome from '@/components/back-to-home'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Services — publishing, media, AI and security',
  description:
    'Publishing, media, digital platforms, data operations, AI skills training and cybersecurity: six connected services coordinated by one accountable partner.',
  path: '/capabilities',
})

/** Services-page card images and alt text (change guide, 02 02). */
const serviceImages: Record<string, { src: string; alt: string }> = {
  publishing: {
    src: '/Allimages/sixjars-services-publishing.png',
    alt: 'Illustration of an Indian print technician checking a book proof.',
  },
  media: {
    src: '/Allimages/sixjars-services-media.png',
    alt: 'Illustration of an Indian crew recording an interview in an office courtyard.',
  },
  'digital-platforms': {
    src: '/Allimages/sixjars-services-digital.png',
    alt: 'An Indian developer explaining connected workflow steps to a customer.',
  },
  'data-operations': {
    src: '/Allimages/sixjars-services-data.png',
    alt: 'An Indian operations specialist reviewing a report with a client.',
  },
  'ai-academy': {
    src: '/Allimages/sixjars-services-academy.png',
    alt: 'Illustration of an Indian teacher practising a lesson while a facilitator observes.',
  },
  'cybersecurity-forensics': {
    src: '/Allimages/sixjars-services-security.png',
    alt: 'Indian colleagues checking a backup restoration test.',
  },
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Find the support your next project needs."
        intro="Publishing, media, digital systems, business operations, skills and security. Choose the service that fits your need — if the work crosses several areas, we plan it with you as one job."
        note="You can enquire as an individual or on behalf of an organisation. We agree the work and price with you before it begins."
        breadcrumbs={[{ label: 'Services', href: '/capabilities' }]}
        image={null}
        pattern="hatch"
      />

      <CapabilityCards images={serviceImages} />

      <EnquiryBlock />

      <BackToHome />
    </>
  )
}
