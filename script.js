
// ===================================================================
// OriginX — Application Data & Logic
// Single-file client-side router: home / trace-result / industry-detail / section-detail
// ===================================================================

// Stop the browser from restoring a previous scroll position on reload
// or back/forward navigation — this, combined with the explicit
// window.scrollTo(0,0) calls in showView()/handleHashRoute() below, is
// what fixes the "page opens scrolled to the bottom" issue.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2 4 6v6c0 5.5 3.4 9.7 8 11 4.6-1.3 8-5.5 8-11V6l-8-4z"/><polyline points="9 12 11 14 15 10"/></svg>'
};

// ---- Sample traceable products (one per industry, used for demo search) ----
const PRODUCTS = {
    "TIN-AGR-7734": {
        industry: "agriculture",
        name: "Basmati Rice — Premium Grade 1121",
        category: "Agriculture & Food",
        producedDate: "14 Mar 2026",
        expiryDate: "14 Mar 2028",
        originLocation: "Karnal, Haryana",
        weight: "25 kg sack",
        composition: [
            ["Variety", "1121 Basmati"],
            ["Moisture content", "12.4%"],
            ["Pesticide residue", "Within FSSAI limits"],
            ["Polish type", "Single polished"]
        ],
        certifications: ["FSSAI Licensed", "APEDA Export Certified", "AGMARK Grade A", "Pesticide Residue Tested"],
        journey: [
            { title: "Harvested at Source Farm", location: "Karnal District, Haryana", date: "14 Mar 2026", desc: "Crop harvested from a 12-acre registered farm plot. Soil and water quality logged at harvest." },
            { title: "Primary Processing & Milling", location: "Karnal Rice Mill Cluster", date: "18 Mar 2026", desc: "Dehusking, polishing and grading completed. Batch assigned unique digital ID at this stage." },
            { title: "Quality Testing", location: "FSSAI-Accredited Lab, Panipat", date: "22 Mar 2026", desc: "Sample tested for moisture, pesticide residue and grain length. Passed all 14 quality parameters." },
            { title: "Packaging & QR Assignment", location: "Karnal Packaging Unit", date: "25 Mar 2026", desc: "Sealed in food-grade sacks. Batch QR code generated and linked to blockchain record." },
            { title: "Warehousing", location: "FCI Warehouse, Delhi NCR", date: "29 Mar 2026", desc: "Stored under climate-controlled conditions pending distribution." },
            { title: "Retail Distribution", location: "Retail Network, New Delhi", date: "3 Apr 2026", desc: "Dispatched to retail partners. Available for consumer purchase with full traceability." }
        ]
    },
    "TIN-PHM-2291": {
        industry: "pharma",
        name: "Azithromycin 500mg Tablets",
        category: "Pharmaceuticals",
        producedDate: "02 Jan 2026",
        expiryDate: "01 Jan 2028",
        originLocation: "Baddi, Himachal Pradesh",
        weight: "Strip of 10 tablets",
        composition: [
            ["Active ingredient", "Azithromycin Dihydrate"],
            ["Strength", "500 mg"],
            ["Dosage form", "Film-coated tablet"],
            ["Storage", "Below 30°C, dry place"]
        ],
        certifications: ["WHO-GMP Certified", "CDSCO Approved", "Schedule H Drug", "Tamper-Evident Packaging Verified"],
        journey: [
            { title: "Active Ingredient Sourcing", location: "Bulk Drug Manufacturer, Gujarat", date: "02 Jan 2026", desc: "Active pharmaceutical ingredient sourced and quality-certified at source." },
            { title: "Formulation & Manufacturing", location: "WHO-GMP Facility, Baddi", date: "10 Jan 2026", desc: "Tablets manufactured under cleanroom conditions. Batch number assigned and logged." },
            { title: "Quality Control Testing", location: "In-house QC Lab, Baddi", date: "15 Jan 2026", desc: "Dissolution, assay and stability testing completed per IP standards." },
            { title: "Blister Packing & Serialization", location: "Baddi Packaging Line", date: "18 Jan 2026", desc: "Each strip serialized with a unique, tamper-evident QR code for anti-counterfeiting." },
            { title: "Central Distribution", location: "C&F Agent Warehouse, Delhi", date: "24 Jan 2026", desc: "Distributed to authorized stockists under cold-chain-monitored logistics." },
            { title: "Pharmacy Dispatch", location: "Licensed Pharmacy Network", date: "30 Jan 2026", desc: "Available at verified pharmacies. Scan confirms authenticity before purchase." }
        ]
    },
    "TIN-FMC-5512": {
        industry: "fmcg",
        name: "Aloe Vera Face Moisturizer 100ml",
        category: "FMCG & Cosmetics",
        producedDate: "20 Feb 2026",
        expiryDate: "20 Feb 2029",
        originLocation: "Baddi, Himachal Pradesh",
        weight: "100 ml bottle",
        composition: [
            ["Key ingredient", "98% Pure Aloe Vera Extract"],
            ["Formulation", "Paraben-free"],
            ["pH balance", "5.5 (skin-neutral)"],
            ["Animal testing", "Not tested on animals"]
        ],
        certifications: ["FSSAI Cosmetic Compliant", "Cruelty-Free Certified", "ISO 22716 (Cosmetic GMP)", "Vegan Formula Verified"],
        journey: [
            { title: "Raw Material Sourcing", location: "Aloe Farms, Barmer, Rajasthan", date: "20 Feb 2026", desc: "Aloe vera leaves harvested and cold-pressed for extract within 6 hours of cutting." },
            { title: "Formulation", location: "Cosmetic R&D Lab, Baddi", date: "24 Feb 2026", desc: "Extract blended with base formulation under ISO 22716 cleanroom standards." },
            { title: "Stability & Safety Testing", location: "Independent Testing Lab, Mumbai", date: "01 Mar 2026", desc: "Dermatological and stability testing completed across 30-day cycle." },
            { title: "Bottling & QR Tagging", location: "Baddi Filling Unit", date: "06 Mar 2026", desc: "Filled, sealed and tagged with batch-level QR code for ingredient transparency." },
            { title: "Regional Warehousing", location: "Distribution Hub, Gurugram", date: "10 Mar 2026", desc: "Inventoried and prepared for nationwide retail rollout." },
            { title: "Retail Shelf", location: "Retail & E-commerce Partners", date: "16 Mar 2026", desc: "Live on shelf and online. Scan to verify full ingredient sourcing." }
        ]
    },
    "TIN-TEX-8843": {
        industry: "textiles",
        name: "Handwoven Pashmina Shawl",
        category: "Textiles & Luxury",
        producedDate: "10 Nov 2025",
        expiryDate: "—",
        originLocation: "Srinagar, Jammu & Kashmir",
        weight: "240 GSM, 70x200 cm",
        composition: [
            ["Material", "100% Pure Pashmina Wool"],
            ["Weave", "Hand-spun, hand-woven"],
            ["Dye", "Natural vegetable dye"],
            ["Artisan craft hours", "~180 hours"]
        ],
        certifications: ["GI Tag — Kashmir Pashmina", "Handloom Mark Certified", "Fair Trade Verified", "Authenticity Hologram Linked"],
        journey: [
            { title: "Raw Wool Collection", location: "Changthang Plateau, Ladakh", date: "10 Nov 2025", desc: "Pashmina goat undercoat combed by hand during seasonal moulting, sourced from registered herders." },
            { title: "Spinning", location: "Artisan Cluster, Srinagar", date: "28 Nov 2025", desc: "Hand-spun into fine yarn by certified Kashmiri artisans over 3 weeks." },
            { title: "Weaving & Embroidery", location: "Handloom Workshop, Srinagar", date: "20 Dec 2025", desc: "Woven on traditional handloom; sozni embroidery added by master craftsperson." },
            { title: "Authenticity Certification", location: "Craft Development Institute, Srinagar", date: "02 Jan 2026", desc: "Verified as genuine handwoven pashmina, distinct from machine-made shahtoosh substitutes." },
            { title: "GI Tagging & QR Assignment", location: "Export House, Srinagar", date: "06 Jan 2026", desc: "Geographical Indication tag and blockchain-linked QR code attached." },
            { title: "Boutique Distribution", location: "Luxury Retail Partners, New Delhi", date: "15 Jan 2026", desc: "Delivered to authorized boutiques with full provenance documentation." }
        ]
    },
    "TIN-ECO-4531": {
        industry: "ecommerce",
        name: "Signature Snack Box",
        category: "E-commerce",
        producedDate: "12 Apr 2026",
        expiryDate: "12 Jul 2026",
        originLocation: "Bengaluru, Karnataka",
        weight: "1.2 kg curated box",
        composition: [
            ["Category", "Ready-to-ship grocery bundles"],
            ["Fulfilment SLA", "48-hour dispatch"],
            ["Packaging", "Tamper-evident, branded cartons"],
            ["Verification", "Batch scan before dispatch"]
        ],
        certifications: ["E-commerce Fulfilment Verified", "Packaging Integrity Confirmed", "Customer Origin Proof Enabled", "Regional Dispatch Log Matched"],
        journey: [
            { title: "Warehouse Picking", location: "Bengaluru Fulfilment Center", date: "12 Apr 2026", desc: "Carton assembled from verified vendor stock and assigned a digital dispatch record." },
            { title: "Packaging & Seal Check", location: "Pack Station 3, Bengaluru", date: "12 Apr 2026", desc: "Custom shipment carton sealed with tamper-proof labels and QR tokens." },
            { title: "Quality Check", location: "Quality Control Desk, Bengaluru", date: "13 Apr 2026", desc: "Order component list validated against supplier evidence and dispatch checklist." },
            { title: "Courier Handover", location: "Blue Dart Hub, Bengaluru", date: "13 Apr 2026", desc: "Shipment logged for regional transport with origin and movement proof attached." },
            { title: "Customer Delivery", location: "Bengaluru Metro Delivery Zone", date: "15 Apr 2026", desc: "Customer receives box with QR for authenticity and receipt verification." }
        ]
    },
    "TIN-IMP-6408": {
        industry: "import-export",
        name: "Export-Ready Home Textiles",
        category: "Import & Export",
        producedDate: "02 May 2026",
        expiryDate: "—",
        originLocation: "Jaipur, Rajasthan",
        weight: "18 cartons, 580 kg",
        composition: [
            ["Product", "Handcrafted home textile sets"],
            ["Documentation", "Commercial invoice + origin proof"],
            ["Container", "ISO-standard export crate"],
            ["Destination", "Dubai, UAE"]
        ],
        certifications: ["Origin Certificate Verified", "Export Compliance Logged", "Shipping Documentation Matched", "Destination Compliance Ready"],
        journey: [
            { title: "Manufacturing Batch", location: "Jaipur Textile Unit", date: "02 May 2026", desc: "Goods manufactured under quality-controlled production records and origin tagging." },
            { title: "Inspection & Packaging", location: "Export Packaging Zone, Jaipur", date: "05 May 2026", desc: "Cartons packed, labeled, and verified against invoice values and SKU data." },
            { title: "Customs Documentation", location: "Jaipur Port Clearance", date: "07 May 2026", desc: "Certificates, origin proofs and movement records uploaded to the digital export ledger." },
            { title: "Shipping to Port", location: "Nhava Sheva Port, Maharashtra", date: "09 May 2026", desc: "Container loaded and linked to a traceable shipment record for customs and clients." },
            { title: "International Delivery", location: "Jebel Ali Port, UAE", date: "18 May 2026", desc: "Buyer receives receiving confirmation with verified product origin and shipment status." }
        ]
    },
    "TIN-MSM-1709": {
        industry: "msme",
        name: "Handcrafted Brass Temple Set",
        category: "MSMEs",
        producedDate: "18 Mar 2026",
        expiryDate: "—",
        originLocation: "Moradabad, Uttar Pradesh",
        weight: "4.8 kg artisan set",
        composition: [
            ["Material", "Brass with hand-finished polish"],
            ["Craft technique", "Casted and hand-engraved"],
            ["Workshop", "Registered micro-enterprise unit"],
            ["Inspection", "Quality and finish checked"]
        ],
        certifications: ["Artisan Unit Verified", "Finish Quality Recorded", "Origin of Craft Confirmed", "Export-Ready Documentation Linked"],
        journey: [
            { title: "Material Procurement", location: "Moradabad Metal Yard", date: "18 Mar 2026", desc: "Brass supply validated against local supplier and artisan output records." },
            { title: "Casting & Engraving", location: "MSME Workshop, Moradabad", date: "21 Mar 2026", desc: "Each unit hand-finished by trained artisans, assigned a workshop batch ID." },
            { title: "Quality Inspection", location: "In-house QC Bench, Moradabad", date: "24 Mar 2026", desc: "Polish, finish, and craftsmanship checked before packaging and dispatch." },
            { title: "Packaging & QR", location: "Workshop Dispatch Desk", date: "25 Mar 2026", desc: "Order packed with QR-linked materials and artisan history for customers." },
            { title: "Retail Hand-off", location: "Regional Design Store, Lucknow", date: "28 Mar 2026", desc: "Consumer receives a physically traceable product with provenance and maker evidence." }
        ]
    },
    "TIN-JWL-2156": {
        industry: "jewellery",
        name: "Aurelia Gold Necklace",
        category: "Jewellery",
        producedDate: "24 Apr 2026",
        expiryDate: "—",
        originLocation: "Jaipur, Rajasthan",
        weight: "18.2 g, 22K gold",
        composition: [
            ["Metal purity", "22K gold"],
            ["Stone", "Rose-cut diamond accents"],
            ["Craftsmanship", "Hand-set by master jeweller"],
            ["Verification", "Material origin linked to batch"]
        ],
        certifications: ["Hallmark Verified", "Material Origin Recorded", "Craftsmanship Proof Linked", "Retail Authenticity Checked"],
        journey: [
            { title: "Gold Procurement", location: "Jaipur Assaying House", date: "24 Apr 2026", desc: "Gold purchased from certified bullion partners and measured for purity and weight." },
            { title: "Design & Casting", location: "Jewellery Studio, Jaipur", date: "26 Apr 2026", desc: "Design finalized and cast with batch traceability encoded into the work order." },
            { title: "Stone Setting & Finish", location: "Workshop Bench, Jaipur", date: "30 Apr 2026", desc: "Master jeweller set stones and completed final polish under supervised checks." },
            { title: "Certification & QR", location: "Hallmark Office, Jaipur", date: "03 May 2026", desc: "Hallmark record and QR-linked digital provenance generated for the piece." },
            { title: "Store Dispatch", location: "Luxury Gallery, Jaipur", date: "06 May 2026", desc: "Ready for retail sale with material origin, craftsmanship and authenticity verification." }
        ]
    },
};

