/**
 * Single source of truth for every capability, article, phase and proof item.
 *
 * Everything the navigation, footer and sitemap point at is derived from here,
 * so a destination cannot exist in the UI without a real page behind it.
 */

export type Capability = {
  slug: string
  /** Short label — navigation, cards, filters. (Review p.7) */
  shortName: string
  /** Full name — detail page H1 and metadata only. */
  fullName: string
  number: string
  /** One-word brand cue from the jar system. */
  cue: string
  summary: string
  intro: string
  capabilities: string[]
  /** What the client actually receives at close. */
  deliverables: string[]
  /** Where human review sits in this discipline. */
  humanReview: string
  /** "Choose this when" — the situation this vertical is for. */
  chooseWhen: string
  /** A boundary the vertical must state publicly (vertical 06). */
  boundary?: string
  /** Single-letter mark used in the orbit and card chips. */
  mark: string
}

/**
 * The six verticals, as defined in "Data for specific pages" (Aug 2026).
 * `capabilities` is the published Scope and `deliverables` the Typical
 * outputs; `chooseWhen` is the "Choose this when" line.
 */
export const capabilities: Capability[] = [
  {
    slug: 'publishing',
    shortName: 'Publishing',
    fullName: 'Publishing & Print Operations',
    number: '01',
    cue: 'Form',
    mark: 'P',
    summary:
      'Editorial development, copyediting, design, typesetting, print coordination and distribution.',
    intro:
      'We take a report, book, guide or campaign from draft to an approved and controlled release — holding editorial standards, institutional voice and production schedules together across print and digital.',
    capabilities: [
      'Editorial development',
      'Copyediting and proofreading',
      'Design and typesetting',
      'Conversion',
      'Print coordination',
      'Distribution workflow',
      'Asset management',
    ],
    deliverables: [
      'Manuscript-to-release workflow',
      'Approved print and digital masters',
      'Version history',
      'Distribution handover',
    ],
    chooseWhen:
      'A report, book, guide or campaign must move from draft to an approved and controlled release.',
    humanReview:
      'An accountable editor signs off every proof before release. Automation handles conversion and formatting; it never approves content.',
  },
  {
    slug: 'media',
    shortName: 'Media',
    fullName: 'Media & Content Operations',
    number: '02',
    cue: 'Voice',
    mark: 'M',
    summary:
      'Video, podcast, social, livestream, captions, transcripts and content repurposing.',
    intro:
      'Your institutional voice is the asset. We run production and repurposing across every channel around it — with clear approval ownership at each step.',
    capabilities: [
      'Video',
      'Podcast',
      'Social content',
      'Livestream support',
      'Editorial calendars',
      'Captions and transcripts',
      'Channel operations',
      'Content repurposing',
    ],
    deliverables: [
      'Approved media packages',
      'Channel-ready derivatives',
      'Accessibility files',
      'Content calendar and review record',
    ],
    chooseWhen:
      'Several channels need consistent content, faster production and clear approval ownership.',
    humanReview:
      'Nothing publishes on your channels without a named reviewer approving the cut, the caption and the context.',
  },
  {
    slug: 'digital-platforms',
    shortName: 'Digital Platforms',
    fullName: 'Digital Platforms & Intelligent Automation',
    number: '03',
    cue: 'Connect',
    mark: 'D',
    summary:
      'Websites, CRM, LMS, cloud workflows, mobile apps, integration and governed automation.',
    intro:
      'We connect the systems your people depend on — and automate the handoffs between them — with governance controls that decide where automation and AI may act, and where a person must.',
    capabilities: [
      'Websites',
      'CRM and LMS',
      'Cloud workflows',
      'Mobile applications',
      'System integration',
      'No-code / low-code automation',
      'AI-enabled workflows',
      'Governance controls',
    ],
    deliverables: [
      'Configured platform',
      'Documented integration',
      'Automation runbook',
      'Access model',
      'Quality and human-review controls',
    ],
    chooseWhen:
      'Disconnected systems or manual handoffs are slowing service, learning, sales or delivery.',
    humanReview:
      'AI-assisted output enters a review queue before it reaches a member, a donor or the public. The governance controls name who holds that queue.',
  },
  {
    slug: 'data-operations',
    shortName: 'Data & Business Ops',
    fullName: 'Data & Business Operations',
    number: '04',
    cue: 'Order',
    mark: 'O',
    summary:
      'Data cleanup, records, archives, research, reporting, intake, registration and back-office workflows.',
    intro:
      'Systematic order for the recurring work that keeps an institution running — so it no longer depends on scattered files, manual follow-up or unclear ownership.',
    capabilities: [
      'Data cleanup',
      'Records and archives',
      'Research',
      'Reporting',
      'Scheduling',
      'Intake and registration',
      'Customer and member support',
      'Recurring back-office workflows',
    ],
    deliverables: [
      'Structured data',
      'Documented operating process',
      'Dashboards',
      'Ownership map',
      'Exception and escalation path',
    ],
    chooseWhen:
      'Important recurring work depends on scattered files, manual follow-up or unclear ownership.',
    humanReview:
      'Exceptions never auto-resolve. They route to a named handler with the authority to decide and a record of what was decided.',
  },
  {
    slug: 'ai-academy',
    shortName: 'AI Academy',
    fullName: 'AI & Future Skills Academy',
    number: '05',
    cue: 'Grow',
    mark: 'A',
    summary:
      'AI literacy, workflow design, Lean Six Sigma, Train the Trainer and soft-skills programs.',
    intro:
      'Practical programs for students, teachers, professionals and teams — built so that what people learn can be applied safely and measured in real work.',
    capabilities: [
      'AI literacy and responsible use',
      'Prompt and workflow design',
      'Lean Six Sigma',
      'Process automation',
      'Train the Trainer',
      'Soft skills and communication',
      'Teamwork and interpersonal effectiveness',
      'Educator and student programs',
    ],
    deliverables: [
      'Role-based curriculum',
      'Workshops and practice labs',
      'Assessments',
      'Capstone projects',
      'Trainer guides',
      'Completion evidence and improvement plan',
    ],
    chooseWhen:
      'Students, teachers, professionals or teams need practical skills they can apply safely and measure in real work.',
    humanReview:
      'Every program ends in assessed, real-work evidence reviewed by a facilitator — not in attendance alone.',
  },
  {
    slug: 'cybersecurity-forensics',
    shortName: 'Cyber & Forensics',
    fullName: 'Cybersecurity & Digital Forensics',
    number: '06',
    cue: 'Protect & Establish',
    mark: 'S',
    summary:
      'Risk assessment, protective controls, incident readiness and authorized evidence preservation.',
    intro:
      'Reduce exposure, prepare for an incident, or understand an authorized event without compromising evidence — two separate workstreams under one accountable vertical.',
    capabilities: [
      'Risk assessment',
      'Protective-control coordination',
      'Incident readiness',
      'Remediation governance',
      'Authorized evidence preservation',
      'Timeline reconstruction',
      'Decision-ready reporting',
    ],
    deliverables: [
      'Risk register',
      'Control plan',
      'Incident playbook',
      'Evidence log',
      'Findings report',
      'Limitations and escalation record',
    ],
    chooseWhen:
      'The organization must reduce exposure, prepare for an incident or understand an authorized event without compromising evidence.',
    boundary:
      'Cybersecurity and digital forensics share one vertical but remain separate workstreams. Every forensic engagement requires explicit authorization, jurisdiction, qualified personnel, evidence-handling rules, chain-of-custody ownership, limitations and an escalation path.',
    humanReview:
      'No forensic analysis begins without documented authorization. Scope boundaries are written down first; anything outside them is escalated, not improvised.',
  },
]

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug)
}

