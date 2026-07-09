window.AGENT_DECK = {
  brand: {
    aionos: 'AIONOS',
    partner: 'Kyndryl',
    theme: 'AI-powered manufacturing outcomes',
    subtitle: 'Governed, human-in-the-loop agents for Kyndryl manufacturing clients'
  },
  agents: [
    {
      id: 'production-planning',
      file: 'agent-production-planning.html',
      name: 'Production Planning Twin',
      short: 'Production Twin',
      category: 'Factory',
      tagline: 'Protect output commitments under demand, material and capacity volatility.',
      mode: 'Scenario scheduling',
      confidence: 91,
      automation: 63,
      risk: 31,
      impact: '↑ 5–15% plan adherence',
      signal: 'Line 3 capacity constraint detected',
      actsOn: ['Demand swings','Material shortage','Machine capacity','Labour gaps','Late changeovers','Urgent orders','Planning exceptions'],
      how: 'ERP + MES + WMS + supplier status + machine capacity + historical cycle times → scenario simulation → best plan options.',
      action: 'Recommend sequence, line loading, overtime, substitutions, expedited supply and customer promise revisions.',
      kpis: [
        {label:'Plan adherence', value:84, unit:'%', target:'↑ 5–15%'},
        {label:'Changeover waste', value:18, unit:'%', target:'↓ 10–20%'},
        {label:'Expedite cost', value:23, unit:'%', target:'↓ 15–25%'},
        {label:'On-time output', value:89, unit:'%', target:'↑ 10–20%'}
      ],
      buttons: [
        {label:'Run line-loading simulation', scenario:'simulate'},
        {label:'Inject material shortage', scenario:'shock'},
        {label:'Approve revised plan', scenario:'approve'},
        {label:'Explain customer promise risk', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent evaluates 2,380 feasible schedules and recommends moving SKU-B17 ahead of SKU-D04 to protect the export cut-off.',
        shock: 'Material shortage on Supplier S-104 increases risk. The agent proposes substitution, alternate line loading and an expedited order path.',
        approve: 'Approved plan revision pushed to supervisor queue. Expected expedite cost reduces and on-time output rises for next 6-hour window.',
        explain: 'Decision trace: demand priority + material availability + cycle-time variance + machine capacity + labour constraint.'
      }
    },
    {
      id: 'quality-vision',
      file: 'agent-quality-vision.html',
      name: 'Quality Vision Agent',
      short: 'Quality Vision',
      category: 'Factory',
      tagline: 'Detect defects earlier and stop quality escapes before they reach customers.',
      mode: 'Continuous visual QA',
      confidence: 94,
      automation: 71,
      risk: 26,
      impact: '↓ 15–25% rework / scrap',
      signal: 'Surface anomaly clustering near Station 4',
      actsOn: ['Defects','Wrong SKU','Label mismatch','Packaging issue','Surface anomaly','Line drift','Batch deviation','Inspection backlog'],
      how: 'CCTV / machine vision + MES + inspection rules + batch context + SOP library → visual anomaly detection → CAPA trigger.',
      action: 'Block suspect lots, alert supervisors, recommend rework, trigger root-cause workflow and update quality history.',
      kpis: [
        {label:'Rework / scrap', value:14, unit:'%', target:'↓ 15–25%'},
        {label:'Quality escapes', value:9, unit:'%', target:'↓ 20–40%'},
        {label:'Inspection coverage', value:96, unit:'%', target:'↑ 30–50%'},
        {label:'Claims effort', value:21, unit:'%', target:'↓ 15–30%'}
      ],
      buttons: [
        {label:'Start visual inspection sweep', scenario:'simulate'},
        {label:'Simulate defect spike', scenario:'shock'},
        {label:'Approve lot hold + CAPA', scenario:'approve'},
        {label:'Explain defect root cause', scenario:'explain'}
      ],
      views: {
        simulate: 'Vision sweep checks 12,000 frames and marks 48 suspect units for supervisor review before packing.',
        shock: 'Defect rate jumps above control limit. Agent isolates Station 4, Batch C-221 and one tool-change event as likely drivers.',
        approve: 'Lot hold created. CAPA workflow opened with rework instruction and customer release risk prevented.',
        explain: 'Decision trace: camera anomaly + MES batch context + inspection thresholds + historical CAPA similarity.'
      }
    },
    {
      id: 'machine-health',
      file: 'agent-machine-health.html',
      name: 'Machine Health + Maintenance Agent',
      short: 'Machine Health',
      category: 'Factory',
      tagline: 'Predict failures early to protect throughput, safety and asset availability.',
      mode: 'Predictive reliability',
      confidence: 89,
      automation: 58,
      risk: 37,
      impact: '↓ 20–35% unplanned downtime',
      signal: 'Bearing temperature drift on Press P-08',
      actsOn: ['Vibration','Current draw','Temperature','PLC alarms','OEE drift','Changeover stress','Spare-stock risk','MTTR delays'],
      how: 'IoT + SCADA + CMMS + maintenance logs + spares + production plan → failure probability → best intervention timing.',
      action: 'Create work orders, reserve spares, recommend equipment swap, adjust production plan and escalate safety risk.',
      kpis: [
        {label:'Unplanned downtime', value:17, unit:'%', target:'↓ 20–35%'},
        {label:'OEE', value:82, unit:'%', target:'↑ 5–15%'},
        {label:'Maintenance cost', value:24, unit:'%', target:'↓ 10–25%'},
        {label:'MTTR', value:37, unit:'min', target:'↓ 20–40%'}
      ],
      buttons: [
        {label:'Predict failure window', scenario:'simulate'},
        {label:'Simulate alarm cascade', scenario:'shock'},
        {label:'Approve work order', scenario:'approve'},
        {label:'Explain failure probability', scenario:'explain'}
      ],
      views: {
        simulate: 'Failure probability reaches 72% within 18 hours. Best intervention window is 02:00–03:20 with minimal throughput impact.',
        shock: 'Alarm cascade detected across vibration and current draw. Agent recommends equipment swap before planned high-volume run.',
        approve: 'Work order created, spare reserved and production twin notified to protect schedule adherence.',
        explain: 'Decision trace: vibration drift + temperature slope + historical failure pattern + spare availability + production impact.'
      }
    },
    {
      id: 'operator-assist',
      file: 'agent-operator-assist.html',
      name: 'Operator Assist + SOP Copilot',
      short: 'Operator Assist',
      category: 'Factory',
      tagline: 'Reduce training burden, errors and handover loss across shifts.',
      mode: 'Guided work intelligence',
      confidence: 92,
      automation: 54,
      risk: 22,
      impact: '↑ 10–20% labour productivity',
      signal: 'Shift handover gap detected for Line 2',
      actsOn: ['New operators','Shift handovers','SOP exceptions','Maintenance steps','Safety checks','Quality procedures','Escalation delays'],
      how: 'SOPs + training content + machine context + incident history + plant knowledge base → guided work instructions + next-best action.',
      action: 'Answer operator questions, generate handover summaries, surface SOP, route escalations and capture lessons learned.',
      kpis: [
        {label:'Labour productivity', value:76, unit:'%', target:'↑ 10–20%'},
        {label:'Training time', value:28, unit:'hrs', target:'↓ 20–30%'},
        {label:'Operator errors', value:11, unit:'%', target:'↓ 15–25%'},
        {label:'Handover quality', value:88, unit:'%', target:'↑ 20–40%'}
      ],
      buttons: [
        {label:'Generate shift handover', scenario:'simulate'},
        {label:'Simulate new operator query', scenario:'shock'},
        {label:'Approve SOP guidance', scenario:'approve'},
        {label:'Explain recommendation path', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent creates handover summary: pending lot, open quality check, safety notice and next 3 supervisor decisions.',
        shock: 'New operator asks for recovery steps after line stop. Agent pulls the approved SOP and highlights a safety checkpoint.',
        approve: 'Supervisor-approved SOP guidance is captured as a reusable lesson for similar future events.',
        explain: 'Decision trace: machine state + operator role + approved SOP version + incident similarity + safety guardrails.'
      }
    },
    {
      id: 'energy-esg',
      file: 'agent-energy-esg.html',
      name: 'Energy + ESG Agent',
      short: 'Energy + ESG',
      category: 'Factory',
      tagline: 'Turn energy and carbon into operating decisions, not monthly reports.',
      mode: 'Energy-aware scheduling',
      confidence: 87,
      automation: 52,
      risk: 34,
      impact: '↓ 5–15% energy cost',
      signal: 'Peak tariff exposure in next 42 minutes',
      actsOn: ['Peak demand','Machine energy anomalies','Compressor load','HVAC load','Shift schedule','Production mix','Emission factors'],
      how: 'Meters + machine cycles + weather + tariff + production plan + carbon factors → load forecast + optimisation recommendations.',
      action: 'Shift loads, recommend peak avoidance, flag abnormal consumption, generate ESG evidence and trigger maintenance actions.',
      kpis: [
        {label:'Energy cost', value:19, unit:'%', target:'↓ 5–15%'},
        {label:'Carbon intensity', value:31, unit:'%', target:'↓ 10–25%'},
        {label:'Reporting speed', value:91, unit:'%', target:'↑ 50%+'},
        {label:'Peak load risk', value:29, unit:'%', target:'↓ 15–30%'}
      ],
      buttons: [
        {label:'Run peak-load optimizer', scenario:'simulate'},
        {label:'Simulate energy anomaly', scenario:'shock'},
        {label:'Approve load shift', scenario:'approve'},
        {label:'Explain ESG evidence', scenario:'explain'}
      ],
      views: {
        simulate: 'Load optimizer recommends delaying non-critical compressor cycle by 25 minutes and shifting HVAC setpoint by 1.5°C.',
        shock: 'Energy anomaly detected on Machine M-11. Agent correlates abnormal draw with bearing friction and opens maintenance suggestion.',
        approve: 'Approved load shift reduces peak load risk and records evidence for ESG reporting.',
        explain: 'Decision trace: meter readings + tariff window + weather + production plan + carbon factor + machine operating profile.'
      }
    },
    {
      id: 'inventory-warehouse',
      file: 'agent-inventory-warehouse.html',
      name: 'Inventory + Warehouse Agent',
      short: 'Warehouse Agent',
      category: 'Warehouse',
      tagline: 'Increase availability while reducing excess inventory and manual exceptions.',
      mode: 'Exception-led warehouse control',
      confidence: 90,
      automation: 67,
      risk: 28,
      impact: '↓ 10–20% inventory buffers',
      signal: 'Stock-out risk for component C-771',
      actsOn: ['Stock-outs','Slow-moving inventory','Scan gaps','Wrong bin','Picking errors','Returns','Shelf-life risk','Dispatch congestion'],
      how: 'ERP + WMS + barcode/RFID + order book + production plan + demand forecast → inventory risk model → replenishment and slotting.',
      action: 'Recommend replenishment, re-slot items, sequence picks, create exception tasks and alert service-risk owners.',
      kpis: [
        {label:'Inventory buffers', value:22, unit:'%', target:'↓ 10–20%'},
        {label:'Pick productivity', value:81, unit:'%', target:'↑ 10–25%'},
        {label:'Stock-out risk', value:17, unit:'%', target:'↓ 15–30%'},
        {label:'OTIF', value:86, unit:'%', target:'↑ 10–20%'}
      ],
      buttons: [
        {label:'Run replenishment check', scenario:'simulate'},
        {label:'Simulate scan gap', scenario:'shock'},
        {label:'Approve re-slotting', scenario:'approve'},
        {label:'Explain service-risk alert', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent recommends replenishment for 6 components and re-slots 3 high-velocity SKUs closer to dispatch.',
        shock: 'RFID scan gap creates inventory trust issue. Agent flags affected bins and asks for cycle count before dispatch release.',
        approve: 'Re-slotting task approved. Pick sequence updated and service-risk owner notified.',
        explain: 'Decision trace: WMS position + RFID confidence + demand forecast + production priority + dispatch due time.'
      }
    },
    {
      id: 'fleet-dispatch',
      file: 'agent-fleet-dispatch.html',
      name: 'Fleet Routing + Dispatch Orchestrator',
      short: 'Fleet Routing',
      category: 'Supply Chain',
      tagline: 'Protect delivery SLAs while reducing fuel, detention and route waste.',
      mode: 'Corridor-level orchestration',
      confidence: 88,
      automation: 69,
      risk: 33,
      impact: '↑ 20–40% ETA accuracy',
      signal: 'ETA drift on north distribution lane',
      actsOn: ['Fuel cost','Late trucks','Route deviations','Vehicle health','Gate delays','Trip exceptions','POD gaps','Customer ETA escalations'],
      how: 'TMS + GPS + WMS dispatch + orders + traffic + fuel + carrier rates → route and load optimisation → exception predictions.',
      action: 'Re-sequence loads, assign carrier, recommend route, alert customers, trigger contingency and capture POD evidence.',
      kpis: [
        {label:'Fuel / km', value:12, unit:'%', target:'↓ 5–12%'},
        {label:'On-time dispatch', value:87, unit:'%', target:'↑ 10–20%'},
        {label:'Detention / expedite', value:26, unit:'%', target:'↓ 15–30%'},
        {label:'ETA accuracy', value:84, unit:'%', target:'↑ 20–40%'}
      ],
      buttons: [
        {label:'Optimize routes now', scenario:'simulate'},
        {label:'Simulate gate delay', scenario:'shock'},
        {label:'Approve contingency dispatch', scenario:'approve'},
        {label:'Explain route choice', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent resequences 9 deliveries and assigns one alternate carrier to protect SLA for priority customers.',
        shock: 'Gate delay adds 78 minutes to Lane N. Agent proposes pre-gate hold, route swap and customer ETA notification.',
        approve: 'Contingency dispatch approved. POD integrity task added and ETA notification sent to CX queue.',
        explain: 'Decision trace: GPS + traffic + TMS carrier cost + WMS load priority + customer SLA + fuel model.'
      }
    },
    {
      id: 'p2p-document-ai',
      file: 'agent-p2p-document-ai.html',
      name: 'Procure-to-Pay + Document AI Agent',
      short: 'P2P Document AI',
      category: 'Supply Chain',
      tagline: 'Compress procurement cycles and reduce invoice, GRN and claims leakage.',
      mode: 'Exception-led process automation',
      confidence: 93,
      automation: 78,
      risk: 24,
      impact: '↓ 30–50% cycle time',
      signal: 'Invoice mismatch detected: PO-8831',
      actsOn: ['PO mismatch','GRN gap','Invoice dispute','Contract term mismatch','Missing documents','Duplicate payments','Approval delays'],
      how: 'Email/PDF/OCR + ERP + contracts + GRN + vendor master + approval matrix → document intelligence → exception classification.',
      action: 'Validate fields, route approval, request missing documents, flag disputes and create auditable evidence packs.',
      kpis: [
        {label:'Cycle time', value:31, unit:'hrs', target:'↓ 30–50%'},
        {label:'Invoice exceptions', value:18, unit:'%', target:'↓ 20–40%'},
        {label:'Leakage risk', value:13, unit:'%', target:'↓ 10–25%'},
        {label:'Audit readiness', value:92, unit:'%', target:'↑ 50%+'}
      ],
      buttons: [
        {label:'Scan document queue', scenario:'simulate'},
        {label:'Simulate GRN mismatch', scenario:'shock'},
        {label:'Approve exception route', scenario:'approve'},
        {label:'Explain invoice decision', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent scans 126 documents, auto-matches 94 and routes 11 high-risk exceptions with evidence packs.',
        shock: 'GRN mismatch found between receipt quantity and invoice amount. Agent holds payment and requests missing receiving evidence.',
        approve: 'Exception route approved to procurement owner with contract term and GRN evidence attached.',
        explain: 'Decision trace: OCR fields + PO terms + GRN quantity + vendor master + approval matrix + duplicate check.'
      }
    },
    {
      id: 'supplier-risk',
      file: 'agent-supplier-risk.html',
      name: 'Supplier Risk + Sourcing Agent',
      short: 'Supplier Risk',
      category: 'Supply Chain',
      tagline: 'Improve supply assurance and cost by predicting supplier and material risk.',
      mode: 'Predictive supply assurance',
      confidence: 86,
      automation: 51,
      risk: 42,
      impact: '↓ 10–20% stock-out risk',
      signal: 'Single-source supplier risk rising',
      actsOn: ['Supplier delays','Price changes','Quality failures','Geopolitical/logistics risk','Single-source dependency','Contract leakage'],
      how: 'ERP + supplier scorecards + market data + quality incidents + logistics events + contracts → risk scoring + sourcing scenarios.',
      action: 'Recommend alternate supplier, inventory hedge, expedited order, re-negotiation action and risk escalation.',
      kpis: [
        {label:'Stock-out risk', value:24, unit:'%', target:'↓ 10–20%'},
        {label:'Procurement cost', value:15, unit:'%', target:'↓ 5–15%'},
        {label:'Supplier visibility', value:74, unit:'%', target:'↑ 20–40%'},
        {label:'Expedite spend', value:29, unit:'%', target:'↓ 15–30%'}
      ],
      buttons: [
        {label:'Run supplier risk scan', scenario:'simulate'},
        {label:'Simulate supplier delay', scenario:'shock'},
        {label:'Approve alternate sourcing', scenario:'approve'},
        {label:'Explain risk score', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent identifies 4 suppliers with late-delivery risk and recommends safety-stock hedge for two critical components.',
        shock: 'Supplier S-214 delay will impact Line 5 in 46 hours. Agent proposes alternate source and partial expedited order.',
        approve: 'Alternate sourcing approved and procurement task created with contract comparison evidence.',
        explain: 'Decision trace: delivery history + quality score + open PO status + market volatility + logistics alerts + contract terms.'
      }
    },
    {
      id: 'dealer-cx',
      file: 'agent-dealer-distributor-cx.html',
      name: 'Dealer / Distributor CX Agent',
      short: 'Dealer CX',
      category: 'Commercial + CX',
      tagline: 'Resolve repetitive service and order queries without adding support load.',
      mode: 'Conversational resolution',
      confidence: 90,
      automation: 74,
      risk: 25,
      impact: '30–45% containment',
      signal: 'Backlog spike from distributor channel',
      actsOn: ['Order status','Delivery ETA','Invoice copy','Claims','Warranty check','Credit hold','Stock availability','Escalation history'],
      how: 'CRM + ERP + WMS/TMS + knowledge base + contracts + case history → conversational resolution + next-best action.',
      action: 'Answer queries across voice/chat/WhatsApp, raise tickets, route exceptions and surface account-risk signals.',
      kpis: [
        {label:'Containment', value:42, unit:'%', target:'30–45%'},
        {label:'Cost-to-serve', value:27, unit:'%', target:'↓ 15–30%'},
        {label:'FCR', value:79, unit:'%', target:'↑ 15–25%'},
        {label:'Query backlog', value:33, unit:'%', target:'↓ 20–40%'}
      ],
      buttons: [
        {label:'Resolve order-status queue', scenario:'simulate'},
        {label:'Simulate credit-hold escalation', scenario:'shock'},
        {label:'Approve service ticket', scenario:'approve'},
        {label:'Explain account-risk signal', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent resolves 38 repetitive order-status queries and routes 5 credit exceptions to account managers.',
        shock: 'Credit hold escalation detected for a high-value distributor. Agent suggests payment plan and priority service callback.',
        approve: 'Service ticket approved with account context, previous cases and recommended next-best action.',
        explain: 'Decision trace: CRM history + ERP credit status + WMS shipment + TMS ETA + contract terms + sentiment trend.'
      }
    },
    {
      id: 'aftermarket-warranty',
      file: 'agent-aftermarket-warranty.html',
      name: 'Aftermarket + Warranty Intelligence Agent',
      short: 'Warranty Intelligence',
      category: 'Commercial + CX',
      tagline: 'Connect service, warranty and product quality signals into a learning loop.',
      mode: 'Service learning loop',
      confidence: 85,
      automation: 57,
      risk: 36,
      impact: '↓ 10–20% warranty cost',
      signal: 'Repeat defect pattern in region West',
      actsOn: ['Warranty claims','Spare demand','Repeat defects','Service SLA breaches','Returns','Installation errors','Dealer complaints'],
      how: 'Warranty + service tickets + parts data + QA history + serial/batch traceability + dealer feedback → defect and fraud risk model.',
      action: 'Prioritise cases, recommend fixes, forecast spare demand, flag quality root causes and generate claim evidence.',
      kpis: [
        {label:'Warranty cost', value:18, unit:'%', target:'↓ 10–20%'},
        {label:'First-time fix', value:72, unit:'%', target:'↑ 15–30%'},
        {label:'Claim cycle', value:26, unit:'days', target:'↓ 20–40%'},
        {label:'Service NPS', value:68, unit:'pts', target:'↑ 20–30%'}
      ],
      buttons: [
        {label:'Analyze claim cluster', scenario:'simulate'},
        {label:'Simulate repeat defect surge', scenario:'shock'},
        {label:'Approve service bulletin', scenario:'approve'},
        {label:'Explain warranty risk', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent clusters 187 claims and identifies a serial range with elevated failure likelihood and parts demand impact.',
        shock: 'Repeat defect surge threatens service SLA. Agent recommends service bulletin and targeted spare pre-positioning.',
        approve: 'Service bulletin approved and dealer communication package generated with traceability evidence.',
        explain: 'Decision trace: serial/batch history + service ticket text + QA defect code + spare availability + dealer feedback.'
      }
    },
    {
      id: 'revenue-margin',
      file: 'agent-revenue-margin.html',
      name: 'Revenue + Margin Control Agent',
      short: 'Margin Control',
      category: 'Commercial + CX',
      tagline: 'Protect margin by aligning operational truth with commercial commitments.',
      mode: 'Continuous commercial assurance',
      confidence: 88,
      automation: 62,
      risk: 39,
      impact: '↑ 1–3% margin recovery',
      signal: 'Discount leakage on dealer cluster D-14',
      actsOn: ['Price leakage','Discount abuse','Missed charges','Late fees','Freight claims','Low-margin routes','Slow-moving SKUs','Channel churn'],
      how: 'ERP + CRM + contracts + invoices + logistics costs + service history + demand signals → margin leakage detection.',
      action: 'Flag leakage, recommend price/cost actions, create dispute evidence, prioritise sales interventions and track recovery.',
      kpis: [
        {label:'Margin recovery', value:2.4, unit:'%', target:'↑ 1–3%'},
        {label:'Disputes', value:22, unit:'%', target:'↓ 15–30%'},
        {label:'Cash conversion', value:78, unit:'%', target:'↑ 10–20%'},
        {label:'Churn risk', value:14, unit:'%', target:'↓ 10–20%'}
      ],
      buttons: [
        {label:'Scan leakage signals', scenario:'simulate'},
        {label:'Simulate pricing exception', scenario:'shock'},
        {label:'Approve recovery action', scenario:'approve'},
        {label:'Explain margin root cause', scenario:'explain'}
      ],
      views: {
        simulate: 'Agent detects 12 leakage signals across discounting, freight recovery and slow-moving SKU promotion rules.',
        shock: 'Pricing exception reduces margin by 2.1 points on top dealer lane. Agent suggests corrective credit and approval control.',
        approve: 'Recovery action approved. Sales intervention and dispute evidence pack created.',
        explain: 'Decision trace: contract price + invoice charge + logistics cost + discount approval + demand velocity + dealer history.'
      }
    }
  ]
};
