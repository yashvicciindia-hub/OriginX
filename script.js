
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
        renderAgricultureIndustryView(ind, otherSectors, container);
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

function renderAgricultureIndustryView(ind, otherSectors, container) {
    const sampleId = ind.sampleIds[0];
    const sampleProduct = PRODUCTS[sampleId];
    const categories = [
        { name: 'Rice & grains', label: 'The staple harvest', detail: 'Field, harvest, and batch information', image: 'assets/agriculture-fields.png', alt: 'Golden morning light over Indian rice fields and green crops' },
        { name: 'Pulses & legumes', label: 'Grown for nourishment', detail: 'Origin and handling records', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=85', alt: 'Fresh agricultural produce gathered for market' },
        { name: 'Indian spices', label: 'A heritage of flavour', detail: 'Regional crops and product journeys', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85', alt: 'Colorful Indian spices arranged for food preparation' },
        { name: 'Fresh produce', label: 'From soil to table', detail: 'Available dates and handling information', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85', alt: 'Freshly harvested vegetables at a produce market' },
        { name: 'Edible oils', label: 'Made from the harvest', detail: 'Product and batch details', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85', alt: 'Golden cooking oil and ingredients on a table' },
        { name: 'Packaged foods', label: 'Ready for the journey', detail: 'Label-linked product information', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', alt: 'Freshly baked bread made from agricultural grain' }
    ];

    container.innerHTML = `
        <div class="agriculture-page">
            <section class="agri-hero">
                <div class="agri-hero-photo" role="img" aria-label="Farmers tending green rice fields in the warm light of sunrise"></div>
                <div class="agri-hero-shade"></div>
                <div class="container agri-hero-inner">
                    <div class="agri-hero-copy">
                        <p class="agri-eyebrow"><span></span> Agriculture <i aria-hidden="true">•</i> Food <i aria-hidden="true">•</i> Traceability</p>
                        <h1>Know Your Food.<br><em>Trust Its Journey.</em></h1>
                        <p class="agri-hero-lede">From the fields where food begins to the markets and families it reaches, OriginX helps bring greater transparency to agricultural supply chains.</p>
                        <p class="agri-hero-support">Discover product origins, explore available traceability records, and make more informed choices about the food you buy.</p>
                        <div class="agri-actions">
                            <button class="agri-button agri-button-primary" type="button" onclick="scrollToAgricultureJourney()">Explore Farm-to-Fork Traceability <span aria-hidden="true">↘</span></button>
                            <button class="agri-button agri-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        </div>
                        <p class="agri-hero-note"><span aria-hidden="true">✳</span> A connected record for every participating product journey</p>
                    </div>
                    <div class="agri-hero-note-card" aria-label="Traceability connects a product's origin, journey, and available records">
                        <span class="agri-note-kicker">A journey, made visible</span>
                        <strong>Origin <i>→</i> Journey <i>→</i> Trust</strong>
                        <span>Available product information, connected in one place.</span>
                    </div>
                </div>
                <span class="agri-hero-caption">A field in the first light · India</span>
            </section>

            <section class="agri-trust" aria-label="Traceability information">
                <div class="container">
                    <div class="agri-trust-heading">
                        <div><p class="agri-section-kicker">A clearer view of the journey</p><h2>Transparency at Every Stage.</h2></div>
                        <p class="agri-section-intro">Better access to product information helps businesses and consumers understand the journey behind the food they choose.</p>
                    </div>
                    <div class="agri-trust-points">
                        <article><span class="agri-trust-number">01</span><span class="agri-trust-icon" aria-hidden="true">⌖</span><h3>Product origin</h3><p>Understand where an agricultural product comes from.</p></article>
                        <article><span class="agri-trust-number">02</span><span class="agri-trust-icon" aria-hidden="true">⌁</span><h3>Traceable journey</h3><p>Explore available records of product movement through the supply chain.</p></article>
                        <article><span class="agri-trust-number">03</span><span class="agri-trust-icon" aria-hidden="true">▤</span><h3>Quality information</h3><p>Access relevant quality, handling, or documentation records when available.</p></article>
                        <article><span class="agri-trust-number">04</span><span class="agri-trust-icon" aria-hidden="true">✳</span><h3>Consumer confidence</h3><p>Make more informed decisions using accessible product information.</p></article>
                    </div>
                </div>
            </section>

            <section class="agri-story agri-section">
                <div class="container agri-story-grid agri-reveal">
                    <div class="agri-story-image">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85" alt="Fresh vegetables selected at an agricultural produce market" width="1200" height="900" loading="lazy">
                        <span class="agri-image-caption">A closer look at what reaches the table</span>
                    </div>
                    <div class="agri-story-copy">
                        <p class="agri-section-kicker">Freshness starts with information</p>
                        <h2>Freshness You Can Understand.<br><em>Information You Can Trust.</em></h2>
                        <p class="agri-section-intro">Knowing more about a product's journey can help you make better-informed food choices. OriginX brings relevant product and traceability information closer to the people who need it.</p>
                        <div class="agri-editorial-list">
                            <article><span class="agri-list-number">01</span><div><h3>Understand product origins</h3><p>Discover available information about where your food comes from and the agricultural journey behind it.</p></div><span class="agri-list-mark" aria-hidden="true">↗</span></article>
                            <article><span class="agri-list-number">02</span><div><h3>Explore relevant product records</h3><p>Access available batch details, dates, handling information, and other recorded information that may help you understand a product.</p></div><span class="agri-list-mark" aria-hidden="true">↗</span></article>
                            <article><span class="agri-list-number">03</span><div><h3>Make informed food choices</h3><p>Use accessible product information to make more informed decisions when selecting agricultural products and food.</p></div><span class="agri-list-mark" aria-hidden="true">↗</span></article>
                        </div>
                        <p class="agri-freshness-note">Freshness assessment depends on relevant dates, storage conditions, handling information, and appropriate quality checks. Traceability alone does not guarantee freshness, shelf life, or product quality.</p>
                    </div>
                </div>
            </section>

            <section class="agri-traceability agri-section">
                <div class="container">
                    <div class="agri-heading-row agri-reveal">
                        <div><p class="agri-section-kicker">Know where it comes from</p><h2>Every Product<br>Has an Origin.</h2></div>
                        <p class="agri-section-intro">Traceability helps connect agricultural products with the information behind their journey, from production through processing and distribution.</p>
                    </div>
                    <div class="agri-benefit-grid">
                        <article class="agri-benefit agri-reveal"><span>01 <i>⌖</i></span><h3>Origin transparency</h3><p>Understand the recorded source of an agricultural product and its associated origin information.</p></article>
                        <article class="agri-benefit agri-reveal"><span>02 <i>▤</i></span><h3>Batch-level visibility</h3><p>Explore available batch identifiers and related records to understand the product more clearly.</p></article>
                        <article class="agri-benefit agri-reveal"><span>03 <i>⌁</i></span><h3>Supply-chain visibility</h3><p>Follow documented movement through participating stages of the supply chain where information is available.</p></article>
                        <article class="agri-benefit agri-reveal"><span>04 <i>↗</i></span><h3>Informed purchasing</h3><p>Give consumers and businesses access to relevant product information that supports better-informed purchasing decisions.</p></article>
                    </div>
                </div>
            </section>

            <section class="agri-journey agri-section" id="agriculture-journey">
                <div class="container">
                    <div class="agri-heading-row agri-reveal">
                        <div><p class="agri-section-kicker">From farm to fork</p><h2>From Indian Soil<br>to Your Table.</h2></div>
                        <p class="agri-section-intro">Discover how agricultural products move through the supply chain and how traceability can help make that journey more transparent.</p>
                    </div>
                    <ol class="agri-journey-list">
                        ${[
                            ['Cultivation', 'Food begins with the land, the farmer, and the agricultural practices used to grow the crop.', 'assets/agriculture-fields.png', 'An Indian farmer tending green crops in a rice field'],
                            ['Harvesting', "Harvest records and relevant product information can help establish the beginning of a product's documented journey.", 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80', 'Cultivated fields ready for harvest in warm early light'],
                            ['Processing', "Relevant processing and handling information can help businesses maintain a clearer record of the product's journey.", 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80', 'Grain transformed into food during processing'],
                            ['Packaging', 'Product labels and batch identifiers can connect physical products with their available digital information.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80', 'Agricultural spices ready to be handled and packaged'],
                            ['Distribution', 'Recorded supply-chain movements can help provide greater visibility as products travel toward retailers and markets.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80', 'Fresh produce on its way to markets and retailers'],
                            ['Verification', 'Where supported, consumers and businesses can access available product information through the OriginX verification experience.', 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=700&q=80', 'A person using a smartphone to access product information']
                        ].map(([title, description, image, alt], index) => `
                            <li class="agri-journey-step agri-reveal">
                                <div class="agri-journey-photo"><img src="${image}" alt="${alt}" width="700" height="460" loading="lazy"><span class="agri-step-number">0${index + 1}</span></div>
                                <div class="agri-journey-copy"><span class="agri-step-icon" aria-hidden="true">${['⌁', '✳', '⌘', '▧', '⇢', '⌕'][index]}</span><h3>${title}</h3><p>${description}</p></div>
                            </li>
                        `).join('')}
                    </ol>
                    <p class="agri-journey-disclaimer">These are illustrative supply-chain stages. The records available depend on participating businesses and the information they provide. OriginX connects product information; it does not independently inspect or certify products.</p>
                </div>
            </section>

            <section class="agri-heritage agri-section">
                <div class="container agri-heritage-grid agri-reveal">
                    <div class="agri-heritage-copy">
                        <p class="agri-section-kicker">Knowledge carried forward</p>
                        <h2>Rooted in Indian Soil.<br><em>Connected by Trust.</em></h2>
                        <p class="agri-section-intro">India's agricultural heritage is built on generations of farming knowledge, diverse crops, regional traditions, and the people who bring food to our tables.</p>
                        <p class="agri-section-intro agri-heritage-followup">Transparent product information can help preserve the documented story of agricultural goods as they travel from their origins toward the people who depend on them.</p>
                        <div class="agri-heritage-rule"><span aria-hidden="true">✳</span><span>Respect for origin. Clarity for the journey.</span></div>
                    </div>
                    <figure class="agri-heritage-image">
                        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="A heritage-inspired arrangement of food and spices" width="1200" height="900" loading="lazy">
                        <figcaption>Generations of care, carried into every harvest</figcaption>
                    </figure>
                </div>
            </section>

            <section class="agri-collection agri-section">
                <div class="container">
                    <div class="agri-heading-row agri-reveal">
                        <div><p class="agri-section-kicker">The abundance of the land</p><h2>Every Crop<br><em>Has a Story.</em></h2></div>
                        <p class="agri-section-intro">Explore the diversity of agricultural products and the importance of understanding their origins.</p>
                    </div>
                    <div class="agri-category-grid">
                        ${categories.map((category, index) => `
                            <article class="agri-category-card agri-reveal">
                                <div class="agri-category-image"><img src="${category.image}" alt="${category.alt}" width="900" height="1100" loading="lazy"></div>
                                <div class="agri-category-meta"><span>0${index + 1}</span><span>${category.label}</span></div>
                                <h3>${category.name}</h3>
                                <p>${category.detail}</p>
                            </article>
                        `).join('')}
                    </div>
                    <p class="agri-collection-note">Category imagery is illustrative; availability and records vary by participating product and supply chain.</p>
                </div>
            </section>

            <section class="agri-participants agri-section">
                <div class="container">
                    <div class="agri-heading-row agri-reveal">
                        <div><p class="agri-section-kicker">A shared food journey</p><h2>One Connected Journey.<br><em>Many Reasons to Trust.</em></h2></div>
                        <p class="agri-section-intro">Better access to relevant product information can help every participant understand the part they play in the journey from farm to fork.</p>
                    </div>
                    <div class="agri-participant-grid">
                        <article class="agri-participant agri-reveal"><span>01 / AT ORIGIN</span><h3>Farmers &amp; producers</h3><p>Help make available origin and production information more visible to downstream businesses and consumers.</p></article>
                        <article class="agri-participant agri-reveal"><span>02 / IN TRANSFORMATION</span><h3>Food processors</h3><p>Organize relevant product, batch, and processing records where supported.</p></article>
                        <article class="agri-participant agri-reveal"><span>03 / ON THE MOVE</span><h3>Distributors &amp; retailers</h3><p>Access available product information and documented supply-chain records.</p></article>
                        <article class="agri-participant agri-reveal"><span>04 / AT THE TABLE</span><h3>Consumers</h3><p>Explore available product information to make more informed choices about the food they purchase.</p></article>
                    </div>
                </div>
            </section>

            <section class="agri-compliance agri-section">
                <div class="container">
                    <div class="agri-compliance-head agri-reveal">
                        <p class="agri-section-kicker">Records that support better decisions</p>
                        <h2>Better Records.<br>Greater Transparency.</h2>
                        <p class="agri-section-intro">Clear product records can help businesses organize relevant information and provide greater visibility into agricultural supply chains.</p>
                    </div>
                    <div class="agri-compliance-grid">
                        <article class="agri-compliance-item agri-reveal"><span class="agri-compliance-icon" aria-hidden="true">▤</span><h3>Quality documentation</h3><p>Keep relevant quality records and supporting documentation accessible where these records are maintained by participating businesses.</p></article>
                        <article class="agri-compliance-item agri-reveal"><span class="agri-compliance-icon" aria-hidden="true">⌖</span><h3>Handling and storage information</h3><p>Make relevant recorded handling and storage information easier to understand when such information is available.</p></article>
                        <article class="agri-compliance-item agri-reveal"><span class="agri-compliance-icon" aria-hidden="true">↗</span><h3>Supply-chain accountability</h3><p>Improve visibility into documented product movements and associated records across participating supply-chain stages.</p></article>
                    </div>
                    <p class="agri-compliance-note">Traceability alone does not make a product safe. OriginX does not independently inspect food, test samples, certify products, or guarantee regulatory compliance. Applicable requirements and approvals are determined by relevant authorities, including FSSAI where appropriate.</p>
                </div>
            </section>

            <section class="agri-verify agri-section">
                <div class="container agri-verify-grid agri-reveal">
                    <div class="agri-verify-visual">
                        <span class="agri-illustrative-tag">Illustrative example</span>
                        <div class="agri-product-label">
                            <div class="agri-label-brand"><span class="agri-grain-mark" aria-hidden="true">✳</span><span>OriginX <small>PRODUCT PASSPORT</small></span></div>
                            <div class="agri-label-art" aria-hidden="true">🌾</div>
                            <p class="agri-label-eyebrow">AGRICULTURAL PRODUCT</p>
                            <h3>Origin-linked product</h3>
                            <div class="agri-label-bottom">${generateQrSvg(sampleId)}<span>Scan to view<br>available details</span></div>
                        </div>
                    </div>
                    <div class="agri-verify-copy">
                        <p class="agri-section-kicker">Scan. Explore. Understand.</p>
                        <h2>More Than a Label.<br><em>A Window Into Your Product.</em></h2>
                        <p class="agri-section-intro">Product verification can help people access available information about an agricultural product and understand its recorded journey.</p>
                        <div class="agri-verification-steps">
                            <article><span>01</span><div><h3>Find the product</h3><p>Locate the product's QR code, batch identifier, or other supported verification method.</p></div></article>
                            <article><span>02</span><div><h3>Access available information</h3><p>Use the existing OriginX verification experience to view the information associated with the product.</p></div></article>
                            <article><span>03</span><div><h3>Understand its journey</h3><p>Explore available origin, batch, handling, or supply-chain records and use them to make a more informed decision.</p></div></article>
                        </div>
                        <div class="agri-record-preview">
                            <span class="agri-preview-label">Illustrative product record</span>
                            <div><span>Product name</span><strong>Available in the product record</strong></div>
                            <div><span>Origin</span><strong>Shown when provided</strong></div>
                            <div><span>Dates &amp; batch</span><strong>Available recorded details</strong></div>
                            <div><span>Traceability</span><strong>Participating supply-chain records</strong></div>
                        </div>
                        <button class="agri-button agri-button-dark" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                        <p class="agri-example-note">Demonstration content only. The QR links to the existing illustrative sample record, not a real-world product claim.</p>
                    </div>
                </div>
            </section>

            <section class="agri-closing">
                <div class="container agri-closing-inner agri-reveal">
                    <p class="agri-section-kicker">The next chapter begins at origin</p>
                    <h2>Every Journey<br>Deserves to Be Known.</h2>
                    <p>Bring product origins, available traceability information, and greater supply-chain transparency closer to the people who need them.</p>
                    <div class="agri-actions">
                        <button class="agri-button agri-button-light" type="button" onclick="goToSection('product')">Explore OriginX <span aria-hidden="true">→</span></button>
                        <button class="agri-button agri-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                    </div>
                </div>
            </section>

            <section class="agri-other-sectors">
                <div class="container"><p>Explore more of OriginX</p><div class="other-sectors-grid">
                    ${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic" aria-hidden="true">${INDUSTRIES[key].icon}</span>${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}
                </div></div>
            </section>
        </div>
    `;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        container.classList.add('agri-motion-ready');
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        container.querySelectorAll('.agri-reveal').forEach(element => revealObserver.observe(element));
    }
}

function scrollToAgricultureJourney() {
    const journeySection = document.getElementById('agriculture-journey');
    const top = journeySection.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight;
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