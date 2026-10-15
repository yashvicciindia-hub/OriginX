const ECOMMERCE_ICONS = {
    origin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M8 10.5h5M10.5 8v5"/>',
    batch: '<path d="M4 6h16v14H4zM8 6V4h8v2M8 10v6m3-6v6m3-6v6m3-6v6"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h2"/>',
    bag: '<path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3m-7 5 3 3 6-6"/>',
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="m3 7 9 4 9-4m-9 4v10m-4-16 9 4"/>',
    warehouse: '<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M7 21v-7h10v7M7 10h.01M12 10h.01M17 10h.01"/>',
    store: '<path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 20v-6h5v6"/>',
    basket: '<path d="m4 10 2 10h12l2-10zM3 10h18M8 10l4-6 4 6M9 14v3m6-3v3"/>',
    truck: '<path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    person: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    shield: '<path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m8 12 2.5 2.5L16 9"/>',
    leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z"/><path d="M5 20c3-5 7-8 12-11"/>',
    link: '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="6" r="3"/><circle cx="17" cy="18" r="3"/><path d="m9.6 10.5 4.8-3m-4.8 6 4.8 3"/>',
    tag: '<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="9" cy="9" r="1"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>'
};

function ecommerceIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ECOMMERCE_ICONS[name] || ECOMMERCE_ICONS.box}</svg>`;
}

function renderEcommercePage(container) {
    const benefits = [
        ['origin', 'Know Its Origin', "Explore available information about a product's source, manufacturer, or brand."],
        ['search', 'Check Product Details', 'Use supported verification features to access relevant product records and identifiers.'],
        ['batch', 'Explore Batch Records', 'Review available batch, manufacturing, or product-specific information where recorded.'],
        ['route', 'Follow Its Journey', 'Explore recorded supply-chain milestones from participating businesses and logistics partners.'],
        ['bag', 'Shop More Informed', 'Make better-informed decisions using available product information.']
    ];
    const stages = [
        { title: 'Brand & Manufacturer', icon: 'box', summary: 'A product begins with an identity and the details its maker chooses to record.', records: ['Brand or manufacturer details', 'Product identity', 'Manufacturing location, where recorded', 'Product or batch identifier'] },
        { title: 'Inventory & Warehousing', icon: 'warehouse', summary: 'Receiving and stock movement can add context as products move through inventory.', records: ['Warehouse or inventory location', 'Product batch details', 'Stock movement events', 'Receiving records, where available'] },
        { title: 'Seller & Online Listing', icon: 'store', summary: 'Product records can sit alongside seller and listing information.', records: ['Seller or distributor details', 'Product identifier', 'Available product descriptions', 'Links to relevant records, where supported'] },
        { title: 'Fulfilment & Delivery', icon: 'truck', summary: 'Recorded handovers can help describe the fulfilment journey.', records: ['Dispatch events', 'Shipment or consignment references', 'Recorded handling events', 'Delivery milestones, where available'] },
        { title: 'Customer & Verification', icon: 'person', summary: 'Customers can access supported product information after receiving an order.', records: ['Product identity', 'Available origin information', 'Relevant batch or serial details', 'Product verification entry point'] }
    ];
    const discoveries = [
        ['tag', '01', 'Product identity', 'Explore the product name, identifying details, and available product identifiers.', 'Identity begins with the details associated with the product itself.', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=82', 'A leather accessory photographed as an individual consumer product'],
        ['origin', '02', 'Brand & origin', 'Discover available information about the brand, manufacturer, or recorded place of origin.', 'Origin details depend on records made available for each product.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=82', 'Personal care products arranged on a shelf'],
        ['batch', '03', 'Batch & manufacturing', 'Review relevant batch, manufacturing, or production details when those records are available.', 'Batch records can help distinguish production lots and their associated details.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=82', 'Close-up of skincare bottles and packaging'],
        ['route', '04', 'Supply-chain journey', "Explore recorded milestones associated with a product's movement through participating supply-chain stages.", 'A journey view reflects recorded events, not automatic live parcel tracking.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=82', 'Organized inventory inside a warehouse'],
        ['shield', '05', 'Authenticity & verification', 'Use supported verification features to examine relevant product information and verification results.', 'An identifier provides an entry point to records; a code alone is not proof of authenticity.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=82', 'Customer using a phone while shopping'],
        ['leaf', '06', 'Handling & storage', 'Access recorded handling, storage, or transportation information where applicable.', 'Only handling details that have been captured and shared can be explored.', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1000&q=82', 'Packages prepared for transport']
    ];
    const categories = [
        ['Fashion & Apparel', 'Material, maker, and product identity.', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=82', 'A thoughtfully styled fashion collection'],
        ['Beauty & Personal Care', 'Product records for everyday rituals.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=82', 'A collection of skincare bottles'],
        ['Food & Beverages', 'Discover information behind the label.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=82', 'Fresh ingredients in a market display'],
        ['Electronics & Accessories', 'Identity and relevant product records.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=82', 'A premium pair of headphones'],
        ['Home & Lifestyle', 'The details behind useful essentials.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=82', 'A warm, considered home interior'],
        ['Health & Wellness', 'Explore applicable records where shared.', 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=82', 'Wellness and personal care packaging'],
        ['Luxury & Premium Goods', 'A clearer view of product provenance.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=82', 'A premium leather handbag'],
        ['Consumer Packaged Goods', 'Connect identity with recorded milestones.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=82', 'Packaged consumer goods arranged together']
    ];
    const stakeholders = [
        ['box', 'Brands & manufacturers', 'Connect products with available manufacturer information and organize relevant batch and product records.'],
        ['search', 'Online marketplaces', 'Support access to relevant product records and clearer product-information workflows.'],
        ['store', 'Sellers & retailers', 'Explore available product identifiers, batch details, and relevant records.'],
        ['truck', 'Logistics & fulfilment', 'Review relevant shipment references and recorded dispatch or receiving milestones.'],
        ['person', 'Consumers', 'Explore available origin information and supported verification features.']
    ];
    const nodes = [
        ['tag', 'Product Identity', 'Explore available identifying details associated with a product.'],
        ['origin', 'Manufacturer & Origin', 'Review recorded manufacturer or source information, where available.'],
        ['batch', 'Batch Information', 'Access relevant batch records where they are supported and shared.'],
        ['route', 'Supply-Chain Events', 'Explore recorded journey milestones from participating businesses.'],
        ['shield', 'Product Verification', 'Use the supported workflow to retrieve available product information.']
    ];

    container.innerHTML = `
        <div class="commerce-page">
            <section class="commerce-hero" aria-labelledby="commerce-hero-heading">
                <div class="commerce-hero-inner">
                    <div class="commerce-hero-copy">
                        <p class="commerce-kicker"><span></span> THE STORY BEHIND THE SHOPPING</p>
                        <h1 id="commerce-hero-heading">Shop With Confidence.<br><em>Know the Story Behind Every Product.</em></h1>
                        <p class="commerce-hero-subtitle">From the brand that made it to the journey that brought it to you.</p>
                        <p class="commerce-hero-body">OriginX helps connect product information and supply-chain records, making it easier to explore product origins, available authenticity information, and recorded journey milestones.</p>
                        <div class="commerce-actions"><button class="commerce-button commerce-button-dark" type="button" data-scroll-to="commerce-journey">Explore Product Traceability <span aria-hidden="true">↗</span></button><button class="commerce-button commerce-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div>
                        <p class="commerce-hero-note">${ecommerceIcon('shield')} Supported product information varies by product and participating business.</p>
                    </div>
                    <div class="commerce-hero-art">
                        <img src="assets/ecommerce.png" alt="Online shopping assortment shown across laptop and mobile, with delivery packages" width="923" height="520" fetchpriority="high">
                        <div class="commerce-photo-tag"><span class="commerce-tag-mark">${ecommerceIcon('tag')}</span><span><small>PRODUCT INFORMATION</small><strong>One product · many details</strong></span><span class="commerce-tag-arrow" aria-hidden="true">↗</span></div>
                        <div class="commerce-hero-pin" aria-hidden="true"><span></span> Origin, where recorded</div>
                        <div class="commerce-photo-index">01 / EVERYDAY COMMERCE</div>
                    </div>
                    <div class="commerce-hero-caption"><span>PRODUCT IDENTITY</span><i></i><span>RECORDED JOURNEY</span><i></i><span>AVAILABLE INFORMATION</span></div>
                </div>
            </section>

            <section class="commerce-benefits commerce-section" aria-labelledby="commerce-benefits-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-heading-centered"><p class="commerce-eyebrow">A little more context</p><h2 id="commerce-benefits-heading">Look Beyond the Listing.</h2><p>Explore the information behind the products you buy, sell, and deliver.</p></div>
                    <div class="commerce-benefit-row">${benefits.map(([icon, title, text], index) => `<article class="commerce-benefit" style="--item-index:${index}"><div class="commerce-benefit-circle">${ecommerceIcon(icon)}<span class="commerce-benefit-index">0${index + 1}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
                </div>
            </section>

            <section class="commerce-journey commerce-section" id="commerce-journey" aria-labelledby="commerce-journey-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-journey-heading"><div><p class="commerce-eyebrow">From brand to buyer</p><h2 id="commerce-journey-heading">Every Order Has a Journey.<br><em>Make It Visible.</em></h2></div><p>Behind every online order is a network of manufacturers, warehouses, sellers, and delivery partners. Traceability can help connect the product information recorded along that journey.</p></div>
                    <div class="commerce-journey-layout">
                        <div class="commerce-timeline" role="tablist" aria-label="E-commerce supply-chain journey">${stages.map((stage, index) => `<button class="commerce-stage ${index === 0 ? 'is-active' : ''}" type="button" role="tab" id="commerce-stage-tab-${index}" aria-selected="${index === 0}" aria-controls="commerce-stage-detail" tabindex="${index === 0 ? '0' : '-1'}" data-stage="${index}"><span class="commerce-stage-number">0${index + 1}</span><span class="commerce-stage-icon">${ecommerceIcon(stage.icon)}</span><strong>${stage.title}</strong><span class="commerce-stage-short">${stage.summary}</span></button>`).join('')}</div>
                        <div class="commerce-stage-panel" id="commerce-stage-detail" role="tabpanel" aria-labelledby="commerce-stage-tab-0" tabindex="0"><p class="commerce-eyebrow">A closer look · stage 01</p><h3>${stages[0].title}</h3><p class="commerce-stage-copy">${stages[0].summary}</p><ul>${stages[0].records.map(record => `<li>${record}</li>`).join('')}</ul><span class="commerce-panel-footnote">Records vary by product and participating supply chain.</span></div>
                    </div>
                    <p class="commerce-disclaimer">The journey shows examples of information that may be recorded. OriginX does not automatically track every parcel or capture every logistics event.</p>
                </div>
            </section>

            <section class="commerce-discover commerce-section" aria-labelledby="commerce-discover-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-discover-head"><p class="commerce-eyebrow">Product information, made tangible</p><h2 id="commerce-discover-heading">More Than a Product Page.<br><em>A Deeper Look at What You're Buying.</em></h2><p>Product descriptions help you decide what to buy. Traceability information can help you explore where a product comes from and which records are available about it.</p></div>
                    <div class="commerce-discovery-grid">${discoveries.map(([icon, number, title, text, note, image, alt], index) => `<article class="commerce-discovery commerce-discovery-${index + 1}"><div class="commerce-discovery-image"><img src="${image}" alt="${alt}" width="1000" height="760" loading="lazy"><span class="commerce-image-label">${ecommerceIcon(icon)} ${number} / RECORD TYPE</span>${index === 0 ? '<span class="commerce-product-id">PRODUCT ID · EXAMPLE</span>' : ''}</div><div class="commerce-discovery-copy"><span class="commerce-index">${number}</span><div><h3>${title}</h3><p>${text}</p><small>${note}</small></div></div></article>`).join('')}</div>
                    <p class="commerce-disclaimer">Information shown depends on product category and on which records are available and shared.</p>
                </div>
            </section>

            <section class="commerce-verification commerce-section" aria-labelledby="commerce-verify-heading">
                <div class="commerce-container commerce-verify-grid">
                    <div class="commerce-verification-visual">
                        <div class="commerce-verify-photo"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1100&q=84" alt="An assortment of personal care products arranged in natural light" width="1100" height="920" loading="lazy"><span class="commerce-photo-caption">A PRODUCT, AND THE RECORDS THAT MAY ACCOMPANY IT</span></div>
                        <div class="commerce-verify-scan" aria-label="Illustrative product information label">${ecommerceIcon('tag')}<span>PRODUCT ID<br><strong>EXAMPLE ONLY</strong></span><span class="commerce-faux-qr" aria-hidden="true"></span></div>
                        <div class="commerce-orbit-label">${ecommerceIcon('origin')} SOURCE DETAILS, WHERE RECORDED</div>
                    </div>
                    <div class="commerce-verify-copy">
                        <p class="commerce-eyebrow">Product authenticity & information</p><h2 id="commerce-verify-heading">A Product Should Tell You <em>More Than Its Price.</em></h2>
                        <p>Explore available product information and use supported verification features to help understand the identity and records associated with a product.</p>
                        <div class="commerce-record-preview"><div class="commerce-record-top"><span class="commerce-record-dot"></span><span>ILLUSTRATIVE PRODUCT INFORMATION</span><span class="commerce-record-open">SAMPLE</span></div><h3>Personal care product</h3><dl><div><dt>Product name</dt><dd>Illustrative sample</dd></div><div><dt>Brand / product ID</dt><dd>Where provided</dd></div><div><dt>Batch or serial</dt><dd>Where applicable</dd></div><div><dt>Manufacturing &amp; origin</dt><dd>Where recorded</dd></div><div><dt>Journey milestones</dt><dd>Recorded events, if shared</dd></div></dl><p class="commerce-record-warning">${ecommerceIcon('search')} This is an example panel—not a live verification result.</p></div>
                        <div class="commerce-actions"><button class="commerce-button commerce-button-dark" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button><button class="commerce-text-link" type="button" data-scroll-to="commerce-customer">Learn How Verification Works <span aria-hidden="true">↗</span></button></div>
                        <p class="commerce-disclaimer">A QR code or product identifier can provide an entry point to records; it does not prove authenticity by itself.</p>
                    </div>
                </div>
            </section>

            <section class="commerce-customer commerce-section" id="commerce-customer" aria-labelledby="commerce-customer-heading">
                <div class="commerce-container">
                    <div class="commerce-customer-feature">
                        <div class="commerce-customer-image"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=84" alt="Customer opening an online shopping delivery package at home" width="1400" height="1000" loading="lazy"><div class="commerce-customer-image-note">${ecommerceIcon('box')} PRODUCT INFORMATION CAN TRAVEL BEYOND CHECKOUT</div></div>
                        <div class="commerce-customer-intro"><p class="commerce-eyebrow">A customer-first experience</p><h2 id="commerce-customer-heading">The Shopping Experience Doesn't End at Checkout.</h2><p>Access to relevant product information can continue beyond the purchase, helping customers explore the identity and recorded journey of the products they receive.</p></div>
                    </div>
                    <div class="commerce-customer-steps">${[['Receive', 'Receive your product and locate its available product identifier or verification label.'], ['Explore', 'Access the supported verification experience to explore available product details.'], ['Understand', 'Review the information available for the product and understand what its records reveal.']].map(([title, copy], index) => `<article><span class="commerce-customer-step-number">0${index + 1}</span><div class="commerce-customer-step-icon">${ecommerceIcon(['box', 'search', 'origin'][index])}</div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
                    <p class="commerce-disclaimer">Not every order includes a QR code or supports post-purchase verification.</p>
                </div>
            </section>

            <section class="commerce-ecosystem commerce-section" aria-labelledby="commerce-ecosystem-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-ecosystem-heading"><p class="commerce-eyebrow">Shared visibility, different perspectives</p><h2 id="commerce-ecosystem-heading">More Visibility for Every Part<br><em>of the Shopping Journey.</em></h2><p>Traceability connects a wider ecosystem. Each participant can explore the records relevant to their role.</p></div>
                    <div class="commerce-ecosystem-layout"><div class="commerce-ecosystem-center"><div class="commerce-center-ring">${ecommerceIcon('box')}</div><span>ONE PRODUCT<br>CONNECTED RECORDS</span></div><div class="commerce-stakeholder-list">${stakeholders.map(([icon, title, copy], index) => `<article class="commerce-stakeholder"><span class="commerce-stakeholder-number">0${index + 1}</span><span class="commerce-stakeholder-icon">${ecommerceIcon(icon)}</span><div><h3>${title}</h3><p>${copy}</p></div><span class="commerce-stakeholder-line" aria-hidden="true"></span></article>`).join('')}</div></div>
                </div>
            </section>

            <section class="commerce-categories commerce-section" aria-labelledby="commerce-categories-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-category-heading"><div><p class="commerce-eyebrow">An expansive online shelf</p><h2 id="commerce-categories-heading">Every Category Has a Story<br><em>Worth Exploring.</em></h2></div><p>From everyday essentials to premium purchases, traceability can help connect products with relevant information about their identity and journey.</p></div>
                    <div class="commerce-category-grid">${categories.map(([name, detail, image, alt], index) => `<article class="commerce-category commerce-category-${index + 1}"><div class="commerce-category-photo"><img src="${image}" alt="${alt}" width="1200" height="900" loading="lazy"><span>0${index + 1}</span></div><div class="commerce-category-text"><h3>${name}</h3><p>${detail}</p></div></article>`).join('')}</div>
                    <p class="commerce-disclaimer">Images are illustrative. Product information and traceability records vary by category and participating supply chain.</p>
                </div>
            </section>

            <section class="commerce-network commerce-section" aria-labelledby="commerce-network-heading">
                <div class="commerce-container">
                    <div class="commerce-section-heading commerce-heading-centered"><p class="commerce-eyebrow">The OriginX traceability network</p><h2 id="commerce-network-heading">One Product. Connected Information.<br><em>A Clearer Journey.</em></h2><p>OriginX brings relevant product and supply-chain information into a traceability experience that helps people explore available records.</p></div>
                    <div class="commerce-network-layout"><div class="commerce-network-visual"><svg class="commerce-network-lines" viewBox="0 0 600 500" aria-hidden="true"><path d="M300 250 110 95M300 250 490 95M300 250 500 390M300 250 100 390M300 250 300 40"/></svg><div class="commerce-network-center">${ecommerceIcon('box')}<span>PRODUCT</span></div>${nodes.map(([icon, title], index) => `<button type="button" class="commerce-network-node commerce-node-${index + 1} ${index === 0 ? 'is-active' : ''}" data-network-node="${index}" aria-pressed="${index === 0}" aria-label="${title}">${ecommerceIcon(icon)}<span>${title}</span></button>`).join('')}</div><div class="commerce-network-detail" aria-live="polite"><span class="commerce-network-detail-icon">${ecommerceIcon(nodes[0][0])}</span><p class="commerce-eyebrow">CONNECTED INFORMATION</p><h3>${nodes[0][1]}</h3><p>${nodes[0][2]}</p></div></div>
                    <p class="commerce-disclaimer">Connected records depend on participating businesses and the information they choose to record and share.</p>
                </div>
            </section>

            <section class="commerce-trust commerce-section" aria-labelledby="commerce-trust-heading">
                <div class="commerce-container commerce-trust-grid"><div class="commerce-trust-copy"><p class="commerce-eyebrow">Trust through transparency</p><h2 id="commerce-trust-heading">Trust Grows When Information Is Easier to Explore.</h2><p>Clear product information helps customers and businesses better understand what is recorded about a product, where it comes from, and how it moves through the supply chain.</p><div class="commerce-principles"><article><span>01</span><div><h3>Clearer information</h3><p>Make relevant product records easier to access and understand.</p></div></article><article><span>02</span><div><h3>Connected records</h3><p>Bring product identity and available supply-chain milestones into one traceability experience.</p></div></article><article><span>03</span><div><h3>Informed decisions</h3><p>Help customers and businesses explore the information available before drawing conclusions.</p></div></article></div></div><div class="commerce-trust-visual"><div class="commerce-trust-product"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=84" alt="Product packaging and personal care containers" width="900" height="900" loading="lazy"></div><div class="commerce-trust-lens">${ecommerceIcon('search')}</div><div class="commerce-trust-note"><span>AVAILABLE RECORDS</span><strong>Product identity</strong><strong>Origin, where recorded</strong><strong>Journey milestones</strong></div></div></div>
            </section>

            <section class="commerce-final" aria-labelledby="commerce-final-heading"><div class="commerce-final-orbit commerce-final-orbit-one"></div><div class="commerce-final-orbit commerce-final-orbit-two"></div><div class="commerce-container commerce-final-content"><p class="commerce-eyebrow">A more transparent way to explore</p><h2 id="commerce-final-heading">Every Product Has a Story.<br><em>Let People Explore It.</em></h2><p>Discover how OriginX can help connect product information and supply-chain records for a more transparent e-commerce experience.</p><div class="commerce-actions"><button class="commerce-button commerce-button-light" type="button" onclick="goToSection('product')">Explore OriginX Traceability <span aria-hidden="true">↗</span></button><button class="commerce-button commerce-button-ghost" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div><div class="commerce-final-products" aria-hidden="true"><span>${ecommerceIcon('box')}</span><i></i><span>${ecommerceIcon('tag')}</span><i></i><span>${ecommerceIcon('bag')}</span></div></div></section>
        </div>`;

    const stageTabs = [...container.querySelectorAll('[data-stage]')];
    const stagePanel = container.querySelector('#commerce-stage-detail');
    const activateStage = (index, focusTab) => {
        const stage = stages[index];
        stageTabs.forEach((tab, tabIndex) => {
            const active = tabIndex === index;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
        });
        stagePanel.setAttribute('aria-labelledby', `commerce-stage-tab-${index}`);
        stagePanel.innerHTML = `<p class="commerce-eyebrow">A closer look · stage 0${index + 1}</p><h3>${stage.title}</h3><p class="commerce-stage-copy">${stage.summary}</p><ul>${stage.records.map(record => `<li>${record}</li>`).join('')}</ul><span class="commerce-panel-footnote">Records vary by product and participating supply chain.</span>`;
        if (focusTab) stageTabs[index].focus();
    };
    stageTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateStage(index, false));
        tab.addEventListener('keydown', event => {
            if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            let next = index;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stages.length;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + stages.length) % stages.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = stages.length - 1;
            activateStage(next, true);
        });
    });

    const nodeButtons = [...container.querySelectorAll('[data-network-node]')];
    const nodeDetail = container.querySelector('.commerce-network-detail');
    nodeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const [icon, title, description] = nodes[index];
            nodeButtons.forEach((node, nodeIndex) => {
                const active = nodeIndex === index;
                node.classList.toggle('is-active', active);
                node.setAttribute('aria-pressed', String(active));
            });
            nodeDetail.innerHTML = `<span class="commerce-network-detail-icon">${ecommerceIcon(icon)}</span><p class="commerce-eyebrow">CONNECTED INFORMATION</p><h3>${title}</h3><p>${description}</p>`;
        });
    });

    container.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', () => container.querySelector(`#${button.dataset.scrollTo}`)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
    });
}
