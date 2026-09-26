/**
 * Single source of truth for every capability, article, phase and proof item.
 *
 * Everything the navigation, footer and sitemap point at is derived from here,
 * so a destination cannot exist in the UI without a real page behind it.
 */

export type Capability = {
  slug: string
  /** Short label — navigation, cards, filters. */
  shortName: string
  /** Full vertical name — eyebrow on the detail page and metadata. */
  fullName: string
  number: string
  /** Secondary brand cue from the jar system. Never carries the explanation. */
  cue: string
  /** Descriptive page headline, paired with the short menu label. */
  headline: string
  /** One-line summary — menus and the capability orbit. */
  summary: string
  /** Homepage card copy — also the detail page intro. */
  intro: string
  /** Service page body copy. */
  overview: string
  /** Scope list (kept for reference; the page shows `deliverables`). */
  capabilities: string[]
  /** What the customer receives. */
  deliverables: string[]
  /** Why choose this service. */
  chooseWhen: string
  /** Who reviews the work. */
  humanReview: string
  /** A boundary the vertical must state publicly (vertical 06). */
  boundary?: string
  /** Single-letter mark used in the orbit and card chips. */
  mark: string
}

/**
 * The six verticals. Copy from the "Six Jars website content review"
 * (25 Sep 2026): each service starts with the customer's work, says what Six
 * Jars provides and gives a practical reason to choose it.
 */
