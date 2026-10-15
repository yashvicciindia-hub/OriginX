const TRADE_ICONS = {
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="m3 7 9 4 9-4m-9 4v10m-4-16 9 4"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    label: '<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="9" cy="9" r="1"/><path d="m13 10 4 4"/>',
    ship: '<path d="M3 14h18l-2 5H6l-3-5Z"/><path d="M6 14V6h9l3 8M9 6V3h4v3M3 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 3-1"/>',
    document: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5m-9 5h5m-5 4h6m-6 4h4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    warehouse: '<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M7 21v-7h10v7M7 10h.01M12 10h.01M17 10h.01"/>',
    link: '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="6" r="3"/><circle cx="17" cy="18" r="3"/><path d="m9.6 10.5 4.8-3m-4.8 6 4.8 3"/>',
    factory: '<path d="M3 21V9l6 3V8l6 4V5h6v16H3Z"/><path d="M7 17h.01M11 17h.01M15 17h.01M18 8h.01"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M8 10.5h5"/>',
    truck: '<path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    person: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    thermometer: '<path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0Z"/><path d="M11 12v6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z"/><path d="M5 20c3-5 7-8 12-11"/>'
};

function tradeIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TRADE_ICONS[name] || TRADE_ICONS.box}</svg>`;
}

function renderImportExportPage(container) {
    const benefits = [
        ['pin', 'Know the Origin', "Explore available information about a product's source, manufacturer, or place of origin."],
        ['search', 'Trace Product Batches', 'Connect products with relevant batch and product records where available.'],
        ['ship', 'Follow the Journey', 'Explore recorded supply-chain milestones across participating locations.'],
        ['document', 'Access Product Records', 'Review product, manufacturing, or shipment information that has been shared.'],
        ['link', 'Connect Trade Partners', 'Make information shared across participating supply-chain partners easier to explore.']
    ];
    const stages = [
        { icon: 'factory', title: 'Manufacturer & origin', text: 'A product starts with an identity and the details its producer or manufacturer records.', records: ['Manufacturer or producer', 'Product identity', 'Origin, where recorded', 'Batch or lot reference'] },
        { icon: 'box', title: 'Export preparation', text: 'Products are identified, packaged, labeled, and prepared for dispatch.', records: ['Product or batch identification', 'Packaging information', 'Quality or inspection records, if shared', 'Consignment reference, where applicable'] },
        { icon: 'ship', title: 'Port & international transit', text: 'A shipment may pass through logistics partners and multiple handovers.', records: ['Dispatch or handover events', 'Shipment references', 'Recorded transit milestones', 'Participating logistics providers'] },
        { icon: 'warehouse', title: 'Import & receiving', text: 'Goods arrive at a destination facility, where receiving details may be recorded.', records: ['Arrival or receiving events', 'Receiving facility', 'Product or batch reference', 'Handling records, where available'] },
        { icon: 'truck', title: 'Distribution & destination', text: 'Products continue to distributors, retailers, or business buyers.', records: ['Distribution location', 'Recorded handovers', 'Product identity', 'Available traceability records'] }
    ];
    const routes = [
        { name: 'India to Europe', origin: 'India', destination: 'Europe', mode: 'Illustrative sea freight', stops: ['Origin', 'Export preparation', 'Port & transit', 'Import receiving', 'Distribution'], note: 'A sample route showing how product records may connect across participating trade partners.' },
        { name: 'India to Southeast Asia', origin: 'India', destination: 'Southeast Asia', mode: 'Illustrative sea or air freight', stops: ['Origin', 'Dispatch', 'International transit', 'Receiving', 'Destination'], note: 'An illustrative regional journey. Locations and events depend on the records shared for a product.' },
        { name: 'India to the Middle East', origin: 'India', destination: 'Middle East', mode: 'Illustrative sea or air freight', stops: ['Manufacturer', 'Export handover', 'Transit', 'Import receiving', 'Buyer'], note: 'A conceptual route, not a customer shipment or live tracking view.' }
    ];
    const records = {
        product: [['Product name', 'Illustrative textile product'], ['Product ID', 'Example identifier'], ['Manufacturer', 'Participating manufacturer, if recorded'], ['Origin', 'Available origin information']],
        batch: [['Batch / lot', 'Example batch reference'], ['Manufacturing', 'Associated records, where available'], ['Packaging', 'Recorded product packaging details'], ['Related records', 'Information shared by participants']],
        journey: [['Origin event', 'Recorded event, if available'], ['Dispatch', 'Recorded handover, if available'], ['Receiving', 'Recorded receiving event, if available'], ['Destination', 'Available distribution details']],
        documents: [['Product records', 'References shared for this product'], ['Shipment records', 'Available shipment-related information'], ['Other details', 'Availability varies by product'], ['Official documents', 'Not issued or approved by OriginX']]
    };
    const stakeholders = [
        ['box', 'Exporters & manufacturers', 'Connect products with available origin information and relevant batch records.'],
        ['warehouse', 'Importers & distributors', 'Explore shared product details and recorded receiving or distribution events.'],
        ['ship', 'Logistics & freight partners', 'Reference product and shipment identifiers and review recorded handovers.'],
        ['person', 'Retailers & business buyers', 'Access available product information and relevant batch records.'],
        ['search', 'Consumers & end buyers', 'Use supported verification features to explore the information available.']
    ];
    const networkNodes = [
        ['pin', 'Origin', 'Explore available source, producer, or manufacturer information.'],
        ['box', 'Product identity', 'Access identifying product details that have been recorded.'],
        ['label', 'Batch information', 'Review associated batch records, where available.'],
        ['ship', 'Supply-chain events', 'Explore recorded journey milestones from participating businesses.'],
        ['check', 'Verification', 'Open the OriginX verification experience to check supported product records.']
    ];
    const categories = [
        ['Agriculture & food', 'Product identity and origin information.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=82', 'A vibrant produce market display'],
        ['Pharmaceuticals', 'Product and batch records, where supported.', 'assets/image.png', 'Pharmaceutical packaging and medical supplies'],
        ['FMCG & cosmetics', 'Explore relevant manufacturing and product details.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=82', 'Personal care products arranged on a shelf'],
        ['Textiles & apparel', 'Connect product identity with origin information.', 'assets/textile.png', 'Textiles and artisan fabrics'],
        ['Electronics & accessories', 'Explore product identifiers and available records.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=82', 'A pair of premium headphones'],
        ['Industrial products', 'Make product and manufacturing records easier to explore.', 'assets/MSME.jpg', 'Small-scale manufacturing at a workshop'],
        ['Luxury goods', 'Review product details and available provenance.', 'assets/jwel.jpg', 'Gold jewellery and gemstones'],
        ['Consumer packaged goods', 'Connect product information with recorded milestones.', 'assets/ecommerce.png', 'Consumer products and delivery packaging']
    ];
    const imageCards = [
        ['01', 'Product origin', "Explore available information about a product's source or manufacturer.", 'assets/impexp.jpg', 'A cargo ship and international freight infrastructure'],
        ['02', 'Product & batch identity', 'Connect products or batches with their associated traceability records.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=82', 'Cargo and freight inside a distribution warehouse'],
        ['03', 'Manufacturing & processing', 'Review manufacturing, processing, or packaging details where recorded.', 'assets/MSME.jpg', 'Goods being prepared in an Indian workshop'],
        ['04', 'Export & import milestones', 'Explore recorded dispatch, receiving, and other supply-chain events.', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1100&q=82', 'Shipping containers being handled at a port'],
        ['05', 'Product documentation', 'Access relevant product or shipment information where it has been shared.', 'assets/image.png', 'Product packaging and related documentation'],
        ['06', 'Distribution & handling', 'Review available storage, handling, or distribution records.', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1100&q=82', 'Packages prepared for transportation']
    ];

    container.innerHTML = `
        <div class="trade-page">
            <section class="trade-hero" aria-labelledby="trade-hero-title">
                <div class="trade-hero-photo" role="img" aria-label="Cargo ship and containers at an international port"></div>
                <svg class="trade-hero-route" viewBox="0 0 700 430" aria-hidden="true"><path d="M90 315C200 80 440 80 605 185"/><circle cx="90" cy="315" r="7"/><circle cx="605" cy="185" r="7"/><circle cx="360" cy="125" r="5"/></svg>
                <div class="trade-container trade-hero-inner">
                    <div class="trade-hero-copy">
                        <p class="trade-eyebrow"><span></span> OriginX · International trade</p>
                        <h1 id="trade-hero-title">Every Border Crossed.<br><em>Every Product Connected.</em></h1>
                        <h2>Bring greater visibility to the journey behind global trade.</h2>
                        <p>OriginX helps connect product information and supply-chain records, making it easier to explore product origins, batch details, and recorded milestones across participating international supply chains.</p>
                        <div class="trade-actions"><button class="trade-button trade-button-primary" type="button" data-scroll-to="trade-journey">Explore Global Traceability <span aria-hidden="true">↗</span></button><button class="trade-button trade-button-light" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div>
                    </div>
                    <div class="trade-hero-route-label trade-hero-origin"><span></span><small>ILLUSTRATIVE ORIGIN</small><strong>India</strong></div>
                    <div class="trade-hero-route-label trade-hero-destination"><span></span><small>DESTINATION</small><strong>Global markets</strong></div>
                    <div class="trade-hero-caption"><span>GLOBAL TRADE · CONNECTED INFORMATION</span><small>Illustrative supply-chain route</small></div>
                </div>
            </section>

            <section class="trade-benefits trade-section" aria-labelledby="trade-benefits-title">
                <div class="trade-container">
                    <div class="trade-heading trade-heading-center"><p class="trade-eyebrow">Clearer at every stage</p><h2 id="trade-benefits-title">Global Trade. Greater Product Visibility.</h2><p>Understand the product, the records, and the journey connecting origin to destination.</p></div>
                    <div class="trade-benefit-grid">${benefits.map(([icon, title, text]) => `<article class="trade-benefit"><div class="trade-benefit-icon">${tradeIcon(icon)}</div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
                </div>
            </section>

            <section class="trade-journey trade-section" id="trade-journey" aria-labelledby="trade-journey-title">
                <div class="trade-container">
                    <div class="trade-heading"><p class="trade-eyebrow">From local origin to global destination</p><h2 id="trade-journey-title">A product journey, told in connected stages.</h2><p>Every international shipment involves multiple stages, locations, and participants. Traceability can help connect product information recorded along the way.</p></div>
                    <div class="trade-journey-tabs" role="tablist" aria-label="Illustrative supply-chain stages">${stages.map((stage, index) => `<button class="trade-stage-tab${index === 0 ? ' is-active' : ''}" id="trade-stage-tab-${index}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="trade-stage-panel" tabindex="${index === 0 ? '0' : '-1'}" data-stage="${index}"><span class="trade-stage-number">0${index + 1}</span><span class="trade-stage-icon">${tradeIcon(stage.icon)}</span><strong>${stage.title}</strong></button>`).join('')}</div>
                    <div class="trade-stage-panel" id="trade-stage-panel" role="tabpanel" aria-live="polite"></div>
                    <p class="trade-disclaimer">Illustrative journey only. Stages and records depend on the participating businesses and information made available; not every event is automatically captured.</p>
                </div>
            </section>

            <section class="trade-routes trade-section" aria-labelledby="trade-routes-title">
                <div class="trade-container">
                    <div class="trade-heading trade-heading-center"><p class="trade-eyebrow">Illustrative routes · not live shipments</p><h2 id="trade-routes-title">One Product. Multiple Borders. A Connected Story.</h2><p>Explore how product information may stay connected as goods move between participating supply-chain locations.</p></div>
                    <div class="trade-route-layout">
                        <div class="trade-map" role="img" aria-label="Illustrative world route from India to an international destination"><svg viewBox="0 0 800 440" aria-hidden="true"><path class="trade-map-land" d="m75 105 43-32 72-13 40 23 27 3 24 31-13 30-42 12-19 31-41 9-18 31-34 4-6-44-26-23-16-30-25-6-9-26Zm226-32 37-30 31 15 2 29 28 8 5 28-38 5-24-22-34-4Zm62 90 37-27 60 6 20 28 36 5 21 39-18 39-47-8-9 29-35 11-17-39-31-12-2-29-25-16Zm126-90 62-31 76 12 43 29 52 9 25 26-22 20-55-8-18 27-52 4-17 30-29-2-23-42-31-17-24-30Zm-120 188 36 11 36 33 9 52-22 37-18-24-6-41-30-24Z"/><path class="trade-map-route" d="M300 191C350 102 457 117 528 207"/><circle class="trade-map-node trade-map-node-origin" cx="300" cy="191" r="9"/><circle class="trade-map-node trade-map-node-stop" cx="400" cy="146" r="6"/><circle class="trade-map-node trade-map-node-destination" cx="528" cy="207" r="9"/></svg><span class="trade-map-label trade-map-label-origin">INDIA<br><strong>Origin</strong></span><span class="trade-map-label trade-map-label-destination">DESTINATION<br><strong>Example route</strong></span><span class="trade-map-caption">SCHEMATIC ROUTE · NOT TO SCALE</span></div>
                        <div class="trade-route-info"><p class="trade-eyebrow">Choose an example</p><div class="trade-route-choices" role="group" aria-label="Select an illustrative trade route">${routes.map((route, index) => `<button type="button" class="trade-route-choice${index === 0 ? ' is-active' : ''}" data-route="${index}" aria-pressed="${index === 0}">${route.name}<span aria-hidden="true">↗</span></button>`).join('')}</div><div class="trade-route-detail" aria-live="polite"></div><p class="trade-disclaimer">These routes are illustrative examples, not confirmed OriginX customer shipments or live GPS tracking.</p></div>
                    </div>
                </div>
            </section>

            <section class="trade-discover trade-section" aria-labelledby="trade-discover-title">
                <div class="trade-container">
                    <div class="trade-heading"><p class="trade-eyebrow">Product information explorer</p><h2 id="trade-discover-title">Look Beyond the Shipment. Explore the Product.</h2><p>International trade involves more than moving goods. Traceability can connect product identity, origin information, and recorded supply-chain milestones.</p></div>
                    <div class="trade-discover-grid">${imageCards.map(([number, title, text, image, alt]) => `<article class="trade-discover-item"><div class="trade-discover-image"><img src="${image}" alt="${alt}" loading="lazy" width="1100" height="720"></div><div class="trade-discover-copy"><span>${number} / AVAILABLE INFORMATION</span><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div>
                </div>
            </section>

            <section class="trade-records trade-section" aria-labelledby="trade-records-title">
                <div class="trade-container">
                    <div class="trade-records-grid">
                        <div class="trade-records-visual"><img src="assets/impexp.jpg" alt="Cargo and international shipping infrastructure" loading="lazy" width="992" height="496"><div class="trade-package-tag">${tradeIcon('label')}<span>PRODUCT IDENTITY<br><strong>Illustrative example</strong></span></div><div class="trade-record-sticker"><span>PRODUCT RECORD</span><strong>Information,<br>clearly connected.</strong><small>Example view · not an official document</small></div></div>
                        <div class="trade-records-copy"><p class="trade-eyebrow">Product records & documentation</p><h2 id="trade-records-title">Important Information. Easier to Explore.</h2><p>Product records and trade-related information can be complex. A clear experience helps people understand which details are available and how they relate to a product.</p><div class="trade-record-tabs" role="tablist" aria-label="Illustrative product information">${[['product','Product information'],['batch','Batch records'],['journey','Journey events'],['documents','Related records']].map(([key, title], index) => `<button type="button" role="tab" id="trade-record-tab-${key}" aria-selected="${index === 0}" aria-controls="trade-record-panel" tabindex="${index === 0 ? '0' : '-1'}" data-record-tab="${key}">${title}</button>`).join('')}</div><div class="trade-record-panel" id="trade-record-panel" role="tabpanel" aria-live="polite"></div><p class="trade-disclaimer">Illustrative interface and example labels only. OriginX does not issue or approve customs documents or replace trade-compliance systems.</p></div>
                    </div>
                </div>
            </section>

            <section class="trade-verification trade-section" aria-labelledby="trade-verification-title">
                <div class="trade-container trade-verification-grid"><div class="trade-verification-visual"><div class="trade-product-photo"><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=82" alt="Packaged product with a product-identification label" loading="lazy" width="1000" height="1000"></div><div class="trade-qr-card"><span class="trade-qr" aria-hidden="true"></span><span>PRODUCT LABEL<br><strong>Illustrative only</strong></span></div><span class="trade-verification-pin">${tradeIcon('pin')}</span></div><div class="trade-verification-copy"><p class="trade-eyebrow">Product authenticity & verification</p><h2 id="trade-verification-title">Across Borders, Product Identity Still Matters.</h2><p>When products pass through multiple businesses and locations, relevant product and batch information can help people understand what has been recorded about them.</p><div class="trade-product-fields"><div><span>PRODUCT NAME</span><strong>Example product</strong></div><div><span>PRODUCT ID</span><strong>Available identifier</strong></div><div><span>BATCH / LOT</span><strong>Where applicable</strong></div><div><span>ORIGIN & EVENTS</span><strong>Where recorded</strong></div></div><div class="trade-actions"><button class="trade-button trade-button-primary" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button><button class="trade-text-button" type="button" data-scroll-to="trade-network">Explore Product Traceability <span aria-hidden="true">↗</span></button></div><p class="trade-disclaimer">Verification results depend on the records and checks supported by the OriginX workflow. A QR code alone does not prove authenticity.</p></div></div>
            </section>

            <section class="trade-handling trade-section" aria-labelledby="trade-handling-title">
                <div class="trade-container trade-handling-grid"><div><p class="trade-eyebrow">Storage & handling</p><h2 id="trade-handling-title">The Journey Matters After the Product Leaves Its Origin.</h2><p>Storage and transportation conditions can matter for some products. Recorded handling information can help participants understand the journey where those records exist.</p><div class="trade-handling-note">${tradeIcon('thermometer')}<p><strong>For relevant products, where captured</strong><span>Handling records depend on the product and the information participating businesses record and share.</span></p></div></div><div class="trade-handling-visual"><div class="trade-handling-line" aria-hidden="true"></div>${[['box','Packing','Packing event'],['warehouse','Storage','Storage event'],['truck','Dispatch','Dispatch timestamp'],['ship','Transit','Temperature reading, if captured'],['check','Receiving','Receiving event']].map(([icon, title, record], index) => `<div class="trade-handling-step"><span>${tradeIcon(icon)}</span><strong>0${index + 1}</strong><small>${title}</small><em>${record}</em></div>`).join('')}<p class="trade-disclaimer">Example stages and record labels only · no continuous temperature monitoring is implied.</p></div></div>
            </section>

            <section class="trade-stakeholders trade-section" aria-labelledby="trade-stakeholders-title">
                <div class="trade-container"><div class="trade-heading trade-heading-center"><p class="trade-eyebrow">Across the supply chain</p><h2 id="trade-stakeholders-title">One Global Supply Chain. Many Connected Participants.</h2><p>Access to relevant product information can help businesses understand the records associated with goods moving across borders.</p></div><div class="trade-stakeholder-grid">${stakeholders.map(([icon, title, text], index) => `<article class="trade-stakeholder"><span class="trade-stakeholder-number">0${index + 1}</span><div class="trade-stakeholder-icon">${tradeIcon(icon)}</div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div>
            </section>

            <section class="trade-network trade-section" id="trade-network" aria-labelledby="trade-network-title">
                <div class="trade-container"><div class="trade-heading trade-heading-center"><p class="trade-eyebrow">OriginX traceability network</p><h2 id="trade-network-title">A Connected View of the Product Journey.</h2><p>OriginX brings relevant product and supply-chain information into a traceability experience designed to make recorded details easier to explore.</p></div><div class="trade-network-layout"><div class="trade-network-diagram" role="group" aria-label="Select a connected product information topic"><svg viewBox="0 0 600 480" aria-hidden="true"><path d="M300 240 300 60M300 240 500 160M300 240 425 410M300 240 175 410M300 240 100 160"/></svg><div class="trade-network-center">${tradeIcon('box')}<strong>One product<br>journey</strong></div>${networkNodes.map(([icon, title], index) => `<button type="button" class="trade-network-node trade-network-node-${index + 1}${index === 0 ? ' is-active' : ''}" data-network-node="${index}" aria-pressed="${index === 0}"><span>${tradeIcon(icon)}</span><strong>${title}</strong></button>`).join('')}</div><div class="trade-network-detail" aria-live="polite"></div></div><p class="trade-disclaimer">Records depend on participating businesses and are not necessarily complete or synchronized in real time.</p></div>
            </section>

            <section class="trade-india trade-section" aria-labelledby="trade-india-title"><div class="trade-container trade-india-grid"><figure><img src="assets/textile.png" alt="Indian textiles prepared for trade and distribution" loading="lazy" width="900" height="600"><figcaption>From local makers to international markets</figcaption></figure><div><p class="trade-eyebrow">India connected to the world</p><h2 id="trade-india-title">Made in India. Connected to the World.</h2><p>Products travel from producers and manufacturers to international buyers through networks of businesses, logistics providers, and distribution partners. Traceability can help make information behind those journeys more visible.</p><div class="trade-principles"><article><span>${tradeIcon('pin')}</span><div><h3>Recognize the origin</h3><p>Connect products with available manufacturer and origin information.</p></div></article><article><span>${tradeIcon('ship')}</span><div><h3>Follow the journey</h3><p>Explore recorded milestones across participating supply-chain stages.</p></div></article><article><span>${tradeIcon('document')}</span><div><h3>Share product information</h3><p>Make relevant details easier for downstream partners to access.</p></div></article></div></div></div></section>

            <section class="trade-categories trade-section" aria-labelledby="trade-categories-title"><div class="trade-container"><div class="trade-heading"><p class="trade-eyebrow">Industries & products moving across borders</p><h2 id="trade-categories-title">Different Products. Different Journeys. Connected Information.</h2><p>Product identity and traceability information can support visibility across diverse international supply chains.</p></div><div class="trade-category-grid">${categories.map(([title, text, image, alt], index) => `<article class="trade-category trade-category-${index + 1}"><img src="${image}" alt="${alt}" loading="lazy" width="1000" height="760"><div><span>0${index + 1} · EXAMPLE CATEGORY</span><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div><p class="trade-disclaimer">Traceability records and requirements vary by product category. These examples do not imply that every category uses the same fields or workflows.</p></div></section>

            <section class="trade-final" aria-labelledby="trade-final-title"><div class="trade-final-image" role="img" aria-label="Illustrative cargo ship and global trade route"></div><div class="trade-container trade-final-inner"><p class="trade-eyebrow">OriginX · Product traceability</p><h2 id="trade-final-title">Every Product Travels With a Story.<br><em>Make It Visible.</em></h2><p>Explore how OriginX can help connect product information and recorded supply-chain milestones across participating international trade networks.</p><div class="trade-actions"><button class="trade-button trade-button-light" type="button" onclick="goToSection('technology')">Explore OriginX Traceability <span aria-hidden="true">↗</span></button><button class="trade-button trade-button-ghost" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div></div></section>
        </div>`;

    const stageTabs = [...container.querySelectorAll('[data-stage]')];
    const stagePanel = container.querySelector('#trade-stage-panel');
    const selectStage = (index, focus = false) => {
        const stage = stages[index];
        stageTabs.forEach((tab, tabIndex) => {
            const selected = tabIndex === index;
            tab.classList.toggle('is-active', selected);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });
        stagePanel.setAttribute('aria-labelledby', `trade-stage-tab-${index}`);
        stagePanel.innerHTML = `<div class="trade-stage-panel-icon">${tradeIcon(stage.icon)}</div><div><p class="trade-eyebrow">Stage 0${index + 1} · illustrative journey</p><h3>${stage.title}</h3><p>${stage.text}</p></div><ul>${stage.records.map(record => `<li>${record}</li>`).join('')}</ul>`;
        if (focus) stageTabs[index].focus();
    };
    const activateWithArrows = (tabs, index, length, activate, event) => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + length) % length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = length - 1;
        activate(next, true);
    };
    stageTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectStage(index));
        tab.addEventListener('keydown', event => activateWithArrows(stageTabs, index, stages.length, selectStage, event));
    });
    selectStage(0);

    const routeChoices = [...container.querySelectorAll('[data-route]')];
    const routeDetail = container.querySelector('.trade-route-detail');
    const mapDestination = container.querySelector('.trade-map-label-destination strong');
    const selectRoute = index => {
        const route = routes[index];
        routeChoices.forEach((button, buttonIndex) => {
            const selected = buttonIndex === index;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        mapDestination.textContent = route.destination;
        routeDetail.innerHTML = `<p class="trade-route-endpoints"><span>${route.origin}</span><span aria-hidden="true">→</span><span>${route.destination}</span></p><p class="trade-route-mode">${route.mode}</p><p>${route.note}</p><ol>${route.stops.map((stop, stopIndex) => `<li><span>0${stopIndex + 1}</span>${stop}</li>`).join('')}</ol>`;
    };
    routeChoices.forEach((button, index) => button.addEventListener('click', () => selectRoute(index)));
    selectRoute(0);

    const recordTabs = [...container.querySelectorAll('[data-record-tab]')];
    const recordPanel = container.querySelector('#trade-record-panel');
    const selectRecord = (key, focus = false) => {
        recordTabs.forEach(tab => {
            const selected = tab.dataset.recordTab === key;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            tab.classList.toggle('is-active', selected);
        });
        const activeTab = recordTabs.find(tab => tab.dataset.recordTab === key);
        recordPanel.setAttribute('aria-labelledby', activeTab.id);
        recordPanel.innerHTML = `<span class="trade-example-label">ILLUSTRATIVE INFORMATION</span>${records[key].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}`;
        if (focus) activeTab.focus();
    };
    recordTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectRecord(tab.dataset.recordTab));
        tab.addEventListener('keydown', event => activateWithArrows(recordTabs, index, recordTabs.length, next => selectRecord(recordTabs[next].dataset.recordTab, true), event));
    });
    selectRecord('product');

    const networkButtons = [...container.querySelectorAll('[data-network-node]')];
    const networkDetail = container.querySelector('.trade-network-detail');
    networkButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const [icon, title, description] = networkNodes[index];
            networkButtons.forEach((node, nodeIndex) => {
                const selected = nodeIndex === index;
                node.classList.toggle('is-active', selected);
                node.setAttribute('aria-pressed', String(selected));
            });
            networkDetail.innerHTML = `<span class="trade-network-detail-icon">${tradeIcon(icon)}</span><p class="trade-eyebrow">CONNECTED INFORMATION</p><h3>${title}</h3><p>${description}</p>${index === 4 ? '<button type="button" class="trade-text-button" onclick="goToVerify()">Open product verification <span aria-hidden="true">→</span></button>' : ''}`;
        });
    });
    networkButtons[0].click();

    container.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', () => {
            const target = container.querySelector(`#${button.dataset.scrollTo}`);
            if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        });
    });
}
