/**
 * Legal and policy documents.
 *
 * The seven documents dated 25 August 2026 are transcribed verbatim from the
 * company's approved legal pack ("Data for specific pages", v1.0). Edit them
 * only from a newer approved version, and bump `version` / `reviewed` when
 * you do. The confidentiality policy predates the pack and is still marked as
 * under review.
 */

export type LegalBlock = string | { list: string[] }

export type LegalDoc = {
  title: string
  /** One-line summary for the page header and search results. */
  intro: string
  effective?: string
  version?: string
  reviewed?: string
  /** Shows the "pending sign-off" banner. */
  underReview?: boolean
  sections: { heading: string; body: LegalBlock[] }[]
}

const PACK = {
  effective: '25 August 2026',
  version: '1.0',
  reviewed: '25 August 2026',
}

export const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy Notice',
    intro:
      'How Six Jars Global collects, uses, shares, protects and retains personal data, and how to exercise your rights.',
    ...PACK,
    sections: [
      {
        heading: '1. Who we are',
        body: [
          'SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global, is a One Person Company incorporated in India. Our CIN is U62020KA2026OPC223063 and our GSTIN is 29ABUCS1730R1ZC.',
          'Registered address: Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India.',
          'Privacy contact: sreejith.s@sixjarsglobal.com. Customer care: hello@sixjarsglobal.com or +91 9632988066, Monday-Friday, 09:00-18:00 IST, excluding Indian public holidays.',
        ],
      },
      {
        heading: '2. Scope',
        body: [
          'This Privacy Notice explains how we collect, use, share, protect and retain personal data when you visit our website, contact us, request a proposal, purchase goods or services, join a learning program, receive support, apply to work with us or otherwise interact with Six Jars Global. A signed proposal, statement of work or program notice may provide additional privacy information for a specific engagement.',
        ],
      },
      {
        heading: '3. Personal data we collect',
        body: [
          {
            list: [
              'Identity and contact data, such as name, organization, role, postal address, email address and phone number.',
              'Inquiry and engagement data, such as messages, project requirements, proposals, approvals, support records, learning registrations and feedback.',
              'Order and transaction data, such as items or services selected, billing and shipping details, tax information, payment status, refunds and delivery records. Payment-card data is processed by the payment provider and should not be sent through ordinary email, chat or public forms.',
              'Website and device data, such as IP address, device and browser information, security logs, pages viewed, referral information and cookie choices.',
              'Professional and learning data, such as job title, skills, assessment results, attendance, certificates and work samples where relevant to a requested program or service.',
              'Compliance and security data required to prevent fraud, protect systems, resolve disputes or meet legal, accounting and regulatory duties.',
            ],
          },
          'For cybersecurity or digital-forensics work, do not upload credentials, confidential evidence, health information, government identifiers or other sensitive records through a public form. Provide only the nature of the request and wait for written secure-channel instructions and an authorized scope.',
        ],
      },
      {
        heading: '4. How we collect personal data',
        body: [
          'We collect personal data directly from you, from your organization where it asks us to work with you, through purchases and service delivery, from devices and website technologies based on your choices, from logistics and payment partners involved in a transaction, and from lawful public or professional sources where relevant to a legitimate business inquiry.',
        ],
      },
      {
        heading: '5. How we use personal data',
        body: [
          {
            list: [
              'Respond to inquiries, prepare proposals and communicate about requested work.',
              'Create and manage orders, payments, shipping, returns, refunds, learning registrations and support cases.',
              'Deliver contracted services, maintain project records, issue completion evidence and manage quality and approvals.',
              'Operate, secure, troubleshoot and improve our website, systems and service processes.',
              'Send service messages and, where required, send marketing only after the appropriate choice or consent.',
              'Prevent misuse, protect people and systems, preserve authorized records, enforce agreements and resolve disputes.',
              'Meet tax, accounting, corporate, consumer-protection, customs, sanctions and other legal obligations.',
            ],
          },
        ],
      },
      {
        heading: '6. Lawful processing, consent and choices',
        body: [
          'We process personal data for lawful purposes connected with a request, contract, transaction, legal duty, security need or consent, as applicable. Where consent is required, the request will be clear and separate from unrelated terms. You may withdraw consent through the same control used to give it or by contacting the privacy contact. Withdrawal does not affect processing already carried out lawfully and may not require deletion of records that must be retained for legal, tax, fraud, warranty or dispute purposes.',
          'We process personal data in accordance with applicable Indian data-protection law and will update our practices and this Notice as further provisions of the Digital Personal Data Protection Act, 2023 and related rules come into force.',
        ],
      },
      {
        heading: '7. How we share personal data',
        body: [
          'We share only the data reasonably needed for the stated purpose with service providers that support hosting, cloud storage, communications, customer management, payments, accounting, learning delivery, analytics where enabled, courier and freight services, customs processing, professional advice and security. We may also disclose data to a government, regulator, court or law-enforcement body where required or permitted by law, or in connection with a lawful corporate transaction. We do not sell personal data.',
          'Current provider details and relevant processing locations are available on request from the privacy contact. Providers must use the data only for the authorized service and apply appropriate confidentiality and security controls.',
        ],
      },
      {
        heading: '8. International processing and transfers',
        body: [
          'Because we serve and ship to customers in different countries, personal data may be processed outside India by hosting, communications, payment, courier, freight, customs or professional-service providers. We use contractual, access, security and vendor-review measures appropriate to the service and applicable law. Destination-country authorities may receive shipment data where customs or import law requires it.',
        ],
      },
      {
        heading: '9. Retention',
        body: [
          'We retain personal data only for as long as reasonably necessary for the purpose for which it was collected and for applicable legal, tax, accounting, warranty, security and dispute periods. Inquiry records that do not become an engagement are periodically reviewed and deleted or anonymized when no longer required. Order, invoice, delivery, refund and contractual records may be retained for the relevant statutory and limitation periods. Security logs are retained for a proportionate period based on risk. When retention ends, data is deleted, anonymized or securely archived with restricted access.',
        ],
      },
      {
        heading: '10. Security',
        body: [
          'We apply administrative, technical and physical safeguards proportionate to the data and risk, including access controls, approved tools, secure transfer methods, backups, logging, vendor review and incident handling. No website, transmission or storage method is completely secure. Do not send secrets or sensitive evidence through an unapproved channel.',
        ],
      },
      {
        heading: '11. Your requests and rights',
        body: [
          'Subject to applicable law, you may ask for information about processing, request access or correction, withdraw consent, request erasure where no retention ground applies, nominate another person where the law provides, or raise a grievance. Email sreejith.s@sixjarsglobal.com with the subject Privacy Request and describe the request. We may verify identity and authority before acting. We will acknowledge the request, explain any lawful limitation and respond within the period required by applicable law.',
        ],
      },
      {
        heading: '12. Children',
        body: [
          'Our general website is not directed to children. A student program involving a child will use age-appropriate information, guardian or institutional authorization where required, limited collection and additional safeguards. A child must not independently submit payment details, credentials or sensitive information through the public website.',
        ],
      },
      {
        heading: '13. Cookies and marketing',
        body: [
          'Essential technologies operate security, forms, carts and saved privacy choices. Optional analytics, functional or marketing technologies remain off until the required choice is recorded. Use Manage cookies to review or change optional choices. Service communications are not marketing. Where required, marketing messages include a direct opt-out method.',
        ],
      },
      {
        heading: '14. Changes and contact',
        body: [
          'We may update this Notice when our services, systems or legal obligations change. The current version and effective date appear at the top of the page. Material changes will be highlighted through an appropriate website or direct notice where required.',
          'Privacy questions and requests: sreejith.s@sixjarsglobal.com. General customer care: hello@sixjarsglobal.com or +91 9632988066. Grievance contact: Sreejith S, Founder, sreejith.s@sixjarsglobal.com, +91 9632988066.',
        ],
      },
    ],
  },

  refunds: {
    title: 'Return, Refund and Cancellation Policy',
    intro:
      'How cancellations, returns, replacements and refunds work for services, physical goods and digital content.',
    ...PACK,
    sections: [
      {
        heading: '1. Scope',
        body: [
          'This Policy applies to services, physical goods and digital content purchased directly from SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global. It forms part of the Terms of Sale. Mandatory rights under applicable consumer law remain unaffected.',
        ],
      },
      {
        heading: '2. Cancelling a service before work starts',
        body: [
          'You may request cancellation before work starts by contacting customer care and identifying the accepted proposal, order or invoice. We will refund the amount paid for the cancelled work, less any non-recoverable third-party cost that was clearly disclosed and specifically committed for your order before cancellation. If the accepted proposal or statement of work gives a more favorable cancellation right, that right applies.',
        ],
      },
      {
        heading: '3. Cancelling a service after work starts',
        body: [
          'After work starts, we will identify completed work, approved milestones, time already incurred and non-cancellable third-party commitments. Any prepaid amount that remains unearned after those items is refundable. We will provide a calculation. A signed proposal, order form or statement of work may define milestone-specific cancellation terms, but it does not remove a right that cannot lawfully be excluded.',
        ],
      },
      {
        heading: '4. Physical-goods return eligibility',
        body: [
          'Contact customer care within 7 calendar days after delivery to request an eligible return. Except for damaged, defective or incorrect items, the item must be unused, complete, in resalable condition and returned with supplied accessories, labels and proof of purchase. Do not send a return until customer care provides return instructions and a return reference.',
        ],
      },
      {
        heading: '5. Items not eligible for change-of-mind return',
        body: [
          'Change-of-mind returns are not available for goods made or personalized to your specification, items expressly identified as non-returnable before purchase, or digital content already accessed, downloaded, licensed or delivered. This exclusion does not apply where the item is defective, incorrectly supplied, materially different from its description or where applicable law requires a remedy.',
        ],
      },
      {
        heading: '6. Damaged, defective, short or incorrect deliveries',
        body: [
          'Report visible damage, shortage or an incorrect item within 48 hours where reasonably possible so that we can preserve packaging and carrier evidence. Include the order number, a description and clear photographs of the item, package and shipping label. A delayed report does not automatically remove a right available under applicable law.',
          'For an approved damaged, defective, short or incorrect delivery, Six Jars Global will provide the lawful remedy and bear reasonable approved return or replacement shipping costs. Do not discard the item or packaging until instructions are provided unless keeping it would be unsafe.',
        ],
      },
      {
        heading: '7. Return shipping, including international returns',
        body: [
          'For an approved change-of-mind return, you bear the return shipping cost and remain responsible for the item until it reaches the instructed return location. Original outbound shipping, customs duty, import tax and brokerage are not refundable for a change-of-mind return except where required by law.',
          'For an international return, contact customer care before dispatch. Use the return description and customs documents we provide. Unauthorized or incorrectly declared international returns may be delayed, refused or charged by customs. For an approved defective, damaged or incorrect item, Six Jars Global will arrange or reimburse the reasonable approved return method. For a change-of-mind return, you bear international return freight and any non-recoverable customs or brokerage cost.',
        ],
      },
      {
        heading: '8. Inspection and refunds',
        body: [
          'We inspect a returned item against the approved reason and condition. If approved, the refund is initiated to the original payment method within 7 business days after approval or receipt of the returned item, whichever is later. Banks, card networks and payment providers may require additional processing time. We will notify you if a lawful deduction applies because a change-of-mind return is incomplete, used or damaged beyond reasonable inspection.',
        ],
      },
      {
        heading: '9. Exchanges and replacements',
        body: [
          'A replacement or exchange depends on stock, serviceability and the approved remedy. If the replacement is unavailable, we will offer a refund or another lawful remedy. A replacement shipped internationally may require updated customs documents and delivery estimates.',
        ],
      },
      {
        heading: '10. Cancellation by Six Jars Global',
        body: [
          'We may cancel an order where payment is not authorized, the item is unavailable, the destination is not serviceable, the order is unlawful or restricted, pricing contains an evident error, required customer information is missing, or a service cannot be performed safely or lawfully. We will explain the cancellation and refund the cancelled amount. Where applicable law requires reciprocal treatment of cancellation charges, we will comply.',
        ],
      },
      {
        heading: '11. How to request a cancellation, return or refund',
        body: [
          'Email hello@sixjarsglobal.com or call +91 9632988066, Monday-Friday, 09:00-18:00 IST, excluding Indian public holidays. Provide the order or invoice number, item or service, reason, requested remedy and supporting evidence. Do not send payment-card details, passwords or confidential evidence. Grievances may be escalated to Sreejith S, Founder, at sreejith.s@sixjarsglobal.com or +91 9632988066.',
        ],
      },
    ],
  },

  shipping: {
    title: 'Shipping and Delivery Policy',
    intro:
      'How services and digital deliverables are delivered, and how physical goods ship within India and internationally.',
    ...PACK,
    sections: [
      {
        heading: '1. Scope',
        body: [
          'This Policy explains delivery of services and shipment of physical goods purchased directly from SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global. Digital deliverables and professional services are not courier shipments unless an accepted proposal expressly includes physical delivery.',
        ],
      },
      {
        heading: '2. Service and digital delivery',
        body: [
          'Service milestones, review dates and delivery methods are stated in the accepted proposal, order form or statement of work. Digital files are delivered through the agreed email, platform or secure channel. A customer dependency, approval delay, scope change or security requirement may change the schedule under the accepted agreement.',
        ],
      },
      {
        heading: '3. India and international shipping',
        body: [
          'We ship eligible physical goods within India and to international destinations that are available at checkout or confirmed in an accepted written quote. Availability depends on postcode serviceability, carrier acceptance, item restrictions, customs requirements and destination law. If a destination cannot be served after an order is placed, we will contact you and cancel or amend the affected shipment with your agreement.',
        ],
      },
      {
        heading: '4. Processing, dispatch and delivery estimates',
        body: [
          'The checkout, product page, order confirmation or accepted quote states the available processing and estimated delivery range. Estimates are not guarantees. They begin after payment authorization and completion of information reasonably required to fulfill the order. Weekends, public holidays, address checks, production lead time, customs inspection and events outside reasonable control may extend the estimate. We will communicate a material known delay and the available options.',
        ],
      },
      {
        heading: '5. Shipping charges, currency, taxes and fees',
        body: [
          'Shipping charges and the order currency are displayed before payment or stated in the accepted quote. Indian taxes are shown as applicable. For international orders, your bank or payment provider may charge currency-conversion or cross-border fees that are not controlled by Six Jars Global.',
        ],
      },
      {
        heading: '6. Customs, duties and importer responsibility',
        body: [
          'Unless checkout or the accepted quote expressly states that duties and taxes are included, the recipient is responsible for import duty, tax, customs assessment, brokerage, clearance charges and information required by the destination authority. The recipient is the importer for the shipment unless a different arrangement is expressly confirmed in writing. Customs may open, inspect, delay, refuse or return a shipment under destination law. We will provide commercially reasonable shipment documents, but we do not control customs decisions or charges.',
        ],
      },
      {
        heading: '7. Address and recipient responsibilities',
        body: [
          'You must provide a complete, accurate and serviceable delivery address, recipient name, phone number and any information required for delivery or customs. Review these details before placing the order and contact us immediately if a correction is needed. A correction may be impossible after dispatch and may cause a carrier fee, delay or return. The recipient must be available to accept delivery and complete lawful customs or identity steps requested by the carrier.',
        ],
      },
      {
        heading: '8. Carrier, tracking and communications',
        body: [
          'We select an appropriate carrier based on the item, destination and purchased service. Tracking is provided when the selected service supports it. Tracking events are supplied by the carrier and may not update continuously. Delivery questions should be sent to customer care with the order number; do not publish personal shipment details in a public channel.',
        ],
      },
      {
        heading: '9. Partial shipments',
        body: [
          'We may divide an order into more than one shipment where items have different lead times, locations or carrier restrictions. The order confirmation or dispatch message will identify the affected items. You will not be charged an additional shipping amount solely because we divide an order unless you approve a changed service.',
        ],
      },
      {
        heading: '10. Delivery, risk and title',
        body: [
          'Delivery occurs when the shipment is delivered to you, an authorized recipient or the delivery location you instructed, subject to applicable law. Risk passes only on that delivery to the extent permitted by law. Title to goods passes after full payment, subject to any mandatory consumer right.',
        ],
      },
      {
        heading: '11. Failed delivery, refusal and return to sender',
        body: [
          "A carrier may make more than one delivery attempt or hold a shipment for collection. If delivery fails because the address or recipient information is incomplete, the recipient is unavailable, customs information or charges are not completed, or the shipment is refused without a valid defect claim, the carrier may return it. We will contact you about redelivery or refund options. Reasonable additional freight, customs and return-to-sender charges may be deducted or collected where the failure was not caused by Six Jars Global and where law permits.",
        ],
      },
      {
        heading: '12. Delay, loss, damage and shortage',
        body: [
          "If tracking shows an unexplained delay, contact customer care. We will open a carrier trace where appropriate and provide the next update. A shipment is treated as lost only after the carrier's investigation or the applicable delivery period establishes loss. Report visible damage, shortage or an incorrect item within 48 hours where reasonably possible and preserve the item, packaging and label. A delayed report does not automatically remove a statutory right. Approved remedies follow the Return, Refund and Cancellation Policy.",
        ],
      },
      {
        heading: '13. Restricted items and destinations',
        body: [
          'We do not ship an item where the carrier, export rule, sanctions control, customs rule or destination law prohibits or materially restricts it. We may request information reasonably required for export, import, end use or recipient screening. An order may be cancelled if lawful shipment cannot be completed.',
        ],
      },
      {
        heading: '14. Contact',
        body: [
          'Shipping support: hello@sixjarsglobal.com or +91 9632988066, Monday-Friday, 09:00-18:00 IST, excluding Indian public holidays. Provide the order number, recipient name and issue. Do not send full payment-card details, passwords or confidential evidence. Grievances may be escalated to Sreejith S, Founder, at sreejith.s@sixjarsglobal.com or +91 9632988066.',
        ],
      },
    ],
  },

  'terms-of-sale': {
    title: 'Terms of Sale',
    intro:
      'The terms that apply to goods, digital content, learning programs and services purchased directly from Six Jars Global.',
    ...PACK,
    sections: [
      {
        heading: '1. Seller and application',
        body: [
          'These Terms of Sale apply to goods, digital content and services purchased directly from SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global. CIN: U62020KA2026OPC223063. GSTIN: 29ABUCS1730R1ZC. Registered address: Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India.',
          'By placing an order, accepting a proposal or signing an order form, you agree to these Terms and the linked Privacy Notice, Return, Refund and Cancellation Policy, Shipping and Delivery Policy and Customer Support and Grievance Redressal page. Mandatory consumer rights remain unaffected.',
        ],
      },
      {
        heading: '2. Product, service and price information',
        body: [
          'We aim to describe goods, digital content, programs and services accurately. Images may illustrate presentation and may not reproduce every screen or color exactly. The payable amount, currency, taxes, shipping and other mandatory charges are displayed before payment or stated in the accepted quote. We may correct an evident description or pricing error before order acceptance and will give you the option to proceed on the corrected basis or cancel.',
        ],
      },
      {
        heading: '3. Ordering and affirmative consent',
        body: [
          'You must review the selected item or service, quantity, delivery or performance estimate, total amount and linked policies before placing the order. The purchase requires an explicit action. Optional products, donations, services, subscriptions, marketing choices and charges remain unselected unless you choose them.',
        ],
      },
      {
        heading: '4. Order acceptance',
        body: [
          'An automated receipt confirms that we received a request; it does not by itself accept the order. A physical-goods order is accepted when we send an express acceptance or dispatch confirmation. A service order is accepted when the proposal, order form or statement of work is signed or otherwise accepted as stated in that document. We may decline or cancel an order for a lawful reason and will refund any cancelled amount.',
        ],
      },
      {
        heading: '5. Payment and invoices',
        body: [
          'Payment must be made through an offered method and is subject to authorization. You confirm that you are authorized to use the selected method and that billing information is accurate. We may pause performance or dispatch while a payment is overdue or reversed. Tax invoices and credit notes are issued as required by applicable law. Do not send payment-card credentials through email or chat.',
        ],
      },
      {
        heading: '6. Services and learning programs',
        body: [
          'The accepted proposal, order form or statement of work defines scope, deliverables, milestones, dependencies, review periods, fees and acceptance criteria. You must provide lawful instructions, timely access, accurate materials and authorized approvals. A scope change, delayed dependency or new risk may require a written change to price or schedule. Cybersecurity and digital-forensics work begins only after written authorization, scope and secure evidence-handling arrangements.',
        ],
      },
      {
        heading: '7. Physical goods',
        body: [
          'Availability may change before acceptance. Ownership, delivery, risk, tracking, delay, loss and damage are governed by these Terms and the Shipping and Delivery Policy. Returns, refunds, replacements and cancellations are governed by the Return, Refund and Cancellation Policy and applicable law.',
        ],
      },
      {
        heading: '8. Digital content',
        body: [
          'Digital content is supplied through the stated delivery method and licensed for the use described at purchase or in the accepted agreement. Unless expressly stated, intellectual-property ownership does not transfer. A digital item already accessed, downloaded or licensed is not eligible for a change-of-mind refund, except where it is defective, materially misdescribed or law requires a remedy.',
        ],
      },
      {
        heading: '9. International orders',
        body: [
          'International physical-goods orders are accepted only for destinations available at checkout or confirmed in writing. Unless duties and taxes are expressly included, the recipient is responsible for import clearance, duty, tax and brokerage. Currency-conversion and cross-border bank fees may apply. Delivery remains subject to carrier, export, customs, sanctions and destination restrictions.',
        ],
      },
      {
        heading: '10. Cancellation, return, refund and delivery',
        body: [
          'The current Return, Refund and Cancellation Policy and Shipping and Delivery Policy form part of these Terms. Where applicable e-commerce law requires reciprocal treatment of cancellation charges, we will apply it. A delay or failed shipment will be handled under the stated process and mandatory consumer remedies.',
        ],
      },
      {
        heading: '11. Customer responsibilities',
        body: [
          'You must provide accurate contact, billing, tax, delivery and project information; use goods, content and services lawfully; maintain appropriate backups and security; obtain necessary rights and permissions for materials you supply; and avoid submitting credentials or sensitive evidence through public channels. You are responsible for decisions made from outputs unless an accepted agreement expressly assigns a decision to Six Jars Global.',
        ],
      },
      {
        heading: '12. Intellectual property',
        body: [
          "Six Jars Global and its licensors retain rights in pre-existing methods, templates, tools, website content, branding and know-how. Rights in customer-specific deliverables are governed by the accepted proposal or statement of work. You confirm that materials supplied by you may lawfully be used for the agreed purpose. Neither party may use the other's name, logo or confidential material outside the agreed scope without permission or lawful authority.",
        ],
      },
      {
        heading: '13. Warranties and remedies',
        body: [
          'We will provide accepted services with reasonable care and skill and supply goods and digital content in accordance with the accepted description and applicable law. Except for express commitments and rights that cannot be excluded, no additional warranty is implied. If an accepted deliverable does not meet the agreed criteria, notify us promptly and allow a reasonable opportunity to correct it before seeking another contractual remedy.',
        ],
      },
      {
        heading: '14. Liability',
        body: [
          "Nothing in these Terms excludes liability for fraud, wilful misconduct, death or personal injury caused by negligence, breach of confidentiality, infringement for which liability is expressly assumed, or any consumer or statutory liability that cannot be excluded. To the extent permitted by law, neither party is liable for indirect or consequential loss that was not reasonably foreseeable at acceptance. Six Jars Global's aggregate liability for an affected order is limited to the amount paid for that order, except where an accepted agreement states a higher limit or law prohibits the limitation.",
        ],
      },
      {
        heading: '15. Events outside reasonable control',
        body: [
          'A party is not responsible for delay caused by an event outside its reasonable control if it promptly communicates the effect and uses reasonable efforts to reduce delay. Payment obligations already due and rights that cannot lawfully be suspended remain unaffected. If the event materially prevents performance for an extended period, the parties will agree revised performance or cancellation and refund of any unearned prepaid amount.',
        ],
      },
      {
        heading: '16. Complaints, governing law and jurisdiction',
        body: [
          'Contact hello@sixjarsglobal.com or +91 9632988066 for support. Grievances may be escalated to Sreejith S, Founder, at sreejith.s@sixjarsglobal.com or +91 9632988066. These Terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction, subject to any mandatory consumer forum, local jurisdiction or other right that applicable law preserves.',
        ],
      },
    ],
  },

  terms: {
    title: 'Website Terms of Use',
    intro:
      'The terms that govern access to and use of the Six Jars Global website, its public content and inquiry forms.',
    ...PACK,
    sections: [
      {
        heading: '1. Operator and scope',
        body: [
          'This website is operated by SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global, from Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India. These Terms govern access to and use of the website, public content, inquiry forms and related features.',
        ],
      },
      {
        heading: '2. Acceptance',
        body: [
          'By using the website, you agree to these Terms and the Privacy Notice. Purchase terms apply separately when you order goods, digital content or services. If you do not agree, do not use the website.',
        ],
      },
      {
        heading: '3. Information and engagement boundary',
        body: [
          'Website information is general and may not address your specific circumstances. It does not create a client engagement, professional duty, emergency-response obligation or forensic authorization. Services begin only under an accepted proposal, order or written agreement. Do not rely on website content as legal, tax, medical, financial or incident-response advice.',
        ],
      },
      {
        heading: '4. Permitted use',
        body: [
          'You may view, print and share public pages for lawful personal or internal business use, provided you retain notices and do not misrepresent the source. Any additional licence stated with a download or purchased item controls that material.',
        ],
      },
      {
        heading: '5. Prohibited use',
        body: [
          {
            list: [
              'Break the law, infringe rights, impersonate another person or submit false or harmful information.',
              "Attempt unauthorized access, probe security, introduce malware, bypass controls, overload the service or interfere with another user's access.",
              'Use automated extraction in a way that violates law, access controls or our rights, or that materially disrupts the website.',
              'Upload passwords, payment-card details, confidential evidence, unlawful content or sensitive records through a public form.',
              'Use the Six Jars Global name, logo or content to imply endorsement, partnership or authorization without written permission.',
            ],
          },
        ],
      },
      {
        heading: '6. Accounts, forms and submissions',
        body: [
          'Where an account or form is available, you must provide accurate information and protect access credentials. You retain ownership of material you submit. You grant us a limited right to use it only to respond, deliver the requested function, secure the service, meet law and maintain necessary records. Do not submit material unless you have authority to do so.',
        ],
      },
      {
        heading: '7. Intellectual property',
        body: [
          'The website, brand, layout, text, graphics, software, methods and other content are owned by Six Jars Global or its licensors unless stated otherwise. No right is granted except the limited use in these Terms or a separate written licence. Statutory exceptions remain unaffected.',
        ],
      },
      {
        heading: '8. Third-party services and links',
        body: [
          'The website may link to or use third-party payment, map, communication, learning, social, shipping or other services. Their terms and privacy practices apply to their service. A link does not by itself mean endorsement, and we are not responsible for third-party content or availability except to the extent law or an accepted agreement provides otherwise.',
        ],
      },
      {
        heading: '9. Availability and changes',
        body: [
          'We may maintain, secure, change or discontinue website features. We do not guarantee uninterrupted or error-free availability. We may correct content errors and will not retroactively change an accepted order except as permitted by the Terms of Sale and applicable law.',
        ],
      },
      {
        heading: '10. Privacy, cookies and security',
        body: [
          'Personal-data handling is described in the Privacy Notice. Website technologies and optional choices are described in the Cookie Notice. If you identify a security issue, send a minimal description to sreejith.s@sixjarsglobal.com and wait for a secure channel; do not access, alter or disclose data beyond what is necessary to report the issue.',
        ],
      },
      {
        heading: '11. Liability',
        body: [
          'Nothing in these Terms excludes liability or rights that cannot lawfully be excluded. To the extent permitted by law, Six Jars Global is not liable for an indirect loss caused solely by reliance on general website information, a third-party site or unauthorized use. Any liability connected with a purchase is governed by the Terms of Sale or accepted agreement.',
        ],
      },
      {
        heading: '12. Suspension',
        body: [
          'We may restrict access where reasonably necessary to protect the website, users, data, rights or legal compliance. We will use proportionate measures and will not remove an accrued purchase or consumer right.',
        ],
      },
      {
        heading: '13. Changes, law and contact',
        body: [
          'We may update these Terms prospectively. The current effective date and version appear at the top. These Terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction, subject to mandatory consumer or local rights.',
          'Contact: hello@sixjarsglobal.com or +91 9632988066, Monday-Friday, 09:00-18:00 IST, excluding Indian public holidays. Grievance contact: Sreejith S, Founder, sreejith.s@sixjarsglobal.com, +91 9632988066.',
        ],
      },
    ],
  },

  cookies: {
    title: 'Cookie Notice',
    intro:
      'How Six Jars Global uses cookies and similar website technologies, and how you can control optional choices.',
    ...PACK,
    sections: [
      {
        heading: '1. Scope',
        body: [
          'This Cookie Notice explains how SIX JARS GLOBAL (OPC) PRIVATE LIMITED, trading as Six Jars Global, uses cookies and similar website technologies and how you can control optional choices. It should be read with the Privacy Notice.',
        ],
      },
      {
        heading: '2. What these technologies are',
        body: [
          'Cookies are small data files stored by a browser. Similar technologies include local storage, tags, pixels and software-development tools that perform related functions. Some are set by Six Jars Global and some may be set by a service provider used for an enabled feature.',
        ],
      },
      {
        heading: '3. Essential technologies',
        body: [
          'Essential technologies operate website security, load balancing, form protection, shopping carts, checkout continuity, session management and saved privacy choices. They are used only to provide or protect a function you request and cannot be switched off through the optional-choice panel. Blocking them in the browser may cause a feature to fail.',
        ],
      },
      {
        heading: '4. Optional categories',
        body: [
          {
            list: [
              'Analytics: helps measure page use and performance so we can improve the website.',
              'Functional: remembers optional preferences or enables an enhanced third-party feature.',
              'Marketing: measures campaigns or supports advertising where such technology is actually deployed.',
            ],
          },
          'An optional category remains off until the required choice is recorded. Six Jars Global does not treat silence, continued browsing or a pre-ticked box as consent where affirmative consent is required.',
        ],
      },
      {
        heading: '5. Your choices',
        body: [
          'The banner provides Accept optional, Reject optional and Manage choices with comparable prominence. Manage cookies remains available from the footer. You may change or withdraw an optional choice at any time. Withdrawal prevents future optional use from that browser after the setting is applied; it does not reverse processing already completed lawfully.',
        ],
      },
      {
        heading: '6. Current technology details',
        body: [
          'The live Manage cookies panel is the authoritative current register of each technology offered on this website. It identifies the name, provider, purpose, category, first- or third-party status and duration. Optional technologies must not load before the required choice. We review the register after changes to the website, tag manager or provider configuration.',
        ],
      },
      {
        heading: '7. Browser and device controls',
        body: [
          'You may also delete or block cookies through browser or device settings. Those controls may not communicate a category choice to every service and may remove the saved Six Jars Global preference, causing the banner to appear again. Essential site functions may not work if all storage is blocked.',
        ],
      },
      {
        heading: '8. Changes and contact',
        body: [
          'We may update this Notice when technologies, providers or legal requirements change. The effective date and version appear at the top. Questions about website technologies or personal data may be sent to sreejith.s@sixjarsglobal.com. General customer care is available at hello@sixjarsglobal.com or +91 9632988066.',
        ],
      },
    ],
  },

  support: {
    title: 'Customer Support and Grievance Redressal',
    intro:
      'How to reach customer care, what it handles, and how to escalate an unresolved complaint to the grievance officer.',
    ...PACK,
    sections: [
      {
        heading: '1. Customer-care channels',
        body: [
          'Email: hello@sixjarsglobal.com. Phone: +91 9632988066. Hours: Monday-Friday, 09:00-18:00 IST, excluding Indian public holidays. Messages received outside these hours are logged for the next operating period. An available website chat or messaging control will display its staffed or offline state.',
        ],
      },
      {
        heading: '2. What customer care handles',
        body: [
          {
            list: [
              'Product, service, program and pre-order questions.',
              'Order status, shipping, customs-document and delivery questions.',
              'Cancellation, return, replacement, exchange and refund requests.',
              'Billing, invoice and payment-status questions.',
              'Website accessibility, account, privacy-choice and technical issues.',
              'Service-quality complaints and escalation of unresolved matters.',
            ],
          },
        ],
      },
      {
        heading: '3. Information to provide',
        body: [
          'Provide your name, preferred contact, order or invoice number where applicable, the affected item or service, a clear description, the requested resolution and relevant photographs or documents. Send only what is necessary. We may request identity or authority verification before disclosing order or personal information.',
        ],
      },
      {
        heading: '4. Sensitive and prohibited information',
        body: [
          'Do not send passwords, one-time codes, full payment-card details, health records, government identifiers, confidential evidence or malware samples through ordinary email, chat or a public form. For a cybersecurity, privacy or digital-forensics matter, provide only a minimal description and wait for written secure-channel instructions and an authorized scope.',
        ],
      },
      {
        heading: '5. Ticket and updates',
        body: [
          'We will create or record a complaint reference when a matter requires follow-up. Keep that reference in later messages. The assigned owner will provide the next action or update point. Resolution time depends on the issue, evidence, carrier, payment provider, customs authority, vendor or legal requirement involved.',
        ],
      },
      {
        heading: '6. E-commerce complaint timing',
        body: [
          'Where the Consumer Protection (E-Commerce) Rules, 2020 apply, the grievance officer will acknowledge the complaint within 48 hours after receipt and redress it within one month after receipt. An acknowledgment is not a decision on the merits. If an external investigation or information from you is required, we will identify the dependency and continue to provide accountable updates.',
        ],
      },
      {
        heading: '7. Grievance escalation',
        body: [
          'Grievance contact: Sreejith S, Founder. Email: sreejith.s@sixjarsglobal.com. Phone: +91 9632988066. Include the earlier support reference, issue summary, material dates, prior response and requested resolution. The grievance route is for unresolved complaints and regulated escalation; it is not a marketing contact.',
        ],
      },
      {
        heading: '8. Privacy requests',
        body: [
          'For access, correction, consent withdrawal, erasure or another personal-data request, email sreejith.s@sixjarsglobal.com with the subject Privacy Request. We may verify identity and will respond under applicable law and the Privacy Notice.',
        ],
      },
      {
        heading: '9. International orders',
        body: [
          'Support hours are stated in India Standard Time. International carriers, customs authorities, banks and local holidays may affect investigation time. Provide the carrier tracking number and customs notice where relevant, but redact unrelated personal information. Duties, import taxes and recipient responsibilities are explained in the Shipping and Delivery Policy.',
        ],
      },
      {
        heading: '10. Accessibility and conduct',
        body: [
          'Tell us if you need a reasonable alternative format or contact method. We will not refuse a complaint solely because it is written in plain language or submitted through an accessible route. We may limit abusive, threatening, unlawful or repetitive contact while preserving a lawful complaint channel.',
        ],
      },
      {
        heading: '11. Records and contact',
        body: [
          'We retain complaint records for resolution, quality, legal, accounting, security and audit purposes under the Privacy Notice. Customer care: hello@sixjarsglobal.com or +91 9632988066. Registered address: Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu, Bengaluru, Karnataka 560043, India.',
        ],
      },
    ],
  },

  confidentiality: {
    title: 'Confidentiality policy',
    intro:
      'How Six Jars Global handles institutional context, sensitive content, personal data and digital evidence.',
    underReview: true,
    sections: [
      {
        heading: 'Default posture',
        body: [
          'We treat everything you share as confidential by default, whether or not a separate agreement is in place. Discretion is one of our stated brand values, not a contractual afterthought.',
        ],
      },
      {
        heading: 'Access discipline',
        body: [
          'Access to your material is limited to the people assigned to your engagement. An access register names them, and it is available to you on request.',
        ],
      },
      {
        heading: 'Evidence handling',
        body: [
          'Forensic work proceeds only under documented authorisation stating what is covered, what is excluded and when the authorisation expires.',
          'Every artefact is logged under chain of custody from acquisition through to release.',
        ],
      },
      {
        heading: 'Sub-processors and referrals',
        body: [
          'Where a specialist practice is engaged, we tell you before anything is shared, and the same confidentiality terms flow through in writing.',
        ],
      },
    ],
  },
}

/** Footer / sitemap order. */
export const legalOrder = [
  'privacy',
  'terms',
  'terms-of-sale',
  'refunds',
  'shipping',
  'cookies',
  'support',
  'confidentiality',
] as const
