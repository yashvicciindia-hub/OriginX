const AGRICULTURE_MANDI_STATES = [
    {
        id: 'delhi',
        name: 'Delhi',
        mandis: ['Azadpur Mandi', 'Okhla Mandi', 'Ghazipur Mandi', 'Keshopur Mandi', 'Narela Anaj Mandi', 'Najafgarh Anaj Mandi']
    },
    {
        id: 'haryana',
        name: 'Haryana',
        mandis: ['Kharkhoda / Gohana grain markets', 'Sirsa Anaj Mandi', 'Karnal Anaj Mandi', 'Hisar Anaj Mandi', 'Rohtak Anaj Mandi']
    },
    {
        id: 'punjab',
        name: 'Punjab',
        mandis: ['Khanna Grain Market', 'Moga Mandi', 'Jalandhar Mandi', 'Amritsar Mandi', 'Ludhiana Mandi']
    },
    {
        id: 'uttar-pradesh',
        name: 'Uttar Pradesh',
        mandis: ['Agra Mandi', 'Kanpur Grain Market', 'Hapur Mandi', 'Lucknow Mandi', 'Ghaziabad Mandi', 'Varanasi Mandi', 'Farrukhabad Mandi']
    },
    {
        id: 'rajasthan',
        name: 'Rajasthan',
        mandis: ['Jaipur Muhana Mandi', 'Kota Mandi', 'Mandsaur-border trading hubs aside; Kota and Ramganj Mandi', 'Bikaner Mandi', 'Alwar Mandi', 'Sri Ganganagar Mandi']
    },
    {
        id: 'madhya-pradesh',
        name: 'Madhya Pradesh',
        mandis: ['Indore Mandi', 'Ujjain Mandi', 'Mandsaur Mandi', 'Neemuch Mandi', 'Bhopal Mandi', 'Dewas Mandi']
    },
    {
        id: 'maharashtra',
        name: 'Maharashtra',
        mandis: ['Vashi APMC, Navi Mumbai', 'Lasalgaon Mandi', 'Nashik Mandi', 'Pune Market Yard', 'Nagpur Mandi', 'Akola Mandi', 'Latur Mandi']
    },
    {
        id: 'gujarat',
        name: 'Gujarat',
        mandis: ['Unjha Mandi', 'Rajkot Mandi', 'Gondal Mandi', 'Ahmedabad APMC', 'Deesa Mandi', 'Jamnagar Mandi']
    },
    {
        id: 'karnataka',
        name: 'Karnataka',
        mandis: ['Bengaluru Yeshwanthpur market', 'Bengaluru KR Market', 'Hubballi APMC', 'Kolar APMC', 'Mysuru APMC', 'Davanagere APMC']
    },
    {
        id: 'andhra-pradesh',
        name: 'Andhra Pradesh',
        mandis: ['Guntur Mirchi Yard', 'Vijayawada wholesale markets', 'Anakapalli Mandi', 'Adoni Mandi', 'Kurnool Mandi']
    },
    {
        id: 'telangana',
        name: 'Telangana',
        mandis: ['Hyderabad agricultural market yards', 'Warangal Mandi', 'Nizamabad Mandi', 'Khammam Mandi', 'Karimnagar Mandi']
    },
    {
        id: 'tamil-nadu',
        name: 'Tamil Nadu',
        mandis: ['Koyambedu Market, Chennai', 'Oddanchatram Market', 'Erode Market', 'Salem Market', 'Madurai Market']
    },
    {
        id: 'west-bengal',
        name: 'West Bengal',
        mandis: ['Posta Bazar, Kolkata', 'Sealdah Koley Market', 'Mechua Market, Kolkata', 'Siliguri wholesale markets', 'Burdwan Mandi']
    },
    {
        id: 'bihar',
        name: 'Bihar',
        mandis: ['Gulabbagh Mandi, Purnia', 'Muzaffarpur Mandi', 'Patna wholesale markets', 'Begusarai Mandi', 'Ara Mandi']
    },
    {
        id: 'odisha',
        name: 'Odisha',
        mandis: ['Bhubaneswar wholesale markets', 'Cuttack Chhatra Bazar', 'Bargarh Mandi', 'Sambalpur Mandi']
    },
    {
        id: 'chhattisgarh',
        name: 'Chhattisgarh',
        mandis: ['Raipur Mandi', 'Durg Mandi', 'Rajnandgaon Mandi']
    },
    {
        id: 'assam',
        name: 'Assam',
        mandis: ['Guwahati wholesale markets', 'Jorhat Mandi', 'Dibrugarh Mandi']
    },
    {
        id: 'himachal-pradesh',
        name: 'Himachal Pradesh',
        mandis: ['Solan Mandi', 'Shimla / Dhalli Mandi', 'Una Mandi']
    },
    {
        id: 'uttarakhand',
        name: 'Uttarakhand',
        mandis: ['Haldwani Mandi', 'Rudrapur Mandi', 'Dehradun Mandi']
    },
    {
        id: 'jammu-kashmir',
        name: 'Jammu & Kashmir',
        mandis: ['Sopore Fruit Mandi', 'Narwal Mandi, Jammu', 'Parimpora Mandi, Srinagar']
    },
    {
        id: 'jharkhand',
        name: 'Jharkhand',
        mandis: ['Ranchi wholesale market', 'Jamshedpur wholesale markets']
    },
    {
        id: 'kerala',
        name: 'Kerala',
        mandis: ['Vazhakulam market', 'Kochi wholesale markets', 'Kozhikode wholesale markets']
    },
    {
        id: 'goa',
        name: 'Goa',
        mandis: ['Mapusa Market', 'Margao Market']
    }
];

