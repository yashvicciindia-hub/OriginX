const MSME_ICONS = {
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="m3 7 9 4 9-4m-9 4v10"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    batch: '<path d="M4 6h16v14H4zM8 6V4h8v2M8 11h8M8 15h5"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h2"/>',
    person: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M8 10.5h5"/>',
    workshop: '<path d="M3 21V9l6 3V8l6 4V5h6v16H3Z"/><path d="M7 17h.01M11 17h.01M15 17h.01M18 8h.01"/>',
    hands: '<path d="M4 13 8 9l4 3 5-4 4 3-7 8H9l-5-6Z"/><path d="m8 9 2-3 4 2 3-3 4 3M4 13l-2 2 5 6"/>',
    truck: '<path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/>',
    leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z"/><path d="M5 20c3-5 7-8 12-11"/>',
    tag: '<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="9" cy="9" r="1"/>',
    link: '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="6" r="3"/><circle cx="17" cy="18" r="3"/><path d="m9.6 10.5 4.8-3m-4.8 6 4.8 3"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>'
};

function msmePhoto(photoId, width = 1000) {
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=82`;
}

function msmeIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MSME_ICONS[name] || MSME_ICONS.box}</svg>`;
}

function renderMsmePage(container) {
    const benefits = [
        ['box', 'Give Products an Identity', 'Connect products with identifying details and relevant product records.'],
        ['pin', 'Show Where It Begins', 'Present available information about your business, manufacturing, or product origin.'],
        ['batch', 'Organize Batch Details', 'Associate products with relevant batch or production records where supported.'],
        ['route', 'Connect the Journey', 'Explore recorded product movements and handovers across participating partners.'],
        ['person', 'Build Buyer Confidence', 'Help customers and business buyers explore the information you make available.']
    ];
    const stages = [
        { title: 'Raw materials', icon: 'leaf', image: msmePhoto('1596797038530-2c107229654b'), alt: 'A freshly prepared food product representing ingredient sourcing', copy: 'A product story may begin with the materials or ingredients a business chooses to record.', records: ['Material or ingredient details', 'Supplier information', 'Available source information', 'Incoming batch reference, where relevant'] },
        { title: 'Production & craft', icon: 'workshop', image: msmePhoto('1558618666-fcd25c85cd64'), alt: 'Maker shaping a component at a workbench', copy: 'Bring together a maker or manufacturer identity, product details, and available production records.', records: ['Business or manufacturer identity', 'Product name', 'Production batch reference', 'Manufacturing records, where available'] },
        { title: 'Product identity', icon: 'tag', image: msmePhoto('1521572163474-6864f9cf17ab'), alt: 'Finished apparel arranged for product identification', copy: 'A product identifier can link a finished item or batch with the records associated with it.', records: ['Product identifier', 'Batch or lot number, where applicable', 'Available product description', 'Manufacturing or packaging details, where recorded'] },
        { title: 'Distribution', icon: 'truck', image: msmePhoto('1519003722824-194d4455a60c'), alt: 'A delivery truck carrying goods along a mountain road', copy: 'Participating partners can add context through shared dispatch and receiving records.', records: ['Dispatch events', 'Distribution references', 'Recorded handovers', 'Participating business details'] },
        { title: 'Customer & market', icon: 'person', image: msmePhoto('1556761175-b413da4baf72'), alt: 'Business buyers discussing products together', copy: 'Customers and business buyers can explore supported product information and verification features.', records: ['Product identity', 'Available origin details', 'Relevant batch records', 'Supported verification features'] }
    ];
    const categories = [
        { name: 'Agriculture & food processing', description: 'Connect food products with available ingredient, business, and batch information.', image: msmePhoto('1605000797499-95a51c5269ae'), alt: 'Farm workers carrying harvested produce through a field', product: 'Illustrative spice blend', business: 'Example food producer', batch: 'Sample lot: FD-024', origin: 'Origin details, if recorded' },
        { name: 'Textiles & apparel', description: 'Explore product identity and available information about makers or origin.', image: msmePhoto('1512436991641-6745cdb1723f'), alt: 'A collection of garments displayed in a clothing studio', product: 'Illustrative handwoven fabric', business: 'Example textile maker', batch: 'Sample lot: TX-118', origin: 'Origin details, if recorded' },
        { name: 'Handicrafts & artisan goods', description: 'Present available details about the product, its maker, and recorded journey.', image: msmePhoto('1513364776144-60967b0f800f'), alt: 'Paintbrushes and colorful paint in an artist workspace', product: 'Illustrative handcrafted object', business: 'Example artisan business', batch: 'Sample lot: CR-052', origin: 'Origin details, if recorded' },
        { name: 'FMCG & personal care', description: 'Connect consumer products with relevant manufacturing or batch records.', image: msmePhoto('1556228578-0d85b1a4d571'), alt: 'Personal-care products in a softly lit bathroom setting', product: 'Illustrative personal-care product', business: 'Example small manufacturer', batch: 'Sample lot: PC-031', origin: 'Origin details, if recorded' },
        { name: 'Furniture & home products', description: 'Make product identity and available maker information easier to explore.', image: msmePhoto('1616486338812-3dadae4b4ace'), alt: 'Home furnishings arranged in a bright living room', product: 'Illustrative home product', business: 'Example home-products maker', batch: 'Sample lot: HM-016', origin: 'Origin details, if recorded' },
        { name: 'Electronics & components', description: 'Reference product identifiers and related manufacturing information.', image: msmePhoto('1518770660439-4636190af475'), alt: 'Electronic components and a circuit board', product: 'Illustrative electronic component', business: 'Example electronics maker', batch: 'Sample lot: EL-207', origin: 'Origin details, if recorded' },
        { name: 'Industrial components', description: 'Explore available product, batch, or production details for industrial goods.', image: msmePhoto('1567789884554-0b844b597180'), alt: 'Robotic equipment assembling a vehicle in a manufacturing facility', product: 'Illustrative manufactured component', business: 'Example component supplier', batch: 'Sample lot: IC-114', origin: 'Origin details, if recorded' },
        { name: 'Packaging & consumer goods', description: 'Connect packaged products with identity and recorded supply-chain milestones.', image: msmePhoto('1542291026-7eec264c27ff'), alt: 'A finished consumer product displayed against a clean background', product: 'Illustrative packaged consumer good', business: 'Example packaging business', batch: 'Sample lot: PK-068', origin: 'Origin details, if recorded' }
    ];
    const network = [
        ['workshop', 'Maker or manufacturer', 'Explore available business and manufacturing information.'],
        ['box', 'Product identity', 'Review identifying product details associated with the record.'],
        ['batch', 'Batch information', 'Access relevant batch records where supported.'],
        ['truck', 'Distribution partners', 'Explore recorded movements or handovers shared by participating partners.'],
        ['person', 'Customer or buyer', 'Access the supported product information or verification experience.']
    ];
    const stakeholders = [
        ['workshop', 'Manufacturers', 'Connect products with available manufacturing information and organize relevant product and batch records.', msmePhoto('1581092160562-40aa08e78837', 900), 'A manufacturer reviewing a product design at a workbench'],
        ['hands', 'Artisans & producers', 'Present available information about the maker, product, and origin.', msmePhoto('1558618666-fcd25c85cd64', 900), 'A maker shaping a component at a workbench'],
        ['truck', 'Distributors', 'Reference product identifiers and review recorded journey milestones.', msmePhoto('1519003722824-194d4455a60c', 900), 'A delivery truck carrying goods along a road'],
        ['search', 'Retailers & buyers', 'Access available product information and relevant manufacturing or batch records.', msmePhoto('1556761175-b413da4baf72', 900), 'Business buyers discussing products together'],
        ['person', 'Consumers', 'Explore product identity and use supported verification features.', msmePhoto('1511707171634-5f897ff02aa9', 900), 'A smartphone used to access product information']
    ];

    container.innerHTML = `
        <div class="msme-page">
            <section class="msme-hero" aria-labelledby="msme-hero-title">
                <div class="msme-hero-copy">
                    <p class="msme-eyebrow"><span></span> MADE WITH SKILL. CONNECTED WITH CLARITY.</p>
                    <h1 id="msme-hero-title">Small Businesses.<br><em>Bigger Possibilities.</em></h1>
                    <h2>Make your products easier to understand, trace, and trust.</h2>
                    <p>OriginX helps connect products with relevant information and recorded supply-chain events, giving growing businesses a clearer way to present product identity, origin, and available traceability records.</p>
                    <div class="msme-actions"><a class="msme-button msme-button--light" href="#msme-journey">Explore MSME Traceability <span aria-hidden="true">↗</span></a><button class="msme-button msme-button--outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div>
                    <div class="msme-hero-note"><span class="msme-note-line"></span><span>Clear product information should be within reach of every business.</span></div>
                </div>
                <div class="msme-hero-art">
                    <img class="msme-hero-image" src="${msmePhoto('1605000797499-95a51c5269ae', 1500)}" alt="A small producer carrying harvested goods through a field">
                    <div class="msme-hero-inset"><img src="${msmePhoto('1556228578-0d85b1a4d571', 700)}" alt="Personal-care products prepared for packaging" loading="lazy"><span>Made with care<br><strong>Ready to be discovered</strong></span></div>
                    <div class="msme-product-tag"><span class="msme-tag-mark" aria-hidden="true">${msmeIcon('tag')}</span><span><small>PRODUCT ID</small><strong>Identity · Origin · Journey</strong></span><i aria-hidden="true"></i></div>
                    <span class="msme-hero-index" aria-hidden="true">01 / 05</span>
                </div>
            </section>

            <section class="msme-benefits msme-section" aria-labelledby="msme-benefits-title">
                <div class="msme-section-heading msme-center">
                    <p class="msme-kicker">A CLEARER PRODUCT STORY</p><h2 id="msme-benefits-title">Small Business. Stronger Product Visibility.</h2>
                    <p>Make the important details behind your products easier to explore.</p>
                </div>
                <div class="msme-benefit-grid">${benefits.map(([icon, title, text], i) => `<article class="msme-benefit"><div class="msme-benefit-circle">${msmeIcon(icon)}<span>0${i + 1}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
            </section>

            <section class="msme-journey msme-section" id="msme-journey" aria-labelledby="msme-journey-title">
                <div class="msme-section-heading msme-section-heading--split"><div><p class="msme-kicker">FROM MAKER TO MARKET</p><h2 id="msme-journey-title">From Your Workshop to the World.</h2></div><p>Every product has a journey. Traceability can help connect the information recorded at different stages, from production to distribution.</p></div>
                <div class="msme-journey-steps" role="tablist" aria-label="Product journey stages">${stages.map((stage, i) => `<button class="msme-journey-step${i === 0 ? ' is-active' : ''}" type="button" role="tab" tabindex="${i === 0 ? '0' : '-1'}" aria-selected="${i === 0}" aria-controls="msme-stage-panel" data-msme-stage="${i}"><span class="msme-step-number">0${i + 1}</span><span class="msme-step-icon">${msmeIcon(stage.icon)}</span><span class="msme-step-title">${stage.title}</span><span class="msme-step-dot"></span></button>`).join('')}</div>
                <div class="msme-stage-panel" id="msme-stage-panel" role="tabpanel" tabindex="0">
                    <img src="${stages[0].image}" alt="${stages[0].alt}" loading="lazy" data-msme-stage-image>
                    <div class="msme-stage-copy"><p class="msme-kicker" data-msme-stage-index>STAGE 01</p><h3 data-msme-stage-title>${stages[0].title}</h3><p data-msme-stage-copy>${stages[0].copy}</p><ul data-msme-stage-records>${stages[0].records.map(item => `<li>${item}</li>`).join('')}</ul><span class="msme-illustrative-note">Illustrative journey — records depend on what participating businesses make available.</span></div>
                </div>
            </section>

            <section class="msme-discover msme-section" aria-labelledby="msme-discover-title">
                <div class="msme-section-heading"><p class="msme-kicker">A STORY IN THE DETAILS</p><h2 id="msme-discover-title">Your Product Has a Story.<br>Make It Easier to Explore.</h2><p>Connect relevant information with the products your business creates.</p></div>
                <div class="msme-discover-grid">
                    <article class="msme-discover-feature"><img src="${msmePhoto('1513364776144-60967b0f800f', 1300)}" alt="Colorful paints and brushes in a maker's workspace" loading="lazy"><span class="msme-image-caption">01 / THE MAKER</span><div><span class="msme-outline-icon">${msmeIcon('workshop')}</span><h3>Business & Manufacturer Identity</h3><p>Connect products with available information about your business or manufacturing identity.</p></div></article>
                    <article class="msme-discover-tile msme-discover-tile--origin"><span class="msme-outline-icon">${msmeIcon('pin')}</span><small>02 / ORIGIN</small><h3>Where it begins</h3><p>Present available information about where your product is made or sourced.</p><div class="msme-origin-art" aria-hidden="true"><span></span><i></i><b></b></div></article>
                    <article class="msme-discover-tile msme-discover-tile--product"><img src="${msmePhoto('1521572163474-6864f9cf17ab', 900)}" alt="Finished apparel ready for product identification" loading="lazy"><div><small>03 / PRODUCT DETAILS</small><h3>Identity that travels</h3><p>Make relevant product identifiers and descriptions easier to access.</p></div></article>
                    <article class="msme-discover-tile msme-discover-tile--batch"><span class="msme-outline-icon">${msmeIcon('batch')}</span><small>04 / BATCH</small><h3>Production records</h3><p>Associate products with relevant batch or manufacturing details where available.</p><div class="msme-batch-label"><span>LOT REFERENCE</span><b>EXAMPLE · 024</b><i></i></div></article>
                    <article class="msme-discover-tile msme-discover-tile--journey"><span class="msme-outline-icon">${msmeIcon('route')}</span><small>05 / JOURNEY</small><h3>Supply-chain milestones</h3><p>Explore recorded milestones as products move through participating partners.</p><div class="msme-mini-route"><i></i><i></i><i></i><i></i></div></article>
                    <article class="msme-discover-tile msme-discover-tile--verify"><img src="${msmePhoto('1511707171634-5f897ff02aa9', 900)}" alt="A smartphone as an entry point to product information" loading="lazy"><div><small>06 / ACCESS</small><h3>Verification entry point</h3><p>Provide access to supported product verification and available traceability information.</p></div></article>
                </div>
            </section>

            <section class="msme-verify msme-section" aria-labelledby="msme-verify-title">
                <div class="msme-verify-products"><div class="msme-product-collage"><img src="${msmePhoto('1542291026-7eec264c27ff', 900)}" alt="A finished consumer product" loading="lazy"><img src="${msmePhoto('1512436991641-6745cdb1723f', 900)}" alt="Garments made by independent businesses" loading="lazy"><img src="${msmePhoto('1556228578-0d85b1a4d571', 700)}" alt="Personal-care product packaging" loading="lazy"><img src="${msmePhoto('1513364776144-60967b0f800f', 700)}" alt="A handcrafted product being created" loading="lazy"><span class="msme-scan-label">${msmeIcon('tag')} PRODUCT ID<br><strong>EXAMPLE LABEL</strong></span></div><p class="msme-image-caption">A product identifier can open a path to the records that are available.</p></div>
                <div class="msme-verify-copy"><p class="msme-kicker">PRODUCT IDENTIFICATION</p><h2 id="msme-verify-title">Make Every Product Easier to Identify.</h2><p>Help customers and business buyers access relevant product information through the traceability and verification features supported by OriginX.</p>
                    <div class="msme-sample-panel"><div class="msme-sample-head"><span class="msme-mini-mark">${msmeIcon('box')}</span><div><small>ILLUSTRATIVE RECORD</small><strong data-msme-product-name>${categories[0].product}</strong></div><span class="msme-sample-stamp">SAMPLE</span></div><dl><div><dt>Business / manufacturer</dt><dd data-msme-product-business>${categories[0].business}</dd></div><div><dt>Product ID</dt><dd>Example identifier</dd></div><div><dt>Batch / lot</dt><dd data-msme-product-batch>${categories[0].batch}</dd></div><div><dt>Origin information</dt><dd data-msme-product-origin>${categories[0].origin}</dd></div></dl><p class="msme-sample-footnote">Fields shown are examples, not live OriginX product records. Information varies by product.</p></div>
                    <div class="msme-category-switcher" aria-label="Illustrative product examples">${categories.slice(0, 4).map((category, i) => `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-msme-category="${i}" aria-pressed="${i === 0}">${category.name}</button>`).join('')}</div>
                    <div class="msme-actions"><button class="msme-button msme-button--green" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button><a class="msme-text-link" href="#msme-network">Explore Traceability <span aria-hidden="true">↗</span></a></div>
                    <p class="msme-qr-caveat">A QR code or product identifier is an access point to information; it does not by itself prove authenticity.</p>
                </div>
            </section>

            <section class="msme-craft msme-section" aria-labelledby="msme-craft-title"><div class="msme-craft-photos"><img src="${msmePhoto('1512436991641-6745cdb1723f', 1100)}" alt="Garments displayed in a textile studio" loading="lazy"><img src="${msmePhoto('1610701596007-11502861dcfa', 700)}" alt="Handmade ceramic goods arranged for sale" loading="lazy"><img src="${msmePhoto('1596797038530-2c107229654b', 700)}" alt="A prepared food product representing small-batch food businesses" loading="lazy"></div><div class="msme-craft-copy"><p class="msme-kicker">INDIAN SKILL, MANY FORMS</p><h2 id="msme-craft-title">Rooted in Skill.<br><em>Ready for New Opportunities.</em></h2><p>From traditional craftsmanship to modern manufacturing, India's small businesses create products with distinctive skills, processes, and stories. Traceability can help connect those products with relevant information about their origins and journeys.</p><div class="msme-principles"><article><span>${msmeIcon('hands')}</span><div><h3>Preserve product stories</h3><p>Make available information about the maker, materials, or origin easier to discover.</p></div></article><article><span>${msmeIcon('route')}</span><div><h3>Connect craft to commerce</h3><p>Connect relevant product information with participating distributors, retailers, and buyers.</p></div></article><article><span>${msmeIcon('search')}</span><div><h3>Present information clearly</h3><p>Help people explore the product details your business makes available.</p></div></article></div></div></section>

            <section class="msme-b2b msme-section" aria-labelledby="msme-b2b-title"><div class="msme-section-heading msme-center"><p class="msme-kicker">INFORMATION THAT CONNECTS</p><h2 id="msme-b2b-title">Better Product Information for<br>Better Business Conversations.</h2><p>Clear and accessible information can make product discussions between MSMEs and business buyers more effective.</p></div><div class="msme-b2b-visual"><div class="msme-b2b-person"><img src="${msmePhoto('1558618666-fcd25c85cd64', 700)}" alt="A maker shaping a component at a workbench" loading="lazy"><span>THE MAKER</span></div><div class="msme-b2b-record"><span class="msme-outline-icon">${msmeIcon('tag')}</span><p>PRODUCT RECORD</p><h3>Shared details.<br>Clearer reference.</h3><div><span>Product identity</span><span>Batch information</span><span>Recorded milestones</span></div></div><div class="msme-b2b-person msme-b2b-person--buyer"><img src="${msmePhoto('1556761175-b413da4baf72', 700)}" alt="Business buyers discussing product details" loading="lazy"><span>THE BUSINESS BUYER</span></div></div><div class="msme-b2b-points"><article><span>01</span><h3>Product identification</h3><p>Make product names, identifiers, and relevant records easier to reference.</p></article><article><span>02</span><h3>Product & batch information</h3><p>Organize available production and batch information for participating partners.</p></article><article><span>03</span><h3>Supply-chain visibility</h3><p>Explore recorded handovers and journey milestones where available.</p></article></div><a class="msme-text-link" href="#msme-journey">Explore MSME Traceability <span aria-hidden="true">↗</span></a></section>

            <section class="msme-network msme-section" id="msme-network" aria-labelledby="msme-network-title"><div class="msme-network-copy"><p class="msme-kicker">PRODUCT INFORMATION, CONNECTED</p><h2 id="msme-network-title">One Small Business.<br>A Connected Product Journey.</h2><p>OriginX helps connect relevant product information and recorded supply-chain events, making it easier to explore the journey of goods moving between participating businesses.</p><p class="msme-illustrative-note">Connections shown are illustrative. Records are not necessarily automatic, complete, or real-time.</p></div><div class="msme-network-visual"><svg class="msme-network-lines" viewBox="0 0 600 500" aria-hidden="true"><path d="M300 250C165 225 160 95 115 92M300 250C430 225 445 100 485 92M300 250C160 300 155 397 115 410M300 250C430 300 450 397 485 410M300 250V55"/></svg><div class="msme-network-core"><span>${msmeIcon('box')}</span><small>PRODUCT</small><strong>Identity</strong></div>${network.map(([icon, label, text], i) => `<button type="button" class="msme-network-node msme-network-node--${i}${i === 0 ? ' is-active' : ''}" data-msme-network="${i}" aria-pressed="${i === 0}" aria-label="${label}"><span>${msmeIcon(icon)}</span><strong>${label}</strong></button>`).join('')}<div class="msme-network-detail" aria-live="polite"><span class="msme-network-detail-icon">${msmeIcon(network[0][0])}</span><div><strong data-msme-network-title>${network[0][1]}</strong><p data-msme-network-copy>${network[0][2]}</p></div></div></div></section>

            <section class="msme-markets msme-section" aria-labelledby="msme-markets-title"><div class="msme-section-heading msme-center"><p class="msme-kicker">A JOURNEY THAT CAN REACH FURTHER</p><h2 id="msme-markets-title">From Local Roots to Wider Markets.</h2><p>Clear product information can help make your business's products easier to understand wherever they travel.</p></div><div class="msme-market-route"><article><img src="${msmePhoto('1596797038530-2c107229654b', 900)}" alt="A prepared Indian food product from a small producer" loading="lazy"><span>01 / LOCAL BUSINESS</span><h3>Start with your product</h3><p>Connect products with relevant business and product information.</p></article><article><img src="${msmePhoto('1519003722824-194d4455a60c', 900)}" alt="A delivery truck carrying goods between markets" loading="lazy"><span>02 / NATIONAL DISTRIBUTION</span><h3>Share across partners</h3><p>Explore recorded movements and information shared by participating partners.</p></article><article><img src="${msmePhoto('1567789884554-0b844b597180', 900)}" alt="Manufactured goods moving through a wider supply chain" loading="lazy"><span>03 / WIDER SUPPLY CHAINS</span><h3>Connect broader journeys</h3><p>Connect products with available traceability information as they enter wider supply chains.</p></article></div><p class="msme-market-note">Aspirational examples only; OriginX does not guarantee market access, export readiness, or business outcomes.</p></section>

            <section class="msme-categories msme-section" aria-labelledby="msme-categories-title"><div class="msme-section-heading msme-section-heading--split"><div><p class="msme-kicker">MADE BY MANY KINDS OF BUSINESSES</p><h2 id="msme-categories-title">Different Makers. Different Products.<br>One Connected Story.</h2></div><p>Traceability can help connect relevant product information across a wide range of small-business industries.</p></div><div class="msme-category-grid">${categories.map((category, i) => `<article class="msme-category-card msme-category-card--${i}"><img src="${category.image}" alt="${category.alt}" loading="lazy"><div><span>0${i + 1} / MSME MAKERS</span><h3>${category.name}</h3><p>${category.description}</p><i aria-hidden="true">↗</i></div></article>`).join('')}</div></section>

            <section class="msme-simple msme-section"><div class="msme-simple-copy"><p class="msme-kicker">POWERFUL INFORMATION, CLEAR EXPERIENCE</p><h2>Technology that feels approachable.</h2><p>Small businesses need practical ways to organize and present relevant product information without making the customer experience unnecessarily complicated.</p><div class="msme-simple-points"><article><span>01</span><div><h3>Easy to explore</h3><p>Present relevant product information in a clear, understandable format.</p></div></article><article><span>02</span><div><h3>Connected information</h3><p>Bring together available product details and recorded journey events.</p></div></article><article><span>03</span><div><h3>Practical transparency</h3><p>Help customers and business buyers understand the records associated with a product.</p></div></article></div></div><div class="msme-simple-screen"><div class="msme-screen-top"><span class="msme-screen-dot"></span><span>PRODUCT INFORMATION</span><span>EXAMPLE</span></div><div class="msme-screen-product"><img src="${categories[1].image}" alt="Illustrative product information example" loading="lazy"><div><small>PRODUCT</small><strong>Illustrative woven textile</strong><span>Example identifier · TX-118</span></div></div><div class="msme-screen-records"><p><span>Business / maker</span><b>Example textile maker</b></p><p><span>Origin information</span><b>Available, if recorded</b></p><p><span>Batch reference</span><b>Example lot · TX-118</b></p></div><div class="msme-screen-route"><span>${msmeIcon('pin')}</span><i></i><span>${msmeIcon('workshop')}</span><i></i><span>${msmeIcon('truck')}</span></div><small class="msme-screen-disclaimer">Illustrative fields only. Actual information varies by product.</small></div></section>

            <section class="msme-stakeholders msme-section" aria-labelledby="msme-stakeholders-title"><div class="msme-section-heading"><p class="msme-kicker">A SHARED VIEW OF THE JOURNEY</p><h2 id="msme-stakeholders-title">More Visibility for Everyone in the Supply Chain.</h2></div><div class="msme-stakeholder-grid">${stakeholders.map(([icon, title, text, image, alt], i) => `<article class="msme-stakeholder msme-stakeholder--${i}"><img src="${image}" alt="${alt}" loading="lazy"><div class="msme-stakeholder-copy"><span>${msmeIcon(icon)}</span><small>0${i + 1}</small><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div></section>

            <section class="msme-final" aria-labelledby="msme-final-title"><div class="msme-final-image"><img src="${msmePhoto('1490481651871-ab68de25d43d', 1200)}" alt="A collection of finished apparel representing diverse MSME products" loading="lazy"></div><div class="msme-final-copy"><p class="msme-kicker">A CLEARER STORY, READY TO TRAVEL</p><h2 id="msme-final-title">Your Business Makes the Product.<br><em>Let Its Story Travel With It.</em></h2><p>Discover how OriginX can help connect product information and recorded supply-chain milestones, making your products easier to explore across participating business networks.</p><div class="msme-actions"><a class="msme-button msme-button--light" href="#msme-journey">Explore OriginX Traceability <span aria-hidden="true">↗</span></a><button class="msme-button msme-button--outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div></div></section>
        </div>`;

    const stageButtons = Array.from(container.querySelectorAll('[data-msme-stage]'));
    stageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = Number(button.dataset.msmeStage);
            const stage = stages[index];
            stageButtons.forEach((item, itemIndex) => {
                const selected = itemIndex === index;
                item.classList.toggle('is-active', selected);
                item.setAttribute('aria-selected', String(selected));
                item.tabIndex = selected ? 0 : -1;
            });
            container.querySelector('[data-msme-stage-image]').src = stage.image;
            container.querySelector('[data-msme-stage-image]').alt = stage.alt;
            container.querySelector('[data-msme-stage-index]').textContent = `STAGE 0${index + 1}`;
            container.querySelector('[data-msme-stage-title]').textContent = stage.title;
            container.querySelector('[data-msme-stage-copy]').textContent = stage.copy;
            container.querySelector('[data-msme-stage-records]').innerHTML = stage.records.map(item => `<li>${item}</li>`).join('');
        });
        button.addEventListener('keydown', event => {
            const currentIndex = stageButtons.indexOf(button);
            let nextIndex;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % stageButtons.length;
            else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + stageButtons.length) % stageButtons.length;
            else if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = stageButtons.length - 1;
            else return;
            event.preventDefault();
            stageButtons[nextIndex].focus();
            stageButtons[nextIndex].click();
        });
    });

    const categoryButtons = Array.from(container.querySelectorAll('[data-msme-category]'));
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = categories[Number(button.dataset.msmeCategory)];
            categoryButtons.forEach(item => {
                const selected = item === button;
                item.classList.toggle('is-active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            container.querySelector('[data-msme-product-name]').textContent = category.product;
            container.querySelector('[data-msme-product-business]').textContent = category.business;
            container.querySelector('[data-msme-product-batch]').textContent = category.batch;
            container.querySelector('[data-msme-product-origin]').textContent = category.origin;
            container.querySelector('.msme-product-collage img').src = category.image;
            container.querySelector('.msme-product-collage img').alt = category.alt;
        });
    });

    const networkButtons = Array.from(container.querySelectorAll('[data-msme-network]'));
    networkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const [icon, title, text] = network[Number(button.dataset.msmeNetwork)];
            networkButtons.forEach(item => {
                const selected = item === button;
                item.classList.toggle('is-active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            container.querySelector('.msme-network-detail-icon').innerHTML = msmeIcon(icon);
            container.querySelector('[data-msme-network-title]').textContent = title;
            container.querySelector('[data-msme-network-copy]').textContent = text;
        });
    });
}