// ---- Industry detail content ----
const INDUSTRIES = {
    agriculture: {
        icon: "🌾",
        name: "Agriculture & Food",
        tagline: "Farm-to-fork traceability, food safety compliance, and export certification for India's agricultural supply chains.",
        problem: "Traceability helps agriculture prove origin, protect food safety, and preserve export access from farm to fork.",
        stats: [["2.1M+", "Farmers Onboardable"], ["FSSAI", "Compliance Ready"], ["180+", "Export Markets"], ["6", "Avg. Trace Steps"]],
        flow: [
            ["🌱", "Farm Harvest", "Crop logged at source with soil & location data"],
            ["🏭", "Processing & Milling", "Cleaning, grading and primary processing"],
            ["🧪", "Lab Testing", "FSSAI-accredited quality & residue testing"],
            ["📦", "Packaging", "Batch QR assigned, sealed for distribution"],
            ["🚚", "Distribution", "Warehoused and routed to retail"],
            ["🛒", "Consumer Scan", "Full origin-to-shelf transparency unlocked"]
        ],
        certifications: [
            ["FSSAI License", "Mandatory food safety compliance for all packaged food products sold in India."],
            ["APEDA Export Certification", "Required for agricultural exports, verifying quality and origin standards."],
            ["AGMARK Grading", "Government quality grading for agricultural commodities."],
            ["Pesticide Residue Testing", "Lab-verified results confirming residue levels within safe limits."]
        ],
        sampleIds: ["TIN-AGR-7734"]
    },
    pharma: {
        icon: "💊",
        name: "Pharmaceuticals",
        tagline: "Anti-counterfeiting, batch-level tracking, and regulatory compliance for medicines and health products across India's supply chain.",
        problem: "Traceability helps pharma identify counterfeit risk quickly and keep every medicine batch accountable.",
        stats: [["10K+", "Manufacturers"], ["WHO-GMP", "Standard Ready"], ["$20B+", "Counterfeit Loss Prevented"], ["6", "Avg. Trace Steps"]],
        flow: [
            ["🧪", "Active Ingredient Sourcing", "Active ingredient sourced & quality-certified"],
            ["⚗️", "Manufacturing", "Formulated under GMP cleanroom conditions"],
            ["🔬", "QC Testing", "Dissolution, assay & stability verified"],
            ["💊", "Serialization", "Tamper-evident QR on every strip"],
            ["🚛", "Cold-Chain Logistics", "Monitored distribution to stockists"],
            ["🏥", "Pharmacy Dispatch", "Scan-to-verify before purchase"]
        ],
        certifications: [
            ["WHO-GMP Certification", "Good Manufacturing Practice standard recognized globally for pharma quality."],
            ["CDSCO Approval", "Central Drugs Standard Control Organisation regulatory clearance."],
            ["Schedule H Compliance", "Controlled drug classification ensuring prescription-only dispensing."],
            ["Tamper-Evident Verification", "Packaging integrity confirmed at point of sale."]
        ],
        sampleIds: ["TIN-PHM-2291"]
    },
    fmcg: {
        icon: "🛍️",
        name: "FMCG & Cosmetics",
        tagline: "Ingredient transparency, brand trust, and sustainability reporting for everyday consumer products.",
        problem: "Traceability helps FMCG brands substantiate ingredient, safety, and sustainability claims at scale.",
        stats: [["98%", "Ingredient Visibility"], ["ISO 22716", "GMP Standard"], ["Cruelty-Free", "Verification"], ["6", "Avg. Trace Steps"]],
        flow: [
            ["🌿", "Raw Material Sourcing", "Ingredients sourced & origin-logged"],
            ["⚗️", "Formulation", "Blended under cosmetic GMP standards"],
            ["🧴", "Safety Testing", "Dermatological & stability testing"],
            ["📦", "Bottling & QR Tagging", "Batch-level transparency attached"],
            ["🏬", "Warehousing", "Inventoried for nationwide rollout"],
            ["🛒", "Retail Shelf", "Live with full ingredient disclosure"]
        ],
        certifications: [
            ["FSSAI Cosmetic Compliance", "Safety clearance for cosmetic products sold in India."],
            ["Cruelty-Free Certification", "Verified no animal testing across the product lifecycle."],
            ["ISO 22716 (Cosmetic GMP)", "International good manufacturing practice for cosmetics."],
            ["Vegan Formula Verification", "Independently confirmed absence of animal-derived ingredients."]
        ],
        sampleIds: ["TIN-FMC-5512"]
    },
    textiles: {
        icon: "👗",
        name: "Textiles & Luxury",
        tagline: "Provenance verification, ethical sourcing, and authenticity guarantees for India's premium handloom and luxury goods.",
        problem: "Traceability helps textile makers protect artisan provenance and distinguish genuine craft from imitation.",
        stats: [["GI Tagged", "Origin Verified"], ["180hrs", "Avg. Artisan Craft Time"], ["Fair Trade", "Wage Verified"], ["6", "Avg. Trace Steps"]],
        flow: [
            ["🐐", "Raw Material Collection", "Sourced from registered herders/growers"],
            ["🧵", "Spinning", "Hand or mill-spun into yarn"],
            ["🪡", "Weaving & Craft", "Traditional handloom production"],
            ["✅", "Authenticity Certification", "Verified against genuine craft standards"],
            ["🏷️", "GI Tagging", "Geographical Indication & QR attached"],
            ["🛍️", "Boutique Distribution", "Delivered with provenance documentation"]
        ],
        certifications: [
            ["Geographical Indication (GI) Tag", "Confirms the product originates from its registered traditional region."],
            ["Handloom Mark", "Government certification distinguishing genuine handloom from power-loom goods."],
            ["Fair Trade Verification", "Confirms artisans were paid fair, transparent wages."],
            ["Authenticity Hologram Linkage", "Physical hologram linked to the digital provenance record."]
        ],
        sampleIds: ["TIN-TEX-8843"]
    },
    ecommerce: {
        icon: "🛒",
        name: "E-commerce",
        tagline: "Build buyer confidence with traceable product origins, transparent fulfilment, and proof of authenticity across online retail flows.",
        problem: "Traceability helps digital commerce verify product origin, reduce duplicates, and win trust across marketplaces and customer channels.",
        stats: [["1M+", "Orders Verified"], ["48h", "Dispatch SLA"], ["99.9%", "Shipment Proof"], ["7", "Avg. Trace Steps"]],
        flow: [
            ["📦", "Vendor Intake", "Verification data captured at source and packing stage"],
            ["🧾", "Order Validation", "SKU, journey and origin checked before dispatch"],
            ["📦", "Packing & Seal", "Tamper-evident packaging with QR proof assigned"],
            ["🚚", "Logistics Tracking", "Movement logged across dispatch and last-mile partners"],
            ["📲", "Consumer Scan", "Customer confirms authenticity before purchase or return"],
            ["🔁", "Return & Claim Support", "Proof supports refund claims and fraud prevention"]
        ],
        certifications: [
            ["Marketplace Shipment Proof", "Confirms the correct product and lot reached the customer."],
            ["Fulfilment Integrity", "Prevents counterfeits and parcel mix-ups during last-mile movement."],
            ["Customer Trust Signals", "Shows origin details and dispatch proof directly to buyers."],
            ["Returns Verification", "Links customer claims to the right batch and supply record."]
        ],
        sampleIds: ["TIN-ECO-4531"]
    },
    "import-export": {
        icon: "🚢",
        name: "Import & Export",
        tagline: "Verify origin, documentation, and product movement across global trade networks with evidence that travels with every shipment.",
        problem: "Traceability helps import and export teams prove origin, reduce customs risk, and defend compliance across international supply chains.",
        stats: [["25+", "Trade Corridors"], ["100%", "Documentation Check"], ["5x", "Faster Customs Review"], ["7", "Avg. Trade Steps"]],
        flow: [
            ["🏭", "Manufacture & Batch Log", "Production and origin records recorded at source"],
            ["📄", "Export Docs", "Invoices, certificates and shipment records cross-checked"],
            ["🚢", "Port & Customs", "Proof matched to container, route and destination"],
            ["📦", "Container Sealing", "Movement and integrity validated through transit"],
            ["🌍", "Destination Clearance", "Buyer receives a traceable shipment record"],
            ["✅", "Proof of Origin", "Confirms compliance for each delivered batch"]
        ],
        certifications: [
            ["Origin Certificate Verification", "Matches country-of-origin claims to source and batch evidence."],
            ["Customs Compliance Check", "Prevents documentation gaps before border clearance."],
            ["Trade Documentation Integrity", "Links invoices, shipping records and product batches."],
            ["Destination Readiness", "Ensures shipments are review-ready for international buyers."]
        ],
        sampleIds: ["TIN-IMP-6408"]
    },
    msme: {
        icon: "🏭",
        name: "MSMEs",
        tagline: "Help small and medium businesses demonstrate authenticity, quality and trusted sourcing with low-friction digital proof.",
        problem: "Traceability helps MSMEs build trust, protect artisan and manufacturer reputation, and unlock new procurement opportunities.",
        stats: [["70K+", "Micro Units"], ["2x", "Buyer Trust Lift"], ["<1h", "Setup Time"], ["5", "Avg. Trace Steps"]],
        flow: [
            ["🧵", "Source & Raw Material", "Supplier proof and material origin logged"],
            ["🛠️", "Workshop Production", "Manufacturing stages recorded in real time"],
            ["🔍", "Inspection", "Quality and finish checks tied to the lot"],
            ["📦", "Packaging & QR", "A digital proof is attached before dispatch"],
            ["🚚", "Market Distribution", "Connected to local and regional buyers"],
            ["🤝", "Trust Signal", "Buyers verify maker, batch and proof at a glance"]
        ],
        certifications: [
            ["Artisan & Supplier Verification", "Tracks the actual source behind each manufactured batch."],
            ["Quality Audit Trail", "Documents checks for finish, integrity and customer confidence."],
            ["Micro-Enterprise Proof", "Helps smaller producers show credible, traceable operations."],
            ["Buyer Confidence", "Builds trust in sourcing and product authenticity."]
        ],
        sampleIds: ["TIN-MSM-1709"]
    },
    jewellery: {
        icon: "💍",
        name: "Jewellery",
        tagline: "Establish confidence through transparent material origins, craftsmanship proof and product provenance for premium jewellery.",
        problem: "Traceability helps jewellery makers verify metal purity, sourcing and craftsmanship while protecting premium brand trust.",
        stats: [["22K", "Purity Ready"], ["100%", "Material Proof"], ["GI", "Craft Link"], ["6", "Avg. Trace Steps"]],
        flow: [
            ["🪙", "Metal Sourcing", "Gold and stones verified at the point of purchase"],
            ["🧿", "Design & Casting", "Craft records captured before finishing"],
            ["💎", "Stone Setting", "Each jewel linked to a verified work order"],
            ["✅", "Assay & Hallmark", "Metal purity and finishing validated"],
            ["🏷️", "QR Proof", "Authenticity and provenance linked to the final piece"],
            ["🛍️", "Retail Confidence", "Customers scan to confirm origin and craftsmanship"]
        ],
        certifications: [
            ["Hallmark Verification", "Proves purity and certification for the final piece."],
            ["Material Origin Proof", "Confirms responsible sourcing and metal traceability."],
            ["Craftsmanship Tracking", "Links each finished jewellery item to the maker and stage."],
            ["Consumer Authenticity Signal", "Enables premium trust before customer purchase."]
        ],
        sampleIds: ["TIN-JWL-2156"]
    },
};

// ===================================================================
// Router
// ===================================================================

function showView(id) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function goHome() {
    location.hash = '';
    showView('homeView');
    closeSearchPanel();
}

function goToVerify() {
    location.hash = 'verify';
    renderVerifyView();
    showView('verifyView');
    closeSearchPanel();
}

function goToRegister() {
    location.hash = 'register';
    renderRegisterView();
    showView('registerView');
    closeSearchPanel();
}