export const capabilities: Capability[] = [
  {
    slug: 'publishing',
    shortName: 'Publishing',
    fullName: 'Publishing & Print Operations',
    number: '01',
    cue: 'Form',
    mark: 'P',
    headline: 'Bring your next publication from draft to finished copy.',
    summary: 'Editorial, design and production support for books, reports and guides.',
    intro:
      'Editorial, design and production support for books, reports and guides. We keep the text, layout and approvals together so your publication is ready for print and digital release.',
    overview:
      'A publication involves many decisions: what to say, how it should read, how it should look and which version is ready to go. We help you work through those decisions, from developing the manuscript to checking the final proof. Your organisation’s voice stays central throughout. Whether you are producing a book, an annual report or a series of guides, we coordinate the editorial and production work so your team has a clear view of what is ready and what still needs attention.',
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
      'Editorial development, copyediting and proofreading.',
      'Design, typesetting and conversion for print and digital formats.',
      'Print coordination, distribution handover and organised publication assets.',
      'Approved master files, a version history and a record of release approval.',
    ],
    chooseWhen:
      'Choose this service when your team is spending too much time passing files between writers, designers and printers. Six Jars connects those steps, giving you one coordinated route to a finished publication while keeping final approval clear.',
    humanReview:
      'An accountable editor reviews each proof before release. Your organisation’s approval responsibilities are agreed at the start.',
  },
  {
    slug: 'media',
    shortName: 'Media',
    fullName: 'Media & Content Operations',
    number: '02',
    cue: 'Voice',
    mark: 'M',
    headline: 'Make more of the stories your organisation has to tell.',
    summary: 'Video, podcasts and social content built around your message.',
    intro:
      'Video, podcasts and social content built around your message. We help you plan, produce and adapt material for each channel, with review before anything goes live.',
    overview:
      'Your team may have a useful interview, a worthwhile event or a story people should hear. Turning it into a finished video, podcast or set of social posts takes time and care. We support that work from the content calendar through production and review. We also adapt longer material into shorter pieces for different channels, so you can use it again without losing the meaning. Captions and transcripts are part of the work, helping more people follow what you have to say.',
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
      'Video, podcast and social content production.',
      'Livestream support and day-to-day channel operations.',
      'Editorial calendars and adaptation of existing content.',
      'Approved media files, channel versions, captions, transcripts and review records.',
    ],
    chooseWhen:
      'Choose this service when you have stories worth sharing but limited time to produce content for every channel. Coordinating production and adaptation helps your team use its existing material more effectively and keep the message consistent.',
    humanReview:
      'A named reviewer checks the edit, captions and context before content is published on your channels.',
  },
  {
    slug: 'digital-platforms',
    shortName: 'Digital Platforms',
    fullName: 'Digital Platforms & Intelligent Automation',
    number: '03',
    cue: 'Connect',
    mark: 'D',
    headline: 'Help your systems work together and your people get on with the job.',
    summary: 'Websites, applications and connected workflows that support everyday work.',
    intro:
      'Websites, applications and connected workflows that support everyday work. We help reduce repeated data entry and organise handovers between the systems your team uses.',
    overview:
      'When information sits in separate systems, people often become the link between them: copying details, chasing updates and checking whether a task moved forward. We help you build or connect the platforms behind that work. This can include a website, customer relationship management system, learning platform or mobile application. We agree which routine steps can be automated and which decisions need a person. Your team receives documentation for the connections, access and day-to-day operation, so it can understand how the system works.',
    capabilities: [
      'Websites',
      'CRM and LMS',
      'Cloud workflows',
      'Mobile applications',
      'System integration',
      'No-code / low-code automation',
      'AI-enabled workflows',
    ],
    deliverables: [
      'Websites, mobile applications, CRM and learning management systems.',
      'System integration and cloud workflows.',
      'No-code, low-code and AI-assisted workflows where appropriate.',
      'Configured platforms, integration documentation, operating instructions and access rules.',
    ],
    chooseWhen:
      'Choose this service when staff keep re-entering information or moving work manually between systems. Six Jars looks at the whole handover, helping you connect the work as well as the software.',
    humanReview:
      'AI-assisted content is reviewed by a named person before it reaches members, donors or the public. Review responsibilities form part of the workflow.',
  },
  {
    slug: 'data-operations',
    shortName: 'Data & Business Ops',
    fullName: 'Data & Business Operations',
    number: '04',
    cue: 'Order',
    mark: 'O',
    headline: 'Keep everyday work organised and easier to follow.',
    summary: 'Support for records, reporting, registrations and recurring administration.',
    intro:
      'Support for records, reporting, registrations and recurring administration. We bring scattered information into order and make it clear who handles each step and unresolved issue.',
    overview:
      'The work that keeps an organisation running is easy to overlook until something goes missing. A registration is incomplete, a report draws on an old file or a customer is waiting for a reply. We help organise the information and recurring tasks behind those moments. That may mean cleaning a dataset, arranging records, preparing reports or supporting intake and member enquiries. We document how the work should move and who deals with exceptions, giving your team a clearer way to manage what is open and what is complete.',
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
      'Data cleanup, records management and archives.',
      'Research, reporting, dashboards and scheduling.',
      'Intake, registration, customer support and member support.',
      'Structured data, documented procedures, responsibilities and escalation routes.',
    ],
    chooseWhen:
      'Choose this service when recurring administration depends on scattered spreadsheets, inboxes or one person’s memory. A shared process makes outstanding work visible and gives colleagues a practical basis for taking over when needed.',
    humanReview:
      'Unusual or unresolved cases go to a person with the authority to decide. The decision is recorded rather than silently treated as complete.',
  },
  {
    slug: 'ai-academy',
    shortName: 'AI Academy',
    fullName: 'AI & Future Skills Academy',
    number: '05',
    cue: 'Grow',
    mark: 'A',
    headline: 'Learn skills you can put to work.',
    summary: 'Practical learning for students, educators, professionals and teams.',
    intro:
      'Practical learning for students, educators, professionals and teams. Workshops, guided practice and assessed projects help participants use new skills in tasks that matter to them.',
    overview:
      'Learning becomes useful when people can apply it beyond the session. Our programmes give participants time to practise, ask questions and receive feedback on their work. Topics include responsible AI use, workflow design, process improvement, automation and communication. Students, educators, professionals and organisations can choose the learning route that fits their role. Each programme sets out what participants will practise and how their work will be assessed, so completion means more than being present at a workshop.',
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
      'AI literacy, responsible use, prompt writing and workflow design.',
      'Lean Six Sigma, process automation and Train the Trainer programmes.',
      'Communication, teamwork and interpersonal skills.',
      'Role-based curricula, practice labs, assessments, capstone projects and trainer guides.',
    ],
    chooseWhen:
      'Choose the Academy when people need guided practice and feedback to use new skills confidently. Role-based exercises and facilitator-reviewed projects give learners and team leaders something concrete to assess after the programme.',
    humanReview:
      'A facilitator reviews the participant’s applied work. Completion evidence and an improvement plan form part of the programme outputs.',
  },
  {
    slug: 'cybersecurity-forensics',
    shortName: 'Cyber & Forensics',
    fullName: 'Cybersecurity & Digital Forensics',
    number: '06',
    cue: 'Protect & Establish',
    mark: 'S',
    headline: 'Prepare for security problems and establish what happened.',
    summary: 'Support for security risks, incident readiness and authorised digital investigations.',
    intro:
      'Support for security risks, incident readiness and authorised digital investigations. We keep prevention and forensic work clearly scoped, with careful handling of sensitive information and evidence.',
    overview:
      'A security concern can leave your organisation facing difficult questions about its systems, information and next steps. Our cybersecurity work helps you assess risks, plan protective measures and prepare for an incident. Digital forensics is a separate service for authorised matters where evidence must be preserved and events examined. We agree the scope and responsibilities before work begins. Findings distinguish what the evidence shows, what remains uncertain and what needs further attention, helping the responsible people make informed decisions.',
    capabilities: [
      'Risk assessment',
      'Protective-control coordination',
      'Incident readiness',
      'Remediation oversight',
      'Authorised evidence preservation',
      'Timeline reconstruction',
      'Findings reporting',
    ],
    deliverables: [
      'Security risk assessment and coordination of protective controls.',
      'Incident preparation and oversight of corrective actions.',
      'Authorised evidence preservation and event timeline reconstruction.',
      'Risk registers, control plans, incident playbooks, evidence logs and findings reports.',
    ],
    chooseWhen:
      'Choose this service when you need a clear plan for security risks or a carefully bounded examination of a digital event. Separate workstreams help you get the appropriate support without confusing prevention, investigation and conclusions.',
    boundary:
      'Forensic work requires written authorisation, agreed jurisdiction, qualified personnel and evidence-handling rules. Responsibility for the chain of custody, limitations and escalation must be explicit.',
    humanReview:
      'Cybersecurity and digital forensics are separate workstreams. No forensic examination begins until the scope and responsibilities are agreed in writing.',
  },
]

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug)
}

