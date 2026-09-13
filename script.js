// Sample Writer Data - You can easily add more writers here
const writersData = [
    {
        id: 1,
        name: "Emma Johnson",
        specialty: "Blog Writing",
        bio: "Experienced blog writer specializing in tech and lifestyle content. 5+ years of experience.",
        rate: "$50-80/article",
        categories: ["Blog Writing", "Content Strategy"],
        email: "emma@example.com",
        avatar: "📝",
        payments: {
            paypal: "https://www.paypal.me/emmajohnson",
            wise: "https://wise.com/invite/emmajohnson",
            bank: "IBAN GB29 NWBK 6016 1331 9268",
            other: "Invoice on request"
        },
        payment_terms: "Invoice within 7 days after delivery"
    },
    {
        id: 2,
        name: "Marcus Chen",
        specialty: "Copywriting",
        bio: "Expert copywriter for marketing campaigns and sales pages. Proven track record of increasing conversions.",
        rate: "$75-150/project",
        categories: ["Copywriting", "Marketing"],
        email: "marcus@example.com",
        avatar: "✍️",
        payments: { paypal: "https://www.paypal.me/marcuschen", wise: "", bank: "", other: "Stripe / PayPal accepted" },
        payment_terms: "50% upfront for new clients"
    },
    {
        id: 3,
        name: "Sarah Williams",
        specialty: "Technical Writing",
        bio: "Technical writer with expertise in software documentation and user guides. Computer science background.",
        rate: "$60-100/hour",
        categories: ["Technical Writing", "Documentation"],
        email: "sarah@example.com",
        avatar: "💻",
        payments: { paypal: "", wise: "https://wise.com/invite/sarahw", bank: "", other: "Invoice / Bank transfer" },
        payment_terms: "Net 14"
    },
    // ... keep other writers similar to above
];

// Load writers on page load
document.addEventListener('DOMContentLoaded', function() {
    displayWriters(writersData);
    setupFilters();
    setupMainCTAs();
});

// Display writers
function displayWriters(writers) {
    const grid = document.getElementById('writersGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (writers.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No writers found. Try a different search!</p>';
        return;
    }
    
    writers.forEach(writer => {
        const card = document.createElement('div');
        card.className = 'writer-card';
        card.innerHTML = `
            <div class="writer-header">
                <div class="writer-avatar">${writer.avatar}</div>
                <div class="writer-name">${writer.name}</div>
                <div class="writer-specialty">${writer.specialty}</div>
            </div>
            <div class="writer-body">
                <div class="writer-bio">${writer.bio}</div>
                <div class="writer-info">
                    <label>Rate:</label>
                    <span>${writer.rate}</span>
                </div>
                <div class="writer-categories">
                    ${writer.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
                <div class="writer-footer">
                    <button class="btn btn-primary btn-contact" onclick="showContactModal(${writer.id})">Contact Writer</button>
                    <button class="btn btn-ghost btn-contact">
                        <a href="mailto:lancenest@outlookmail.com?subject=Inquiry%20about%20${encodeURIComponent(writer.name)}">Report</a>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Setup search and filter functionality
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterWriters);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterWriters);
    }
}

// Filter writers based on search and category
function filterWriters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    
    const filtered = writersData.filter(writer => {
        const matchesSearch = 
            writer.name.toLowerCase().includes(searchTerm) ||
            writer.specialty.toLowerCase().includes(searchTerm) ||
            writer.bio.toLowerCase().includes(searchTerm) ||
            writer.categories.some(cat => cat.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !selectedCategory || writer.categories.includes(selectedCategory);
        
        return matchesSearch && matchesCategory;
    });
    
    displayWriters(filtered);
}

// --- Modals & CTAs ---
function setupMainCTAs(){
    // Floating CTA behavior
    const floatCta = document.getElementById('float-cta');
    if(floatCta) floatCta.addEventListener('click', openSignupModal);

    // Hero CTA signup
    const ctaSignup = document.getElementById('cta-signup');
    if(ctaSignup) ctaSignup.addEventListener('click', openSignupModal);

    // Signup modal close
    const signupClose = document.getElementById('signup-close');
    if(signupClose) signupClose.addEventListener('click', closeSignupModal);
    const signupCancel = document.getElementById('signup-cancel');
    if(signupCancel) signupCancel.addEventListener('click', closeSignupModal);
    const signupForm = document.getElementById('signup-form');
    if(signupForm) signupForm.addEventListener('submit', handleSignupSubmit);

    // Contact modal close
    const contactClose = document.getElementById('contact-close');
    if(contactClose) contactClose.addEventListener('click', closeContactModal);
}

function openSignupModal(){
    const modal = document.getElementById('signup-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    const role = document.getElementById('signup-role');
    if(role) role.value = 'freelancer';
}
function closeSignupModal(){
    const modal = document.getElementById('signup-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
}
function handleSignupSubmit(e){
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    // In a real app you'd POST this to a signup API. Here we just simulate success.
    closeSignupModal();
    // Redirect to dashboard placeholder
    window.location.href = '/dashboard';
}

function showContactModal(id){
    const writer = writersData.find(w=>w.id===id);
    const modal = document.getElementById('contact-modal');
    const body = document.getElementById('contact-body');
    if(!writer || !modal || !body) return;
    body.innerHTML = `
      <p><strong>${writer.name}</strong> — ${writer.specialty}</p>
      <p class="payment-note">${writer.payment_terms || ''}</p>
      <h4>Payment methods</h4>
      <ul class="payments-list">
        ${writer.payments.paypal?`<li><span class="payment-label">PayPal</span><a href="${writer.payments.paypal}" target="_blank" rel="noopener">${writer.payments.paypal}</a></li>`:''}
        ${writer.payments.wise?`<li><span class="payment-label">Wise</span><a href="${writer.payments.wise}" target="_blank" rel="noopener">${writer.payments.wise}</a></li>`:''}
        ${writer.payments.bank?`<li><span class="payment-label">Bank (IBAN)</span><span>${writer.payments.bank}</span></li>`:''}
        ${writer.payments.other?`<li><span class="payment-label">Other</span><span>${writer.payments.other}</span></li>`:''}
      </ul>
      <div class="contact-cta">
        <a class="btn btn-primary" href="mailto:${writer.email}?subject=Hire%20${encodeURIComponent(writer.name)}">Email &amp; Hire</a>
        <button class="btn btn-ghost" onclick="closeContactModal()">Close</button>
      </div>
    `;
    modal.setAttribute('aria-hidden','false');
}
function closeContactModal(){
    const modal = document.getElementById('contact-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
}
