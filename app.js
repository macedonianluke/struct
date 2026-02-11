// -------------------------------------------------------------------------
// REINFORCED NANO BANANA LOGIC (Developer-Side Background API)
// -------------------------------------------------------------------------
const DEVELOPER_CONFIG = {
    apiKey: "AI_SESSION_DEV_KEY_HIDDEN", // Developer-only background key
    prePrompt: `act like a world class interior decorate and architect that buys an old house and dos it up to make it have maximum draw for an australian family who would want to buy the house. improve and update the image with landscape and painting and decoration, keep all the same architectural features.`
};

class NanoBananaService {
    static async generateVision(listingUrl) {
        console.group("Nano Banana API Session (Background Auth)");
        console.log(`Endpoint: /api/v1/vision/architectural-edit`);
        console.log(`Developer Credential: ${DEVELOPER_CONFIG.apiKey}`);
        console.log(`Executing Pre-Prompt: ${DEVELOPER_CONFIG.prePrompt}`);
        console.log(`Input Listing: ${listingUrl}`);
        console.groupEnd();

        // Simulate architectural processing & grounding
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "VISION_READY",
                    structuralIntegrityScore: 0.99
                });
            }, 2500);
        });
    }
}

// -------------------------------------------------------------------------
// USER AUTH & INTERACTIVE LAYER
// -------------------------------------------------------------------------
const properties = [
    {
        id: 1,
        title: "Victorian Preservation",
        location: "Carlton, VIC",
        price: "$1.4M - $1.6M",
        beforeImage: "terrace_house_before_1768693729936.png",
        afterImage: "terrace_house_after_v2_1768693859721.png",
        meta: "4 BEDS | 2 BATH | HERITAGE"
    },
    {
        id: 2,
        title: "The Concrete Loft",
        location: "Abbotsford, VIC",
        price: "$790K - $850K",
        beforeImage: "loft_before_1768693771516.png",
        afterImage: "loft_after_v2_1768693883925.png",
        meta: "2 BEDS | 1 BATH | INDUSTRIAL"
    },
    {
        id: 3,
        title: "70s Brick Potential",
        location: "Reservoir, VIC",
        price: "$820K - $880K",
        beforeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        meta: "3 BEDS | 1 BATH | LARGE BLOCK"
    }
];

const API_BASE_URL = "http://localhost:8000";

let currentUser = null;

function updateAuthState() {
    const loginBtn = document.getElementById('google-login');
    const body = document.body;

    if (currentUser) {
        // User Logged In
        loginBtn.innerHTML = `<span>HI, ${currentUser.name.toUpperCase()}</span>`;
        loginBtn.style.borderColor = "#4CAF50";
        loginBtn.style.color = "#4CAF50";

        // Transition to App View
        body.classList.add('app-active');
        document.getElementById('property-search').placeholder = "PASTE LISTING URL...";

        // Load default/example feed for the dashboard if empty
        if (document.getElementById('property-feed').children.length === 0) {
            loadDashboardFeed();
        }

    } else {
        // User Logged Out
        loginBtn.innerHTML = `<img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="G" width="20">LOG IN WITH GOOGLE`;
        loginBtn.style.borderColor = "var(--accent-color)";
        loginBtn.style.color = "var(--text-color)";

        // Revert to Landing View
        body.classList.remove('app-active');
    }
}

async function loadDashboardFeed() {
    // Determine which property to show. 
    // For MVP walkthrough, we show only the 3 hardcoded ones initially or fetch from backend.
    // Let's use the local 'properties' array as the standard "Feed" for now unless search happens.
    const feed = document.getElementById('property-feed');
    feed.innerHTML = ''; // Clear existing
    properties.forEach(prop => {
        feed.appendChild(createPropertyCard(prop));
    });
}

