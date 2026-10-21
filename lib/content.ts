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
  /** Search-result snippet, 140–158 characters, leading with the service keyword. */
  metaDescription: string
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
  /** "Who this is for" line on the service page. */
  audience?: string
  /** Service-page hero image; falls back to the vertical's shared visual. */
  heroImage?: { src: string; alt: string }
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
      'Have a manuscript, report or guide to publish? We help edit the words, design the pages and prepare the files for print or digital release, with you involved in the final decisions.',
    metaDescription:
      'Book, report and guide publishing in Bengaluru: editing, page design and print-ready or digital files, with you involved in every final decision.',
    audience:
      'For independent authors and teams preparing a book, report or guide for publication.',
    heroImage: {
      src: '/Allimages/sixjars-publishing-service.png',
      alt: 'Illustration of an Indian author and designer reviewing a printed book proof.',
    },
    overview:
      'Bring us your manuscript, report or idea. We help shape the words, design the pages and prepare the final files for print or digital release. Your voice stays central. Whether you are an independent author or part of a team, you have a clear view of the work and a say in the decisions.',
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
      'You can work through the edits, page design and production decisions with one coordinated team. You know which proof is current and when your approval is needed.',
    humanReview:
      'An accountable editor reviews each proof before release. Your approval responsibilities are agreed at the start.',
  },
  {
    slug: 'media',
    shortName: 'Media',
    fullName: 'Media & Content Operations',
    number: '02',
    cue: 'Voice',
    mark: 'M',
    headline: 'Make more of the stories you have to tell.',
    summary: 'Video, podcasts and social content built around your message.',
    intro:
      'Bring us the story you want to tell. We help plan and produce videos, podcasts and social content, then prepare the versions you need and review them with you before release.',
    metaDescription:
      'Video, podcast and social content production: we plan, film and edit your story, prepare each channel version and review it with you before release.',
    audience:
      'For people and teams who want to turn a story, interview or event into useful media.',
    heroImage: {
      src: '/Allimages/sixjars-media-service.png',
      alt: 'Illustration of an Indian host and guest recording a podcast with a producer.',
    },
    overview:
      'Turn your interview, event or idea into content people can watch, hear and share. We help you plan, produce and adapt videos, podcasts and social posts for the channels you use. Captions, transcripts and a clear review step help your message reach people in a form they can follow.',
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
      'A good interview may work as a full conversation, a short clip or a written extract. We plan those versions together and check that each one keeps the meaning of the original.',
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
    headline: 'Build digital tools that work for you.',
    summary: 'Websites, applications and connected workflows that support everyday work.',
    intro:
      'Build a website, application or workflow around the way you work. We help connect your tools and information so everyday tasks are easier to manage.',
    metaDescription:
      'Website, app and workflow development built around how you work, connecting your tools and information so everyday tasks are easier to manage.',
    audience:
      'For individuals and teams who need a website, application or a better way to connect everyday tasks.',
    heroImage: {
      src: '/Allimages/sixjars-digital-service.png',
      alt: 'Indian professionals reviewing a website, mobile page and workflow.',
    },
    overview:
      'Create a website, application or connected workflow around the way you work. We help you choose the right platform, connect useful information and automate suitable routine steps. People stay responsible for key decisions. You receive the setup and guidance needed to use and manage the solution.',
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
      'We look at the task as well as the technology. The setup includes the access rules, handovers and review steps people need to use it day to day.',
    humanReview:
      'AI-assisted content is reviewed by a named person before it reaches your audience. Review responsibilities form part of the workflow.',
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
      'Keep records, reports and recurring tasks in order. We help organise the information, track what needs attention and make handovers easier.',
    metaDescription:
      'Data and business operations support: organised records, reliable reporting, registrations and recurring admin, with clear handovers at every step.',
    audience:
      'For people and teams managing records, reports, registrations or recurring administration.',
    heroImage: {
      src: '/Allimages/sixjars-data-service.png',
      alt: 'An Indian specialist checking organised records against a reporting and task dashboard.',
    },
    overview:
      'Keep your records, reports and recurring tasks clear and current. We help clean data, organise files, prepare useful reports and support enquiries or registrations. Each process has clear steps, responsibilities and follow-up, so you can see what is complete and what comes next.',
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
      'When files, status and next actions are easy to find, people can follow up and hand work over without starting again. We help put that structure in place.',
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
      'Learn by working on tasks you recognise. Our workshops give students, educators, professionals and teams time to practise, ask questions and improve their work with feedback.',
    metaDescription:
      'Practical AI and future-skills training for students, educators, professionals and teams: hands-on workshops on real tasks, with expert feedback.',
    audience:
      'For students, educators, professionals and teams who want to practise a skill and use it in their own work.',
    heroImage: {
      src: '/Allimages/sixjars-academy-service.png',
      alt: 'Illustration of Indian adult learners practising tasks with feedback from a facilitator.',
    },
    overview:
      'Learning becomes useful when people can apply it beyond the session. Our programmes give participants time to practise, ask questions and receive feedback on their work. Topics include responsible AI use, workflow design, process improvement, automation and communication. Students, educators, professionals and organisations can choose the learning route that fits their role. Each programme sets out what participants will practise and how their work will be assessed.',
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
      'Learners get time to try a task, discuss what worked and improve it. The finished exercise or project gives them and their facilitator a clear way to assess progress.',
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
    headline: 'Protect what matters. Understand what happened.',
    summary: 'Support for security risks, incident readiness and authorised digital investigations.',
    intro:
      'Understand your security risks and prepare for incidents. When a digital event needs examination, we agree a separate, authorised forensic scope and handle information and evidence with care.',
    metaDescription:
      'Cybersecurity risk assessment, incident readiness and authorised digital forensics, with evidence handled carefully under a clearly agreed scope.',
    audience:
      'For people and organisations seeking security support or an authorised examination of a digital matter.',
    heroImage: {
      src: '/Allimages/sixjars-security-service.png',
      alt: 'Indian professionals reviewing a security checklist and a device evidence log.',
    },
    overview:
      'Take a clear, practical approach to protecting your systems and information. Our cybersecurity work supports risk assessment, protective measures and incident readiness. For authorised digital matters, a separate forensic workstream preserves evidence and examines events within an agreed scope. Findings clearly distinguish established facts, uncertainties and next steps.',
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
      'Get the right support for your goal: stronger security readiness or an authorised examination of a digital event. Each workstream has a clear scope, responsible specialists and a documented handover.',
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
      'We start by listening to what you need. Together, we record the work to be done, who can approve it and what information needs to stay confidential.',
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
      'We agree what is included, the main risks and when you will review the work. The plan also says how often you will hear from us and who will handle questions or problems.',
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
      'The specialists carry out the agreed work and keep you informed. Where automation helps, people still make the approval decisions and handle exceptions.',
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
      'The agreed reviewers check the work against your brief and quality requirements. We record their feedback, make the corrections and confirm approval.',
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
    headline: 'Review what worked and plan the next step',
    description:
      'We discuss what worked, what could be better and whether there is a useful next step. The review records the improvements to carry into future work.',
    owner: 'Cofounder & CEO',
    exitEvidence: 'Engagement review with recorded improvements',
    outputs: [
      'Engagement review',
      'Lessons recorded',
      'Improvement recommendations',
      'Next-scope options',
    ],
  },
]