/* ── Six-stage method: Understand → Plan → Execute → Review → Validate → Improve.
   Every stage names an accountable owner and the evidence that lets it exit. ── */

export type Phase = {
  slug: string
  number: string
  name: string
  /** Two-to-three word caption for the timeline. */
  short: string
  headline: string
  description: string
  /** The named role accountable for the stage. */
  owner: string
  /** What must exist before the stage can close. */
  exitEvidence: string
  outputs: string[]
}

export const phases: Phase[] = [
  {
    slug: 'understand',
    short: 'Scope + owner',
    number: '01',
    name: 'Understand',
    headline: 'Context, scope and authorisation before any work begins',
    description:
      'We learn your context, then write down what is in scope, who may authorise what, and where confidentiality applies — before a single task is executed.',
    owner: 'Engagement owner',
    exitEvidence: 'Signed scope brief and authorisation map',
    outputs: [
      'Context brief',
      'Service route identification',
      'Authorisation and governance mapping',
      'Initial scope definition',
    ],
  },
  {
    slug: 'plan',
    short: 'Plan + gate',
    number: '02',
    name: 'Plan',
    headline: 'Boundaries, risks and review points agreed in writing',
    description:
      'We define service boundaries, map risk and sensitivity, fix the human review points and agree approvals, reporting cadence and escalation paths.',
    owner: 'Engagement owner with capability lead',
    exitEvidence: 'Approved delivery plan and governance framework',
    outputs: [
      'Scope and boundary document',
      'Risk and sensitivity assessment',
      'Human review point mapping',
      'Escalation pathway',
    ],
  },
  {
    slug: 'execute',
    short: 'Controlled work',
    number: '03',
    name: 'Execute',
    headline: 'Coordinated delivery with accountable people at every decision',
    description:
      'Delivery runs across the relevant disciplines against the approved plan. Automation assists; accountable people decide at every approval and exception point.',
    owner: 'Capability lead',
    exitEvidence: 'Delivered work with a dated progress and exception log',
    outputs: [
      'Coordinated delivery',
      'Progress reporting',
      'Exception log',
      'Working-file control',
    ],
  },
  {
    slug: 'review',
    short: 'Human review',
    number: '04',
    name: 'Review',
    headline: 'Human review against the standard agreed at the start',
    description:
      'Named reviewers check the work against the approved scope and quality criteria. Findings are recorded, corrected and signed off — not waved through under deadline.',
    owner: 'Named reviewer',
    exitEvidence: 'Review record with findings and sign-off',
    outputs: [
      'Human-reviewed checkpoints',
      'Quality assurance findings',
      'Correction record',
      'Reviewer sign-off',
    ],
  },
  {
    slug: 'validate',
    short: 'Evidence check',
    number: '05',
    name: 'Validate',
    headline: 'A clear handover of what was done and what was agreed',
    description:
      'You receive the finished work with the records behind it: what was delivered, which decisions were made and what, if anything, is still open.',
    owner: 'Engagement owner',
    exitEvidence: 'Close-out evidence pack accepted by the client',
    outputs: [
      'Handover of finished work',
      'Evidence and decision logs',
      'Quality control confirmation',
      'Client acceptance',
    ],
  },
  {
    slug: 'improve',
    short: 'Close + learn',
    number: '06',
    name: 'Improve',
    headline: 'An honest review after close — and what changes next time',
    description:
      'We review the engagement against the standard we set, record lessons, and identify how the working relationship can responsibly extend.',
    owner: 'Founder',
    exitEvidence: 'Engagement review with recorded improvements',
    outputs: [
      'Engagement review',
      'Lessons recorded',
      'Improvement recommendations',
      'Next-scope options',
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
    title: 'Agreed approvals',
    detail: 'Who approves what is agreed before work starts, not after.',
  },
  {
    mark: 'E',
    title: 'Clear handover',
    detail: 'You receive the files, records and documentation your team can use.',
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
    slug: 'publishing-consolidation',
    capability: 'Publishing',
    title: 'Consolidating a fragmented publishing pipeline',
    context:
      'A communications office running print, web and newsletter production through three disconnected vendors, with no single approval record.',
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
      'A publisher under pressure to adopt AI drafting tools, with no stated position on where machine output was permitted.',
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
  /** Related vertical — must match a capability slug. */
  vertical: string
  /** Service label shown on cards (the capability short name). */
  capability: string
  title: string
  /** Short summary — shown on the card and as the article standfirst. */
  excerpt: string
  author: { name: string; role: string }
  reviewer: { name: string; role: string }
  /** One practical starting point, shown inside the article only. */
  takeaway: string
  /** Short scope note, shown inside the article only. */
  evidenceBoundary: string
  date: string
  isoDate: string
  image: string
  /** Direction for the photograph this article should eventually carry. */
  imageNote?: string
  featured?: boolean
  body: string[]
}

const FOUNDER = { name: 'Sreejith S', role: 'Founder' }

const articleData: Omit<Article, 'capability'>[] = [
  {
    slug: 'governing-editorial-workflows',
    vertical: 'publishing',
    title: 'Who signs off the final proof',
    excerpt:
      'A clear final review helps a publication move forward without confusion over versions or last-minute changes.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Before your next release, identify the final approver and the exact proof they will approve.',
    evidenceBoundary: 'Practical publishing guidance; no claim of measured performance improvement.',
    date: 'July 2026',
    isoDate: '2026-07-14',
    image: '/images/publishing-ops.png',
    imageNote: 'A close-up of a proof being checked, with the version and date visible on a fictional document.',
    featured: true,
    body: [
      'A report is ready for print, but two versions are still circulating. One contains the latest corrections; the other has the approval email. Before anyone sends a file to the printer, the team has to work out which copy is final.',
      'Give each publication one person responsible for final approval. Record that approval against a dated proof, and keep the proof and decision together. Editors, designers and production colleagues should be able to find the same file.',
      'Agree what happens if the approver is unavailable or a correction arrives after sign-off. A deputy and a clear way to reopen review can prevent a deadline from turning into an unrecorded decision.',
      'The aim is a review process people can follow during a busy week. Start with one upcoming publication, check how its final version will be identified and resolve any uncertainty before production begins.',
    ],
  },
  {
    slug: 'interview-more-than-one-video',
    vertical: 'media',
    title: 'An interview can do more than fill one video',
    excerpt:
      'Plan the useful moments in a conversation so you can adapt them for other channels without losing their meaning.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Choose one existing interview and identify a short passage that remains useful and accurate on its own.',
    evidenceBoundary:
      'Editorial guidance; audience reach and engagement will depend on the content and channel.',
    date: 'September 2026',
    isoDate: '2026-09-26',
    image: '/images/insights-editorial.png',
    imageNote: 'The interview setup from the Media service image, cropped around the speaker and microphone.',
    body: [
      'A recorded interview may contain an explanation, a personal story and an answer to a question your audience often asks. Each could be useful beyond the full recording. Finding those moments is easier when the team has agreed what the interview should help people understand.',
      'Before recording, write down the audience and the main questions. Afterwards, review the conversation for passages that make sense on their own. A short clip should still represent what the speaker meant; a striking sentence may need the explanation that came before it.',
      'Prepare captions and a transcript alongside the edit. These help people follow the material and give your team a reference when writing accompanying posts.',
      'Keep the full recording and adapted versions together, with a clear review record. The value comes from choosing useful material for each channel, rather than producing more versions than the team can maintain.',
    ],
  },
  {
    slug: 'human-judgment-in-ai-assisted-content',
    vertical: 'digital-platforms',
    title: 'Decide who checks AI-assisted content before you use it',
    excerpt:
      'Agree which tasks can use AI and who will review the result before it reaches your audience.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Take one proposed AI task and write down the permitted inputs, the reviewer and the release decision.',
    evidenceBoundary:
      'General workflow guidance. Legal and regulatory requirements need separate review for the relevant context.',
    date: 'June 2026',
    isoDate: '2026-06-04',
    image: '/images/mission-editorial.png',
    imageNote: 'A colleague checking a draft against a source document, with no chatbot branding.',
    body: [
      'A draft can read smoothly and still contain a wrong name, an unsupported claim or a change in meaning. If your team uses AI to help write, summarise or translate content, decide who will check those details before the work is shared.',
      'Begin with the tasks, rather than a list of tools. Record which uses are allowed, which need review and which are out of bounds. The decision should reflect the information involved and the consequences of an error. Even a routine task needs an approved way to handle confidential material.',
      'For content that reaches members, customers or the public, name the reviewer and explain what they must check. Build that step into the workflow so a deadline does not quietly remove it.',
      'Keep the reasons for your choices with the policy. When the work changes, the team can revisit an informed decision instead of trying to remember an unwritten rule.',
    ],
  },
  {
    slug: 'can-someone-else-pick-up-the-work',
    vertical: 'data-operations',
    title: 'Can someone else pick up the work tomorrow?',
    excerpt:
      'A recurring task is easier to manage when its files, status and unresolved questions are visible to the next person.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Test whether a colleague can locate the current file, status and next action for one recurring task.',
    evidenceBoundary:
      'Operational guidance; adapt the process to the organisation and its information requirements.',
    date: 'September 2026',
    isoDate: '2026-09-26',
    image: '/images/hero-cinematic.png',
    imageNote: 'Two colleagues handing over a task using a fictional checklist and shared record.',
    body: [
      'A colleague is away and a routine request stalls. The instructions are in one inbox, the latest spreadsheet is on another computer and nobody knows whether the customer has received a reply.',
      'Choose one recurring task and follow it from arrival to completion. Identify where the request is recorded, which information is needed and who takes the next step. Record the status somewhere the people doing the work can access.',
      'Pay attention to incomplete cases. A missing document or unanswered question should have an owner and a next action, rather than disappearing into a general list of pending work. Keep access appropriate to the information involved.',
      'Then ask a colleague to walk through the process using the instructions. Their questions will show where the process still depends on memory. Update those points and repeat the check when the task changes.',
    ],
  },
  {
    slug: 'what-someone-should-do-after-training',
    vertical: 'ai-academy',
    title: 'What someone should be able to do after training',
    excerpt:
      'Start with a task the learner needs to perform, then build practice and feedback around it.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Define one useful task and the criteria for doing it well before choosing the course content.',
    evidenceBoundary:
      'Learning design guidance; participation alone does not establish workplace proficiency or accreditation.',
    date: 'September 2026',
    isoDate: '2026-09-26',
    image: '/images/mission-editorial.png',
    imageNote: 'A learner explaining a completed exercise to a facilitator, rather than posing with a certificate.',
    body: [
      'A participant can enjoy a workshop and still struggle to apply the material the next day. Before choosing a programme, identify a task that would show the learning has become useful.',
      'For a teacher, that might be preparing a lesson activity and checking the supporting material. For a professional, it might be improving a recurring report or explaining a process more clearly. The exercise should fit the participant’s role and use information appropriate for a learning environment.',
      'Give learners time to attempt the task, receive feedback and try again. If AI is involved, assessment should include how they checked the output and handled mistakes, as well as the finished result.',
      'An applied project gives the learner and facilitator a shared basis for discussing progress. Keep the assessment criteria clear, record what the participant demonstrated and identify what still needs practice.',
    ],
  },
  {
    slug: 'four-controls-before-incident-response',
    vertical: 'cybersecurity-forensics',
    title: 'Four questions to ask about incident readiness',
    excerpt:
      'Check access, backups, sensitive records and decision-making responsibilities as part of preparing for a security incident.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Review the latest backup restoration test and confirm who can make decisions during an incident.',
    evidenceBoundary:
      'General readiness guidance; this does not replace an organisation-specific security assessment.',
    date: 'June 2026',
    isoDate: '2026-06-23',
    image: '/images/cybersecurity-ops.png',
    imageNote: 'An IT lead and colleague reviewing a plain incident checklist in a normal office.',
    body: [
      'An incident plan is easier to use when the basic information behind it is current. Start a readiness discussion with four questions.',
      'Who should have access to your important systems, and is that record up to date? Can your team restore the information it backs up, and has that been tested through an agreed process? Do you know where sensitive or confidential records are held? Who has authority to make decisions during an incident?',
      'The answers may reveal gaps that need an owner and a follow-up date. A scheduled backup, for example, is different from a documented test showing that the required information could be restored.',
      'Use these questions alongside your wider security work and incident exercises. They are a starting point for discussion with the people responsible for your systems, rather than a complete assessment of your organisation’s risks.',
    ],
  },
  {
    slug: 'evidence-preservation-authorization-first',
    vertical: 'cybersecurity-forensics',
    title: 'Before examining a device, agree who has authorised the work',
    excerpt:
      'A clear written scope helps the responsible specialists preserve evidence and report findings within agreed boundaries.',
    author: FOUNDER,
    reviewer: FOUNDER,
    takeaway:
      'Confirm written authority, scope and responsibility for evidence handling before an examination begins.',
    evidenceBoundary:
      'General process guidance, not legal advice. Procedure and admissibility depend on the relevant jurisdiction.',
    date: 'May 2026',
    isoDate: '2026-05-19',
    image: '/images/cybersecurity-ops.png',
    imageNote: 'An evidence log and a sealed demonstration device pouch, with no real case details.',
    body: [
      'When a concern involves a device or digital records, people may feel pressure to start looking immediately. The first step is to establish who has authority to commission the work and what the examination may cover.',
      'The written scope should identify the authorising party, relevant systems or material, exclusions and duration. It also needs to address the applicable jurisdiction and who is qualified to carry out the work. Questions about authority or legal requirements should be resolved with the appropriate advisers.',
      'Authorised specialists then need to preserve the relevant material and maintain a record of its collection, handling and transfers. This record helps explain how the evidence reached the examiner and what happened to it along the way.',
      'The final report should distinguish observed facts from interpretations and state any limitations. Decision-makers need to understand both the findings and the questions the examination could not answer.',
    ],
  },
]

/** Read time derived from the final published text at ~200 words a minute. */
export function readTime(article: Pick<Article, 'excerpt' | 'takeaway' | 'body'>) {
  const words = [article.excerpt, article.takeaway, ...article.body]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min`
}

/** Newest first. */
export const articles: Article[] = articleData
  .map((a) => ({
    ...a,
    capability: capabilities.find((c) => c.slug === a.vertical)?.shortName ?? a.vertical,
  }))
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate))

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

/* ── Contact intent paths ─────────────────────────────────────────────── */

export const contactPaths = [
  {
    id: 'project',
    label: 'Discuss a project',
    desc: 'You have work in mind and want to scope it with us.',
    responseChannel:
      'A named owner replies by email within 2 business days with a scoping call proposal.',
  },
  {
    id: 'support',
    label: 'Request support',
    desc: 'You are a client and need help with work we delivered.',
    responseChannel:
      'Acknowledged within 1 business day and routed to the named owner of your engagement.',
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
    'Cumins Genesis, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India',
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
  /** Google Maps pin for Cumins Estates – Genesis, Horamavu. */
  mapUrl: 'https://maps.app.goo.gl/2jPfGFdGNLjiFsPs7',
  mapEmbed: 'https://www.google.com/maps?q=13.0289617,77.6687345&z=17&output=embed',
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
  photo: '/founder.jpeg' as string | null,
  photoAlt: 'Sreejith S, founder of Six Jars Global.',
  /** Pull-quote under the portrait — renders only once the founder supplies one. */
  quote: null as string | null,
  /** Short credential chips shown beside the name. */
  credentials: ['Governed delivery', 'AI with human review', 'Evidence-first close'],
  tabs: [
    {
      id: 'profile',
      label: 'Profile',
      kind: 'prose',
      body: [
        'Six Jars Global was founded to give organizations one accountable partner across six connected disciplines — instead of six vendors, six invoices and no single owner when something goes wrong.',
        'The operating model came out of a simple observation: organizations rarely lack effort. They lack a documented path from brief to evidence, and a named person answerable at every gate along it.',
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
          name: 'Publishing & media',
          detail: 'Editorial production, channel operations and rights-aware archives.',
        },
        {
          name: 'Education & training',
          detail: 'Schools, colleges and training providers — platforms, content and data governance.',
        },
        {
          name: 'Healthcare & social care',
          detail: 'Sensitive data handling and operational resilience.',
        },
        {
          name: 'Nonprofits & foundations',
          detail: 'Campaign operations, reporting and supporter-facing content.',
        },
        {
          name: 'Professional services',
          detail: 'Records, reporting and back-office workflows that must hold up to audit.',
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
    caption: 'The organizations the six capabilities exist to serve.',
    category: 'Digital + AI',
    src: '/images/mission-editorial.png',
    alt: 'Operational work being carried out in an office.',
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
      title: 'Work that outlasts the engagement',
      detail:
        'Everything we deliver is meant to outlast the engagement — work that keeps serving the organization long after close.',
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