/* ── Three-phase homepage method. The six operational stages sit underneath. ── */

export type Phase = {
  slug: string
  name: string
  headline: string
  description: string
  /** The detailed stages this homepage phase rolls up. */
  stages: { number: string; name: string; description: string; outputs: string[] }[]
}

export const phases: Phase[] = [
  {
    slug: 'understand',
    name: 'Understand',
    headline: 'Context, scope and authorisation before any work begins',
    description:
      'We learn your institutional context, then write down what is in scope, who may authorise what, and where confidentiality applies — before a single task is executed.',
    stages: [
      {
        number: '01',
        name: 'Discover',
        description:
          'A structured discovery conversation covering institutional context, governance requirements, service needs, authorisation levels and confidentiality requirements.',
        outputs: [
          'Mission context brief',
          'Service route identification',
          'Authorisation and governance mapping',
          'Initial scope definition',
        ],
      },
      {
        number: '02',
        name: 'Assess',
        description:
          'We define service boundaries, identify the human review points, map risk and sensitivity, and clarify what falls within our coordination versus a specialist practice.',
        outputs: [
          'Scope and boundary document',
          'Risk and sensitivity assessment',
          'Human review point mapping',
          'Engagement proposal',
        ],
      },
    ],
  },
  {
    slug: 'execute',
    name: 'Execute',
    headline: 'Governed delivery with accountable people at every decision',
    description:
      'The governance framework is established first — approvals, confidentiality protocols, reporting cadence, escalation paths — and only then does coordinated delivery begin.',
    stages: [
      {
        number: '03',
        name: 'Govern',
        description:
          'Before execution begins we establish authorisation approvals, approval pathways, confidentiality protocols, reporting cadence and escalation paths.',
        outputs: [
          'Authorisation documentation',
          'Governance framework',
          'Confidentiality protocols',
          'Escalation pathway',
        ],
      },
      {
        number: '04',
        name: 'Deliver',
        description:
          'Coordinated delivery across the relevant disciplines, with human judgment at every approval and exception point. Automation assists; accountable people decide.',
        outputs: [
          'Coordinated delivery',
          'Human-reviewed checkpoints',
          'Progress reporting',
          'Quality assurance',
        ],
      },
    ],
  },
  {
    slug: 'prove',
    name: 'Prove',
    headline: 'Documented evidence at close — and an honest review after it',
    description:
      'Every engagement closes with verified outcomes and decision records that separate what was done from what was intended. Then we review the engagement against the standard we set.',
    stages: [
      {
        number: '05',
        name: 'Validate',
        description:
          'Engagements close with documented outcomes: verified results, decision records, confirmed quality controls and maintained evidence logs — distinguishing fact from aspiration.',
        outputs: [
          'Verified outcome documentation',
          'Evidence and decision logs',
          'Quality control confirmation',
          'Lessons recorded',
        ],
      },
      {
        number: '06',
        name: 'Evolve',
        description:
          'We review each engagement against defined standards, update service capacity, and identify how the operating relationship can responsibly extend.',
        outputs: [
          'Engagement review',
          'Improvement recommendations',
          'Expanded scope options',
          'Ongoing relationship governance',
        ],
      },
    ],
  },
]

