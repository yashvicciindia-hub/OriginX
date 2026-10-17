const AGRI_ICONS = {
    farm: '<path d="M3 20h18M5 20V10l7-5 7 5v10M9 20v-6h6v6"/><path d="M16 7V4h3v5"/>',
    batch: '<path d="M4 7h16v13H4zM8 7V4h8v3M8 12h8M8 16h5"/><circle cx="17" cy="16" r="3"/>',
    shield: '<path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m8 12 2.5 2.5L16 9"/>',
    thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 11v6"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/>',
    harvest: '<path d="M12 21V4M12 9c-4 0-6-2-6-5 4 0 6 2 6 5ZM12 13c4 0 6-2 6-5-4 0-6 2-6 5ZM12 17c-4 0-6-2-6-5 4 0 6 2 6 5ZM12 21h8"/>',
    processing: '<path d="M4 20h16M6 20V9l6-5 6 5v11M9 13h6M9 16h6"/><path d="M3 9h18"/>',
    truck: '<path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    store: '<path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 20v-6h5v6"/><path d="M3 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>',
    origin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    label: '<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="9" cy="9" r="1"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h2"/>',
    leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z"/><path d="M5 20c3-5 7-8 12-11"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M8 10.5h5M10.5 8v5"/>',
    basket: '<path d="m4 10 2 10h12l2-10zM3 10h18M8 10l4-6 4 6M9 14v3M15 14v3"/>'
};

function agriIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${AGRI_ICONS[name] || AGRI_ICONS.leaf}</svg>`;
}

function renderAgriculturePage(ind, otherSectors, container) {
    const sampleId = ind.sampleIds[0];
    const benefits = [
        ['origin', 'Know Its Origin', 'Access available information about where agricultural products originate.'],
        ['batch', 'Trace Every Batch', 'Follow recorded product and batch information through participating supply-chain stages.'],
        ['shield', 'See Quality Records', 'Explore available inspection, grading, or quality records associated with a product.'],
        ['thermo', 'Understand Handling', 'Review available harvest, storage, transportation, or temperature records where captured.'],
        ['people', 'Connect the Journey', 'Bring greater visibility to the farmers, producers, and supply-chain participants involved.']
    ];
    const stages = [
        { title: 'Farm & Origin', icon: 'farm', copy: 'Start with the crop, the producer, and the place it was grown.', records: ['Farm or producer information, where recorded', 'Origin location and crop identity', 'Participating producer details'], image: 'assets/agriculture-fields.png', alt: 'Farmers working among green fields at sunrise' },
        { title: 'Harvest & Collection', icon: 'harvest', copy: 'Connect a harvest or collection with its recorded lot identity.', records: ['Harvest date and collection point, where recorded', 'Harvest or lot identification', 'Product quantity, where available'], image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=82', alt: 'Cultivated agricultural fields ready for harvest' },
        { title: 'Sorting & Processing', icon: 'processing', copy: 'Explore the records associated with sorting, grading, or packing.', records: ['Processing or packing facility', 'Batch or lot reference', 'Available inspection and packaging records'], image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=82', alt: 'Colorful spices being prepared for packaging' },
        { title: 'Storage & Distribution', icon: 'truck', copy: 'Follow documented handovers as produce moves between participants.', records: ['Storage location and distribution partner', 'Dispatch and receiving events', 'Handling or temperature records, where available'], image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=82', alt: 'Fresh produce arranged at a market' },
        { title: 'Retail & Consumer', icon: 'store', copy: 'Bring the available product story closer to the people who choose it.', records: ['Product identity and batch details', 'Recorded journey milestones', 'Product verification entry point'], image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=900&q=82', alt: 'A shopper exploring fresh produce' }
    ];
    const discoveries = [
        ['origin', '01', 'Origin & provenance', 'Explore available information about the product’s place of origin, producer, and agricultural source.'],
        ['harvest', '02', 'Harvest & lot identity', 'Connect a product with its recorded harvest, collection, or batch information.'],
        ['search', '03', 'Quality & inspection', 'Review relevant inspection, grading, or quality information when such records are available.'],
        ['thermo', '04', 'Storage & handling', 'Understand recorded storage, handling, and transportation events throughout the supply chain.'],
        ['processing', '05', 'Processing & packaging', 'Explore available processing, packing, and facility information associated with a product.'],
        ['route', '06', 'Journey & distribution', 'Follow recorded movement and supply-chain milestones across participating businesses.']
    ];
    const categories = [
        ['Grains & cereals', 'From golden fields to recorded lots', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=82', 'Golden agricultural fields at harvest'],
        ['Rice & pulses', 'Everyday staples, many origins', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=82', 'Harvested grains and pulses'],
        ['Fresh fruits', 'Seasonal produce and its journey', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=82', 'Colorful fresh fruit at a market'],
        ['Fresh vegetables', 'From farm collection to market', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=82', 'A market display of fresh vegetables'],
        ['Spices & herbs', 'A rich harvest of regional crops', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=82', 'Indian spices and herbs arranged for sorting'],
        ['Oilseeds & other crops', 'The many ingredients behind food', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=82', 'Oil made from agricultural crops'],
        ['Processed agricultural products', 'Records that travel with a product', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=82', 'Grain-based food prepared for market'],
        ['Export-oriented produce', 'Supply chains that reach further', 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=1200&q=82', 'Fresh produce being selected for distribution']
    ];
    const participants = [
        ['harvest', 'Farmers & producers', 'Connect products with available origin information.', 'Maintain clearer harvest and supply records.'],
        ['processing', 'Processors & packagers', 'Associate products with batch and processing records.', 'Improve visibility into product handovers.'],
        ['truck', 'Distributors & logistics', 'Follow recorded dispatch and receiving events.', 'Review available storage and handling records.'],
        ['store', 'Retailers & exporters', 'Explore product and batch information.', 'Support informed conversations with customers and buyers.'],
        ['basket', 'Consumers', 'Explore available product-origin details.', 'Understand recorded journey milestones.']
    ];
    const network = [
        ['origin', 'Origin', 'Explore recorded source or producer details.'],
        ['batch', 'Batch', 'Identify the relevant product lot or batch.'],
        ['processing', 'Processing', 'Review available processing or packaging records.'],
        ['truck', 'Distribution', 'Explore recorded movement and handling milestones.'],
        ['search', 'Verification', 'Access the relevant product verification experience.']
    ];

    container.innerHTML = `
        <div class="agriculture-page agri-v2">
            <section class="agri-v2-hero" aria-labelledby="agri-v2-title">
                <div class="agri-v2-hero-art">
                    <img class="agri-v2-field" src="assets/agriculture-fields.png" alt="Indian farmers at work among green fields in warm morning light" width="923" height="520" fetchpriority="high">
                    <img class="agri-v2-produce" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=760&q=82" alt="A colorful harvest of fresh vegetables" width="760" height="600">
                    <div class="agri-v2-route" aria-label="Illustrated route: farm, harvest, processing, distribution, consumer">
                        <span>Farm</span><i></i><span>Harvest</span><i></i><span>Process</span><i></i><span>Share</span><i></i><span>Table</span>
                    </div>
                </div>
                <div class="container agri-v2-hero-copy">
                    <p class="agri-v2-kicker"><span></span> Agriculture &amp; Food · OriginX</p>
                    <h1 id="agri-v2-title">From Farm to Table,<br><em>With Nothing Left to Guess.</em></h1>
                    <p>Discover a more transparent journey for agricultural products, connecting origin, harvest, handling, distribution, and product verification through traceability.</p>
                    <div class="agri-v2-actions">
                        <button class="agri-v2-button agri-v2-button-primary" type="button" onclick="scrollToAgricultureJourney()">Explore Agricultural Traceability <span aria-hidden="true">↘</span></button>
                        <button class="agri-v2-button agri-v2-button-quiet" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>
                    </div>
                    <span class="agri-v2-note">${agriIcon('leaf')} Every harvest has an origin. Every record adds context.</span>
                </div>
                <span class="agri-v2-image-caption">A harvest story, rooted in the land</span>
            </section>

            <section class="agri-v2-benefits agri-v2-section" aria-labelledby="agri-benefit-heading">
                <div class="container">
                    <div class="agri-v2-centered-head">
                        <p class="agri-v2-label">A clearer view, from the very beginning</p>
                        <h2 id="agri-benefit-heading">Know What Goes Into Every Bite.</h2>
                        <p>Traceability makes the agricultural journey easier to understand, from where a product begins to how it reaches you.</p>
                    </div>
                    <div class="agri-v2-benefit-list">
                        ${benefits.map(([icon, title, text], index) => `<article class="agri-v2-benefit agri-reveal"><div class="agri-v2-icon-ring">${agriIcon(icon)}</div><span class="agri-v2-index">0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}
                    </div>
                </div>
            </section>

            <section class="agri-v2-journey agri-v2-section" id="agriculture-journey" aria-labelledby="agri-journey-heading">
                <div class="container">
                    <div class="agri-v2-section-head agri-reveal">
                        <div><p class="agri-v2-label">A product’s path, made visible</p><h2 id="agri-journey-heading">Every Harvest Has a Journey.<br><em>Make It Visible.</em></h2></div>
                        <p>Traceability connects product information across participating supply-chain stages, helping businesses and consumers understand the journey behind agricultural products.</p>
                    </div>
                    <div class="agri-v2-journey-interaction" data-agri-tabs="journey">
                    <div class="agri-v2-stage-tabs" role="tablist" aria-label="Agricultural traceability stages">
                        ${stages.map((stage, index) => `<button class="agri-v2-stage-tab" id="agri-stage-tab-${index}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="agri-stage-panel-${index}" tabindex="${index === 0 ? '0' : '-1'}" data-agri-tab="${index}"><span class="agri-v2-stage-icon">${agriIcon(stage.icon)}</span><span class="agri-v2-stage-no">0${index + 1}</span><strong>${stage.title}</strong></button>`).join('')}
                    </div>
                    <div class="agri-v2-stage-panels">
                        ${stages.map((stage, index) => `<article id="agri-stage-panel-${index}" class="agri-v2-stage-panel${index === 0 ? ' is-active' : ''}" role="tabpanel" aria-labelledby="agri-stage-tab-${index}" data-agri-panel="${index}" ${index === 0 ? '' : 'hidden'}><img src="${stage.image}" alt="${stage.alt}" width="900" height="560" loading="lazy"><div><span class="agri-v2-panel-step">STAGE 0${index + 1}</span><h3>${stage.title}</h3><p>${stage.copy}</p><ul>${stage.records.map(record => `<li>${record}</li>`).join('')}</ul></div></article>`).join('')}
                    </div>
                    </div>
                    <p class="agri-v2-disclaimer">These are illustrative stages. Records available for a specific product depend on the information provided by participating businesses.</p>
                </div>
            </section>

            <section class="agri-v2-discover agri-v2-section" aria-labelledby="agri-discover-heading">
                <div class="container">
                    <div class="agri-v2-section-head agri-reveal">
                        <div><p class="agri-v2-label">Explore what’s recorded</p><h2 id="agri-discover-heading">More Than a Product.<br><em>A Story You Can Explore.</em></h2></div>
                        <p>Relevant product information can help people understand where agricultural goods come from, how they are handled, and which records may be available.</p>
                    </div>
                    <div class="agri-v2-discover-grid">
                        ${discoveries.map(([icon, no, title, text], index) => `<article class="agri-v2-discover-item agri-reveal agri-v2-discover-${index + 1}"><span class="agri-v2-discover-art">${agriIcon(icon)}<i>${no}</i></span><div><span class="agri-v2-mini-label">TRACEABILITY RECORD · ${no}</span><h3>${title}</h3><p>${text}</p></div></article>`).join('')}
                    </div>
                    <p class="agri-v2-disclaimer">The information shown for any product depends on what has been recorded and shared by its participating supply chain.</p>
                </div>
            </section>

            <section class="agri-v2-freshness agri-v2-section" aria-labelledby="agri-fresh-heading">
                <div class="container agri-v2-fresh-grid">
                    <figure class="agri-v2-fresh-image agri-reveal"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=84" alt="Fresh vegetables gathered at a produce market" width="1100" height="900" loading="lazy"><figcaption>${agriIcon('basket')} A closer look at the harvest</figcaption></figure>
                    <div class="agri-v2-fresh-copy agri-reveal">
                        <p class="agri-v2-label">From harvest to delivery</p>
                        <h2 id="agri-fresh-heading">Freshness Is a Journey,<br><em>Not Just a Label.</em></h2>
                        <p>Handling conditions can influence product quality. Recorded storage and transportation information can help supply-chain participants understand how products move.</p>
                        <div class="agri-v2-handling-route">
                            <div class="agri-v2-handling-line" aria-hidden="true"></div>
                            ${[['harvest', 'Harvest', 'Harvest date'], ['basket', 'Collection', 'Collection event'], ['processing', 'Storage', 'Storage event'], ['thermo', 'Transport', 'Temperature, if captured'], ['store', 'Delivery', 'Receiving timestamp']].map(([icon, title, record], index) => `<div class="agri-v2-handling-step"><span>${agriIcon(icon)}</span><strong>${title}</strong><small>${record}</small></div>`).join('')}
                        </div>
                        <p class="agri-v2-callout"><span>“</span>Better visibility begins with better records.</p>
                        <p class="agri-v2-disclaimer">Traceability does not by itself keep products fresh. Monitoring and temperature records are shown only when captured and available.</p>
                    </div>
                </div>
            </section>

            <section class="agri-v2-verify agri-v2-section" aria-labelledby="agri-verify-heading">
                <div class="container agri-v2-verify-grid">
                    <div class="agri-v2-product-scene agri-reveal">
                        <img src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1100&q=84" alt="A colorful selection of agricultural produce" width="1100" height="820" loading="lazy">
                        <div class="agri-v2-record-card"><span>ILLUSTRATIVE PRODUCT RECORD</span><h3>A product’s digital trail</h3><dl><div><dt>Product</dt><dd>Available in product record</dd></div><div><dt>Origin</dt><dd>Shown when provided</dd></div><div><dt>Batch &amp; dates</dt><dd>Available recorded details</dd></div><div><dt>Journey</dt><dd>Participating supply-chain events</dd></div></dl><div class="agri-v2-record-qr">${generateQrSvg(sampleId)}<small>Opens the existing illustrative sample record</small></div></div>
                    </div>
                    <div class="agri-v2-verify-copy agri-reveal">
                        <p class="agri-v2-label">Scan · Explore · Understand</p>
                        <h2 id="agri-verify-heading">Don’t Guess Where It Came From.<br><em>Explore Its Journey.</em></h2>
                        <p>Use the existing OriginX product verification experience to explore available origin, batch, and recorded supply-chain details.</p>
                        <ol class="agri-v2-verify-steps"><li><span>01</span><div><strong>Find a product code</strong><p>Use a supported QR code or batch identifier.</p></div></li><li><span>02</span><div><strong>Open its record</strong><p>Access the information associated with that product.</p></div></li><li><span>03</span><div><strong>Explore what’s available</strong><p>Review the journey and records that have been shared.</p></div></li></ol>
                        <div class="agri-v2-actions"><button class="agri-v2-button agri-v2-button-primary" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button><button class="agri-v2-text-button" type="button" onclick="scrollToAgricultureJourney()">Explore traceability <span aria-hidden="true">↗</span></button></div>
                        <p class="agri-v2-disclaimer">The product panel is illustrative. Its working QR code opens OriginX’s existing sample product record; it does not represent a real product claim.</p>
                    </div>
                </div>
            </section>

            <section class="agri-v2-categories agri-v2-section" aria-labelledby="agri-category-heading">
                <div class="container">
                    <div class="agri-v2-section-head agri-reveal"><div><p class="agri-v2-label">A diverse agricultural ecosystem</p><h2 id="agri-category-heading">One Nation.<br><em>A Thousand Agricultural Stories.</em></h2></div><p>Explore the diverse products, producers, and supply chains that form India’s agricultural ecosystem.</p></div>
                    <div class="agri-v2-category-grid">${categories.map(([name, detail, image, alt], index) => `<article class="agri-v2-category agri-v2-category-${index + 1} agri-reveal"><div class="agri-v2-category-image"><img src="${image}" alt="${alt}" width="1200" height="900" loading="lazy"><span>0${index + 1}</span></div><div class="agri-v2-category-copy"><h3>${name}</h3><p>${detail}</p><span aria-hidden="true">↗</span></div></article>`).join('')}</div>
                    <p class="agri-v2-disclaimer">Images are illustrative. The products and records available vary by participating product and supply chain.</p>
                </div>
            </section>

            <section class="agri-v2-heritage agri-v2-section" aria-labelledby="agri-heritage-heading">
                <div class="container agri-v2-heritage-grid">
                    <figure class="agri-v2-heritage-image agri-reveal"><img src="assets/agriculture-fields.png" alt="Farmers tending crops across a sunlit Indian agricultural landscape" width="923" height="520" loading="lazy"><figcaption>Rooted in the land · Connected by information</figcaption></figure>
                    <div class="agri-v2-heritage-copy agri-reveal"><p class="agri-v2-label">The people behind every harvest</p><h2 id="agri-heritage-heading">Rooted in the Land.<br><em>Connected by Trust.</em></h2><p>Behind every agricultural product is a network of farmers, producers, processors, and distributors. Greater traceability can help make these connections more visible.</p>
                        <div class="agri-v2-principles"><article>${agriIcon('origin')}<div><h3>Recognize the origin</h3><p>Connect products with origin and producer information recorded along the supply chain.</p></div></article><article>${agriIcon('route')}<div><h3>Make the journey visible</h3><p>Bring relevant supply-chain events and participating businesses into a clearer view.</p></div></article><article>${agriIcon('search')}<div><h3>Support informed decisions</h3><p>Help people explore available product information with greater clarity.</p></div></article></div>
                    </div>
                </div>
            </section>

            <section class="agri-v2-participants agri-v2-section" aria-labelledby="agri-participants-heading">
                <div class="container"><div class="agri-v2-centered-head agri-reveal"><p class="agri-v2-label">Traceability connects people along the way</p><h2 id="agri-participants-heading">One Connected Journey.<br><em>Many Meaningful Benefits.</em></h2><p>Every participant contributes context to a product journey. Relevant records can make those handovers easier to understand.</p></div>
                    <div class="agri-v2-people-path">${participants.map(([icon, title, first, second], index) => `<article class="agri-v2-person agri-reveal"><span class="agri-v2-person-number">0${index + 1}</span><div class="agri-v2-person-icon">${agriIcon(icon)}</div><h3>${title}</h3><p>${first}</p><p>${second}</p></article>`).join('')}</div>
                </div>
            </section>

            <section class="agri-v2-technology agri-v2-section" aria-labelledby="agri-tech-heading">
                <div class="container agri-v2-tech-grid">
                    <div class="agri-v2-tech-copy"><p class="agri-v2-label">OriginX traceability</p><h2 id="agri-tech-heading">From Disconnected Records<br><em>to a Connected Product Story.</em></h2><p>OriginX helps present relevant product and supply-chain information through a traceability experience designed to make recorded information easier to explore.</p><p class="agri-v2-disclaimer">Information depends on what participating businesses record and share. OriginX does not automatically capture every event or connect every supplier.</p><button class="agri-v2-text-button" type="button" onclick="goToSection('technology')">Explore OriginX technology <span aria-hidden="true">↗</span></button></div>
                    <div class="agri-v2-network" data-agri-tabs="network">
                        <div class="agri-v2-network-art" role="group" aria-label="Select a point in the OriginX product journey">${network.map(([icon, title], index) => `<button class="agri-v2-node agri-v2-node-${index + 1}" type="button" aria-pressed="${index === 0}" data-agri-tab="${index}" aria-label="${title}">${agriIcon(icon)}<span>${title}</span></button>`).join('')}<div class="agri-v2-center-product">${agriIcon('leaf')}<span>One product<br>journey</span></div><svg class="agri-v2-connectors" viewBox="0 0 500 420" aria-hidden="true"><path d="M250 210 250 52M250 210 425 165M250 210 357 365M250 210 143 365M250 210 75 165"/></svg></div>
                        <div class="agri-v2-network-info" aria-live="polite">${network.map(([icon, title, text], index) => `<div data-agri-panel="${index}" ${index === 0 ? '' : 'hidden'}><span>${agriIcon(icon)}</span><p><strong>${title}</strong>${text}</p></div>`).join('')}</div>
                    </div>
                </div>
            </section>

            <section class="agri-v2-closing" aria-labelledby="agri-closing-heading"><div class="container agri-v2-closing-inner agri-reveal"><p class="agri-v2-label">The next chapter begins at origin</p><h2 id="agri-closing-heading">Every Product Has an Origin.<br><em>Make Yours Visible.</em></h2><p>Explore how OriginX can help make agricultural product information and supply-chain journeys easier to understand.</p><div class="agri-v2-actions"><button class="agri-v2-button agri-v2-button-light" type="button" onclick="goToSection('solutions')">Explore OriginX Traceability <span aria-hidden="true">→</span></button><button class="agri-v2-button agri-v2-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div></div></section>
            <section class="agri-v2-other-sectors"><div class="container"><p>Explore more of OriginX</p><div class="other-sectors-grid">${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic" aria-hidden="true">${INDUSTRIES[key].icon}</span>${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}</div></div></section>
        </div>`;

    initializeAgricultureMandiDirectory(container);
    initializeAgriTabs(container);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
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

function initializeAgriTabs(container) {
    container.querySelectorAll('[data-agri-tabs]').forEach(group => {
        const tabs = Array.from(group.querySelectorAll('[data-agri-tab]'));
        const panels = Array.from(group.querySelectorAll('[data-agri-panel]'));
        const activate = (tab, focusTab) => {
            const selected = tab.dataset.agriTab;
            tabs.forEach(item => {
                const active = item === tab;
                item.setAttribute(item.hasAttribute('aria-selected') ? 'aria-selected' : 'aria-pressed', String(active));
                if (item.hasAttribute('role')) item.tabIndex = active ? 0 : -1;
            });
            panels.forEach(panel => {
                const active = panel.dataset.agriPanel === selected;
                panel.hidden = !active;
                panel.classList.toggle('is-active', active);
            });
            if (focusTab) tab.focus();
        };
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => activate(tab, false));
            tab.addEventListener('keydown', event => {
                let nextIndex = index;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
                else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === 'Home') nextIndex = 0;
                else if (event.key === 'End') nextIndex = tabs.length - 1;
                else return;
                event.preventDefault();
                activate(tabs[nextIndex], true);
            });
        });
    });
}

function scrollToAgricultureJourney() {
    const journeySection = document.getElementById('agriculture-journey');
    if (!journeySection) return;
    const header = document.querySelector('.site-header');
    const top = journeySection.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0);
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top: Math.max(top, 0), behavior });
}
