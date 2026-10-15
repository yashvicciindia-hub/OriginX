const JEWELLERY_ICONS = {
    gem: '<path d="m6 3 6 0 6 5-6 13L6 8l6-5"/><path d="M3 8h18M9 8l3 13m3-13-3 13"/>',
    box: '<path d="m3 8 9-5 9 5v11l-9 3-9-3V8Z"/><path d="m3 8 9 5 9-5m-9 5v9m-4-12 8-5"/>',
    craft: '<circle cx="12" cy="15" r="5"/><path d="m12 10 2-7 2 2-2 6M5 21l3-3m11-3 2 2m-9-2h.01"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M8 10.5h5"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h2"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    tag: '<path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="9" cy="9" r="1"/>',
    file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v6h5M9 13h7m-7 4h7"/>',
    link: '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="6" r="3"/><circle cx="17" cy="18" r="3"/><path d="m9.6 10.5 4.8-3m-4.8 6 4.8 3"/>'
};

function jewelleryPhoto(id, width = 1000) {
    if (id === 'local-jewellery') return 'assets/jwel.jpg';
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`;
}

function jewelleryIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${JEWELLERY_ICONS[name] || JEWELLERY_ICONS.gem}</svg>`;
}

function renderJewelleryPage(container) {
    const benefits = [
        ['gem', 'Explore Material Origin', 'Discover available information about the origin or source of recorded jewellery materials.'],
        ['box', 'Know Your Jewellery', 'Access identifying product details and relevant records where available.'],
        ['craft', 'Discover the Craft', 'Explore available information about the maker, manufacturer, or production process.'],
        ['search', 'Explore Verification', 'Access supported verification features and available product or certification records.'],
        ['route', 'Follow Its Journey', 'Explore recorded milestones connecting materials, manufacturing, and finished jewellery.']
    ];
    const stages = [
        { title: 'Material origin', image: '1599643478518-a784e5dc4c8f', alt: 'A close detail of jewellery materials and gemstones', copy: 'A jewellery story may begin with precious metal or a gemstone, alongside whatever source information has been recorded.', records: ['Material identification', 'Source details, where recorded', 'Supplier or batch reference', 'Available supporting records'] },
        { title: 'Material processing', image: '1617038220319-276d3cfab638', alt: 'A close-up of carefully prepared fine jewellery', copy: 'Processing details can add context to material identifiers and recorded supplier or batch information.', records: ['Processing details, where available', 'Material or batch identifiers', 'Recorded processing events', 'Relevant supplier records'] },
        { title: 'Jewellery craftsmanship', image: '1558618666-fcd25c85cd64', alt: 'A craftsperson working carefully at a jewellery bench', copy: 'A finished piece may be connected with its maker or manufacturer and relevant production records.', records: ['Maker or manufacturer information', 'Product identity', 'Production batch reference, where applicable', 'Available manufacturing records'] },
        { title: 'Product identification', image: 'local-jewellery', alt: 'A ring and necklace arranged on a warm ivory surface', copy: 'A product identifier can provide a route to the information associated with a particular piece.', records: ['Product name and identifier', 'Recorded metal or gemstone details', 'Available hallmarking references', 'Relevant documentation, where recorded'] },
        { title: 'Retail & customer', image: '1603561591411-07134e71a2a9', alt: 'A refined customer-facing product presentation', copy: 'Customers can explore available product details and use verification features supported by the product record.', records: ['Product identity', 'Available origin information', 'Relevant product records', 'Supported verification entry point'] }
    ];
    const materials = [
        { label: 'Precious metals', title: 'Metal details, where recorded', photo: '1617038220319-276d3cfab638', alt: 'Fine jewellery with a warm precious-metal finish', fields: ['Material type', 'Material identifier', 'Purity-related information, where recorded', 'Supplier or processing reference, where available'] },
        { label: 'Natural gemstones', title: 'Gemstone information, where recorded', photo: '1599643478518-a784e5dc4c8f', alt: 'A gemstone set in a finely crafted jewellery piece', fields: ['Gemstone details', 'Available source information', 'Related material or batch reference', 'Documentation, where associated'] },
        { label: 'Lab-grown diamonds', title: 'Recorded diamond details', photo: '1617038220319-276d3cfab638', alt: 'A brilliant gemstone detail in a jewellery setting', fields: ['Diamond details, where recorded', 'Material identifier', 'Available supplier or processing reference', 'Related product record'] }
    ];
    const categories = [
        { name: 'Gold jewellery', image: 'local-jewellery', alt: 'A gold ring and necklace arranged against ivory', caption: 'METAL & MAKER' },
        { name: 'Diamond jewellery', image: '1599643478518-a784e5dc4c8f', alt: 'A diamond jewellery detail in soft directional light', caption: 'GEMSTONE DETAILS' },
        { name: 'Gemstone jewellery', image: '1617038220319-276d3cfab638', alt: 'A coloured gemstone set in fine jewellery', caption: 'MATERIAL STORY' },
        { name: 'Silver jewellery', image: '1610701596007-11502861dcfa', alt: 'A handcrafted silver-toned detail', caption: 'CRAFT & IDENTITY' },
        { name: 'Bridal jewellery', image: '1599643478518-a784e5dc4c8f', alt: 'A bridal jewellery composition with necklace and earrings', caption: 'MADE FOR AN OCCASION' },
        { name: 'Traditional Indian jewellery', image: '1605100804763-247f67b3557e', alt: 'Traditional-inspired jewellery with intricate detail', caption: 'HERITAGE & HANDWORK' },
        { name: 'Contemporary fine jewellery', image: '1617038220319-276d3cfab638', alt: 'Contemporary fine jewellery with a sculptural silhouette', caption: 'FORM & FINISH' },
        { name: 'Luxury accessories', image: '1603561591411-07134e71a2a9', alt: 'A refined luxury accessory with jewellery details', caption: 'DETAILS THAT TRAVEL' }
    ];
    const stakeholders = [
        ['workshop', 'Jewellery manufacturers', 'Connect products with available manufacturing records and relevant production identifiers.', '1558618666-fcd25c85cd64', 'A maker working carefully at a craft bench'],
        ['gem', 'Material suppliers', 'Associate materials with identifying records and available source information.', '1599643478518-a784e5dc4c8f', 'Gemstone and metal details representing material supply'],
        ['box', 'Jewellery retailers', 'Explore product records and present relevant information to customers.', '1603561591411-07134e71a2a9', 'A jewellery item prepared for retail presentation'],
        ['route', 'Wholesalers & distributors', 'Reference product and batch details and review recorded handovers where supported.', '1565514020179-026b92b84bb6', 'Carefully organized jewellery packaging'],
        ['search', 'Customers & collectors', 'Explore available product information and access supported verification features.', 'local-jewellery', 'A ring and necklace shown in warm natural light']
    ];
    const network = [
        ['gem', 'Material information', 'Explore available records about the materials associated with the piece.'],
        ['tag', 'Product identity', 'Review identifying product details connected with the record.'],
        ['craft', 'Manufacturing records', 'Access available information about a maker, manufacturer, or production stage.'],
        ['file', 'Available documentation', 'Explore relevant product or certification references, where recorded.'],
        ['search', 'Product verification', 'Open the supported OriginX verification workflow for a product record.']
    ];
    const productCategories = [
        { name: 'Gold jewellery', image: 'local-jewellery', details: ['Product name', 'Product identifier', 'Metal details, where recorded', 'Purity-related records, where available', 'Manufacturer and relevant product records'] },
        { name: 'Diamond jewellery', image: '1599643478518-a784e5dc4c8f', details: ['Product name', 'Product identifier', 'Diamond details, where recorded', 'Certification references, where available', 'Manufacturer or retailer information'] },
        { name: 'Gemstone jewellery', image: '1617038220319-276d3cfab638', details: ['Product name', 'Product identifier', 'Gemstone type, where recorded', 'Available material information', 'Related product records'] },
        { name: 'Silver jewellery', image: '1610701596007-11502861dcfa', details: ['Product name', 'Product identifier', 'Metal details, where recorded', 'Manufacturer information', 'Available product records'] }
    ];

    container.innerHTML = `
        <div class="jewellery-page">
            <section class="jwl-hero" aria-labelledby="jwl-title">
                <div class="jwl-hero-copy">
                    <p class="jwl-kicker"><span></span> A STORY IN EVERY DETAIL</p>
                    <h1 id="jwl-title">Every Gem Has an Origin.<br><em>Every Piece Has a Story.</em></h1>
                    <h2>Discover the journey behind the jewellery you treasure.</h2>
                    <p>OriginX helps connect jewellery products with relevant material, manufacturing, and supply-chain information, making available provenance and product records easier to explore.</p>
                    <div class="jwl-actions"><a class="jwl-button jwl-button--light" href="#jwl-journey" onclick="scrollToHash('jwl-journey'); return false;">Explore Jewellery Traceability <span aria-hidden="true">↘</span></a><button class="jwl-button jwl-button--outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">↗</span></button></div>
                    <p class="jwl-hero-note">PRODUCT IDENTITY <i></i> MATERIAL INFORMATION <i></i> RECORDED JOURNEY</p>
                </div>
                <div class="jwl-hero-art">
                    <img src="${jewelleryPhoto('local-jewellery')}" alt="Fine jewellery collection featuring a crafted gold ring, necklace, and gemstone details" width="1200" height="800" fetchpriority="high">
                    <span class="jwl-photo-index">01 / A PIECE TO TREASURE</span>
                    <div class="jwl-origin-mark"><span class="jwl-origin-dot"></span><div><small>THE MATERIAL STORY</small><b>Information, where recorded</b></div></div>
                    <div class="jwl-id-mark"><span aria-hidden="true">⌗</span><div><small>PRODUCT IDENTITY</small><b>Records made easier to explore</b></div></div>
                    <svg class="jwl-hero-line" viewBox="0 0 300 180" fill="none" aria-hidden="true"><path d="M8 158C84 132 102 43 190 58c36 6 51 37 96 15" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="158" r="4" fill="currentColor"/><circle cx="286" cy="73" r="4" fill="currentColor"/></svg>
                </div>
            </section>

            <section class="jwl-benefits jwl-section" aria-labelledby="jwl-benefits-title">
                <div class="jwl-heading jwl-heading--center"><p class="jwl-kicker">THE DETAILS BEHIND THE BEAUTY</p><h2 id="jwl-benefits-title">Beyond the Beauty.<br><em>Discover the Details.</em></h2><p>Explore the product information and recorded journey behind the jewellery you wear and treasure.</p></div>
                <div class="jwl-benefit-grid">${benefits.map(([icon, title, copy], i) => `<article class="jwl-benefit"><div class="jwl-benefit-circle">${jewelleryIcon(icon)}<span>0${i + 1}</span></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
            </section>

            <section class="jwl-journey jwl-section" id="jwl-journey" aria-labelledby="jwl-journey-title">
                <div class="jwl-heading jwl-heading--split"><div><p class="jwl-kicker">A MATERIAL-TO-MASTERPIECE JOURNEY</p><h2 id="jwl-journey-title">From Precious Materials<br><em>to a Piece to Treasure.</em></h2></div><p>Every finished piece may involve multiple materials, skilled craftsmanship, and supply-chain participants. Traceability can help connect the information recorded along that journey.</p></div>
                <div class="jwl-timeline" role="tablist" aria-label="Illustrative jewellery journey stages">${stages.map((stage, i) => `<button class="jwl-stage${i === 0 ? ' is-active' : ''}" type="button" role="tab" tabindex="${i === 0 ? '0' : '-1'}" aria-selected="${i === 0}" aria-controls="jwl-stage-panel" data-jwl-stage="${i}"><span class="jwl-stage-image"><img src="${jewelleryPhoto(stage.image, 700)}" alt="${stage.alt}" width="700" height="480" loading="lazy"></span><span class="jwl-stage-index">0${i + 1}</span><strong>${stage.title}</strong><span class="jwl-stage-dot"></span></button>`).join('')}</div>
                <div class="jwl-stage-panel" id="jwl-stage-panel" role="tabpanel" tabindex="0"><div><p class="jwl-kicker" data-jwl-stage-number>STAGE 01</p><h3 data-jwl-stage-title>${stages[0].title}</h3><p data-jwl-stage-copy>${stages[0].copy}</p><span class="jwl-note">Illustrative journey — not every stage or record is available for every product.</span></div><ul data-jwl-stage-records>${stages[0].records.map(item => `<li>${item}</li>`).join('')}</ul></div>
            </section>

            <section class="jwl-material jwl-section" aria-labelledby="jwl-material-title">
                <div class="jwl-material-visual"><img data-jwl-material-image src="${jewelleryPhoto(materials[0].photo, 1100)}" alt="${materials[0].alt}" width="1100" height="1050" loading="lazy"><span class="jwl-visual-caption">MATERIALS & THEIR RECORDED STORY</span><span class="jwl-callout jwl-callout--one"><i></i> Material detail</span><span class="jwl-callout jwl-callout--two"><i></i> Product connection</span><div class="jwl-visual-caption-card">A finished piece<br><em>with details to discover</em></div></div>
                <div class="jwl-material-copy"><p class="jwl-kicker">MATERIAL & PROVENANCE</p><h2 id="jwl-material-title">The Story Begins<br><em>Before the Setting.</em></h2><p class="jwl-lede">Behind a finished jewellery piece may be a complex journey involving precious metals, gemstones, suppliers, and skilled makers. Traceability can help connect available information about those materials with the finished product.</p>
                    <div class="jwl-tabs" role="tablist" aria-label="Illustrative material categories">${materials.map((material, i) => `<button type="button" role="tab" aria-selected="${i === 0}" class="${i === 0 ? 'is-active' : ''}" data-jwl-material="${i}">${material.label}</button>`).join('')}</div>
                    <div class="jwl-material-record"><div class="jwl-record-title"><span>${jewelleryIcon('gem')}</span><div><small>ILLUSTRATIVE RECORD STRUCTURE</small><h3 data-jwl-material-title>${materials[0].title}</h3></div></div><dl data-jwl-material-fields>${materials[0].fields.map(field => `<div><dt>${field}</dt><dd>Where recorded</dd></div>`).join('')}</dl><p class="jwl-note">Illustrative only. An origin record is not, by itself, proof of ethical sourcing or independent verification.</p></div>
                </div>
            </section>

            <section class="jwl-records jwl-section" aria-labelledby="jwl-records-title">
                <div class="jwl-records-image"><img src="${jewelleryPhoto('1599643478518-a784e5dc4c8f', 1200)}" alt="A carefully composed selection of fine jewellery" width="1200" height="1050" loading="lazy"><div class="jwl-floating-label"><span>⌗</span><div><small>IDENTITY IS AN ENTRY POINT</small><b>Explore associated product records</b></div></div></div>
                <div class="jwl-records-copy"><p class="jwl-kicker">IDENTITY, RECORDS & VERIFICATION</p><h2 id="jwl-records-title">Beauty Deserves<br><em>More Than a Label.</em></h2><p class="jwl-lede">Access to relevant product information can help customers better understand a jewellery piece, its identifying details, and the records associated with it.</p>
                    <div class="jwl-record-sheet"><div class="jwl-sheet-header"><span>PRODUCT INFORMATION</span><small>ILLUSTRATIVE FIELDS</small></div>${[['Product name', 'Where provided'], ['Product identifier', 'Where associated'], ['Metal / gemstone details', 'Where recorded'], ['Product or batch reference', 'Where applicable'], ['Hallmarking / certification records', 'Where linked']].map(([key, value]) => `<div><span>${key}</span><b>${value}</b></div>`).join('')}<p>Information depends on the product record. OriginX does not issue hallmarking or gemological certificates.</p></div>
                    <div class="jwl-actions"><button class="jwl-button jwl-button--green" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">↗</span></button><a class="jwl-text-link" href="#jwl-showcase" onclick="scrollToHash('jwl-showcase'); return false;">Explore Product Traceability <span aria-hidden="true">↘</span></a></div>
                    <p class="jwl-note">A QR code or identifier is an access point to information; it does not by itself prove that a jewellery item is genuine.</p>
                </div>
            </section>

            <section class="jwl-details jwl-section" aria-labelledby="jwl-details-title">
                <div class="jwl-heading jwl-heading--center"><p class="jwl-kicker">RECORDS, CLEARLY PRESENTED</p><h2 id="jwl-details-title">Important Details.<br><em>Clearly Presented.</em></h2><p>Make available product specifications, gemstone information, hallmarking references, or related records easier to explore.</p></div>
                <div class="jwl-detail-grid">${[
                    ['gem', 'Metal information', 'Explore available information about metal type, purity-related records, or other recorded specifications.'],
                    ['search', 'Gemstone details', 'Access available gemstone details and related records where documented.'],
                    ['tag', 'Hallmarking references', 'Review available hallmarking information and associated references, where recorded.'],
                    ['file', 'Certification records', 'Access relevant certification references when supported by the product record.']
                ].map(([icon, title, copy], i) => `<article class="jwl-detail"><span class="jwl-detail-number">0${i + 1}</span><div class="jwl-detail-icon">${jewelleryIcon(icon)}</div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
                <p class="jwl-note jwl-detail-note">OriginX can present records associated with a product. Certifications and hallmarking are issued by their respective authorized organizations.</p>
            </section>

            <section class="jwl-craft jwl-section" aria-labelledby="jwl-craft-title">
                <div class="jwl-craft-photo-grid"><figure class="jwl-craft-main"><img src="${jewelleryPhoto('1605100804763-247f67b3557e', 1200)}" alt="An ornate traditional-inspired jewellery piece with detailed craftsmanship" width="1200" height="1100" loading="lazy"><figcaption>CRAFTED WITH INTENTION</figcaption></figure><figure><img src="${jewelleryPhoto('1558618666-fcd25c85cd64', 700)}" alt="A craftsperson focused on careful handwork" width="700" height="600" loading="lazy"><figcaption>THE MAKER'S HAND</figcaption></figure><figure><img src="${jewelleryPhoto('1617038220319-276d3cfab638', 700)}" alt="Close detail of fine jewellery craftsmanship" width="700" height="600" loading="lazy"><figcaption>DETAIL IN EVERY SETTING</figcaption></figure></div>
                <div class="jwl-craft-copy"><p class="jwl-kicker">INDIAN CRAFT, MANY TRADITIONS</p><h2 id="jwl-craft-title">Rooted in Heritage.<br><em>Crafted for Generations.</em></h2><p class="jwl-lede">Indian jewellery brings together diverse materials, techniques, regional traditions, and skilled craftsmanship. Traceability can help connect finished pieces with the product and maker information available about their journey.</p>
                    <div class="jwl-principles">${[['craft', 'Honour the maker', 'Connect finished jewellery with available information about its maker or manufacturer.'], ['tag', 'Preserve product details', 'Make relevant product specifications and recorded details easier to explore.'], ['link', 'Connect heritage to commerce', 'Help participating businesses present product information across the supply chain.']].map(([icon, title, copy]) => `<article><span>${jewelleryIcon(icon)}</span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div>
                </div>
            </section>

            <section class="jwl-showcase jwl-section" id="jwl-showcase" aria-labelledby="jwl-showcase-title">
                <div class="jwl-heading jwl-heading--split"><div><p class="jwl-kicker">AN ILLUSTRATIVE PRODUCT RECORD</p><h2 id="jwl-showcase-title">Take a Closer Look at<br><em>What Makes Each Piece Unique.</em></h2></div><p>Explore how product identity, material details, and available documentation can come together. These are example fields, not live product records.</p></div>
                <div class="jwl-showcase-layout"><div class="jwl-product-visual"><img data-jwl-product-image src="${jewelleryPhoto(productCategories[0].image, 1200)}" alt="Gold jewellery example: ring and necklace on an ivory surface" width="1200" height="1050" loading="lazy"><span class="jwl-image-index">01 / JEWELLERY STUDY</span></div><div class="jwl-product-copy"><div class="jwl-product-tabs" role="tablist" aria-label="Illustrative jewellery categories">${productCategories.map((item, i) => `<button type="button" role="tab" aria-selected="${i === 0}" class="${i === 0 ? 'is-active' : ''}" data-jwl-product="${i}">${item.name}</button>`).join('')}</div><p class="jwl-kicker">ILLUSTRATIVE PRODUCT RECORD</p><h3 data-jwl-product-title>${productCategories[0].name}</h3><p class="jwl-record-explainer">Information shown as record categories only — details depend on what has been recorded and made available.</p><dl class="jwl-product-fields" data-jwl-product-fields>${productCategories[0].details.map((field, i) => `<div><span>0${i + 1}</span><dt>${field}</dt><dd>Where available</dd></div>`).join('')}</dl><div class="jwl-mini-journey" aria-label="Example product journey: materials, making, product, customer"><span>Materials</span><i></i><span>Making</span><i></i><span>Product</span><i></i><span>Customer</span></div><button class="jwl-button jwl-button--green" type="button" onclick="goToVerify()">Open Product Verification <span aria-hidden="true">↗</span></button></div></div>
            </section>

            <section class="jwl-customer jwl-section" aria-labelledby="jwl-customer-title">
                <div class="jwl-customer-heading"><p class="jwl-kicker">DISCOVER · VERIFY · UNDERSTAND</p><h2 id="jwl-customer-title">A More Informed Way<br><em>to Discover Fine Jewellery.</em></h2><p>Beyond design and craftsmanship, customers may want to explore a jewellery item's available material, identification, and product records.</p></div>
                <div class="jwl-customer-steps">${[
                    ['01', 'Discover', 'Explore the product and locate its available identifying information.', '1603561591411-07134e71a2a9', 'A customer-facing jewellery presentation'],
                    ['02', 'Verify', 'Use the available verification workflow to access relevant product records.', '1511707171634-5f897ff02aa9', 'A smartphone as an entry point to product information'],
                    ['03', 'Understand', 'Review the information available about the jewellery piece and its recorded journey.', 'local-jewellery', 'Fine jewellery detail presented for closer inspection']
                ].map(([num, title, copy, photo, alt]) => `<article><div class="jwl-customer-image"><img src="${jewelleryPhoto(photo, 900)}" alt="${alt}" width="900" height="650" loading="lazy"><span>${num}</span></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
            </section>

            <section class="jwl-ecosystem jwl-section" aria-labelledby="jwl-ecosystem-title"><div class="jwl-heading jwl-heading--center"><p class="jwl-kicker">PARTICIPANTS IN A SHARED JOURNEY</p><h2 id="jwl-ecosystem-title">A More Connected<br><em>Jewellery Ecosystem.</em></h2><p>Relevant product information can help participants understand what is recorded about a jewellery item.</p></div>
                <div class="jwl-stakeholders">${stakeholders.map(([icon, title, copy, image, alt], i) => `<article class="jwl-stakeholder${i % 2 ? ' jwl-stakeholder--reverse' : ''}"><div class="jwl-stakeholder-image"><img src="${jewelleryPhoto(image, 800)}" alt="${alt}" width="800" height="600" loading="lazy"></div><div class="jwl-stakeholder-copy"><span class="jwl-stakeholder-icon">${jewelleryIcon(icon)}</span><small>0${i + 1} / PARTICIPANT</small><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div><p class="jwl-note jwl-stakeholder-note">Traceability can improve access to records; it does not guarantee authenticity or eliminate counterfeiting.</p>
            </section>

            <section class="jwl-network jwl-section" aria-labelledby="jwl-network-title"><div class="jwl-heading jwl-heading--center"><p class="jwl-kicker">THE ORIGINX JEWELLERY NETWORK</p><h2 id="jwl-network-title">One Piece. Connected Information.<br><em>A Clearer Story.</em></h2><p>OriginX helps connect product information and recorded supply-chain events, making relevant jewellery records easier to explore.</p></div>
                <div class="jwl-network-layout"><div class="jwl-network-map"><svg viewBox="0 0 600 460" aria-hidden="true"><ellipse cx="300" cy="230" rx="192" ry="142"/><path d="M300 230 300 70M300 230 480 165M300 230 415 385M300 230 112 345M300 230 105 160"/></svg><div class="jwl-network-center"><img src="${jewelleryPhoto('local-jewellery')}" alt="" width="500" height="350" loading="lazy"><span>ONE PIECE</span></div>${network.map(([icon, title], i) => `<button type="button" class="jwl-network-node jwl-network-node--${i + 1}${i === 0 ? ' is-active' : ''}" data-jwl-node="${i}" aria-pressed="${i === 0}"><span>${jewelleryIcon(icon)}</span><b>${title}</b></button>`).join('')}</div><div class="jwl-network-panel" aria-live="polite"><p class="jwl-kicker">A CONNECTED RECORD</p><span class="jwl-network-panel-icon" data-jwl-network-icon>${jewelleryIcon(network[0][0])}</span><h3 data-jwl-network-title>${network[0][1]}</h3><p data-jwl-network-copy>${network[0][2]}</p><p class="jwl-note">Information available varies by product and participating business.</p><button class="jwl-text-link" type="button" data-jwl-network-verify>Explore this information <span aria-hidden="true">↗</span></button></div></div>
            </section>

            <section class="jwl-categories jwl-section" aria-labelledby="jwl-categories-title"><div class="jwl-heading jwl-heading--split"><div><p class="jwl-kicker">A WORLD OF JEWELLERY</p><h2 id="jwl-categories-title">Every Creation Has<br><em>Its Own Character.</em></h2></div><p>Explore the diversity of jewellery and the different types of product information that may be associated with each piece.</p></div>
                <div class="jwl-category-grid">${categories.map((item, i) => `<figure class="jwl-category jwl-category--${i + 1}"><img src="${jewelleryPhoto(item.image, i < 3 ? 1000 : 700)}" alt="${item.alt}" width="${i < 3 ? 1000 : 700}" height="${i < 3 ? 850 : 620}" loading="lazy"><figcaption><small>${item.caption}</small><span>${item.name}<b aria-hidden="true">↗</b></span></figcaption></figure>`).join('')}</div>
            </section>

            <section class="jwl-responsible jwl-section" aria-labelledby="jwl-responsible-title"><div class="jwl-responsible-visual"><img src="${jewelleryPhoto('1617038220319-276d3cfab638', 1100)}" alt="Precious gemstone details beside a finished jewellery setting" width="1100" height="900" loading="lazy"><span class="jwl-responsible-label">MATERIAL INFORMATION / PRODUCT RECORD</span></div><div class="jwl-responsible-copy"><p class="jwl-kicker">MATERIAL TRANSPARENCY</p><h2 id="jwl-responsible-title">Know What Is Recorded<br><em>About the Materials.</em></h2><p class="jwl-lede">Understanding material provenance requires relevant records and evidence. Traceability can help connect available material information with the products in which those materials are used.</p><div class="jwl-responsible-list">${[['01', 'Recorded origin', 'Explore source information where it has been recorded and made available.'], ['02', 'Material identification', 'Connect material identifiers with relevant product or batch records.'], ['03', 'Evidence-based transparency', 'Review available supporting records without assuming information that has not been verified.']].map(([num, title, copy]) => `<article><span>${num}</span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div></div></section>

            <section class="jwl-final"><div class="jwl-final-copy"><p class="jwl-kicker">ORIGINX / JEWELLERY TRACEABILITY</p><h2>Beautifully Crafted.<br><em>Meaningfully Connected.</em></h2><p>Discover how OriginX can help connect jewellery products with available material, manufacturing, and supply-chain information.</p><div class="jwl-actions"><a class="jwl-button jwl-button--light" href="#jwl-journey" onclick="scrollToHash('jwl-journey'); return false;">Explore Jewellery Traceability <span aria-hidden="true">↘</span></a><button class="jwl-button jwl-button--outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">↗</span></button></div></div><div class="jwl-final-art"><img src="${jewelleryPhoto('local-jewellery')}" alt="Jewellery collection arranged in a refined editorial composition" width="1000" height="680" loading="lazy"><span>EVERY TREASURE HAS A STORY</span></div></section>
        </div>`;

    container.addEventListener('error', event => {
        const image = event.target;
        if (!(image instanceof HTMLImageElement) || image.dataset.jwlFallback) return;
        image.dataset.jwlFallback = 'true';
        image.src = jewelleryPhoto('local-jewellery');
        image.alt = 'Fine jewellery collection featuring a crafted gold ring, necklace, and gemstone details';
    }, true);

    const stageButtons = [...container.querySelectorAll('[data-jwl-stage]')];
    const stagePanel = container.querySelector('#jwl-stage-panel');
    const updateStage = index => {
        const stage = stages[index];
        stageButtons.forEach((button, i) => {
            const active = i === index;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
        stagePanel.querySelector('[data-jwl-stage-number]').textContent = `STAGE 0${index + 1}`;
        stagePanel.querySelector('[data-jwl-stage-title]').textContent = stage.title;
        stagePanel.querySelector('[data-jwl-stage-copy]').textContent = stage.copy;
        stagePanel.querySelector('[data-jwl-stage-records]').innerHTML = stage.records.map(item => `<li>${item}</li>`).join('');
    };
    stageButtons.forEach((button, index) => button.addEventListener('click', () => updateStage(index)));
    container.querySelector('[role="tablist"][aria-label="Illustrative jewellery journey stages"]').addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = stageButtons.indexOf(document.activeElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? stageButtons.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + stageButtons.length) % stageButtons.length;
        stageButtons[next].focus();
        updateStage(next);
    });

    const materialTabs = [...container.querySelectorAll('[data-jwl-material]')];
    materialTabs.forEach((button, index) => button.addEventListener('click', () => {
        materialTabs.forEach((tab, i) => {
            tab.classList.toggle('is-active', i === index);
            tab.setAttribute('aria-selected', String(i === index));
        });
        const material = materials[index];
        const image = container.querySelector('[data-jwl-material-image]');
        image.src = jewelleryPhoto(material.photo, 1100);
        image.alt = material.alt;
        container.querySelector('[data-jwl-material-title]').textContent = material.title;
        container.querySelector('[data-jwl-material-fields]').innerHTML = material.fields.map(field => `<div><dt>${field}</dt><dd>Where recorded</dd></div>`).join('');
    }));

    const productTabs = [...container.querySelectorAll('[data-jwl-product]')];
    productTabs.forEach((button, index) => button.addEventListener('click', () => {
        productTabs.forEach((tab, i) => {
            tab.classList.toggle('is-active', i === index);
            tab.setAttribute('aria-selected', String(i === index));
        });
        const product = productCategories[index];
        const image = container.querySelector('[data-jwl-product-image]');
        image.src = jewelleryPhoto(product.image, 1200);
        image.alt = `${product.name} illustrative jewellery image`;
        container.querySelector('[data-jwl-product-title]').textContent = product.name;
        container.querySelector('[data-jwl-product-fields]').innerHTML = product.details.map((field, i) => `<div><span>0${i + 1}</span><dt>${field}</dt><dd>Where available</dd></div>`).join('');
    }));

    const networkButtons = [...container.querySelectorAll('[data-jwl-node]')];
    networkButtons.forEach((button, index) => button.addEventListener('click', () => {
        const [icon, title, copy] = network[index];
        networkButtons.forEach((node, i) => {
            node.classList.toggle('is-active', i === index);
            node.setAttribute('aria-pressed', String(i === index));
        });
        container.querySelector('[data-jwl-network-icon]').innerHTML = jewelleryIcon(icon);
        container.querySelector('[data-jwl-network-title]').textContent = title;
        container.querySelector('[data-jwl-network-copy]').textContent = copy;
        container.querySelector('[data-jwl-network-verify]').textContent = index === 4 ? 'Open product verification ↗' : 'Explore this information ↗';
    }));
    container.querySelector('[data-jwl-network-verify]').addEventListener('click', goToVerify);
}
