const TEXTILE_ICON_PATHS = {
    fibre: '<path d="M12 21V9m0 4C6 13 4 9 4 5c5 0 8 2 8 7Zm0-2c0-5 3-8 8-8 0 5-3 8-8 8Z"/><path d="M9 21h6"/>',
    identity: '<path d="M4 5h11l5 5-9 9-7-7V5Z"/><circle cx="8" cy="9" r="1"/>',
    craft: '<path d="m4 20 8-8m-3-3 4 4m-7-7 8 8m-9-9 3-3 11 11-3 3M3 21l3-1-2-2-1 3Z"/>',
    verify: '<circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 5 5M8 10l1.5 1.5L12 8"/>',
    journey: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h1"/>',
    yarn: '<path d="M5 7c0-2 3-4 7-4s7 2 7 4v10c0 2-3 4-7 4s-7-2-7-4V7Z"/><path d="M5 7c0 2 3 4 7 4s7-2 7-4M5 17c0-2 3-4 7-4s7 2 7 4M8 4l8 16"/>',
    loom: '<path d="M4 3v18m16-18v18M4 6h16M4 18h16M7 7v10m3-10v10m3-10v10m3-10v10"/>',
    dye: '<path d="M12 3c3 4 7 7 7 11a7 7 0 1 1-14 0c0-4 4-7 7-11Z"/><path d="M9 15c.5 1.5 1.5 2 3 2"/>',
    garment: '<path d="m8 4 4 2 4-2 5 4-3 4-2-1v10H8V11l-2 1-3-4 5-4Z"/><path d="M9 5c0 2 1 4 3 4s3-2 3-4"/>',
    material: '<path d="M4 7h16v13H4zM7 4h13v3M7 10h10m-10 4h7"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h2"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-9a3 3 0 1 0 0-6m1 9a5 5 0 0 1 3 5"/>'
};