const MANDI_QUICK_FILTERS = ['Delhi', 'Punjab', 'Maharashtra', 'Gujarat', 'Karnataka', 'Andhra Pradesh'];
const MANDI_FEATURED_STATES = ['delhi', 'haryana', 'punjab', 'uttar-pradesh'];

function escapeMandiHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function mandiArtwork(index) {
    const illustrations = [
        '<path d="M5 11h14l-1 9H6l-1-9Z"/><path d="M4 11 6 5h12l2 6M8 11V8m4 3V8m4 3V8M9 20v-5h6v5"/>',
        '<path d="M12 20V6m0 4c-4 0-6-2-6-5 4 0 6 2 6 5Zm0 4c4 0 6-2 6-5-4 0-6 2-6 5Z"/><path d="M7 20h10"/>',
        '<path d="M5 10h14v10H5zM4 10l2-5h12l2 5"/><path d="M4 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>',
        '<path d="M12 20V9m0 2c-4 0-6-2-6-5 4 0 6 2 6 5Zm0 3c4 0 6-2 6-5-4 0-6 2-6 5Z"/><path d="M7 20h10"/>'
    ];
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${illustrations[index % illustrations.length]}</svg>`;
}

function mandiLocationIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
}

function initializeAgricultureMandiDirectory(container) {
    if (!container || container.querySelector('.agri-mandi-directory')) return;
    const insertionPoint = container.querySelector('.agri-v2-benefits');
    if (!insertionPoint) return;

    insertionPoint.insertAdjacentHTML('afterend', `
        <section class="agri-mandi-directory" aria-labelledby="agri-mandi-title">
            <div class="container">
                <div class="agri-mandi-heading">
                    <div class="agri-mandi-heading-copy">
                        <p class="agri-v2-label">Markets rooted in every region</p>
                        <h2 id="agri-mandi-title">Explore India's Agricultural Mandis</h2>
                        <p>Discover agricultural trading hubs across India. Explore major mandis by state and connect with the markets that support India's agricultural supply chain.</p>
                    </div>
                    <div class="agri-mandi-heritage-mark" aria-hidden="true">
                        <svg viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="44"/>
                            <circle cx="60" cy="60" r="32"/>
                            <path d="M60 24c7 10 7 18 0 25-7-7-7-15 0-25Zm0 47c7 7 7 15 0 25-7-10-7-18 0-25ZM24 60c10-7 18-7 25 0-7 7-15 7-25 0Zm47 0c7-7 15-7 25 0-10 7-18 7-25 0ZM35 35c12 2 17 7 17 17-10 0-15-5-17-17Zm33 33c10 0 15 5 17 17-12-2-17-7-17-17Zm17-33c-2 12-7 17-17 17 0-10 5-15 17-17ZM52 68c0 10-5 15-17 17 2-12 7-17 17-17Z"/>
                            <circle cx="60" cy="60" r="5"/>
                        </svg>
                        <span>From field<br>to marketplace</span>
                    </div>
                </div>

                <div class="agri-mandi-controls" aria-label="Filter agricultural mandis">
                    <div class="agri-mandi-filter-grid">
                        <div class="agri-mandi-field agri-mandi-state-field">
                            <label for="agri-mandi-state-search">State or Union Territory</label>
                            <div class="agri-mandi-state-picker">
                                <input id="agri-mandi-state-search" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="agri-mandi-state-options" placeholder="Search states and UTs" autocomplete="off">
                                <span class="agri-mandi-chevron" aria-hidden="true">⌄</span>
                                <div class="agri-mandi-state-options" id="agri-mandi-state-options" role="listbox" hidden></div>
                            </div>
                        </div>
                        <div class="agri-mandi-field">
                            <label for="agri-mandi-name-search">Find a mandi</label>
                            <div class="agri-mandi-search-wrap">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
                                <input id="agri-mandi-name-search" type="search" placeholder="Search mandi names" autocomplete="off">
                            </div>
                        </div>
                    </div>
                    <div class="agri-mandi-quick-filters" aria-label="Popular state filters">
                        <span>Quick explore</span>
                        <div class="agri-mandi-chips"></div>
                    </div>
                    <div class="agri-mandi-results-bar">
                        <p class="agri-mandi-count" aria-live="polite"></p>
                        <button class="agri-mandi-clear" type="button">Clear all filters</button>
                    </div>
                </div>

                <div class="agri-mandi-groups"></div>
                <div class="agri-mandi-empty" hidden>
                    <span aria-hidden="true">${mandiArtwork(2)}</span>
                    <h3>No mandis found</h3>
                    <p>Try another name or clear your filters to explore the directory.</p>
                </div>
                <div class="agri-mandi-view-all-wrap">
                    <button class="agri-mandi-view-all" type="button">
                        <span>View All Mandis</span><span class="agri-mandi-view-all-arrow" aria-hidden="true">↓</span>
                    </button>
                </div>
                <p class="agri-mandi-source-note">Directory names are reproduced from the supplied mandi list.</p>
            </div>
        </section>`);

    const section = container.querySelector('.agri-mandi-directory');
    const stateSearch = section.querySelector('#agri-mandi-state-search');
    const stateOptions = section.querySelector('#agri-mandi-state-options');
    const mandiSearch = section.querySelector('#agri-mandi-name-search');
    const chips = section.querySelector('.agri-mandi-chips');
    const groups = section.querySelector('.agri-mandi-groups');
    const count = section.querySelector('.agri-mandi-count');
    const empty = section.querySelector('.agri-mandi-empty');
    const clearButton = section.querySelector('.agri-mandi-clear');
    const viewAllButton = section.querySelector('.agri-mandi-view-all');
    const initiallyExpanded = new Set(MANDI_FEATURED_STATES);
    let selectedStateId = '';
    let expandedStateIds = new Set(initiallyExpanded);
    let stateOptionsOpen = false;

    function matchingMandis(state, query) {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        return state.mandis
            .map((name, index) => ({ name, id: `${state.id}-mandi-${String(index + 1).padStart(2, '0')}` }))
            .filter(mandi => !normalizedQuery || mandi.name.toLocaleLowerCase().includes(normalizedQuery));
    }

    function renderStateOptions() {
        const query = stateSearch.value.trim().toLocaleLowerCase();
        const matches = AGRICULTURE_MANDI_STATES.filter(state => state.name.toLocaleLowerCase().includes(query));
        stateOptions.innerHTML = matches.length
            ? matches.map(state => `<button type="button" role="option" aria-selected="${state.id === selectedStateId}" data-state-id="${state.id}">${escapeMandiHtml(state.name)}<span>${state.mandis.length}</span></button>`).join('')
            : '<p class="agri-mandi-no-states">No matching states</p>';
        stateOptions.hidden = !stateOptionsOpen;
        stateSearch.setAttribute('aria-expanded', String(stateOptionsOpen));
    }

    function renderChips() {
        chips.innerHTML = MANDI_QUICK_FILTERS.map(name => {
            const state = AGRICULTURE_MANDI_STATES.find(item => item.name === name);
            return `<button type="button" class="agri-mandi-chip${selectedStateId === state.id ? ' is-active' : ''}" data-state-id="${state.id}" aria-pressed="${selectedStateId === state.id}">${escapeMandiHtml(name)}</button>`;
        }).join('');
    }

    function updateViewAllButton() {
        const allExpanded = expandedStateIds.size === AGRICULTURE_MANDI_STATES.length;
        viewAllButton.querySelector('span:first-child').textContent = allExpanded ? 'Show Featured States' : 'View All Mandis';
        viewAllButton.querySelector('.agri-mandi-view-all-arrow').textContent = allExpanded ? '↑' : '↓';
        viewAllButton.setAttribute('aria-expanded', String(allExpanded));
    }

    function renderGroups() {
        const query = mandiSearch.value.trim();
        const visibleStates = AGRICULTURE_MANDI_STATES
            .filter(state => !selectedStateId || state.id === selectedStateId)
            .map(state => ({ ...state, results: matchingMandis(state, query) }))
            .filter(state => state.results.length > 0);
        const resultCount = visibleStates.reduce((total, state) => total + state.results.length, 0);

        count.innerHTML = `<strong>${resultCount}</strong> matching ${resultCount === 1 ? 'mandi' : 'mandis'}${selectedStateId || query ? ' found' : ' across India'}`;
        empty.hidden = resultCount !== 0;
        groups.hidden = resultCount === 0;
        groups.innerHTML = visibleStates.map(state => {
            const isOpen = expandedStateIds.has(state.id);
            return `<details id="agri-mandi-state-${state.id}" class="agri-mandi-state-group" data-group-id="${state.id}"${isOpen ? ' open' : ''}>
                <summary>
                    <span class="agri-mandi-state-title">${escapeMandiHtml(state.name)}</span>
                    <span class="agri-mandi-state-count">${state.results.length} ${state.results.length === 1 ? 'mandi' : 'mandis'}</span>
                    <span class="agri-mandi-group-toggle" aria-hidden="true">+</span>
                </summary>
                <div class="agri-mandi-card-grid">
                    ${state.results.map((mandi, index) => `<article class="agri-mandi-card" data-mandi-id="${mandi.id}">
                        <span class="agri-mandi-card-art">${mandiArtwork(index + state.id.length)}</span>
                        <h3>${escapeMandiHtml(mandi.name)}</h3>
                        <p class="agri-mandi-card-location">${mandiLocationIcon()}<span>${escapeMandiHtml(state.name)}</span></p>
                    </article>`).join('')}
                </div>
            </details>`;
        }).join('');
        updateViewAllButton();
    }

    function setSelectedState(stateId) {
        selectedStateId = stateId;
        const selectedState = AGRICULTURE_MANDI_STATES.find(state => state.id === stateId);
        stateSearch.value = selectedState ? selectedState.name : '';
        stateOptionsOpen = false;
        if (stateId) expandedStateIds.add(stateId);
        renderStateOptions();
        renderChips();
        renderGroups();
    }

    renderChips();
    renderStateOptions();
    renderGroups();

    stateSearch.addEventListener('focus', () => {
        stateOptionsOpen = true;
        renderStateOptions();
    });
    stateSearch.addEventListener('input', () => {
        stateOptionsOpen = true;
        const exactMatch = AGRICULTURE_MANDI_STATES.find(state => state.name.toLocaleLowerCase() === stateSearch.value.trim().toLocaleLowerCase());
        if (exactMatch) {
            setSelectedState(exactMatch.id);
        } else {
            selectedStateId = '';
            renderChips();
            renderGroups();
        }
        renderStateOptions();
    });
    stateSearch.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            stateOptionsOpen = false;
            renderStateOptions();
            stateSearch.blur();
        } else if (event.key === 'ArrowDown' && stateOptionsOpen) {
            const firstOption = stateOptions.querySelector('[role="option"]');
            if (firstOption) {
                event.preventDefault();
                firstOption.focus();
            }
        }
    });
    stateSearch.addEventListener('blur', () => {
        window.setTimeout(() => {
            if (!stateOptions.contains(document.activeElement)) {
                stateOptionsOpen = false;
                renderStateOptions();
            }
        }, 0);
    });
    stateOptions.addEventListener('click', event => {
        const option = event.target.closest('[data-state-id]');
        if (option) setSelectedState(option.dataset.stateId);
    });
    stateOptions.addEventListener('keydown', event => {
        const option = event.target.closest('[role="option"]');
        if (!option) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setSelectedState(option.dataset.stateId);
            stateSearch.focus();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const options = Array.from(stateOptions.querySelectorAll('[role="option"]'));
            const currentIndex = options.indexOf(option);
            options[(currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length]?.focus();
        }
    });
    chips.addEventListener('click', event => {
        const chip = event.target.closest('[data-state-id]');
        if (chip) setSelectedState(selectedStateId === chip.dataset.stateId ? '' : chip.dataset.stateId);
    });
    mandiSearch.addEventListener('input', () => {
        const query = mandiSearch.value.trim().toLocaleLowerCase();
        if (query) {
            AGRICULTURE_MANDI_STATES.forEach(state => {
                if (state.mandis.some(name => name.toLocaleLowerCase().includes(query))) expandedStateIds.add(state.id);
            });
        }
        renderGroups();
    });
    groups.addEventListener('toggle', event => {
        const group = event.target.closest('details[data-group-id]');
        if (!group) return;
        if (group.open) expandedStateIds.add(group.dataset.groupId);
        else expandedStateIds.delete(group.dataset.groupId);
        updateViewAllButton();
    }, true);
    clearButton.addEventListener('click', () => {
        selectedStateId = '';
        stateSearch.value = '';
        mandiSearch.value = '';
        expandedStateIds = new Set(initiallyExpanded);
        stateOptionsOpen = false;
        renderStateOptions();
        renderChips();
        renderGroups();
    });
    viewAllButton.addEventListener('click', () => {
        expandedStateIds = expandedStateIds.size === AGRICULTURE_MANDI_STATES.length
            ? new Set(initiallyExpanded)
            : new Set(AGRICULTURE_MANDI_STATES.map(state => state.id));
        renderGroups();
    });
}