/* ── Operating commitments ──────────────────────────────────────────────
   These are commitments we hold ourselves to, NOT measured results.
   They are labelled as such wherever they appear near a call to action.
   Numerical outcome claims belong in `engagements` once verified.
   ──────────────────────────────────────────────────────────────────── */

export const commitments = [
  {
    mark: 'C',
    title: 'Connected capabilities',
    detail: 'One coordinated scope across all six disciplines.',
  },
  {
    mark: 'H',
    title: 'Human-reviewed',
    detail: 'A named person approves before release. Accountability stays visible.',
  },
  {
    mark: 'G',
    title: 'Governance built in',
    detail: 'Authorisation is documented before action, not after.',
  },
  {
    mark: 'E',
    title: 'Evidence at close',
    detail: 'Proof of what was done, not a vague summary.',
  },
]

/* ── Engagement examples ────────────────────────────────────────────────
   Illustrative composites of the shape of our work. They are labelled as
   examples, not case studies, and carry no client names or metrics until
   a client approves publication and the numbers are verified.
   ──────────────────────────────────────────────────────────────────── */

export type Engagement = {
  slug: string
  capability: string
  title: string
  context: string
  scope: string[]
  controls: string[]
  artefacts: string[]
  outcome: string
}

export const engagements: Engagement[] = [
  {
    slug: 'diocesan-publishing-consolidation',
    capability: 'Publishing',
    title: 'Consolidating a fragmented diocesan publishing pipeline',
    context:
      'A diocesan communications office running print, web and newsletter production through three disconnected vendors, with no single approval record.',
    scope: [
      'Map the existing production path end to end',
      'Establish one editorial calendar and approval gate',
      'Migrate the asset archive with retained version history',
    ],
    controls: [
      'Named editor approves every proof before release',
      'Version history retained for the full retention term',
      'Vendor handover documented in writing',
    ],
    artefacts: [
      'Production runbook',
      'Approval log with named approvers',
      'Migrated archive with integrity check record',
    ],
    outcome:
      'One approval path replaced three. Every published item now traces to a named approver and a dated proof.',
  },
  {
    slug: 'ai-content-governance-policy',
    capability: 'Digital Platforms',
    title: 'Writing an AI use policy before the tools were deployed',
    context:
      'A mission-led publisher under pressure to adopt AI drafting tools, with no stated position on where machine output was permitted.',
    scope: [
      'Inventory the proposed AI uses across content workflows',
      'Classify each use as permitted, review-gated or prohibited',
      'Define the human review queue and its owner',
    ],
    controls: [
      'AI-assisted drafts enter a review queue before publication',
      'Prohibited uses documented with the reasoning behind them',
      'Policy reviewed on a stated cadence',
    ],
    artefacts: [
      'AI use policy',
      'Review queue definition with named owner',
      'Staff briefing record',
    ],
    outcome:
      'The organisation adopted the tooling with a written position on machine judgment, rather than discovering its position after an incident.',
  },
  {
    slug: 'authorised-evidence-preservation',
    capability: 'Cyber & Forensics',
    title: 'Preserving evidence under written authorisation',
    context:
      'An institution facing an internal matter that required digital evidence to be preserved before any analysis or interpretation began.',
    scope: [
      'Obtain and document authorisation and its limits',
      'Preserve identified artefacts under chain of custody',
      'Reconstruct a timeline strictly from preserved evidence',
    ],
    controls: [
      'No acquisition before written authorisation',
      'Chain-of-custody log maintained from acquisition to release',
      'Report separates established findings from inference',
    ],
    artefacts: [
      'Authorisation and scope statement',
      'Chain-of-custody log',
      'Timeline report with evidentiary basis per entry',
    ],
    outcome:
      'Decision-makers received a report that stated plainly what the evidence established and what it could not.',
  },
]