function textileIcon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TEXTILE_ICON_PATHS[name]}</svg>`;
}

function renderTextileEditorialPage(container) {
    const image = (id, width = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`;
    const benefits = [
        ['fibre', 'Know the Material', 'Explore available information about the fibres, fabrics, or materials associated with a product.'],
        ['identity', 'Give Every Piece an Identity', 'Connect products with identifying details and relevant product records.'],
        ['craft', 'Celebrate the Craft', 'Discover available information about the maker, manufacturer, or recorded production process.'],
        ['verify', 'Explore Product Records', 'Access supported verification features and available product information.'],
        ['journey', 'Follow the Journey', 'Explore recorded milestones connecting materials, manufacturing, and finished products.']
    ];
    const stages = [
        { title: 'Fibre & raw materials', label: '01 / MATERIAL', icon: 'fibre', photo: '1604176354204-9268737828e4', alt: 'Natural textile fibres ready for processing', summary: 'A textile journey may begin with fibres, yarns, or blended materials.', records: ['Material or fibre type', 'Available source information', 'Supplier details, where recorded', 'Relevant batch references'] },
        { title: 'Yarn & fabric production', label: '02 / MAKING', icon: 'loom', photo: '1620799140408-edc6dcb6d633', alt: 'Textured yarn and woven fabric in soft light', summary: 'Spinning, knitting, or weaving turns raw materials into fabric.', records: ['Yarn or fabric identification', 'Available processing information', 'Production batch references', 'Relevant manufacturing records'] },
        { title: 'Dyeing & finishing', label: '03 / FINISH', icon: 'dye', photo: '1610030469983-98e550d6193c', alt: 'Richly colored patterned textile surface', summary: 'Colour, print, embroidery, and finishing add character to a textile.', records: ['Available processing records', 'Recorded finishing details', 'Material or batch references', 'Relevant supplier information'] },
        { title: 'Garment & product creation', label: '04 / CREATE', icon: 'craft', photo: '1606760227091-3dd870d97f1d', alt: 'Detailed Indian textile craftsmanship', summary: 'Fabric is shaped into apparel, accessories, or home products.', records: ['Product identity', 'Maker or manufacturer information', 'Production batch reference', 'Available manufacturing records'] },
        { title: 'Retail & customer', label: '05 / DISCOVER', icon: 'identity', photo: '1512436991641-6745cdb1723f', alt: 'Garments displayed as a considered fashion collection', summary: 'A finished product can connect customers with available records.', records: ['Product identifier', 'Available material details', 'Relevant product records', 'Supported verification entry point'] }
    ];
    const materials = [
        { name: 'Cotton & natural fibres', photo: '1604176354204-9268737828e4', alt: 'Soft natural textile fibres', fields: [['Material type', 'Where recorded'], ['Material identifier', 'Where associated'], ['Source information', 'Available details'], ['Batch reference', 'Where applicable']] },
        { name: 'Silk & fine fabrics', photo: '1620799140408-edc6dcb6d633', alt: 'Silk-like yarn and softly draped textile', fields: [['Fibre or fabric', 'Where recorded'], ['Material identifier', 'Where associated'], ['Supplier reference', 'Available details'], ['Processing details', 'Where available']] },
        { name: 'Wool & specialty fibres', photo: '1604881988758-f76ad2f7aad1', alt: 'Close detail of woven specialty textile', fields: [['Material type', 'Where recorded'], ['Material identifier', 'Where associated'], ['Source reference', 'Available details'], ['Batch reference', 'Where applicable']] },
        { name: 'Synthetic & blended', photo: '1558618666-fcd25c85cd64', alt: 'Modern textile surface and woven home fabric', fields: [['Composition', 'Where recorded'], ['Material identifier', 'Where associated'], ['Supplier reference', 'Available details'], ['Related records', 'Where available']] }
    ];
    const products = [
        { name: 'Luxury Apparel', photo: '1512436991641-6745cdb1723f', alt: 'Curated apparel in a fashion display', fields: [['Product name', 'Illustrative field'], ['Product identifier', 'Where associated'], ['Material composition', 'Where recorded'], ['Manufacturer', 'Where provided'], ['Production details', 'Available records']] },
        { name: 'Textiles & Fabrics', photo: '1620799140408-edc6dcb6d633', alt: 'Fine fabric and textile detail', fields: [['Fabric name', 'Illustrative field'], ['Material identifier', 'Where associated'], ['Fibre composition', 'Where recorded'], ['Source information', 'Available records'], ['Batch details', 'Where applicable']] },
        { name: 'Luxury Accessories', photo: '1601924994987-69e26d50dc26', alt: 'Premium textile accessory with considered styling', fields: [['Product name', 'Illustrative field'], ['Product identifier', 'Where associated'], ['Material details', 'Where recorded'], ['Manufacturer', 'Where provided'], ['Product records', 'Available details']] },
        { name: 'Traditional Craft', photo: '1606760227091-3dd870d97f1d', alt: 'Traditional textile craft detail', fields: [['Product name', 'Illustrative field'], ['Maker information', 'Where provided'], ['Material details', 'Where recorded'], ['Craft information', 'Available records'], ['Product reference', 'Where associated']] }
    ];
    const categories = [
        ['Premium Fabrics', '1620799140408-edc6dcb6d633', 'Fine woven textile in a close editorial crop'],
        ['Luxury Apparel', '1512436991641-6745cdb1723f', 'Premium garments arranged for a fashion editorial'],
        ['Indian Textiles', '1606760227091-3dd870d97f1d', 'Detailed traditional Indian textile pattern'],
        ['Handloom & Artisan', '1604881988758-f76ad2f7aad1', 'Handcrafted fabric surface and artisan detail'],
        ['Embroidered Garments', '1596797038530-2c107229654b', 'Traditional garment and embroidery detail'],
        ['Luxury Accessories', '1601924994987-69e26d50dc26', 'Textile accessory presented with natural texture'],
        ['Home Textiles', '1558618666-fcd25c85cd64', 'Textured woven fabric in an interior setting'],
        ['Fashion & Lifestyle', '1490481651871-ab68de25d43d', 'Contemporary fashion pieces in warm light']
    ];
    const network = [
        ['material', 'Material Information', 'Explore available fibre, fabric, or composition records.'],
        ['identity', 'Product Identity', 'Review relevant product identifiers and details.'],
        ['craft', 'Manufacturing Records', 'Access available production or manufacturing information.'],
        ['route', 'Distribution Events', 'Explore recorded product movements where supported.'],
        ['verify', 'Product Verification', 'Access the existing supported verification workflow.']
    ];
    const otherSectors = Object.keys(INDUSTRIES).filter(key => key !== 'textiles');

    container.innerHTML = `
        <div class="textile-page textile-redesign">
            <section class="tx-hero" aria-labelledby="tx-hero-title">
                <div class="tx-hero-copy">
                    <p class="tx-eyebrow"><span></span> TEXTILES · LUXURY · PRODUCT TRACEABILITY</p>
                    <h1 id="tx-hero-title">Every Thread Has a Story.<br><em>Every Origin Matters.</em></h1>
                    <p class="tx-subtitle">Discover the journey behind the fabrics you feel and the fashion you wear.</p>
                    <p class="tx-body">OriginX helps connect textile and luxury products with relevant material, manufacturing, and supply-chain information, making available product records easier to explore.</p>
                    <div class="tx-actions"><button class="tx-button tx-button-dark" type="button" data-textile-scroll="tx-journey">Explore Textile Traceability <span aria-hidden="true">↘</span></button><button class="tx-button tx-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div>
                    <p class="tx-hero-foot">${textileIcon('material')} INFORMATION VARIES BY PRODUCT & PARTICIPATING BUSINESS</p>
                </div>
                <div class="tx-hero-art" aria-label="Editorial composition of textiles, craft, and fashion">
                    <figure class="tx-hero-image tx-hero-main"><img src="assets/textile.png" alt="Artisan handweaving richly colored cloth on a traditional loom" width="1498" height="896" fetchpriority="high"></figure>
                    <figure class="tx-hero-image tx-hero-detail"><img src="${image('1620799140408-edc6dcb6d633', 700)}" alt="Close-up detail of richly textured woven fabric" width="700" height="600" fetchpriority="high"></figure>
                    <figure class="tx-hero-image tx-hero-craft"><img src="${image('1606760227091-3dd870d97f1d', 600)}" alt="Traditional textile craftsmanship and intricate pattern" width="600" height="700" fetchpriority="high"></figure>
                    <div class="tx-record-label"><span class="tx-record-mark">${textileIcon('identity')}</span><span><small>ILLUSTRATIVE PRODUCT RECORD</small><strong>Material · identity · journey</strong></span><i aria-hidden="true">↗</i></div>
                    <span class="tx-origin-mark">${textileIcon('fibre')} ORIGIN, WHERE RECORDED</span>
                    <span class="tx-hero-caption">A story carried in every thread · 01—05</span>
                </div>
                <div class="tx-hero-thread" aria-hidden="true"></div>
            </section>

            <section class="tx-benefits tx-section" aria-labelledby="tx-benefits-title">
                <div class="tx-wrap"><header class="tx-heading tx-centered"><p class="tx-kicker">The details behind what you wear</p><h2 id="tx-benefits-title">Beyond the Fabric.<br><em>Discover the Details.</em></h2><p>Explore material information, craftsmanship, and product records behind pieces you wear and treasure.</p></header>
                    <div class="tx-benefit-row">${benefits.map(([icon, title, copy], index) => `<article class="tx-benefit tx-reveal"><div class="tx-benefit-circle">${textileIcon(icon)}<span>0${index + 1}</span></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
                </div>
            </section>

            <section class="tx-journey tx-section" id="tx-journey" aria-labelledby="tx-journey-title">
                <div class="tx-wrap"><header class="tx-heading tx-heading-row"><div><p class="tx-kicker">A thread through the making</p><h2 id="tx-journey-title">From the First Fibre<br><em>to the Final Stitch.</em></h2></div><p>Textile products can involve many materials, processes, and skilled hands. Traceability can connect information recorded at different stages of a product's journey.</p></header>
                    <div class="tx-journey-layout">
                        <div class="tx-timeline" role="tablist" aria-label="Illustrative fibre-to-fashion journey">${stages.map((stage, index) => `<button class="tx-stage${index === 0 ? ' is-active' : ''}" type="button" role="tab" id="tx-stage-${index}" aria-selected="${index === 0}" aria-controls="tx-stage-panel" tabindex="${index === 0 ? 0 : -1}" data-stage-index="${index}"><span class="tx-stage-number">0${index + 1}</span><span class="tx-stage-icon">${textileIcon(stage.icon)}</span><strong>${stage.title}</strong><small>${stage.label}</small></button>`).join('')}</div>
                        <div class="tx-stage-panel" id="tx-stage-panel" role="tabpanel" aria-labelledby="tx-stage-0" tabindex="0" aria-live="polite"></div>
                    </div><p class="tx-disclaimer">Illustrative journey. Products may follow different paths; records depend on participating businesses and supported integrations.</p>
                </div>
            </section>

            <section class="tx-materials tx-section" aria-labelledby="tx-material-title">
                <div class="tx-wrap"><header class="tx-heading tx-heading-row"><div><p class="tx-kicker">Material & fibre information</p><h2 id="tx-material-title">The Story Begins Before<br><em>the First Stitch.</em></h2></div><p>Cotton, silk, wool, linen, synthetic fibres, and blended materials follow different journeys. Explore what has been recorded about the materials in a product.</p></header>
                    <div class="tx-material-layout"><div class="tx-material-visual tx-reveal"><img id="tx-material-image" src="${image(materials[0].photo, 1100)}" alt="${materials[0].alt}" width="1100" height="900" loading="lazy"><div class="tx-material-swatches" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="tx-material-caption">FIBRE · FABRIC · FINISH</span></div>
                        <div class="tx-material-info tx-reveal"><div class="tx-material-tabs" role="group" aria-label="Select a material category">${materials.map((item, index) => `<button type="button" data-material-index="${index}" aria-pressed="${index === 0}">${item.name}</button>`).join('')}</div><div class="tx-material-record" aria-live="polite"></div><p class="tx-disclaimer">Information shown is illustrative. OriginX displays available records; it does not independently test or certify material composition or origin.</p></div>
                    </div>
                </div>
            </section>

            <section class="tx-heritage tx-section" aria-labelledby="tx-heritage-title"><div class="tx-wrap tx-heritage-layout">
                <div class="tx-heritage-collage tx-reveal"><figure class="tx-heritage-large"><img src="${image('1606760227091-3dd870d97f1d', 1100)}" alt="Ornate Indian textile pattern with detailed weaving" width="1100" height="1300" loading="lazy"><figcaption>CRAFT & CONTINUITY</figcaption></figure><figure class="tx-heritage-small"><img src="${image('1604881988758-f76ad2f7aad1', 700)}" alt="Handcrafted woven textile detail" width="700" height="700" loading="lazy"></figure><span class="tx-heritage-note">A living heritage<br><i>made visible through records</i></span></div>
                <div class="tx-heritage-copy tx-reveal"><p class="tx-kicker">India · woven in tradition</p><h2 id="tx-heritage-title">Woven in Tradition.<br><em>Made for Generations.</em></h2><p>India's textile heritage brings together regional weaving traditions, intricate embroidery, distinctive fabrics, and generations of craftsmanship. Traceability can connect a product with available information about its materials, makers, and recorded journey.</p><div class="tx-principles"><article><span>${textileIcon('people')}</span><div><h3>Honour the artisan</h3><p>Connect products with available information about their makers or manufacturers.</p></div></article><article><span>${textileIcon('material')}</span><div><h3>Preserve material details</h3><p>Make relevant material, product, and manufacturing records easier to explore.</p></div></article><article><span>${textileIcon('route')}</span><div><h3>Connect craft to commerce</h3><p>Help participating businesses present product information across their supply chains.</p></div></article></div><p class="tx-disclaimer">OriginX does not independently certify geographical origin, traditional craftsmanship, or artisan-made status.</p></div>
            </div></section>

            <section class="tx-verification tx-section" aria-labelledby="tx-verification-title"><div class="tx-wrap tx-verification-layout">
                <div class="tx-verification-visual tx-reveal"><img src="${image('1601924994987-69e26d50dc26', 1000)}" alt="A premium textile accessory presented with attention to material detail" width="1000" height="1100" loading="lazy"><div class="tx-verify-tag"><span>${textileIcon('identity')}</span><div><small>ILLUSTRATIVE PRODUCT RECORD</small><strong>Luxury textile accessory</strong></div></div></div>
                <div class="tx-verification-copy tx-reveal"><p class="tx-kicker">Identity · details · available records</p><h2 id="tx-verification-title">Luxury Is in the Details.<br><em>So Is Transparency.</em></h2><p>From material details to product identity, available traceability records can help customers better understand the products they choose.</p><div class="tx-product-record"><p>ORIGINX / ILLUSTRATIVE RECORD</p><div><span>Product identifier</span><strong>Example field</strong></div><div><span>Material details</span><strong>Where recorded</strong></div><div><span>Manufacturer</span><strong>Where provided</strong></div><div><span>Journey milestones</span><strong>Available records</strong></div><small>Not a verification result. Actual product details vary.</small></div><div class="tx-actions"><button class="tx-button tx-button-dark" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button><button class="tx-link-button" type="button" data-textile-scroll="tx-explorer">Explore Traceability <span aria-hidden="true">↘</span></button></div><p class="tx-disclaimer">A QR code alone does not prove authenticity. Verification uses the existing OriginX workflow and its returned result.</p></div>
            </div></section>

            <section class="tx-explorer tx-section" id="tx-explorer" aria-labelledby="tx-explorer-title"><div class="tx-wrap"><header class="tx-heading tx-heading-row"><div><p class="tx-kicker">An illustrative product explorer</p><h2 id="tx-explorer-title">Every Material Has a Character.<br><em>Every Product, Its Details.</em></h2></div><p>Explore an illustrative product record to see how material information, product identity, and manufacturing details can connect.</p></header>
                <div class="tx-explorer-layout"><div class="tx-product-selector" role="tablist" aria-label="Illustrative textile product categories">${products.map((product, index) => `<button type="button" role="tab" id="tx-product-tab-${index}" aria-selected="${index === 0}" aria-controls="tx-product-panel" tabindex="${index === 0 ? 0 : -1}" data-product-index="${index}"><img src="${image(product.photo, 280)}" alt="" width="280" height="220" loading="lazy"><span>0${index + 1}</span><strong>${product.name}</strong></button>`).join('')}</div><div class="tx-explorer-panel" id="tx-product-panel" role="tabpanel" aria-labelledby="tx-product-tab-0" aria-live="polite"></div></div><p class="tx-disclaimer">All displayed records are illustrative only; no real product, maker, origin, or verification outcome is represented.</p>
            </div></section>

            <section class="tx-responsible tx-section" aria-labelledby="tx-responsible-title"><div class="tx-wrap tx-responsible-layout"><div><p class="tx-kicker">Evidence before claims</p><h2 id="tx-responsible-title">Know What Is Recorded<br><em>About Your Materials.</em></h2><p>Understanding a textile's material journey requires relevant information and supporting evidence. Traceability can connect available material records with the products made from them.</p><div class="tx-evidence-list"><article><span>01</span><div><h3>Recorded material information</h3><p>Explore available fibre type, material composition, or supplier references.</p></div></article><article><span>02</span><div><h3>Connected product records</h3><p>Associate relevant material or batch identifiers with finished products where supported.</p></div></article><article><span>03</span><div><h3>Evidence-based claims</h3><p>Review available information without assuming claims that are not documented or verified.</p></div></article></div></div><figure class="tx-responsible-image"><img src="${image('1558618666-fcd25c85cd64', 1100)}" alt="Woven cloth and textile material in natural light" width="1100" height="1200" loading="lazy"><figcaption>RECORDED INFORMATION · SUPPORTING EVIDENCE</figcaption></figure></div></section>

            <section class="tx-network tx-section" aria-labelledby="tx-network-title"><div class="tx-wrap"><header class="tx-heading tx-centered"><p class="tx-kicker">The OriginX textile traceability network</p><h2 id="tx-network-title">One Product. Connected Records.<br><em>A Clearer Journey.</em></h2><p>OriginX helps connect relevant product information and recorded supply-chain events, making available records easier to explore.</p></header>
                <div class="tx-network-layout"><div class="tx-network-visual"><svg class="tx-network-lines" viewBox="0 0 600 500" aria-hidden="true"><path d="M300 250C240 190 175 130 100 95M300 250c60-60 125-120 200-155M300 250V30M300 250c-60 60-130 115-200 150m200-150c60 60 130 115 200 150"/></svg><div class="tx-network-center"><span>${textileIcon('material')}</span><strong>ONE PRODUCT</strong><small>CONNECTED RECORDS</small></div>${network.map(([icon, title], index) => `<button type="button" class="tx-network-node tx-node-${index + 1}${index === 0 ? ' is-active' : ''}" aria-pressed="${index === 0}" data-network-index="${index}">${textileIcon(icon)}<span>${title}</span></button>`).join('')}</div><aside class="tx-network-detail" aria-live="polite"></aside></div><p class="tx-disclaimer">Record types and connections depend on participating businesses and the information available for each product.</p>
            </div></section>

            <section class="tx-categories tx-section" aria-labelledby="tx-categories-title"><div class="tx-wrap"><header class="tx-heading tx-heading-row"><div><p class="tx-kicker">Across the textile ecosystem</p><h2 id="tx-categories-title">Different Textures.<br><em>Distinctive Stories.</em></h2></div><p>From traditional fabrics to contemporary luxury products, traceability can connect products with relevant material information and recorded journeys.</p></header><div class="tx-category-grid">${categories.map(([title, photo, alt], index) => `<article class="tx-category tx-category-${index + 1}"><figure><img src="${image(photo, 950)}" alt="${alt}" width="950" height="1050" loading="lazy"><figcaption>0${index + 1}</figcaption></figure><p>TEXTILE & LUXURY / 0${index + 1}</p><h3>${title}</h3></article>`).join('')}</div></div></section>

            <section class="tx-stakeholders tx-section" aria-labelledby="tx-stakeholders-title"><div class="tx-wrap"><header class="tx-heading tx-heading-row"><div><p class="tx-kicker">From local craft to wider markets</p><h2 id="tx-stakeholders-title">A More Connected<br><em>Textile Ecosystem.</em></h2></div><p>Relevant product information can help participants better understand materials and products moving through participating supply chains.</p></header><div class="tx-stakeholder-list"><article>${textileIcon('fibre')}<span>01 / MATERIALS</span><h3>Textile producers</h3><p>Connect products with available material and batch records.</p></article><article>${textileIcon('loom')}<span>02 / CRAFT</span><h3>Artisans & weavers</h3><p>Present available maker and production information.</p></article><article>${textileIcon('craft')}<span>03 / MAKING</span><h3>Garment manufacturers</h3><p>Associate products with relevant manufacturing records.</p></article><article>${textileIcon('identity')}<span>04 / IN MARKET</span><h3>Brands & retailers</h3><p>Present available product details and supported verification entry points.</p></article><article>${textileIcon('people')}<span>05 / DISCOVERY</span><h3>Customers & buyers</h3><p>Explore available records to make informed decisions.</p></article></div></div></section>

            <section class="tx-closing"><div class="tx-closing-image" aria-hidden="true"></div><div class="tx-wrap tx-closing-content"><p class="tx-kicker">From fibre to fashion</p><h2>Make the Journey<br><em>More Visible.</em></h2><p>Discover how OriginX can help connect textile and luxury products with available material, manufacturing, and supply-chain information.</p><div class="tx-actions"><button class="tx-button tx-button-light" type="button" data-textile-scroll="tx-journey">Explore Textile Traceability <span aria-hidden="true">↘</span></button><button class="tx-button tx-button-outline" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button></div></div></section>
            <section class="textile-other-sectors"><div class="container"><p>Explore other industries</p><div class="other-sectors-grid">${otherSectors.map(key => `<button type="button" class="other-sector-chip" onclick="goToIndustry('${key}')"><span class="ic">${INDUSTRIES[key].icon}</span> ${escapeHtml(INDUSTRIES[key].name)}</button>`).join('')}</div></div></section>
        </div>`;

    const setTabSelection = (buttons, activeIndex, dataAttribute, focus = false) => {
        buttons.forEach((button, index) => {
            const selected = index === activeIndex;
            if (button.getAttribute('role') === 'tab') {
                button.setAttribute('aria-selected', String(selected));
            } else {
                button.setAttribute('aria-pressed', String(selected));
            }
            button.tabIndex = selected ? 0 : -1;
            if (dataAttribute === 'data-material-index') button.classList.toggle('is-active', selected);
        });
        if (focus) buttons[activeIndex].focus();
    };
    const addTabKeyboard = (buttons, activate) => buttons.forEach((button, index) => button.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 :
            (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
        activate(next, true);
    }));
    const stageTabs = [...container.querySelectorAll('[data-stage-index]')];
    const stagePanel = container.querySelector('#tx-stage-panel');
    const showStage = (index, focus = false) => {
        const stage = stages[index];
        setTabSelection(stageTabs, index, 'data-stage-index', focus);
        stageTabs.forEach((tab, tabIndex) => tab.classList.toggle('is-active', tabIndex === index));
        container.querySelector('.tx-timeline').style.setProperty('--tx-progress', `${index / (stages.length - 1) * 82}%`);
        stagePanel.setAttribute('aria-labelledby', `tx-stage-${index}`);
        stagePanel.innerHTML = `<img src="${image(stage.photo, 1100)}" alt="${stage.alt}" width="1100" height="560" loading="lazy"><div class="tx-stage-copy"><p class="tx-kicker">${stage.label} · ILLUSTRATIVE</p><h3>${stage.title}</h3><p>${stage.summary}</p><ul>${stage.records.map(record => `<li>${record}</li>`).join('')}</ul></div>`;
    };
    stageTabs.forEach((tab, index) => tab.addEventListener('click', () => showStage(index)));
    addTabKeyboard(stageTabs, showStage);
    showStage(0);

    const materialButtons = [...container.querySelectorAll('[data-material-index]')];
    const materialImage = container.querySelector('#tx-material-image');
    const materialRecord = container.querySelector('.tx-material-record');
    const showMaterial = (index, focus = false) => {
        const material = materials[index];
        setTabSelection(materialButtons, index, 'data-material-index', focus);
        materialButtons.forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
        materialImage.src = image(material.photo, 1100);
        materialImage.alt = material.alt;
        materialRecord.innerHTML = `<p class="tx-record-kicker">ILLUSTRATIVE MATERIAL INFORMATION</p><h3>${material.name}</h3>${material.fields.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}`;
    };
    materialButtons.forEach((button, index) => button.addEventListener('click', () => showMaterial(index)));
    showMaterial(0);

    const productTabs = [...container.querySelectorAll('[data-product-index]')];
    const productPanel = container.querySelector('#tx-product-panel');
    const showProduct = (index, focus = false) => {
        const product = products[index];
        setTabSelection(productTabs, index, 'data-product-index', focus);
        productPanel.setAttribute('aria-labelledby', `tx-product-tab-${index}`);
        productPanel.innerHTML = `<div class="tx-product-panel-head"><p class="tx-record-kicker">ILLUSTRATIVE PRODUCT RECORD</p><h3>${product.name}</h3><span>01 — 04</span></div><dl>${product.fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><p>Records shown are examples of fields that may be available.</p><button class="tx-link-button" type="button" onclick="goToVerify()">Open product verification <span aria-hidden="true">→</span></button>`;
    };
    productTabs.forEach((tab, index) => tab.addEventListener('click', () => showProduct(index)));
    addTabKeyboard(productTabs, showProduct);
    showProduct(0);

    const networkButtons = [...container.querySelectorAll('[data-network-index]')];
    const networkDetail = container.querySelector('.tx-network-detail');
    const showNetwork = index => {
        const [icon, title, description] = network[index];
        networkButtons.forEach((button, buttonIndex) => {
            const selected = buttonIndex === index;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        networkDetail.innerHTML = `<span>${textileIcon(icon)}</span><p class="tx-record-kicker">CONNECTED INFORMATION</p><h3>${title}</h3><p>${description}</p>${index === 4 ? '<button class="tx-link-button" type="button" onclick="goToVerify()">Verify a Product <span aria-hidden="true">→</span></button>' : ''}`;
    };
    networkButtons.forEach((button, index) => button.addEventListener('click', () => showNetwork(index)));
    showNetwork(0);

    container.querySelectorAll('[data-textile-scroll]').forEach(button => button.addEventListener('click', () => {
        const target = container.querySelector(`#${button.dataset.textileScroll}`);
        if (!target) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top: Math.max(top, 0), behavior: reducedMotion ? 'auto' : 'smooth' });
    }));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        container.classList.add('textile-motion-ready');
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }), { threshold: 0.12 });
        container.querySelectorAll('.tx-reveal').forEach(element => observer.observe(element));
    }
}