function scrollToHash(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function goToTrace(batchId) {
    batchId = (batchId || '').trim().toUpperCase();
    location.hash = `trace/${batchId}`;
    renderTraceView(batchId);
    showView('traceView');
    closeSearchPanel();
    document.getElementById('headerSearchInput').value = '';
}

function goToIndustry(industryId) {
    location.hash = `industry/${industryId}`;
    renderIndustryView(industryId);
    showView('industryView');
    closeSearchPanel();
}

// ---- Section detail pages (Problem / Features / Technology / Roadmap / Contact) ----
// Same in-app routing pattern as goToIndustry()/renderIndustryView() above.
// No separate HTML files — content is pulled live from the matching
// homepage <section> and rendered into its own routed view.
const SECTION_PAGES = {
    problem:    { title: "The Problem",              sourceId: "problem" },
    features:   { title: "Features",                  sourceId: "features" },
    technology: { title: "Technology",                 sourceId: "technology" },
    roadmap:    { title: "Roadmap",                    sourceId: "roadmap" },
    contact:    { title: "Contact",                    sourceId: "contact" },
    product:    { title: "Product / How It Works" },
    solutions:  { title: "Solutions by Industry" },
    '404':      { title: "Page Not Found" }
};

const CONTENT_PAGES = {
    product: { intro: "A clear path from physical product to trusted proof.", body: "OriginX connects a product's identity, journey and evidence in one interoperable record. Manufacturers create the record at source; every later event adds context without losing the audit trail.", blocks: ["Assign a digital identity at manufacture.", "Attach a QR code to the physical batch.", "Record custody, checks and certifications.", "Let anyone verify the right information instantly."], action: "Register a product" },
    solutions: { intro: "Purpose-built traceability for the way each sector works.", body: "Start with the workflows you already have, then add the proof your customers and regulators need. Each sector model uses the same trusted identity layer and its own compliance vocabulary.", blocks: Object.values(INDUSTRIES).map(ind => ind.name), action: "Explore agriculture" },
};

function goToSection(sectionId) {
    if (!SECTION_PAGES[sectionId]) return;
    location.hash = `section/${sectionId}`;
    renderSectionView(sectionId);
    showView('sectionView');
    closeSearchPanel();
}

function renderSectionView(sectionId) {
    const sec = SECTION_PAGES[sectionId];
    if (!sec) { goHome(); return; }
    const sourceEl = sec.sourceId && document.getElementById(sec.sourceId);
    document.getElementById('sectionBreadcrumbName').textContent = sec.title;
    if (!sourceEl) {
        const page = CONTENT_PAGES[sectionId];
        if (!page) {
            document.getElementById('sectionContent').innerHTML = '<section class="content-page"><div class="container"><p class="eyebrow">404</p><h1>That page is not on the ledger.</h1><p>Check the address or return to the OriginX home page.</p><button class="btn btn-primary" onclick="goHome()">Return home</button></div></section>';
            return;
        }
        const pageAction = sectionId === 'product' ? 'goToRegister()' : sectionId === 'solutions' ? "goToIndustry('agriculture')" : "goToSection('contact')";
        document.getElementById('sectionContent').innerHTML = `<section class="content-page"><div class="container content-page-inner"><p class="eyebrow">OriginX platform</p><h1>${escapeHtml(sec.title)}</h1><p class="content-intro">${escapeHtml(page.intro)}</p><p class="lead">${escapeHtml(page.body)}</p><div class="content-blocks">${page.blocks.map((block, index) => `<article><span>0${index + 1}</span><h3>${escapeHtml(block)}</h3></article>`).join('')}</div><button class="btn btn-primary" onclick="${pageAction}">${escapeHtml(page.action)}</button></div></section>`;
        return;
    }
    // Clone the homepage section's full markup (including its own
    // background classes like .technology / .contact) so it looks
    // identical as a standalone page, then de-duplicate the id so we
    // don't end up with two elements sharing the same id in the DOM.
    const clone = sourceEl.cloneNode(true);
    clone.id = `${sec.sourceId}-page`;
    document.getElementById('sectionContent').innerHTML = '';
    document.getElementById('sectionContent').appendChild(clone);
}

function handleHashRoute() {
    const hash = location.hash.replace('#/', '').replace('#', '');
    if (hash.startsWith('trace/')) {
        const id = decodeURIComponent(hash.split('trace/')[1]).toUpperCase();
        renderTraceView(id);
        showView('traceView');
    } else if (hash.startsWith('industry/')) {
        const id = decodeURIComponent(hash.split('industry/')[1]);
        if (INDUSTRIES[id]) {
            renderIndustryView(id);
            showView('industryView');
        } else {
            renderSectionView('404');
            showView('sectionView');
        }
    } else if (hash.startsWith('section/')) {
        const id = decodeURIComponent(hash.split('section/')[1]);
        if (SECTION_PAGES[id]) {
            renderSectionView(id);
            showView('sectionView');
        } else {
            renderSectionView('404');
            showView('sectionView');
        }
    } else if (hash === 'verify') {
        renderVerifyView();
        showView('verifyView');
    } else if (hash === 'register') {
        renderRegisterView();
        showView('registerView');
    } else if (hash === 'industries') {
        showView('homeView');
        setTimeout(() => scrollToHash('industries'), 60);
    } else {
        showView('homeView');
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
}

window.addEventListener('hashchange', handleHashRoute);

// ===================================================================
// Render: Trace Result View
// ===================================================================

function renderVerifyView() {
    document.getElementById('verifyContent').innerHTML = `
        <section class="verify-view"><div class="container">
            <div class="verify-panel">
                <span class="trace-status-pill"><span class="dot"></span> Consumer verification</span>
                <h1>Verify a product</h1>
                <p>Enter a batch ID or scan the product QR. Try the working sample below.</p>
                <form id="verifyForm" class="verify-form">
                    <label for="verifyBatchInput">Batch ID</label>
                    <input id="verifyBatchInput" required placeholder="e.g. TIN-AGR-7734" value="TIN-AGR-7734">
                    <div class="verify-actions"><button class="btn btn-primary" type="submit">Verify Product</button><button class="btn btn-secondary" id="verifyScanButton" type="button">Scan QR</button></div>
                </form>
                <p class="verify-example">Try a sample <button type="button" class="example-chip" id="verifyExample">TIN-AGR-7734</button></p>
                <div class="verify-preview"><div class="preview-heading"><span>What you'll see</span><span class="preview-status">Verified</span></div><div class="preview-product"><span class="preview-seal">TI</span><span><strong>Basmati Rice</strong><small>Origin and batch journey</small></span></div><div class="preview-row"><span>Authenticity</span><strong>Genuine product</strong></div><div class="preview-row"><span>Record</span><strong>Complete supply chain</strong></div></div>
            </div>
        </div></section>`;
    document.getElementById('verifyForm').addEventListener('submit', e => {
        e.preventDefault();
        goToTrace(document.getElementById('verifyBatchInput').value);
    });
    document.getElementById('verifyScanButton').addEventListener('click', startQrScanner);
    document.getElementById('verifyExample').addEventListener('click', () => goToTrace('TIN-AGR-7734'));
}

function renderRegisterView() {
    document.getElementById('registerContent').innerHTML = `
        <section class="register-view"><div class="container"><div class="register-panel">
            <span class="trace-status-pill"><span class="dot"></span> Manufacturer onboarding</span>
            <h1>Register a product</h1><p>Tell us about a product you want to bring onto OriginX.</p>
            <!-- Google Form #1: Manufacturer Onboarding -->
            <!-- Replace YOUR_ONBOARDING_FORM_ID with your real Google Form's embed ID -->
            <div class="gform-panel">
    <h3>📋 Prefer a form instead? Use our Google Form</h3>
    <p>You can also submit your product details directly through this form — it reaches the same onboarding team.</p>
    <a class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLScOrpqrLPrtgmRTRXK4hmofNOR4YYQOkc9CN_4p3ZPSqkR0Eg/viewform?usp=dialog" target="_blank" rel="noopener">Open onboarding form ↗</a>
</div>
        </div></div></section>`;
}

async function renderTraceView(batchId) {
    const product = PRODUCTS[batchId];
    const container = document.getElementById('traceContent');

    if (product) {
        renderVerifiedProductCard(container, batchId, product);
        return;
    }

    const looksLikeInternalCode = /^TIN-/i.test(batchId);
    if (looksLikeInternalCode) {
        renderNotFoundCard(container, batchId);
        return;
    }

    renderNotFoundCard(container, batchId);
}

function renderVerifiedProductCard(container, batchId, product) {
    const industry = INDUSTRIES[product.industry];

    container.innerHTML = `
        <section class="trace-hero">
            <div class="container">
                <div class="trace-hero-top">
                    <div>
                        <div class="trace-status-pill"><span class="dot"></span> Verified Authentic</div>
                        <h2>${escapeHtml(product.name)}</h2>
                        <span class="batch-id">${escapeHtml(batchId)}</span>
                    </div>
                    <div class="trace-qr-box">
                        ${generateQrSvg(batchId)}
                        <span>Scan Verified</span>
                        <button class="btn btn-secondary trace-scan-button" onclick="startQrScanner()">Scan QR</button>
                    </div>
                </div>
                <div class="trace-summary-grid">
                    <div class="trace-summary-item">
                        <div class="label">Category</div>
                        <div class="value">${escapeHtml(product.category)}</div>
                    </div>
                    <div class="trace-summary-item">
                        <div class="label">Origin</div>
                        <div class="value">${escapeHtml(product.originLocation)}</div>
                    </div>
                    <div class="trace-summary-item">
                        <div class="label">Produced</div>
                        <div class="value">${escapeHtml(product.producedDate)}</div>
                    </div>
                    <div class="trace-summary-item">
                        <div class="label">Valid Until</div>
                        <div class="value">${escapeHtml(product.expiryDate)}</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="trace-body">
            <div class="container">
                <div class="trace-actions"><button class="btn btn-secondary" data-share-batch="${escapeHtml(batchId)}">Share Product</button><button class="btn btn-primary" data-pdf-batch="${escapeHtml(batchId)}">Download Digital Passport</button></div>
                <div class="trace-layout">
                    <div>
                        <h3 class="trace-section-heading">Complete Supply Chain Journey</h3>
                        <div class="journey-timeline">
                            ${product.journey.map((step, i) => `
                                <div class="journey-step" tabindex="0" data-journey-index="${i}" data-batch-id="${escapeHtml(batchId)}">
                                    <div class="journey-marker">${i + 1}</div>
                                    <div class="journey-card">
                                        <div class="journey-card-top">
                                            <h4>${escapeHtml(step.title)}</h4>
                                            <span class="journey-date">${escapeHtml(step.date)}</span>
                                        </div>
                                        <div class="location">Location: ${escapeHtml(step.location)}</div>
                                        <p class="desc">${escapeHtml(step.desc)}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <div class="trace-sidebar-card auth-card">
                            <h3>${ICONS.shield} Authenticity Status</h3>
                            <div class="auth-status">
                                <div class="auth-status-icon">${ICONS.check}</div>
                                <div class="auth-status-text">
                                    <div class="big">Genuine Product</div>
                                    <div class="small">Blockchain record matched</div>
                                </div>
                            </div>
                            <p class="note">This batch ID was matched against an immutable digital record created at the point of manufacture. No tampering or duplication detected.</p>
                        </div>

                        <div class="trace-sidebar-card">
                            <h3>Certifications & Compliance</h3>
                            ${product.certifications.map(c => `
                                <div class="cert-row" tabindex="0" data-cert="${escapeHtml(c)}">
                                    <div class="cert-check">${ICONS.check}</div>
                                    <span>${escapeHtml(c)}</span>
                                </div>
                            `).join('')}
                        </div>

                        <div class="trace-sidebar-card">
                            <h3>Composition & Specs</h3>
                            <div class="composition-list">
                                ${product.composition.map(([k, v]) => `
                                    <div class="composition-row"><span>${escapeHtml(k)}</span><span>${escapeHtml(v)}</span></div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="trace-sidebar-card" style="text-align:center;">
                            <h3 style="justify-content:center;">Explore ${escapeHtml(industry.name)}</h3>
                            <p style="font-size:13px; color:#8a93a3; margin-bottom:16px; line-height:1.6;">See how OriginX secures this entire sector, end to end.</p>
                            <button class="btn btn-primary" style="width:100%; padding:13px;" onclick="goToIndustry('${product.industry}')">View Sector Details</button>
                        </div>

                        <!-- Google Form #3: Report a Product / Data Issue -->
                        <!-- Replace YOUR_REPORT_FORM_ID with your real Google Form URL -->
                        <p style="text-align:center; margin-top:6px;">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLScswUwb0G-wYsanS2Fy2muPWi-hvJUSUwuqTYKUHMu_gzGTnQ/viewform?usp=publish-editor" target="_blank" rel="noopener" class="text-button" style="font-size:12.5px;">🚩 Report an issue with this listing</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderNotFoundCard(container, batchId) {
    const allIds = Object.keys(PRODUCTS);
    container.innerHTML = `
        <div class="trace-body" style="padding-top:80px;">
            <div class="container">
                <div class="trace-notfound">
                    <div class="icon">?</div>
                    <h3>No record found for "${escapeHtml(batchId)}"</h3>
                    <p>We couldn't match this to a registered OriginX product. Double-check the code on your QR label, or try one of these live sample traces below.</p>
                    <div class="sample-label">Try a Sample Batch ID</div>
                    <div class="sample-id-grid">
                        ${allIds.map(id => `<button onclick="goToTrace('${id}')">${id}</button>`).join('')}
                    </div>
                </div>
            </div>
        </div>`;
}

let scannerStream = null;
let scannerFrame = null;

function closeQrScanner() {
    if (scannerFrame) cancelAnimationFrame(scannerFrame);
    scannerFrame = null;
    if (scannerStream) scannerStream.getTracks().forEach(track => track.stop());
    scannerStream = null;
    const video = document.getElementById('scannerVideo');
    if (video) video.srcObject = null;
    const modal = document.getElementById('scannerModal');
    if (modal) modal.hidden = true;
}

function handleQrValue(value) {
    const match = String(value).match(/#(?:\/?trace)\/([^/?#]+)/i);
    if (!match) {
        document.getElementById('scannerStatus').textContent = 'That QR is not an OriginX product link.';
        return;
    }
    closeQrScanner();
    goToTrace(decodeURIComponent(match[1]));
}

async function startQrScanner() {
    const modal = document.getElementById('scannerModal');
    const video = document.getElementById('scannerVideo');
    const status = document.getElementById('scannerStatus');
    modal.hidden = false;
    status.textContent = 'Requesting camera access...';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof jsQR !== 'function') {
        status.textContent = 'Camera scanning is unavailable here. Upload a QR image instead.';
        return;
    }
    try {
        scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        video.srcObject = scannerStream;
        await video.play();
        status.textContent = 'Point your camera at an OriginX QR code.';
        const canvas = document.getElementById('scannerCanvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const scanFrame = () => {
            if (!scannerStream || video.readyState < 2) return;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
            if (code) return handleQrValue(code.data);
            scannerFrame = requestAnimationFrame(scanFrame);
        };
        scannerFrame = requestAnimationFrame(scanFrame);
    } catch (err) {
        console.warn('QR camera unavailable:', err);
        status.textContent = 'Camera access was denied or no camera was found. Upload a QR image instead.';
    }
}

function initQrScanner() {
    document.getElementById('scannerClose').addEventListener('click', closeQrScanner);
    document.getElementById('uploadQrButton').addEventListener('click', () => document.getElementById('qrFileInput').click());
    document.getElementById('qrFileInput').addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const image = new Image();
        image.onload = () => {
            const canvas = document.getElementById('scannerCanvas');
            canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            context.drawImage(image, 0, 0);
            const code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
            document.getElementById('scannerStatus').textContent = code ? 'QR found.' : 'No readable QR found in that image.';
            if (code) handleQrValue(code.data);
            URL.revokeObjectURL(image.src);
        };
        image.src = URL.createObjectURL(file);
    });
}

function showDetail(title, body) {
    document.getElementById('detailContent').innerHTML = `<h2>${escapeHtml(title)}</h2><p class="detail-modal-copy">${escapeHtml(body)}</p>`;
    document.getElementById('detailModal').hidden = false;
}

async function shareProduct(batchId) {
    const url = buildTraceUrl(batchId);
    if (navigator.share) await navigator.share({ title: 'OriginX Product Passport', text: `Verify ${batchId}`, url });
    else {
        await navigator.clipboard.writeText(url);
        alert('Product link copied.');
    }
}

function downloadPassport(batchId) {
    const product = PRODUCTS[batchId];
    if (!product || !window.jspdf) return;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.setFontSize(20); pdf.text('OriginX Digital Passport', 20, 24);
    pdf.setFontSize(12); pdf.text(`Product: ${product.name}`, 20, 38); pdf.text(`Batch: ${batchId}`, 20, 46);
    pdf.text(`Origin: ${product.originLocation}`, 20, 54); pdf.text('Certifications:', 20, 68);
    product.certifications.forEach((cert, i) => pdf.text(`- ${cert}`, 26, 76 + i * 7));
    const start = 86 + product.certifications.length * 7; pdf.text('Supply chain journey:', 20, start);
    product.journey.forEach((step, i) => pdf.text(`${i + 1}. ${step.title} — ${step.location}`, 26, start + 8 + i * 7));
    pdf.save(`${batchId}-digital-passport.pdf`);
}

// ===================================================================
// Render: Industry Detail View
// ===================================================================

function renderIndustryView(industryId) {
    const ind = INDUSTRIES[industryId];
    if (!ind) return;

    document.getElementById('industryBreadcrumbName').textContent = ind.name;

    const otherSectors = Object.keys(INDUSTRIES).filter(k => k !== industryId);
    const container = document.getElementById('industryContent');

    if (industryId === 'agriculture') {
        renderAgriculturePage(ind, otherSectors, container);
        return;
    }

    if (industryId === 'pharma') {
        renderPharmaIndustryView(otherSectors, container);
        return;
    }

    if (industryId === 'textiles') {
        renderTextilesIndustryView(otherSectors, container);
        return;
    }

    if (industryId === 'fmcg') {
        renderFmcgIndustryView(otherSectors, container);
        return;
    }

    if (industryId === 'ecommerce') {
        renderEcommercePage(container);
        return;
    }

    if (industryId === 'import-export') {
        renderImportExportPage(container);
        return;
    }

    if (industryId === 'msme') {
        renderMsmePage(container);
        return;
    }

    if (industryId === 'jewellery') {
        renderJewelleryPage(container);
        return;
    }

    container.innerHTML = `
        <section class="industry-detail-hero">
            <div class="container">
                <div class="industry-detail-top">
                    <div class="industry-detail-icon">${ind.icon}</div>
                    <div>
                        <h2>${escapeHtml(ind.name)}</h2>
                        <p>${escapeHtml(ind.tagline)}</p>
                    </div>
                </div>
                <div class="industry-stats-row">
                    ${ind.stats.map(([num, lbl]) => `
                        <div class="industry-stat">
                            <div class="num">${escapeHtml(num)}</div>
                            <div class="lbl">${escapeHtml(lbl)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="industry-detail-body">
            <div class="container">
                <div class="industry-body-section">
                    <div class="industry-problem">${escapeHtml(ind.problem)}</div>
                    <h3 class="industry-body-heading">How Traceability Works in ${escapeHtml(ind.name)}</h3>
                    <div class="industry-flow">
                        ${ind.flow.map(([icon, title, desc]) => `
                            <div class="industry-flow-step">
                                <div class="flow-icon">${icon}</div>
                                <h4>${escapeHtml(title)}</h4>
                                <p>${escapeHtml(desc)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="industry-body-section">
                    <h3 class="industry-body-heading">Certifications Tracked in This Sector</h3>
                    <div class="industry-cert-grid">
                        ${ind.certifications.map(([title, desc]) => `
                            <div class="industry-cert-card">
                                <h4>${escapeHtml(title)}</h4>
                                <p>${escapeHtml(desc)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="industry-body-section" style="margin-bottom:0;">
                    <h3 class="industry-body-heading">Try a Live Traced Product</h3>
                    <div class="sample-products-grid">
                        ${ind.sampleIds.map(id => {
                            const p = PRODUCTS[id];
                            return `
                            <div class="sample-product-card" onclick="goToTrace('${id}')">
                                <div class="sample-product-card-top">
                                    <div>
                                        <h4>${escapeHtml(p.name)}</h4>
                                        <div class="origin">📍 ${escapeHtml(p.originLocation)}</div>
                                    </div>
                                    <div class="arrow">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                    </div>
                                </div>
                                <span class="batch-tag">${id}</span>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section class="industry-other-sectors">
            <div class="container">
                <h3 class="industry-body-heading" style="text-align:center;">Explore Other Sectors</h3>
                <div class="other-sectors-grid">
                    ${otherSectors.map(k => `
                        <div class="other-sector-chip" onclick="goToIndustry('${k}')">
                            <span class="ic">${INDUSTRIES[k].icon}</span> ${escapeHtml(INDUSTRIES[k].name)}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderPharmaIndustryView(otherSectors, container) {
    const stages = [
        ['Manufacturing', 'Establish relevant product and batch records at the manufacturing stage, where supported by participating systems.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'Clean pharmaceutical production environment with laboratory equipment'],
        ['Packaging & identification', 'Associate product packaging and identifiers with the relevant records where supported.', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', 'Carefully arranged medicine packaging and blister packs'],
        ['Distribution', 'Record relevant movements through participating distributors and supply-chain partners.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'Organized storage and logistics operations'],
        ['Wholesale & retail', 'Make relevant product information accessible to authorized participants and other intended users.', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80', 'Medicine products organized for pharmaceutical retail'],
        ['Product verification', 'Access available product information through supported OriginX verification functionality.', 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=800&q=80', 'Person accessing product information on a smartphone'],
        ['Patient confidence', 'Support informed product checks by helping people access the information made available through the verification experience.', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80', 'Medicine packaging in a clean, professional setting']
    ];

    container.innerHTML = `
        <div class="pharma-page">
            <section class="pharma-hero">
                <div class="pharma-hero-image" role="img" aria-label="Carefully arranged pharmaceutical products in a clean, precise setting"></div>
                <div class="pharma-hero-overlay"></div>
                <div class="container pharma-hero-inner">
                    <div class="pharma-hero-copy">
                        <p class="pharma-eyebrow"><span></span> Pharmaceutical traceability <i aria-hidden="true">•</i> Product authenticity</p>
                        <h1>Every Medicine.<br>A Journey <em>You Can Trace.</em></h1>
                        <p class="pharma-hero-lede">Bringing greater visibility to pharmaceutical supply chains through product traceability, batch-level information, and accessible records that help businesses understand a medicine's journey.</p>
                        <p class="pharma-hero-support">From manufacturing and packaging to distribution and verification, OriginX helps connect pharmaceutical products with their available traceability information.</p>
                        <div class="pharma-actions">
                            <button class="pharma-button pharma-button-primary" type="button" onclick="scrollToPharmaJourney()">Explore Pharmaceutical Traceability <span aria-hidden="true">↘</span></button>
                            <button class="pharma-button pharma-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        </div>
                        <p class="pharma-hero-note"><span aria-hidden="true">＋</span> Product information, connected across participating supply chains</p>
                    </div>
                    <div class="pharma-hero-seal" aria-hidden="true">
                        <span class="pharma-seal-orbit"></span><span class="pharma-seal-cross">＋</span>
                        <span class="pharma-seal-label">PRODUCT<br>TRACEABILITY</span>
                    </div>
                </div>
                <span class="pharma-hero-caption">Precision in every detail</span>
            </section>

            <section class="pharma-capabilities">
                <div class="container">
                    <div class="pharma-section-heading pharma-reveal">
                        <p class="pharma-kicker">A connected view</p>
                        <h2>Visibility Across the Medicine Journey.</h2>
                    </div>
                    <div class="pharma-capability-grid">
                        <article class="pharma-capability pharma-reveal"><span class="pharma-cap-number">01</span><span class="pharma-line-icon" aria-hidden="true">▤</span><h3>Batch-level visibility</h3><p>Access available batch identifiers and associated product records.</p></article>
                        <article class="pharma-capability pharma-reveal"><span class="pharma-cap-number">02</span><span class="pharma-line-icon" aria-hidden="true">⌕</span><h3>Product information</h3><p>Explore relevant information associated with a pharmaceutical product.</p></article>
                        <article class="pharma-capability pharma-reveal"><span class="pharma-cap-number">03</span><span class="pharma-line-icon" aria-hidden="true">⌁</span><h3>Supply-chain traceability</h3><p>Understand documented product movement across participating stages.</p></article>
                        <article class="pharma-capability pharma-reveal"><span class="pharma-cap-number">04</span><span class="pharma-line-icon" aria-hidden="true">✓</span><h3>Verification support</h3><p>Access available product verification information through supported OriginX functionality.</p></article>
                    </div>
                </div>
            </section>

            <section class="pharma-authenticity pharma-section">
                <div class="container pharma-editorial-grid pharma-reveal">
                    <div class="pharma-authenticity-visual">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85" alt="Medicine packaging arranged carefully in a clean pharmaceutical setting" width="1200" height="900" loading="lazy">
                        <span class="pharma-image-caption">Product identity begins with reliable information</span>
                        <span class="pharma-visual-index">01 <i>/</i> TRACEABILITY</span>
                    </div>
                    <div class="pharma-editorial-copy">
                        <p class="pharma-kicker">Product authenticity</p>
                        <h2>Confidence Begins With Knowing What You're Checking.</h2>
                        <p class="pharma-lede">Pharmaceutical supply chains require reliable product information. Traceability and appropriate verification processes can help businesses identify inconsistencies, access relevant records, and support efforts to reduce the risk of counterfeit medicines.</p>
                        <div class="pharma-feature-list">
                            <article><span>01</span><div><h3>Accessible product information</h3><p>Access relevant product identifiers and available records associated with a pharmaceutical product.</p></div><i aria-hidden="true">↗</i></article>
                            <article><span>02</span><div><h3>Batch-level records</h3><p>Explore available batch information and related records to improve visibility into the product's documented history.</p></div><i aria-hidden="true">↗</i></article>
                            <article><span>03</span><div><h3>Verification support</h3><p>Use supported verification workflows to review available product information and identify cases that may require further investigation.</p></div><i aria-hidden="true">↗</i></article>
                        </div>
                        <p class="pharma-disclaimer">A QR code alone does not prove that a medicine is genuine. Reliable authentication depends on the integrity of product identifiers, records, verification processes, and relevant supply-chain controls. OriginX does not detect every counterfeit medicine.</p>
                    </div>
                </div>
            </section>

            <section class="pharma-journey pharma-section" id="pharma-journey">
                <div class="container">
                    <div class="pharma-heading-row pharma-reveal">
                        <div><p class="pharma-kicker">From manufacturer to patient</p><h2>Follow the Journey.<br><em>Understand the Product.</em></h2></div>
                        <p class="pharma-lede">Pharmaceutical traceability connects available product records with the stages through which medicines move across the supply chain.</p>
                    </div>
                    <ol class="pharma-journey-grid">
                        ${stages.map(([title, description, image, alt], index) => `
                            <li class="pharma-journey-card pharma-reveal">
                                <div class="pharma-journey-image"><img src="${image}" alt="${alt}" width="800" height="520" loading="lazy"><span>0${index + 1}</span></div>
                                <div class="pharma-journey-copy"><span class="pharma-journey-mark" aria-hidden="true">${['＋', '▤', '⇢', '⌂', '⌕', '✓'][index]}</span><h3>${title}</h3><p>${description}</p></div>
                            </li>
                        `).join('')}
                    </ol>
                    <p class="pharma-footnote">Stages and records depend on participating supply-chain partners and the information they provide. OriginX does not automatically capture every event or independently verify every participant.</p>
                </div>
            </section>

            <section class="pharma-batch pharma-section">
                <div class="container pharma-batch-grid pharma-reveal">
                    <div class="pharma-packaging-scene">
                        <span class="pharma-demo-label">Illustrative packaging concept</span>
                        <div class="pharma-medicine-box" aria-label="Illustrative pharmaceutical package concept">
                            <span class="pharma-box-side"></span>
                            <span class="pharma-box-brand"><i aria-hidden="true">＋</i> PRODUCT RECORD</span>
                            <span class="pharma-box-rule"></span>
                            <span class="pharma-box-name">Medicine<br>Product</span>
                            <span class="pharma-box-kind">BATCH-LEVEL INFORMATION</span>
                            <span class="pharma-box-bars" aria-hidden="true"></span>
                            <span class="pharma-box-sample">DEMONSTRATION ONLY</span>
                        </div>
                        <div class="pharma-blister" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                    </div>
                    <div class="pharma-batch-copy">
                        <p class="pharma-kicker">Product records, at batch level</p>
                        <h2>Every Batch<br><em>Has a Record.</em></h2>
                        <p class="pharma-lede">Batch-level traceability helps connect pharmaceutical products with the information associated with their production and movement.</p>
                        <div class="pharma-record-panel">
                            <div class="pharma-record-heading"><span>Illustrative product information</span><i aria-hidden="true">＋</i></div>
                            <div><span>Product identification</span><strong>Available product details</strong></div>
                            <div><span>Batch or lot number</span><strong>Where recorded</strong></div>
                            <div><span>Manufacturer</span><strong>Where provided</strong></div>
                            <div><span>Manufacturing / expiry dates</span><strong>Where supported</strong></div>
                            <div><span>Movement records</span><strong>Participating stages</strong></div>
                        </div>
                        <p class="pharma-footnote">Illustrative fields only. Information available varies by product and participating systems; no manufacturer, batch, dates, or verification status is represented here.</p>
                    </div>
                </div>
            </section>

            <section class="pharma-quality pharma-section">
                <div class="container">
                    <div class="pharma-section-heading pharma-reveal">
                        <p class="pharma-kicker">Information for informed review</p>
                        <h2>Better Visibility.<br><em>Better-Informed Decisions.</em></h2>
                        <p class="pharma-lede">Relevant product records can help pharmaceutical businesses understand documented handling conditions, quality information, and supply-chain events.</p>
                    </div>
                    <div class="pharma-quality-grid">
                        <article class="pharma-quality-item pharma-reveal"><span aria-hidden="true">▤</span><h3>Quality documentation</h3><p>Access relevant quality records and supporting documentation when provided by participating organizations.</p></article>
                        <article class="pharma-quality-item pharma-reveal"><span aria-hidden="true">⌖</span><h3>Storage and handling</h3><p>Review available storage or handling information where supported by the recorded data and integrated systems.</p></article>
                        <article class="pharma-quality-item pharma-reveal"><span aria-hidden="true">◷</span><h3>Expiry information</h3><p>Access relevant recorded dates to help users review product information and identify items that may require attention.</p></article>
                    </div>
                    <p class="pharma-footnote">OriginX does not directly test medicines, measure drug potency, continuously monitor temperature, or guarantee proper storage or medicine quality.</p>
                </div>
            </section>

            <section class="pharma-accountability pharma-section">
                <div class="container">
                    <div class="pharma-heading-row pharma-reveal">
                        <div><p class="pharma-kicker">Documentation and accountability</p><h2>Traceability That<br><em>Supports Accountability.</em></h2></div>
                        <p class="pharma-lede">Organized product information and supply-chain records can support documentation workflows and help pharmaceutical businesses improve visibility into relevant product information.</p>
                    </div>
                    <div class="pharma-account-grid">
                        <article class="pharma-account-item pharma-reveal"><span>01 / RECORDS</span><h3>Documentation visibility</h3><p>Make available product records and relevant supporting documentation easier to access.</p></article>
                        <article class="pharma-account-item pharma-reveal"><span>02 / MOVEMENT</span><h3>Supply-chain accountability</h3><p>Improve visibility into documented product movement and participating supply-chain activities.</p></article>
                        <article class="pharma-account-item pharma-reveal"><span>03 / ACCESS</span><h3>Record accessibility</h3><p>Help relevant users access the information made available through supported OriginX workflows.</p></article>
                    </div>
                    <p class="pharma-footnote">Traceability does not guarantee medicine quality, safety, or regulatory compliance. No specific regulation or serialization standard is represented as covered by this page.</p>
                </div>
            </section>

            <section class="pharma-verification pharma-section">
                <div class="container pharma-verification-grid pharma-reveal">
                    <div class="pharma-verification-visual">
                        <span class="pharma-demo-label">Illustrative interface — not a product result</span>
                        <div class="pharma-info-card">
                            <div class="pharma-info-top"><span class="pharma-info-symbol" aria-hidden="true">＋</span><span>PRODUCT INFORMATION<small>EXAMPLE FIELDS ONLY</small></span></div>
                            <div class="pharma-info-art"><img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=760&q=80" alt="Pharmaceutical packaging for a visual product information example" width="760" height="500" loading="lazy"></div>
                            <div class="pharma-info-row"><span>Product name</span><strong>Available information</strong></div>
                            <div class="pharma-info-row"><span>Batch / lot</span><strong>Where recorded</strong></div>
                            <div class="pharma-info-row"><span>Relevant dates</span><strong>Where provided</strong></div>
                            <div class="pharma-info-row"><span>Traceability records</span><strong>Available journey details</strong></div>
                        </div>
                    </div>
                    <div class="pharma-verification-copy">
                        <p class="pharma-kicker">Scan. Check. Understand.</p>
                        <h2>Make Product Information Easier to Access.</h2>
                        <p class="pharma-lede">Use the OriginX verification experience to access available information associated with a pharmaceutical product.</p>
                        <div class="pharma-verify-steps">
                            <article><span>01</span><div><h3>Locate the identifier</h3><p>Find the QR code, product identifier, or other supported verification method on the medicine package.</p></div></article>
                            <article><span>02</span><div><h3>Open product information</h3><p>Use the supported OriginX workflow to access the information associated with that product.</p></div></article>
                            <article><span>03</span><div><h3>Review available records</h3><p>Review available product and batch information and follow the instructions provided by the verification experience.</p></div></article>
                        </div>
                        <button class="pharma-button pharma-button-dark" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        <p class="pharma-footnote">Product information and verification results depend on the records and capabilities available for the product being checked.</p>
                    </div>
                </div>
            </section>

            <section class="pharma-stakeholders pharma-section">
                <div class="container">
                    <div class="pharma-heading-row pharma-reveal">
                        <div><p class="pharma-kicker">Across the medicine supply chain</p><h2>One Connected Supply Chain.<br><em>Greater Visibility for Everyone.</em></h2></div>
                        <p class="pharma-lede">Access to available product information can support clearer checks at each hand-off—without replacing established professional or regulatory processes.</p>
                    </div>
                    <div class="pharma-stakeholder-grid">
                        <article class="pharma-stakeholder pharma-reveal"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80" alt="Pharmaceutical manufacturing and laboratory environment" width="700" height="450" loading="lazy"><span>01 / AT SOURCE</span><h3>Pharmaceutical manufacturers</h3><p>Connect products with relevant manufacturing and batch information where supported.</p></article>
                        <article class="pharma-stakeholder pharma-reveal"><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80" alt="Organized distribution and logistics environment" width="700" height="450" loading="lazy"><span>02 / IN TRANSIT</span><h3>Distributors and wholesalers</h3><p>Access available product records and improve visibility into documented supply-chain movement.</p></article>
                        <article class="pharma-stakeholder pharma-reveal"><img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80" alt="Medicine products arranged in a pharmaceutical retail environment" width="700" height="450" loading="lazy"><span>03 / AT THE COUNTER</span><h3>Pharmacies and retailers</h3><p>Review available product identifiers and associated records through supported workflows.</p></article>
                        <article class="pharma-stakeholder pharma-reveal"><img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&q=80" alt="Medicine packaging presented in a clear, professional setting" width="700" height="450" loading="lazy"><span>04 / FOR PEOPLE</span><h3>Consumers and patients</h3><p>Access available product information to make more informed checks and follow guidance from healthcare professionals.</p></article>
                    </div>
                    <p class="pharma-footnote">Traceability does not replace professional medical advice, pharmacy checks, regulatory oversight, or established medicine authentication procedures.</p>
                </div>
            </section>

            <section class="pharma-precision pharma-section">
                <div class="container pharma-precision-grid pharma-reveal">
                    <div class="pharma-precision-copy">
                        <p class="pharma-kicker">Precision meets transparency</p>
                        <h2>Precision in Every Detail.<br><em>Transparency Across Every Journey.</em></h2>
                        <p class="pharma-lede">Pharmaceutical products depend on careful processes and precise information. OriginX helps connect product identity with available traceability records, bringing another layer of visibility to participating supply chains.</p>
                        <span class="pharma-precision-rule"><i aria-hidden="true">＋</i> Know the product. Understand its journey.</span>
                    </div>
                    <div class="pharma-precision-images">
                        <img class="pharma-precision-main" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85" alt="Modern pharmaceutical laboratory and production environment" width="1000" height="760" loading="lazy">
                        <img class="pharma-precision-inset" src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80" alt="Medicine packaging detail" width="600" height="520" loading="lazy">
                        <span class="pharma-precision-tag">PRODUCT IDENTITY <i>·</i> AVAILABLE RECORDS <i>·</i> CONNECTED JOURNEY</span>
                    </div>
                </div>
            </section>

            <section class="pharma-closing">
                <div class="container pharma-closing-inner pharma-reveal">
                    <p class="pharma-kicker">OriginX · Pharmaceutical traceability</p>
                    <h2>Build Greater Trust<br>in Every Medicine Journey.</h2>
                    <p>Connect pharmaceutical products with available traceability information and bring greater visibility to the supply chains behind them.</p>
                    <div class="pharma-actions">
                        <button class="pharma-button pharma-button-light" type="button" onclick="goToSection('product')">Explore OriginX <span aria-hidden="true">→</span></button>
                        <button class="pharma-button pharma-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                    </div>
                </div>
            </section>

            <section class="pharma-other-sectors">
                <div class="container"><p>Explore other OriginX sectors</p><div class="other-sectors-grid">
                    ${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic" aria-hidden="true">${INDUSTRIES[key].icon}</span>${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}
                </div></div>
            </section>
        </div>
    `;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        container.classList.add('pharma-motion-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        container.querySelectorAll('.pharma-reveal').forEach(element => observer.observe(element));
    }
}

function scrollToPharmaJourney() {
    const journeySection = document.getElementById('pharma-journey');
    const top = journeySection.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top: Math.max(top, 0), behavior });
}

function renderTextilesIndustryView(otherSectors, container) {
    const journey = [
        ['Material sourcing', 'Understand available information about the fibres and materials associated with a textile or finished product.', '1604176354204-9268737828e4', 'Natural textile fibres prepared for processing'],
        ['Spinning & processing', 'Connect a product with relevant spinning or processing records where these are maintained and available.', '1620799140408-edc6dcb6d633', 'Yarn and textile materials arranged for production'],
        ['Weaving & manufacturing', 'Explore available records associated with weaving, garment production, or other manufacturing stages.', '1606760227091-3dd870d97f1d', 'Textile craftsmanship and woven fabric detail'],
        ['Dyeing & finishing', 'Access relevant information about finishing and treatment processes where supported by recorded data.', '1610030469983-98e550d6193c', 'Richly colored textile fabric and surface detail'],
        ['Product labeling & packaging', 'Associate finished products and their identifiers with available product information.', '1601924994987-69e26d50dc26', 'Folded textiles and premium product presentation'],
        ['Distribution & verification', 'Follow available product movement records and access information through supported OriginX verification functionality.', '1512436991641-6745cdb1723f', 'Finished garments arranged for distribution']
    ];
    const materials = [
        ['Cotton & natural fibres', 'Material information provided by participating businesses.', '1604176354204-9268737828e4', 'Soft natural fibres and textile materials'],
        ['Silk & fine yarns', 'Explore recorded sourcing and processing details where available.', '1620799140408-edc6dcb6d633', 'Fine yarn and woven fabric in warm natural light'],
        ['Woven textiles', 'Connect finished products to relevant material records.', '1604881988758-f76ad2f7aac1', 'Textured woven textile close-up'],
        ['Colour & finish', 'Review available finishing information where recorded.', '1610030469983-98e550d6193c', 'Patterned textile with rich color and texture']
    ];
    const categories = [
        ['Traditional textiles', 'Regional techniques and product records, where provided.', '1606760227091-3dd870d97f1d', 'Traditional woven textile with a detailed pattern'],
        ['Premium fabrics', 'Explore available information about fabric and material composition.', '1620799140408-edc6dcb6d633', 'Fine textile and premium fabric detail'],
        ['Apparel & garments', 'Access available product and manufacturing information.', '1512436991641-6745cdb1723f', 'Carefully arranged clothing and garments'],
        ['Luxury accessories', 'Connect accessories with relevant product records.', '1601924994987-69e26d50dc26', 'Textile accessory and premium product styling'],
        ['Crafted products', 'Discover documented processes and provenance where recorded.', '1604881988758-f76ad2f7aac1', 'Handcrafted textile detail and artisan work'],
        ['Home textiles', 'Explore available information about materials and product journeys.', '1558618666-fcd25c85cd64', 'Woven textile furnishings in an elegant interior']
    ];

    const imageUrl = (id, width = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`;

    container.innerHTML = `
        <div class="textile-page">
            <section class="textile-hero">
                <div class="textile-hero-image" role="img" aria-label="Richly textured Indian textiles in warm directional light"></div>
                <div class="textile-hero-shade"></div>
                <div class="container textile-hero-inner">
                    <div class="textile-hero-copy">
                        <p class="textile-eyebrow"><span></span> TEXTILES <i aria-hidden="true">•</i> LUXURY <i aria-hidden="true">•</i> PRODUCT TRACEABILITY</p>
                        <h1>Every Thread Has a Story.<br><em>Every Origin Matters.</em></h1>
                        <p class="textile-hero-lede">From the fibres that begin a textile's journey to the craftsmanship behind the finished product, OriginX helps connect textiles and luxury goods with available information about their origins and supply chains.</p>
                        <p class="textile-hero-support">Bring greater visibility to materials, manufacturing, craftsmanship, and the documented journey behind the products people value.</p>
                        <div class="textile-actions">
                            <button class="textile-button textile-button-primary" type="button" onclick="scrollToTextileJourney()">Explore Textile Traceability <span aria-hidden="true">↘</span></button>
                            <button class="textile-button textile-button-light-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        </div>
                    </div>
                </div>
                <span class="textile-hero-caption">Material · memory · making</span>
            </section>

            <section class="textile-capabilities">
                <div class="container">
                    <div class="textile-section-intro textile-cap-intro"><p class="textile-kicker">A connected product story</p><h2>Craftsmanship Deserves <em>Transparency.</em></h2></div>
                    <div class="textile-cap-grid">
                        <article><span>01</span><i aria-hidden="true">⌁</i><h3>Material provenance</h3><p>Access available information about the origins of materials and fibres.</p></article>
                        <article><span>02</span><i aria-hidden="true">◇</i><h3>Product identification</h3><p>Explore available product identifiers and associated product records.</p></article>
                        <article><span>03</span><i aria-hidden="true">⌘</i><h3>Manufacturing visibility</h3><p>Understand documented manufacturing and processing information where available.</p></article>
                        <article><span>04</span><i aria-hidden="true">↗</i><h3>Product traceability</h3><p>Follow available records of product movement through participating supply-chain stages.</p></article>
                    </div>
                </div>
            </section>

            <section class="textile-heritage textile-section">
                <div class="container textile-heritage-grid textile-reveal">
                    <figure class="textile-heritage-image">
                        <img src="${imageUrl('1606760227091-3dd870d97f1d', 1200)}" alt="Intricately woven textile showing the detail and texture of traditional fabric craftsmanship" width="1200" height="1000" loading="lazy">
                        <figcaption><span>CRAFT & CONTINUITY</span><span>01 / 06</span></figcaption>
                    </figure>
                    <div class="textile-heritage-copy">
                        <p class="textile-kicker">Rooted in craftsmanship</p>
                        <h2>Tradition Woven<br>Into <em>Every Thread.</em></h2>
                        <p class="textile-lede">India's textile heritage reflects generations of knowledge, regional traditions, skilled craftsmanship, and extraordinary material diversity. Traceability can help preserve and communicate the documented story behind these products.</p>
                        <div class="textile-point-list">
                            <article><span>01</span><div><h3>Heritage and origin</h3><p>Explore available information about a textile's geographic origin, material source, or associated production records.</p></div></article>
                            <article><span>02</span><div><h3>Craftsmanship</h3><p>Connect products with available information about the people, processes, and production stages behind their creation.</p></div></article>
                            <article><span>03</span><div><h3>Preserving the product story</h3><p>Make relevant product and provenance information more accessible to businesses and consumers.</p></div></article>
                        </div>
                        <p class="textile-note">Craft methods, geographic origins, and material claims depend on records provided by the relevant business; not every product is handmade or associated with a specific regional tradition.</p>
                    </div>
                </div>
            </section>

            <section class="textile-material textile-section">
                <div class="container">
                    <div class="textile-heading-row textile-reveal">
                        <div><p class="textile-kicker">Material & fibre provenance</p><h2>Know the Material Behind<br><em>the Masterpiece.</em></h2></div>
                        <p class="textile-lede">Understanding a textile begins with understanding the materials behind it. Traceability can help connect finished products with available information about fibres, materials, and sourcing.</p>
                    </div>
                    <div class="textile-material-layout">
                        <div class="textile-material-mosaic textile-reveal">
                            <figure class="textile-material-feature"><img src="${imageUrl(materials[0][2], 1100)}" alt="${materials[0][3]}" width="1100" height="900" loading="lazy"><figcaption>COTTON & NATURAL FIBRES</figcaption></figure>
                            <figure><img src="${imageUrl(materials[1][2], 700)}" alt="${materials[1][3]}" width="700" height="520" loading="lazy"><figcaption>SILK & FINE YARNS</figcaption></figure>
                            <figure><img src="${imageUrl(materials[2][2], 700)}" alt="${materials[2][3]}" width="700" height="520" loading="lazy"><figcaption>WOVEN TEXTILES</figcaption></figure>
                            <span class="textile-mosaic-thread" aria-hidden="true"></span>
                        </div>
                        <div class="textile-material-copy">
                            <div class="textile-material-points">
                                <article><span>01</span><div><h3>Material identification</h3><p>Access available information about materials associated with a product.</p></div></article>
                                <article><span>02</span><div><h3>Source information</h3><p>Explore recorded sourcing details where provided by participating businesses.</p></div></article>
                                <article><span>03</span><div><h3>Material journey</h3><p>Understand documented movement through relevant sourcing and processing stages where records are available.</p></div></article>
                                <article><span>04</span><div><h3>Product information</h3><p>Connect the finished product with relevant material and provenance records.</p></div></article>
                            </div>
                            <p class="textile-note">OriginX presents information associated with a product record; it does not independently test or confirm fibre composition.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="textile-authenticity textile-section">
                <div class="container textile-auth-grid textile-reveal">
                    <div class="textile-auth-visual">
                        <img src="${imageUrl('1512436991641-6745cdb1723f', 1200)}" alt="Fine garments arranged in a considered luxury fashion presentation" width="1200" height="1000" loading="lazy">
                        <span class="textile-visual-label">IDENTITY · PROVENANCE · RECORDS</span>
                        <div class="textile-qr-callout"><span aria-hidden="true">⌕</span><div><strong>Product information</strong><small>Available records vary by product</small></div></div>
                    </div>
                    <div class="textile-auth-copy">
                        <p class="textile-kicker">Authenticity beyond appearances</p>
                        <h2>Luxury Deserves to Be Understood.<br><em>Authenticity Deserves Attention.</em></h2>
                        <p class="textile-lede">Luxury textiles, garments, accessories, and crafted goods often carry significant material and cultural value. Accessible product information can help businesses and consumers make more informed authenticity checks.</p>
                        <div class="textile-point-list">
                            <article><span>01</span><div><h3>Product identification</h3><p>Access available identifiers and relevant records associated with the product.</p></div></article>
                            <article><span>02</span><div><h3>Provenance information</h3><p>Explore documented information about material origins, craftsmanship, or manufacturing where available.</p></div></article>
                            <article><span>03</span><div><h3>Verification support</h3><p>Use supported OriginX workflows to review available product information and identify records that may need further review.</p></div></article>
                        </div>
                        <p class="textile-note">A QR code alone does not prove authenticity. Reliable authentication depends on identifiers, trustworthy records, and the verification methods in use. OriginX does not independently authenticate every product or detect every counterfeit.</p>
                    </div>
                </div>
            </section>

            <section class="textile-identity textile-section">
                <div class="container textile-identity-grid textile-reveal">
                    <div class="textile-identity-copy">
                        <p class="textile-kicker">Product, collection & batch information</p>
                        <h2>Every Product Has<br><em>Its Own Identity.</em></h2>
                        <p class="textile-lede">Product identifiers and associated records can help connect garments, textiles, and luxury goods with information about their production and movement.</p>
                        <p class="textile-note">The example fields shown are illustrative only. Actual information depends on the product, participating business, and records associated with it.</p>
                    </div>
                    <div class="textile-record-visual">
                        <img src="${imageUrl('1601924994987-69e26d50dc26', 1000)}" alt="Premium textiles folded and presented with careful attention to material detail" width="1000" height="800" loading="lazy">
                        <div class="textile-record-card">
                            <div class="textile-record-heading"><span>ILLUSTRATIVE PRODUCT RECORD</span><i aria-hidden="true">✳</i></div>
                            <div><span>Product name</span><strong>Where provided</strong></div>
                            <div><span>Product identifier</span><strong>Where associated</strong></div>
                            <div><span>Material information</span><strong>Where recorded</strong></div>
                            <div><span>Manufacturer / producer</span><strong>Where provided</strong></div>
                            <div><span>Collection / model</span><strong>Where relevant</strong></div>
                            <div><span>Batch / lot details</span><strong>Where applicable</strong></div>
                            <div><span>Traceability records</span><strong>Available journey details</strong></div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="textile-journey textile-section" id="textile-journey">
                <div class="container">
                    <div class="textile-heading-row textile-reveal">
                        <div><p class="textile-kicker">From fibre to finished product</p><h2>Follow the Journey<br><em>Behind Every Thread.</em></h2></div>
                        <p class="textile-lede">Discover how materials move through sourcing, processing, manufacturing, finishing, and distribution—and how traceability can connect the information recorded along the way.</p>
                    </div>
                    <ol class="textile-journey-grid">
                        ${journey.map(([title, description, image, alt], index) => `
                            <li class="textile-journey-card textile-reveal">
                                <div class="textile-journey-image"><img src="${imageUrl(image, 800)}" alt="${alt}" width="800" height="560" loading="lazy"><span>0${index + 1}</span></div>
                                <div class="textile-journey-copy"><span aria-hidden="true">${['⌁', '⟳', '⌘', '✳', '◇', '↗'][index]}</span><h3>${title}</h3><p>${description}</p></div>
                            </li>
                        `).join('')}
                    </ol>
                    <p class="textile-note">Supply-chain stages and records depend on participating businesses and supported integrations. OriginX does not automatically capture every event or independently verify every participant.</p>
                </div>
            </section>

            <section class="textile-responsibility textile-section">
                <div class="container textile-responsibility-grid textile-reveal">
                    <div class="textile-responsibility-image">
                        <img src="${imageUrl('1604881988758-f76ad2f7aac1', 1200)}" alt="Textile materials and crafted fabric detail representing documented production" width="1200" height="950" loading="lazy">
                        <span>VISIBILITY THROUGH AVAILABLE RECORDS</span>
                    </div>
                    <div class="textile-responsibility-copy">
                        <p class="textile-kicker">Ethical sourcing & responsible production</p>
                        <h2>Transparency That<br>Goes <em>Beyond the Label.</em></h2>
                        <p class="textile-lede">Product traceability can help make available sourcing and production information easier to understand, supporting more informed conversations about materials, manufacturing, and responsibility.</p>
                        <div class="textile-responsibility-points">
                            <article><span>01 / SOURCING VISIBILITY</span><p>Explore available information about material sources and participating suppliers.</p></article>
                            <article><span>02 / PRODUCTION TRANSPARENCY</span><p>Access documented information about relevant manufacturing stages and production processes where available.</p></article>
                            <article><span>03 / INFORMED PURCHASING</span><p>Give businesses and consumers information that may help them evaluate sourcing and production claims.</p></article>
                        </div>
                        <p class="textile-note">Traceability can provide visibility, but does not by itself prove that a product is ethical, fair-trade, sustainable, eco-friendly, or responsibly manufactured.</p>
                    </div>
                </div>
            </section>

            <section class="textile-showcase textile-section">
                <div class="container">
                    <div class="textile-heading-row textile-reveal">
                        <div><p class="textile-kicker">Textiles & luxury</p><h2>A World of Materials.<br><em>A Story Behind Every Product.</em></h2></div>
                        <p class="textile-lede">Different materials and forms of making; one opportunity to make available product information easier to explore.</p>
                    </div>
                    <div class="textile-category-grid">
                        ${categories.map(([title, description, image, alt], index) => `
                            <article class="textile-category textile-category-${index + 1} textile-reveal">
                                <figure><img src="${imageUrl(image, 900)}" alt="${alt}" width="900" height="680" loading="lazy"><figcaption>0${index + 1}</figcaption></figure>
                                <p class="textile-category-label">MATERIAL STORIES / 0${index + 1}</p><h3>${title}</h3><p class="textile-category-description">${description}</p>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="textile-stakeholders textile-section">
                <div class="container">
                    <div class="textile-heading-row textile-reveal">
                        <div><p class="textile-kicker">A shared product journey</p><h2>One Connected Journey.<br><em>Greater Visibility for Everyone.</em></h2></div>
                        <p class="textile-lede">Relevant product records can help each participant understand more about the materials and goods moving through their part of the chain.</p>
                    </div>
                    <div class="textile-stakeholder-grid">
                        <article class="textile-reveal"><span>01 / MATERIALS</span><h3>Fibre & material suppliers</h3><p>Associate available material information with downstream products and participating supply-chain records.</p></article>
                        <article class="textile-reveal"><span>02 / MAKING</span><h3>Textile manufacturers</h3><p>Connect finished goods with relevant production, batch, and material information where supported.</p></article>
                        <article class="textile-reveal"><span>03 / IN MARKET</span><h3>Brands & retailers</h3><p>Access available product records and make relevant information easier to communicate.</p></article>
                        <article class="textile-reveal"><span>04 / PRODUCT OWNERS</span><h3>Consumers & collectors</h3><p>Explore available product information and understand more about the origins and journey of products they value.</p></article>
                    </div>
                </div>
            </section>

            <section class="textile-verification textile-section">
                <div class="container textile-verify-grid textile-reveal">
                    <div class="textile-verify-visual">
                        <img src="${imageUrl('1558618666-fcd25c85cd64', 1000)}" alt="Textured woven fabric arranged as a premium product presentation" width="1000" height="850" loading="lazy">
                        <div class="textile-verify-panel">
                            <p><span>ORIGINX / PRODUCT INFORMATION</span><i aria-hidden="true">✳</i></p>
                            <div><span>Product name</span><strong>Illustrative field</strong></div>
                            <div><span>Material details</span><strong>Where available</strong></div>
                            <div><span>Producer information</span><strong>Where provided</strong></div>
                            <div><span>Journey records</span><strong>Available details</strong></div>
                            <small>Illustrative presentation · not a verification result</small>
                        </div>
                    </div>
                    <div class="textile-verify-copy">
                        <p class="textile-kicker">Scan. Explore. Understand.</p>
                        <h2>Discover the Story<br><em>Behind Your Product.</em></h2>
                        <p class="textile-lede">Access available product details and traceability records through the OriginX verification experience.</p>
                        <div class="textile-verify-steps">
                            <article><span>01</span><div><h3>Find the product identifier</h3><p>Locate the QR code, product label, or other supported identification method associated with the item.</p></div></article>
                            <article><span>02</span><div><h3>Access product information</h3><p>Use the supported OriginX verification workflow to access information associated with the product.</p></div></article>
                            <article><span>03</span><div><h3>Explore available records</h3><p>Review available material, manufacturing, provenance, or product movement information.</p></div></article>
                        </div>
                        <button class="textile-button textile-button-primary" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                    </div>
                </div>
            </section>

            <section class="textile-closing">
                <div class="container textile-closing-inner">
                    <p class="textile-kicker">The story continues</p>
                    <h2>Every Thread Deserves<br><em>a Traceable Story.</em></h2>
                    <p>Connect textiles and luxury products with available information about their origins, materials, craftsmanship, and supply-chain journeys.</p>
                    <div class="textile-actions">
                        <button class="textile-button textile-button-ivory" type="button" onclick="goToSection('product')">Explore OriginX <span aria-hidden="true">→</span></button>
                        <button class="textile-button textile-button-light-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">↗</span></button>
                    </div>
                </div>
            </section>

            <section class="textile-other-sectors">
                <div class="container"><p>Explore other industries</p><div class="other-sectors-grid">${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic">${INDUSTRIES[key].icon}</span> ${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}</div></div>
            </section>
        </div>
    `;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        container.classList.add('textile-motion-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        container.querySelectorAll('.textile-reveal').forEach(element => observer.observe(element));
    }
}

function scrollToTextileJourney() {
    const section = document.getElementById('textile-journey');
    const top = section.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top: Math.max(top, 0), behavior });
}

function renderFmcgIndustryView(otherSectors, container) {
    const categories = [
        { title: 'Skincare', label: 'Care, considered', description: 'Ingredient details and product information, where provided.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85', alt: 'Elegant skincare bottles arranged in soft natural light' },
        { title: 'Haircare', label: 'Everyday rituals', description: 'Explore available product and batch records.', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85', alt: 'Premium personal care products displayed on a clean surface' },
        { title: 'Personal care', label: 'Made for daily use', description: 'Access the information associated with a consumer product.', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85', alt: 'Thoughtfully arranged bottles and personal care products' },
        { title: 'Cosmetics & makeup', label: 'Colour and craft', description: 'Product identifiers and related records, when available.', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85', alt: 'Cosmetics and beauty products in a curated arrangement' },
        { title: 'Packaged food', label: 'From source to shelf', description: 'Review available dates, ingredients, and product details.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85', alt: 'Fresh packaged food ingredients and produce displayed for market' },
        { title: 'Household essentials', label: 'The everyday edit', description: 'Follow documented product movement through participating stages.', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=85', alt: 'Household care products presented in a clean, minimal setting' }
    ];
    const journey = [
        ['Raw materials', 'Understand available information about the materials and ingredients used in the product.', 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=80', 'Botanical ingredients and skincare materials'],
        ['Formulation & manufacturing', 'Connect the product with relevant manufacturing or formulation records where these are available.', 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80', 'A cosmetics formulation and laboratory workspace'],
        ['Packaging', 'Associate product packaging and identifiers with relevant product records where supported.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80', 'Skincare containers ready for product packaging'],
        ['Distribution', 'Explore available records of product movement through participating distribution networks.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'Organized distribution and consumer goods logistics'],
        ['Retail', 'Make relevant product information accessible to participating retailers and other intended users.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', 'A curated retail display of cosmetics and personal care'],
        ['Product verification', 'Access available product information through the supported OriginX verification experience.', 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=800&q=80', 'A person using a smartphone to access product information']
    ];

    container.innerHTML = `
        <div class="fmcg-page">
            <section class="fmcg-hero">
                <div class="fmcg-hero-image" role="img" aria-label="Premium skincare bottles and botanical ingredients in soft natural light"></div>
                <div class="fmcg-hero-overlay"></div>
                <div class="container fmcg-hero-inner">
                    <div class="fmcg-hero-copy">
                        <p class="fmcg-eyebrow"><span></span> FMCG <i aria-hidden="true">•</i> Cosmetics <i aria-hidden="true">•</i> Product traceability</p>
                        <h1>Know What's Inside.<br><em>Trust What You Choose.</em></h1>
                        <p class="fmcg-hero-lede">From everyday essentials to premium beauty products, OriginX helps connect consumer products with available information about their origins, ingredients, batches, and supply-chain journeys.</p>
                        <p class="fmcg-hero-support">Bring greater transparency to the products people use, the ingredients they contain, and the brands they choose to trust.</p>
                        <div class="fmcg-actions">
                            <button class="fmcg-button fmcg-button-primary" type="button" onclick="scrollToFmcgJourney()">Explore Product Traceability <span aria-hidden="true">↘</span></button>
                            <button class="fmcg-button fmcg-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        </div>
                        <p class="fmcg-hero-note"><span aria-hidden="true">✳</span> Product information, connected across participating supply chains</p>
                    </div>
                    <div class="fmcg-hero-stamp" aria-hidden="true"><span>ORIGINX</span><i>✳</i><small>PRODUCT<br>TRACEABILITY</small></div>
                </div>
                <span class="fmcg-hero-caption">Thoughtful details · considered origins</span>
            </section>

            <section class="fmcg-trust">
                <div class="container">
                    <div class="fmcg-trust-heading"><div><p class="fmcg-kicker">A more considered view</p><h2>Transparency Behind Everyday Products.</h2></div><p class="fmcg-lede">Available product information can help people understand more about the products they choose and the journeys behind them.</p></div>
                    <div class="fmcg-trust-grid">
                        <article class="fmcg-trust-item"><span>01</span><i aria-hidden="true">✳</i><h3>Ingredient information</h3><p>Access available ingredient and sourcing information where recorded.</p></article>
                        <article class="fmcg-trust-item"><span>02</span><i aria-hidden="true">⌕</i><h3>Product identification</h3><p>Explore relevant product identifiers and associated product records.</p></article>
                        <article class="fmcg-trust-item"><span>03</span><i aria-hidden="true">▤</i><h3>Batch-level visibility</h3><p>Access available batch or lot information linked to a product.</p></article>
                        <article class="fmcg-trust-item"><span>04</span><i aria-hidden="true">⌁</i><h3>Supply-chain records</h3><p>Explore documented movement through participating stages where information is available.</p></article>
                    </div>
                </div>
            </section>

            <section class="fmcg-ingredients fmcg-section">
                <div class="container fmcg-editorial-grid fmcg-reveal">
                    <div class="fmcg-image-frame fmcg-ingredient-image">
                        <img src="https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=1200&q=85" alt="Botanical skincare ingredients and natural materials arranged for product formulation" width="1200" height="900" loading="lazy">
                        <span>Ingredients · materials · origin information</span>
                    </div>
                    <div class="fmcg-editorial-copy">
                        <p class="fmcg-kicker">Ingredient transparency</p>
                        <h2>Every Ingredient<br><em>Has a Story.</em></h2>
                        <p class="fmcg-lede">Understanding a product begins with understanding the materials and ingredients behind it. OriginX helps connect consumer products with available ingredient and sourcing information.</p>
                        <div class="fmcg-feature-list">
                            <article><span>01</span><div><h3>Understand ingredient origins</h3><p>Explore available information about the origins and sourcing of ingredients used in a product.</p></div><i aria-hidden="true">↗</i></article>
                            <article><span>02</span><div><h3>Discover product information</h3><p>Access relevant ingredient lists, product details, and associated records where these are provided by the brand or participating business.</p></div><i aria-hidden="true">↗</i></article>
                            <article><span>03</span><div><h3>Follow the sourcing journey</h3><p>Understand the documented journey of relevant ingredients and materials where traceability information is available.</p></div><i aria-hidden="true">↗</i></article>
                        </div>
                        <p class="fmcg-note">Ingredient and sourcing claims depend on records supplied by the relevant businesses. No ingredient is represented as natural, organic, sustainable, ethical, or independently verified without supporting evidence.</p>
                    </div>
                </div>
            </section>

            <section class="fmcg-authenticity fmcg-section">
                <div class="container fmcg-auth-grid fmcg-reveal">
                    <div class="fmcg-auth-copy">
                        <p class="fmcg-kicker">Product authenticity</p>
                        <h2>Know the Product.<br><em>Look Beyond the Packaging.</em></h2>
                        <p class="fmcg-lede">In a world of complex consumer supply chains, accessible product information can help businesses and consumers make more informed checks.</p>
                        <div class="fmcg-auth-list">
                            <article><span>01</span><div><h3>Product identification</h3><p>Access available product identifiers and associated product records.</p></div></article>
                            <article><span>02</span><div><h3>Batch information</h3><p>Review available batch or lot details and relevant product information.</p></div></article>
                            <article><span>03</span><div><h3>Verification support</h3><p>Use supported OriginX verification workflows to access available information associated with a product.</p></div></article>
                        </div>
                        <p class="fmcg-note">A QR code alone does not guarantee authenticity. Reliable authentication depends on the integrity of product identifiers, associated records, and the verification processes in use. OriginX does not detect every counterfeit product.</p>
                    </div>
                    <div class="fmcg-product-visual">
                        <span class="fmcg-illustrative-label">Illustrative product concept</span>
                        <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1100&q=85" alt="Premium skincare bottles in a softly lit product arrangement" width="1100" height="900" loading="lazy">
                        <div class="fmcg-qr-note"><span>＋</span><div><strong>Product record</strong><small>Available information varies by product</small></div></div>
                    </div>
                </div>
            </section>

            <section class="fmcg-batch fmcg-section">
                <div class="container fmcg-batch-grid fmcg-reveal">
                    <div class="fmcg-batch-visual">
                        <span class="fmcg-illustrative-label">Illustrative packaging concept</span>
                        <img src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1100&q=85" alt="Cosmetic bottles and personal-care packaging on a refined neutral background" width="1100" height="900" loading="lazy">
                        <div class="fmcg-batch-overlay"><span>TRACEABILITY</span><strong>One batch.<br>Its own record.</strong></div>
                    </div>
                    <div class="fmcg-batch-copy">
                        <p class="fmcg-kicker">Batch-level product information</p>
                        <h2>Every Batch<br><em>Tells a Story.</em></h2>
                        <p class="fmcg-lede">Batch-level information can help connect consumer products with relevant records associated with their production and distribution.</p>
                        <div class="fmcg-record-panel">
                            <div class="fmcg-record-title"><span>Illustrative information fields</span><i aria-hidden="true">✳</i></div>
                            <div><span>Product name</span><strong>Available product details</strong></div>
                            <div><span>Product identifier</span><strong>Where provided</strong></div>
                            <div><span>Batch or lot number</span><strong>Where recorded</strong></div>
                            <div><span>Manufacturer</span><strong>Where provided</strong></div>
                            <div><span>Relevant dates</span><strong>Where applicable</strong></div>
                            <div><span>Traceability records</span><strong>Available journey details</strong></div>
                        </div>
                        <p class="fmcg-note">All fields are illustrative, not a product record. Information varies by product and records supplied by the relevant business.</p>
                    </div>
                </div>
            </section>

            <section class="fmcg-journey fmcg-section" id="fmcg-journey">
                <div class="container">
                    <div class="fmcg-heading-row fmcg-reveal"><div><p class="fmcg-kicker">From ingredient to consumer</p><h2>Follow the Journey<br><em>Behind Every Product.</em></h2></div><p class="fmcg-lede">Discover how products move from sourced materials through manufacturing, packaging, distribution, and retail—and how traceability can help connect the information recorded at each stage.</p></div>
                    <ol class="fmcg-journey-grid">
                        ${journey.map(([title, description, image, alt], index) => `<li class="fmcg-journey-card fmcg-reveal"><div class="fmcg-journey-image"><img src="${image}" alt="${alt}" width="800" height="520" loading="lazy"><span>0${index + 1}</span></div><div class="fmcg-journey-copy"><i aria-hidden="true">${['✳', '⌘', '▤', '⇢', '⌂', '⌕'][index]}</i><h3>${title}</h3><p>${description}</p></div></li>`).join('')}
                    </ol>
                    <p class="fmcg-note">The records available at each stage depend on participating businesses and supported integrations. OriginX does not automatically capture every supply-chain event.</p>
                </div>
            </section>

            <section class="fmcg-dates fmcg-section">
                <div class="container fmcg-dates-grid fmcg-reveal">
                    <div class="fmcg-dates-copy"><p class="fmcg-kicker">Product details that matter</p><h2>Better Information<br><em>for Better Choices.</em></h2><p class="fmcg-lede">Relevant product details, dates, and available handling records can help consumers and businesses understand products more clearly.</p>
                        <div class="fmcg-date-points">
                            <article><span>01</span><div><h3>Product dates</h3><p>Access manufacturing, expiry, or best-before information where applicable and available.</p></div></article>
                            <article><span>02</span><div><h3>Product details</h3><p>Review relevant product descriptions, ingredients, and other information provided by the brand or participating business.</p></div></article>
                            <article><span>03</span><div><h3>Handling information</h3><p>Explore available handling or storage records where these are maintained and supported.</p></div></article>
                        </div>
                        <p class="fmcg-note">Product dates vary by product and applicable labeling rules. OriginX does not directly measure freshness or guarantee shelf life, safety, or quality.</p>
                    </div>
                    <div class="fmcg-dates-image"><img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85" alt="Skincare product and botanical formulation detail in a clean studio" width="1200" height="950" loading="lazy"><span>Details that support informed review</span></div>
                </div>
            </section>

            <section class="fmcg-brand fmcg-section">
                <div class="container">
                    <div class="fmcg-heading-row fmcg-reveal"><div><p class="fmcg-kicker">Brand transparency</p><h2>Trust Is Built<br><em>Through Transparency.</em></h2></div><p class="fmcg-lede">Brands can build stronger consumer relationships by making relevant product information easier to discover and understand.</p></div>
                    <div class="fmcg-brand-grid">
                        <article><span>01 / CLARITY</span><h3>Clearer product information</h3><p>Help consumers access relevant details associated with a product.</p></article>
                        <article><span>02 / VISIBILITY</span><h3>Greater supply-chain visibility</h3><p>Connect available product records with documented supply-chain stages.</p></article>
                        <article><span>03 / CHOICE</span><h3>More informed purchasing</h3><p>Enable consumers to review available information before making a choice.</p></article>
                        <article><span>04 / ACCOUNTABILITY</span><h3>Brand accountability</h3><p>Support transparent communication through accessible and appropriately maintained product information.</p></article>
                    </div>
                    <p class="fmcg-note">These are potential benefits of effective traceability and transparent information—not guarantees of sales, loyalty, or brand performance.</p>
                </div>
            </section>

            <section class="fmcg-verification fmcg-section">
                <div class="container fmcg-verify-grid fmcg-reveal">
                    <div class="fmcg-verify-visual">
                        <span class="fmcg-illustrative-label">Illustrative interface · not a product result</span>
                        <div class="fmcg-info-card"><div class="fmcg-info-brand"><span>✳</span><strong>PRODUCT INFORMATION<small>EXAMPLE FIELDS ONLY</small></strong></div><img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=760&q=80" alt="Cosmetic packaging shown as illustrative product information imagery" width="760" height="520" loading="lazy"><div><span>Product details</span><strong>Where provided</strong></div><div><span>Ingredient records</span><strong>Where available</strong></div><div><span>Batch information</span><strong>Where recorded</strong></div><div><span>Traceability</span><strong>Participating stages</strong></div></div>
                    </div>
                    <div class="fmcg-verify-copy"><p class="fmcg-kicker">Scan. Explore. Understand.</p><h2>Your Product.<br><em>More Information.</em></h2><p class="fmcg-lede">Access available product details and traceability records through the OriginX verification experience.</p>
                        <div class="fmcg-verify-steps">
                            <article><span>01</span><div><h3>Locate the product code</h3><p>Find the QR code, product identifier, or other supported verification method on the packaging.</p></div></article>
                            <article><span>02</span><div><h3>Access product information</h3><p>Use the existing OriginX verification experience to open the information associated with the product.</p></div></article>
                            <article><span>03</span><div><h3>Review available records</h3><p>Explore the available product details, batch information, ingredient records, or traceability data.</p></div></article>
                        </div>
                        <button class="fmcg-button fmcg-button-dark" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        <p class="fmcg-note">Product information varies by product and the records supplied. The example panel is illustrative only.</p>
                    </div>
                </div>
            </section>

            <section class="fmcg-stakeholders fmcg-section">
                <div class="container">
                    <div class="fmcg-heading-row fmcg-reveal"><div><p class="fmcg-kicker">A shared product journey</p><h2>One Product Journey.<br><em>Many Reasons to Trust.</em></h2></div><p class="fmcg-lede">Relevant information can help every participant understand the product's journey and their role in making records accessible.</p></div>
                    <div class="fmcg-stakeholder-grid">
                        <article><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80" alt="Beauty products representing brands and manufacturers" width="700" height="480" loading="lazy"><span>01 / AT SOURCE</span><h3>Brands and manufacturers</h3><p>Connect consumer products with relevant ingredient, batch, and manufacturing information where supported.</p></article>
                        <article><img src="https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=700&q=80" alt="Botanical ingredients representing ingredient suppliers" width="700" height="480" loading="lazy"><span>02 / MATERIALS</span><h3>Ingredient suppliers</h3><p>Make available sourcing and material information easier to associate with downstream products.</p></article>
                        <article><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80" alt="Consumer products arranged for retail" width="700" height="480" loading="lazy"><span>03 / IN MARKET</span><h3>Distributors and retailers</h3><p>Access available product records and improve visibility into documented product movement.</p></article>
                        <article><img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80" alt="Beauty and personal care products for consumers" width="700" height="480" loading="lazy"><span>04 / FOR PEOPLE</span><h3>Consumers</h3><p>Explore available product information and make more informed purchasing decisions.</p></article>
                    </div>
                </div>
            </section>

            <section class="fmcg-showcase fmcg-section">
                <div class="container">
                    <div class="fmcg-heading-row fmcg-reveal"><div><p class="fmcg-kicker">The considered collection</p><h2>Every Product Has<br><em>Its Own Story.</em></h2></div><p class="fmcg-lede">From personal-care rituals to everyday essentials, explore the variety of consumer products whose details and journeys can be represented through available records.</p></div>
                    <div class="fmcg-category-grid">${categories.map((category, index) => `<article class="fmcg-category fmcg-reveal"><div class="fmcg-category-image"><img src="${category.image}" alt="${category.alt}" width="900" height="1100" loading="lazy"><span>0${index + 1}</span></div><div class="fmcg-category-label">${category.label}</div><h3>${category.title}</h3><p>${category.description}</p></article>`).join('')}</div>
                    <p class="fmcg-note">Category photography is illustrative. Product records and capabilities vary by product and participating business.</p>
                </div>
            </section>

            <section class="fmcg-closing">
                <div class="container fmcg-closing-inner fmcg-reveal"><p class="fmcg-kicker">OriginX · consumer product traceability</p><h2>Make Every Product<br>More Transparent.</h2><p>Connect consumer products with available ingredient, batch, and supply-chain information through OriginX.</p><div class="fmcg-actions"><button class="fmcg-button fmcg-button-light" type="button" onclick="goToSection('product')">Explore OriginX <span aria-hidden="true">→</span></button><button class="fmcg-button fmcg-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div></div>
            </section>

            <section class="fmcg-other-sectors"><div class="container"><p>Explore other OriginX sectors</p><div class="other-sectors-grid">${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic" aria-hidden="true">${INDUSTRIES[key].icon}</span>${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}</div></div></section>
        </div>
    `;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        container.classList.add('fmcg-motion-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        container.querySelectorAll('.fmcg-reveal').forEach(element => observer.observe(element));
    }
}

function scrollToFmcgJourney() {
    const section = document.getElementById('fmcg-journey');
    const top = section.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top: Math.max(top, 0), behavior });
}

// ===================================================================
// Header Search: live autocomplete + submit
// ===================================================================

let searchActiveIndex = -1;
let searchCurrentResults = [];

function closeSearchPanel() {
    const panel = document.getElementById('headerSearchPanel');
    panel.classList.remove('open');
    panel.innerHTML = '';
    searchActiveIndex = -1;
    searchCurrentResults = [];
}

function getSearchMatches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], industries: [] };

    const products = Object.entries(PRODUCTS)
        .filter(([id, p]) => {
            if (id.toLowerCase().includes(q)) return true;
            if (p.name.toLowerCase().includes(q)) return true;
            if (p.brand && p.brand.toLowerCase().includes(q)) return true;
            if (p.aliases && p.aliases.some(a => a.toLowerCase().includes(q))) return true;
            return false;
        })
        .slice(0, 5)
        .map(([id, p]) => ({ type: 'product', id, ...p }));

    const industries = Object.entries(INDUSTRIES)
        .filter(([id, ind]) => ind.name.toLowerCase().includes(q) || id.includes(q))
        .slice(0, 4)
        .map(([id, ind]) => ({ type: 'industry', id, ...ind }));

    return { products, industries };
}

function renderSearchPanel(query) {
    const panel = document.getElementById('headerSearchPanel');
    const q = query.trim();

    if (!q) {
        closeSearchPanel();
        return;
    }

    const { products, industries } = getSearchMatches(q);
    searchCurrentResults = [...products, ...industries];
    searchActiveIndex = -1;

    if (searchCurrentResults.length === 0) {
        const sampleIds = Object.keys(PRODUCTS).slice(0, 4);
        panel.innerHTML = `
            <div class="header-search-empty">
                <p>No registered match for "${escapeHtml(q)}" yet.</p>
                <p>Try a registered sample batch ID:</p>
                <div class="header-search-empty-codes">
                    ${sampleIds.map(id => `<button onclick="goToTrace('${id}')">${id}</button>`).join('')}
                </div>
            </div>`;
        panel.classList.add('open');
        return;
    }

    let html = '';
    if (products.length) {
        html += `<div class="header-search-panel-label">Products</div>`;
        html += products.map((p, i) => `
            <button class="header-search-result" data-idx="${i}" onclick="goToTrace('${p.id}')">
                <div class="header-search-result-icon">${p.industry.slice(0, 2).toUpperCase()}</div>
                <div class="header-search-result-text">
                    <div class="header-search-result-title">${escapeHtml(p.name)}</div>
                    <div class="header-search-result-sub">${p.id} · ${escapeHtml(p.originLocation)}</div>
                </div>
            </button>
        `).join('');
    }
    if (industries.length) {
        html += `<div class="header-search-panel-label">Industries</div>`;
        html += industries.map((ind, i) => `
            <button class="header-search-result" data-idx="${products.length + i}" onclick="goToIndustry('${ind.id}')">
                <div class="header-search-result-icon">${ind.id.slice(0, 2).toUpperCase()}</div>
                <div class="header-search-result-text">
                    <div class="header-search-result-title">${escapeHtml(ind.name)}</div>
                    <div class="header-search-result-sub">View sector traceability details</div>
                </div>
            </button>
        `).join('');
    }

    panel.innerHTML = html;
    panel.classList.add('open');
}

function submitHeaderSearch() {
    const input = document.getElementById('headerSearchInput');
    const q = input.value.trim();
    if (!q) return;

    if (searchActiveIndex >= 0 && searchCurrentResults[searchActiveIndex]) {
        const r = searchCurrentResults[searchActiveIndex];
        r.type === 'product' ? goToTrace(r.id) : goToIndustry(r.id);
        return;
    }

    // Exact match on batch ID -> trace; else if matches an industry name -> industry; otherwise show not-found.
    const upperQ = q.toUpperCase();
    if (PRODUCTS[upperQ]) {
        goToTrace(upperQ);
        return;
    }
    const industryMatch = Object.entries(INDUSTRIES).find(([id, ind]) => ind.name.toLowerCase().includes(q.toLowerCase()));
    if (industryMatch && !/^TIN-/i.test(q)) {
        goToIndustry(industryMatch[0]);
        return;
    }
    goToTrace(upperQ);
}

function updateActiveResult() {
    document.querySelectorAll('.header-search-result').forEach((el, i) => {
        el.classList.toggle('active', i === searchActiveIndex);
    });
    const active = document.querySelector('.header-search-result.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
}

function initHeaderSearch() {
    const input = document.getElementById('headerSearchInput');
    const goBtn = document.getElementById('headerSearchGo');
    const wrap = document.getElementById('headerSearch');

    input.addEventListener('input', () => renderSearchPanel(input.value));
    input.addEventListener('focus', () => { if (input.value.trim()) renderSearchPanel(input.value); });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (searchCurrentResults.length) {
                searchActiveIndex = Math.min(searchActiveIndex + 1, searchCurrentResults.length - 1);
                updateActiveResult();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (searchCurrentResults.length) {
                searchActiveIndex = Math.max(searchActiveIndex - 1, 0);
                updateActiveResult();
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            submitHeaderSearch();
        } else if (e.key === 'Escape') {
            closeSearchPanel();
            input.blur();
        }
    });

    goBtn.addEventListener('click', submitHeaderSearch);

    document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) closeSearchPanel();
    });
}

// ===================================================================
// Utilities
// ===================================================================

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

function buildTraceUrl(batchId) {
    const base = location.origin + location.pathname;
    return `${base}#trace/${encodeURIComponent(batchId)}`;
}

function generateQrSvg(seed) {
    // Generates a real, scannable QR code (not a decorative pattern) that
    // encodes this product's live trace URL, so a phone camera or QR
    // scanner app can open this exact product page directly.
    const url = buildTraceUrl(seed);
    try {
        const qr = qrcode(10, 'M');
        qr.addData(url);
        qr.make();

        const count = qr.getModuleCount();
        const margin = 2; // quiet-zone modules around the code
        const total = count + margin * 2;
        let rects = '';
        for (let row = 0; row < count; row++) {
            for (let col = 0; col < count; col++) {
                if (qr.isDark(row, col)) {
                    rects += `<rect x="${col + margin}" y="${row + margin}" width="1" height="1"/>`;
                }
            }
        }
        return `<svg viewBox="0 0 ${total} ${total}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#ffffff"/><g fill="#0f1f35">${rects}</g></svg>`;
    } catch (err) {
        console.error('QR code generation failed:', err);
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/><text x="50" y="55" font-size="8" text-anchor="middle" fill="#888">QR unavailable</text></svg>`;
    }
}

// ===================================================================
// Init
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderSearch();
    initQrScanner();
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }
    document.getElementById('detailClose').addEventListener('click', () => { document.getElementById('detailModal').hidden = true; });
    document.addEventListener('click', e => {
        const journey = e.target.closest('.journey-step');
        if (journey) {
            const product = PRODUCTS[journey.dataset.batchId];
            const step = product && product.journey[Number(journey.dataset.journeyIndex)];
            if (step) showDetail(step.title, `${step.location} | ${step.date}\n\n${step.desc}`);
        }
        const cert = e.target.closest('.cert-row');
        if (cert) showDetail('Demo Verification', `${cert.dataset.cert}\n\nThis is a demo-only certificate record. Issuing body and date will be verified through the certification service in production.`);
        const share = e.target.closest('[data-share-batch]');
        if (share) shareProduct(share.dataset.shareBatch).catch(() => {});
        const pdf = e.target.closest('[data-pdf-batch]');
        if (pdf) downloadPassport(pdf.dataset.pdfBatch);
    });
    document.getElementById('heroGetStarted').addEventListener('click', goToVerify);
    document.getElementById('heroLearnMore').addEventListener('click', () => {
        goHome();
        setTimeout(() => scrollToHash('how'), 60);
    });
    document.querySelectorAll('[data-mobile-action]').forEach(link => link.addEventListener('click', e => {
        e.preventDefault();
        const action = link.dataset.mobileAction;
        if (action === 'home') goHome();
        if (action === 'verify') goToVerify();
        if (action === 'industries') { goHome(); setTimeout(() => scrollToHash('industries'), 60); }
        if (action === 'contact') goToSection('contact');
    }));
    handleHashRoute();
});