/* ── Insights ───────────────────────────────────────────────────────── */

export type Article = {
  slug: string
  capability: string
  title: string
  excerpt: string
  readTime: string
  date: string
  isoDate: string
  image: string
  featured?: boolean
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'governing-editorial-workflows',
    capability: 'Publishing',
    title: 'Governing editorial workflows for Catholic institutions in the digital age',
    excerpt:
      'How mission-led publishers can establish disciplined production pipelines that preserve institutional voice while scaling output across digital and print channels.',
    readTime: '8 min',
    date: 'July 2026',
    isoDate: '2026-07-14',
    image: '/images/publishing-ops.png',
    featured: true,
    body: [
      'Most institutional publishing problems are not writing problems. They are approval problems. Work moves faster than the people responsible for it can review, and the gap fills with improvisation.',
      'A governed editorial workflow makes three things explicit: who may approve at each stage, what evidence of approval is retained, and what happens when an exception arrives late. None of this slows a well-run publishing operation. It is what allows one to scale without losing its voice.',
      'Start with the approval gate rather than the tooling. Name the approver for each publication type, record their decision against a dated proof, and retain that record for the same period you retain the publication itself. Tooling choices become straightforward once the gates are settled.',
      'The failure mode to watch for is the silent exception: an item that skipped review because someone was travelling and the deadline was fixed. Design an explicit path for that case, or the exception becomes the process.',
    ],
  },
  {
    slug: 'four-controls-before-incident-response',
    capability: 'Cyber & Forensics',
    title: 'The four controls every mission-led organization must establish before incident response',
    excerpt:
      'Before incident response training, these baseline protective controls reduce exposure for organizations managing sensitive mission data and institutional archives.',
    readTime: '6 min',
    date: 'June 2026',
    isoDate: '2026-06-23',
    image: '/images/cybersecurity-ops.png',
    body: [
      'Incident response training is valuable, but it is frequently purchased before the controls that would have prevented the incident. Four baseline controls do more for a mission-led organisation than a tabletop exercise.',
      'First, a current access register. You cannot respond to unauthorised access if you cannot state who was authorised. Second, tested backups — tested meaning restored, not merely scheduled.',
      'Third, a written classification of the data you hold, so that responders know within minutes whether an affected system contained sensitive personal or pastoral records. Fourth, a contact tree that names who decides, not only who is informed.',
      'These four are unglamorous and durable. Incident response built on top of them is a plan; incident response without them is a hope.',
    ],
  },
  {
    slug: 'human-judgment-in-ai-assisted-content',
    capability: 'Digital Platforms',
    title: 'Human judgment in AI-assisted content: a governance framework for mission media',
    excerpt:
      'A structured approach to integrating AI tools into content workflows while maintaining human oversight at every approval and publication point.',
    readTime: '10 min',
    date: 'June 2026',
    isoDate: '2026-06-04',
    image: '/images/insights-editorial.png',
    body: [
      'The governance question is not whether to use AI in content operations. It is where machine output is permitted to reach a reader without a person having looked at it.',
      'A workable framework classifies every proposed use into three states: permitted, review-gated and prohibited. Permitted uses are those where an error is trivially reversible and carries no doctrinal or pastoral weight — internal formatting, for instance.',
      'Review-gated uses are the large middle: drafting, summarising, translating. These require a named reviewer and a queue that cannot be bypassed under deadline pressure. Prohibited uses should be written down with the reasoning attached, because the reasoning is what lets a future colleague revisit the decision honestly.',
      'Write the policy before deploying the tools. An organisation that adopts first and governs later ends up defining its position in the middle of an incident, which is the worst possible moment to think clearly.',
    ],
  },
  {
    slug: 'evidence-preservation-authorization-first',
    capability: 'Cyber & Forensics',
    title: 'Evidence preservation for institutional investigations: authorization comes first',
    excerpt:
      'The sequence of decisions an organization must make — before any forensic analysis begins — to ensure evidence remains sound and chain of custody is maintained.',
    readTime: '7 min',
    date: 'May 2026',
    isoDate: '2026-05-19',
    image: '/images/insights-editorial.png',
    body: [
      'The most common error in institutional investigations is not technical. It is sequence: analysis begins before authorisation is documented, and the resulting findings carry an asterisk that cannot be removed afterwards.',
      'Authorisation should state who granted it, what it covers, what it explicitly does not cover, and when it expires. That last element is routinely omitted and routinely matters.',
      'Preservation follows authorisation. Every artefact is logged at acquisition with who acquired it, from where, and under what hash. The log continues through every transfer until release.',
      'Finally, the report must separate what the evidence establishes from what a reasonable person might infer from it. Decision-makers are entitled to both, clearly labelled, and never blended together.',
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

/* ── Contact intent paths (review p.3: keep, but shorten the labels) ── */

export const contactPaths = [
  {
    id: 'project',
    label: 'Start a project',
    desc: 'You have a defined scope and are ready to engage.',
    responseChannel:
      'A named owner replies by email within 2 business days with a scoping call proposal.',
  },
  {
    id: 'briefing',
    label: 'Capability briefing',
    desc: 'You want to understand what we do before committing to anything.',
    responseChannel:
      'We send a written capability summary for your route, then offer a 30-minute call.',
  },
  {
    id: 'sensitive',
    label: 'Sensitive matter',
    desc: 'Your inquiry involves confidential, security or forensic dimensions.',
    responseChannel:
      'Acknowledged the same business day. We reply with secure-channel instructions before you send any detail.',
  },
] as const

export type ContactPathId = (typeof contactPaths)[number]['id']

/* ── Organisation facts ─────────────────────────────────────────────────
   Every identifier here must be verified before publication. Fields that
   are not yet verified are omitted rather than guessed — the review flagged
   the placeholder 'CIN: Bangalore, India' as a credibility defect.
   ──────────────────────────────────────────────────────────────────── */

export const org = {
  legalName: 'Six Jars Global (OPC) Private Limited',
  address:
    'Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India',
  phone: '+91 96329 88066',
  phoneHref: '+919632988066',
  /** Customer care. */
  email: 'hello@sixjarsglobal.com',
  /** Privacy requests, grievances and security reports. */
  privacyEmail: 'sreejith.s@sixjarsglobal.com',
  hours: 'Monday–Friday, 09:00–18:00 IST, excluding Indian public holidays',
  grievanceOfficer: 'Sreejith S, Founder',
  gstin: '29ABUCS1730R1ZC',
  cin: 'U62020KA2026OPC223063' as string | null,
  linkedin: 'https://www.linkedin.com/company/six-jars-global',
}

/* ───────────────────────────────────────────────────────────────────────
   Founder
   ───────────────────────────────────────────────────────────────────── */

export type FounderTab = {
  id: string
  label: string
  /** Prose tabs render paragraphs; grid tabs render a labelled item grid. */
  kind: 'prose' | 'grid'
  body?: string[]
  items?: { name: string; detail: string }[]
}

/**
 * Six Jars Global is a One Person Company, so the founder is the accountable
 * owner the whole site keeps promising. This block is what the About page
 * renders.
 *
 * Name and role are from the company's legal pack. The portrait and the
 * pull-quote render only once the founder supplies them — until then the card
 * shows a monogram and no quote, rather than a stand-in.
 */
export const founder = {
  name: 'Sreejith S',
  role: 'Founder',
  company: org.legalName,
  location: 'Bengaluru, India',
  email: org.privacyEmail,
  phone: org.phone,
  phoneHref: org.phoneHref,
  linkedin: org.linkedin,
  /** 4:5 portrait at 2x (min 720×900). Until supplied, a monogram renders. */
  photo: null as string | null,
  photoAlt: 'Portrait of the founder of Six Jars Global.',
  /** Pull-quote under the portrait — renders only once the founder supplies one. */
  quote: null as string | null,
  /** Short credential chips shown beside the name. */
  credentials: ['Catholic-sector fluency', 'Governed AI delivery', 'Evidence-first close'],
  tabs: [
    {
      id: 'profile',
      label: 'Profile',
      kind: 'prose',
      body: [
        'Six Jars Global was founded to give Catholic and mission-led institutions one accountable partner across six connected disciplines — instead of six vendors, six invoices and no single owner when something goes wrong.',
        'The operating model came out of a simple observation: mission-led organizations rarely lack effort. They lack a documented path from brief to evidence, and a named person answerable at every gate along it.',
      ],
    },
    {
      id: 'expertise',
      label: 'Expertise',
      kind: 'grid',
      items: [
        {
          name: 'Governed delivery',
          detail: 'Scope, authorisation and close-out evidence defined before work starts.',
        },
        {
          name: 'AI with human review',
          detail: 'Automation assists; named people hold review, approval and exceptions.',
        },
        {
          name: 'Institutional publishing',
          detail: 'Editorial standards and institutional voice held across print and digital.',
        },
        {
          name: 'Security & forensics',
          detail: 'Authorisation-first evidence handling under documented chain of custody.',
        },
      ],
    },
    {
      id: 'sectors',
      label: 'Sectors',
      kind: 'grid',
      items: [
        {
          name: 'Dioceses & parishes',
          detail: 'Communications, records and digital platform operations.',
        },
        {
          name: 'Religious congregations',
          detail: 'Archives, publishing and institutional memory.',
        },
        {
          name: 'Catholic education',
          detail: 'Schools and colleges — platforms, content and data governance.',
        },
        {
          name: 'Healthcare & social mission',
          detail: 'Sensitive data handling and operational resilience.',
        },
        {
          name: 'Mission-led nonprofits',
          detail: 'Campaign operations, reporting and donor-facing content.',
        },
      ],
    },
  ] satisfies FounderTab[],
}

/* ───────────────────────────────────────────────────────────────────────
   Gallery
   ───────────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  slug: string
  title: string
  caption: string
  /** Must match a GALLERY_CATEGORIES entry. */
  category: string
  src: string
  alt: string
  /** Drives the masonry span — 'tall' items take two rows. */
  shape?: 'wide' | 'tall' | 'square'
}

export const galleryCategories = [
  'Publishing',
  'Media',
  'Digital + AI',
  'Cybersecurity',
  'Place',
] as const

/**
 * Gallery source of truth. Everything on /gallery is derived from here, so a
 * tile cannot exist without a real image, a category and an alt text behind it.
 *
 * ⚠ These five reuse existing site imagery so the page is complete and
 * reviewable. Drop real engagement and studio photography into /public/images
 * and extend this array — no component changes needed.
 */
export const galleryItems: GalleryItem[] = [
  {
    slug: 'publishing-floor',
    title: 'Publishing operations',
    caption: 'Proof gates and version history, held by a named editor at every stage.',
    category: 'Publishing',
    src: '/images/publishing-ops.png',
    alt: 'Editorial production work in progress across print and digital proofs.',
    shape: 'tall',
  },
  {
    slug: 'editorial-desk',
    title: 'Editorial desk',
    caption: 'Institutional voice held across every channel a story travels through.',
    category: 'Media',
    src: '/images/insights-editorial.png',
    alt: 'An editorial desk with manuscripts and reference material laid out.',
    shape: 'wide',
  },
  {
    slug: 'security-operations',
    title: 'Security operations',
    caption: 'Authorisation-first response, logged under chain of custody.',
    category: 'Cybersecurity',
    src: '/images/cybersecurity-ops.png',
    alt: 'A security operations workspace with monitoring displays.',
    shape: 'wide',
  },
  {
    slug: 'mission-work',
    title: 'Mission work',
    caption: 'The institutions the six capabilities exist to serve.',
    category: 'Digital + AI',
    src: '/images/mission-editorial.png',
    alt: 'Mission-led institutional work being carried out.',
    shape: 'square',
  },
  {
    slug: 'bangalore-hub',
    title: 'The Bangalore hub',
    caption: 'Where coordination across all six capabilities is run from.',
    category: 'Place',
    src: '/images/about-bangalore.png',
    alt: 'Bangalore, where the Six Jars Global coordination hub is based.',
    shape: 'tall',
  },
]

/* ───────────────────────────────────────────────────────────────────────
   Careers
   ───────────────────────────────────────────────────────────────────── */

export type Role = {
  slug: string
  title: string
  /** Must match a capability slug, so the role files under a real discipline. */
  capability: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  summary: string
}

/**
 * Careers source of truth. /careers renders every role listed here; when the
 * list is empty it shows a general-application path instead, so the page is
 * never a dead end and never advertises a vacancy that does not exist.
 *
 * To publish a vacancy, add an entry to `roles` — nothing else changes.
 */
export const careers = {
  /** Applications go to the main inbox, tagged so they can be routed. */
  email: org.email,
  subject: 'Careers — application',
  roles: [] as Role[],
  reasons: [
    {
      title: 'Work that serves a mission',
      detail:
        'Everything we deliver supports Catholic and mission-led institutions. The work is meant to outlast the engagement.',
    },
    {
      title: 'Your judgment stays in the loop',
      detail:
        'Automation assists; people review, approve and handle exceptions. You are hired for your judgment, not replaced by a tool.',
    },
    {
      title: 'Six disciplines, one team',
      detail:
        'Editorial, creative, technical, operational and forensic work sit side by side, so you learn across the whole path from brief to evidence.',
    },
    {
      title: 'Named ownership',
      detail:
        'Every piece of work has a named owner and a documented close. You will always know what you are accountable for — and get credit for it.',
    },
  ],
  process: [
    {
      title: 'Apply',
      detail: 'Send a short note and your CV or portfolio. Tell us which capability you are drawn to.',
    },
    {
      title: 'Acknowledgement',
      detail: 'Every application is acknowledged, with a named person as your point of contact.',
    },
    {
      title: 'Conversation',
      detail: 'A discussion about the work you have done and the work you want to do — no trick questions.',
    },
    {
      title: 'Decision',
      detail: 'A clear answer either way, with the reasoning, and a written offer if it is a yes.',
    },
  ],
}