/* ── CARE ────────────────────────────────────────────────────────────────
   Homepage values block (change guide, 28 Sep 2026). Replaces the earlier
   operating commitments; review and approval responsibilities now live in
   the service and process copy.
   ──────────────────────────────────────────────────────────────────── */

export const care = [
  {
    letter: 'C',
    title: 'Clarity',
    detail: 'Know the scope, the next step and what you will receive.',
  },
  {
    letter: 'A',
    title: 'Accountability',
    detail: 'Work with a named owner and agreed approvals.',
  },
  {
    letter: 'R',
    title: 'Responsible innovation',
    detail:
      'Choose technology that helps the work, with people checking the results and protecting information.',
  },
  {
    letter: 'E',
    title: 'Empowerment',
    detail: 'Build the skills and confidence to use what we deliver.',
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
    title: 'Creating one clear publishing workflow',
    context:
      'An illustrative publishing workflow bringing print, web and newsletter production into one shared plan, with a clear approval record.',
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
      'In this illustrative example, each published item has a named approver and a dated proof within one coordinated approval path.',
  },
  {
    slug: 'ai-content-governance-policy',
    capability: 'Digital Platforms',
    title: 'Putting responsible AI use into practice',
    context:
      'An illustrative publishing team preparing to use AI drafting tools with clear permissions, review responsibilities and release decisions.',
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
      'In this illustrative example, the team has a written AI use policy and a named review owner before adopting the tools.',
  },
  {
    slug: 'authorised-evidence-preservation',
    capability: 'Cyber & Forensics',
    title: 'Preserving evidence under written authorisation',
    context:
      'An illustrative authorised engagement in which an institution preserves digital evidence before examination and interpretation.',
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
      'In this illustrative example, the report clearly states what the evidence establishes and the limits of the findings.',
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
  /** Alt text for `image` where it appears on homepage cards. */
  imageAlt?: string
  /** Image and alt text shown inside the article page. */
  articleImage?: { src: string; alt: string }
  /** Image and alt text for the row on the /insights index. */
  listImage?: { src: string; alt: string }
  /** Direction for the photograph this article should eventually carry. */
  imageNote?: string
  featured?: boolean
  body: string[]
}

const FOUNDER = { name: 'Sreejith S', role: 'Cofounder & CEO' }

const articleData: Omit<Article, 'capability'>[] = [
  {
    slug: 'governing-editorial-workflows',
    vertical: 'publishing',
    title: 'Move from final proof to publication',
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
    articleImage: {
      src: '/Allimages/sixjars-article-proof.png',
      alt: 'Illustration of Indian publishing colleagues checking a final proof and approval record.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-proof.png',
      alt: 'Illustration of an Indian designer preparing a final book proof for release.',
    },
    imageNote: 'A close-up of a proof being checked, with the version and date visible on a fictional document.',
    featured: true,
    body: [
      'A clear final proof gives everyone confidence to move into production. Keep the latest corrections and approval together, so the author, designer and printer work from the same agreed file.',
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
    image: '/Allimages/sixjars-home-insight-interview.png',
    imageAlt: 'Illustration of an interviewer recording a conversation with an Indian guest.',
    articleImage: {
      src: '/Allimages/sixjars-article-interview.png',
      alt: 'Illustration of an Indian editor selecting short clips from a recorded interview.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-interview.png',
      alt: 'Illustration of an Indian editor selecting a useful passage from an interview transcript.',
    },
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
    title: 'Use AI-assisted content with confidence',
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
    articleImage: {
      src: '/Allimages/sixjars-article-ai-review.png',
      alt: 'An Indian editor checking an AI-assisted draft against source notes.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-ai-review.png',
      alt: 'An Indian reviewer comparing an AI-assisted draft with source material.',
    },
    imageNote: 'A colleague checking a draft against a source document, with no chatbot branding.',
    body: [
      'Use AI-assisted writing with a clear review step. A named person checks facts, meaning and context before a draft, summary or translation reaches its audience.',
      'Begin with the tasks, rather than a list of tools. Record which uses are allowed, which need review and which are out of bounds. The decision should reflect the information involved and the consequences of an error. Even a routine task needs an approved way to handle confidential material.',
      'For content that reaches members, customers or the public, name the reviewer and explain what they must check. Build that step into the workflow so a deadline does not quietly remove it.',
      'Keep the reasons for your choices with the policy. When the work changes, the team can revisit an informed decision instead of trying to remember an unwritten rule.',
    ],
  },
  {
    slug: 'can-someone-else-pick-up-the-work',
    vertical: 'data-operations',
    title: 'Make everyday work easy to hand over',
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
    image: '/Allimages/sixjars-article-handover-team.png',
    imageAlt: 'Indian colleagues handing over a folder and task checklist.',
    articleImage: {
      src: '/Allimages/sixjars-article-handover.png',
      alt: 'Indian colleagues handing over a task with a folder and status board.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-handover.png',
      alt: 'An Indian colleague continuing a task using shared records and instructions.',
    },
    imageNote: 'Two colleagues handing over a task using a fictional checklist and shared record.',
    body: [
      'A clear handover helps work continue smoothly. Keep the current files, task status and next action together so the next person can pick up with confidence.',
      'Choose one recurring task and follow it from arrival to completion. Identify where the request is recorded, which information is needed and who takes the next step. Record the status somewhere the people doing the work can access.',
      'Pay attention to incomplete cases. A missing document or unanswered question should have an owner and a next action, rather than disappearing into a general list of pending work. Keep access appropriate to the information involved.',
      'Then ask a colleague to walk through the process using the instructions. Their questions will show where the process still depends on memory. Update those points and repeat the check when the task changes.',
    ],
  },
  {
    slug: 'what-someone-should-do-after-training',
    vertical: 'ai-academy',
    title: 'Turn learning into everyday skills',
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
    image: '/Allimages/sixjars-home-insight-learning.png',
    imageAlt: 'Illustration of an Indian learner improving a practical worksheet with feedback.',
    articleImage: {
      src: '/Allimages/sixjars-article-learning.png',
      alt: 'Illustration of an Indian professional demonstrating an applied workflow to a facilitator.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-learning.png',
      alt: 'Illustration of an Indian educator demonstrating a completed lesson activity to peers.',
    },
    imageNote: 'A learner explaining a completed exercise to a facilitator, rather than posing with a certificate.',
    body: [
      'Start with a useful task. Choosing what you want to do after a programme gives the learning a clear purpose and makes progress easier to see.',
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
    articleImage: {
      src: '/Allimages/sixjars-article-readiness.png',
      alt: 'Indian colleagues reviewing four practical incident-readiness topics.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-readiness.png',
      alt: 'An Indian IT professional checking access, backups, records and a decision plan.',
    },
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
    articleImage: {
      src: '/Allimages/sixjars-article-authorisation.png',
      alt: 'An Indian examiner checking written authority before accessing a packaged device.',
    },
    listImage: {
      src: '/Allimages/sixjars-index-authorisation.png',
      alt: 'An Indian client and forensic specialist agreeing a written scope.',
    },
    imageNote: 'An evidence log and a sealed demonstration device pouch, with no real case details.',
    body: [
      'An authorised examination starts with a clear written scope. Establish who can commission the work and what it may cover before accessing a device or digital records.',
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
    desc: 'Your enquiry involves confidential, security or forensic matters.',
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
  /** Full registered office, as shown under About → Company details. */
  registeredOffice:
    'Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India',
  phone: '+91 96329 88066',
  phoneHref: '+919632988066',
  /** Customer care. */
  email: 'hello@sixjarsglobal.com',
  /** Privacy requests, grievances and security reports. */
  privacyEmail: 'sreejith.s@sixjarsglobal.com',
  hours: 'Monday–Friday, 09:00–18:00 IST, excluding Indian public holidays',
  grievanceOfficer: 'Sreejith S, Cofounder & CEO',
  gstin: '29ABUCS1730R1ZC',
  cin: 'U62020KA2026OPC223063' as string | null,
  linkedin: 'https://www.linkedin.com/company/six-jars-global/',
  instagram: 'https://www.instagram.com/sixjars.global/',
  x: 'https://x.com/SixJarsGlobal',
  facebook: 'https://www.facebook.com/sixjarsglobal',
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
  role: 'Cofounder & CEO',
  company: org.legalName,
  location: 'Bengaluru, India',
  email: org.privacyEmail,
  phone: org.phone,
  phoneHref: org.phoneHref,
  linkedin: org.linkedin,
  /** 4:5 portrait at 2x (min 720×900). Until supplied, a monogram renders. */
  photo: '/founder.jpeg' as string | null,
  photoAlt: 'Sreejith S, Cofounder & CEO of Six Jars Global.',
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
  subject: 'Careers application',
  roles: [] as Role[],
  reasons: [
    {
      title: 'Work that outlasts the engagement',
      detail:
        'Everything we deliver is meant to outlast the engagement — work that keeps serving people and organisations long after close.',
    },
    {
      title: 'Your judgment stays in the loop',
      detail:
        'Automation assists; people review, approve and handle exceptions. Your judgment shapes the work.',
    },
    {
      title: 'Six disciplines, one team',
      detail:
        'You work alongside people from editorial, creative, technical, operational and forensic disciplines, and see how their work fits together.',
    },
    {
      title: 'Named ownership',
      detail:
        'You know which work you are responsible for, who reviews it and what a completed handover should include.',
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