async function performSearch(query) {
    const searchButton = document.getElementById('search-submit');
    const overlay = document.getElementById('vision-overlay');
    const overlayText = document.getElementById('overlay-text');

    searchButton.innerText = "VISIONING...";
    searchButton.disabled = true;
    searchButton.style.opacity = "0.5";

    // Show Overlay
    overlayText.innerText = `ANALYZING: ${query.substring(0, 30)}...`;
    overlay.classList.add('active');

    try {
        // In a real scenario, we hit the backend:
        // const response = await fetch(`${API_BASE_URL}/api/search`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ query: query })
        // });
        // const results = await response.json();

        // For this "Local MVP", we simulate the backend delay and background processing
        // calling the Service logic we defined earlier.
        await NanoBananaService.generateVision(query);

        // Update Overlay
        overlayText.innerText = "GENERATING ARCHITECTURAL VISION...";
        await new Promise(r => setTimeout(r, 1500));

        overlay.classList.remove('active');
        alert(`VISION UNLOCKED: "${query}" analyzed. Structural Integrity Verified.`);

        // In real app, we would append the new result to the feed here.

    } catch (error) {
        console.error("Search failed:", error);
        alert("Vision Engine Offline. Check Connection.");
        overlay.classList.remove('active');
    } finally {
        searchButton.innerText = "GO";
        searchButton.disabled = false;
        searchButton.style.opacity = "1";
    }
}

function init() {
    // Initial Feed Population (Landing Page State)
    const feed = document.getElementById('property-feed');
    properties.forEach(prop => {
        feed.appendChild(createPropertyCard(prop));
    });

    const searchButton = document.getElementById('search-submit');
    const searchInput = document.getElementById('property-search');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query === "") return;

        if (!currentUser) {
            alert("AUTH REQUIRED: PLEASE LOGIN WITH GOOGLE TO UNLOCK AI VISION ENGINE.");
            // Ideally trigger login flow here
            return;
        }

        performSearch(query);
    });

    // Enter key support
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    const loginBtn = document.getElementById('google-login');
    loginBtn.addEventListener('click', () => {
        if (!currentUser) {
            // Simulate Google Login
            const email = prompt("Enter your Google email to log in (Developer Mock):", "architect@visionary.com");
            if (email) {
                currentUser = { email: email, name: email.split('@')[0] };
                updateAuthState();
            }
        } else {
            if (confirm("Logout from Visionary?")) {
                currentUser = null;
                updateAuthState();
            }
        }
    });

    updateAuthState();
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <div class="property-header">
            <div>
                <h2 class="property-title">${property.title}</h2>
                <div class="property-location">${property.location}</div>
            </div>
            <div class="property-meta">
                <div>${property.price}</div>
                <div>${property.meta}</div>
            </div>
        </div>
        
        <div class="image-comparison" id="comparison-${property.id}">
            <div class="image-after">
                <img src="${property.afterImage}" alt="Improved">
                <div class="label label-after">VISION (NANO BANANA)</div>
            </div>
            <div class="image-before">
                <img src="${property.beforeImage}" alt="Original">
                <div class="label label-before">EXISTING</div>
            </div>
            <div class="slider-handle">
                <div class="slider-button">↔</div>
            </div>
        </div>

        <div class="property-footer">
            <button class="btn btn-secondary">VIEW LISTING</button>
            <button class="btn btn-primary" onclick="alert('Architect Consultation Booked.')">BOOK ARCHITECT</button>
        </div>
    `;

    const container = card.querySelector('.image-comparison');
    const beforeImage = card.querySelector('.image-before');
    const sliderHandle = card.querySelector('.slider-handle');

    let isResizing = false;

    const onMove = (e) => {
        if (!isResizing) return;
        const rect = container.getBoundingClientRect();
        let x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        const percent = (x / rect.width) * 100;
        beforeImage.style.width = `${percent}%`;
        sliderHandle.style.left = `${percent}%`;
    };

    const startResize = () => isResizing = true;
    const endResize = () => isResizing = false;

    container.addEventListener('mousedown', startResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', endResize);

    container.addEventListener('touchstart', startResize);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', endResize);

    return card;
}

document.addEventListener('DOMContentLoaded', init);
