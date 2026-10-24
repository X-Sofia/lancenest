const writersData = [
    {
        id: 1,
        name: "Emma Johnson",
        specialty: "Blog Writing",
        bio: "Experienced blog writer specializing in tech and lifestyle content. 5+ years of experience.",
        rate: "$50–80/article",
        categories: ["Blog Writing", "Content Strategy"],
        email: "emma@example.com",
        avatar: "📝",
        payments: {
            paypal: "https://www.paypal.me/emmajohnson",
            wise: "https://wise.com/invite/emmajohnson",
            bank: "IBAN GB29 NWBK 6016 1331 9268",
            other: "Invoice on request"
        },
        paymentTerms: "Invoice within 7 days after delivery"
    },
    {
        id: 2,
        name: "Marcus Chen",
        specialty: "Copywriting",
        bio: "Expert copywriter for marketing campaigns and sales pages. Proven track record of increasing conversions.",
        rate: "$75–150/project",
        categories: ["Copywriting", "Marketing"],
        email: "marcus@example.com",
        avatar: "✍️",
        payments: {
            paypal: "https://www.paypal.me/marcuschen",
            wise: "",
            bank: "",
            other: "Stripe / PayPal accepted"
        },
        paymentTerms: "50% upfront for new clients"
    },
    {
        id: 3,
        name: "Sarah Williams",
        specialty: "Technical Writing",
        bio: "Technical writer with expertise in software documentation and user guides. Computer science background.",
        rate: "$60–100/hour",
        categories: ["Technical Writing", "Documentation"],
        email: "sarah@example.com",
        avatar: "💻",
        payments: {
            paypal: "",
            wise: "https://wise.com/invite/sarahw",
            bank: "",
            other: "Invoice / Bank transfer"
        },
        paymentTerms: "Net 14"
    },
    {
        id: 4,
        name: "Nina Patel",
        specialty: "Social Media Content",
        bio: "Social media strategist and writer creating punchy, conversion-focused campaigns for brands.",
        rate: "$40–70/post",
        categories: ["Social Media Content", "Brand Voice"],
        email: "nina@example.com",
        avatar: "📱",
        payments: {
            paypal: "https://www.paypal.me/ninapatel",
            wise: "",
            bank: "",
            other: "Invoice on request"
        },
        paymentTerms: "Net 7"
    },
    {
        id: 5,
        name: "Olivia Grant",
        specialty: "Editing & Proofreading",
        bio: "Line editor and proofreader focused on clarity, tone, and publication-ready copy.",
        rate: "$25–60/hour",
        categories: ["Editing & Proofreading", "Content Editing"],
        email: "olivia@example.com",
        avatar: "✏️",
        payments: {
            paypal: "https://www.paypal.me/oliviagrant",
            wise: "",
            bank: "",
            other: "Card payment available"
        },
        paymentTerms: "Paid after final review"
    },
    {
        id: 6,
        name: "Daniel Brooks",
        specialty: "Creative Writing",
        bio: "Creative storyteller crafting brand narratives, scripts, and compelling long-form content.",
        rate: "$80–180/project",
        categories: ["Creative Writing", "Storytelling"],
        email: "daniel@example.com",
        avatar: "📖",
        payments: {
            paypal: "https://www.paypal.me/danielbrooks",
            wise: "https://wise.com/invite/danielbrooks",
            bank: "",
            other: "Invoice"
        },
        paymentTerms: "50% deposit before writing begins"
    }
];

const canonicalCategories = [
    { value: "Blog Writing", label: "Blog Writing" },
    { value: "Copywriting", label: "Copywriting" },
    { value: "Technical Writing", label: "Technical Writing" },
    { value: "Social Media Content", label: "Social Media Content" },
    { value: "Editing & Proofreading", label: "Editing & Proofreading" },
    { value: "Creative Writing", label: "Creative Writing" },
    { value: "Email & Newsletters", label: "Email & Newsletters" },
    { value: "Resume Writing", label: "Resume Writing" }
];

function normalizeText(value = "") {
    return String(value).trim().toLowerCase();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function displayWriters(writers) {
    const grid = document.getElementById("writersGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (!writers.length) {
        grid.innerHTML = '<div class="empty-state">No writers match your search. Try a different keyword or category.</div>';
        return;
    }

    grid.innerHTML = writers.map(writer => {
        const categoriesHtml = (writer.categories || []).map(cat => `<span class="category-tag">${cat}</span>`).join("");

        return `
            <article class="writer-card">
                <div class="writer-header">
                    <div class="writer-avatar">${writer.avatar || "✍️"}</div>
                    <div class="writer-name">${writer.name}</div>
                    <div class="writer-specialty">${writer.specialty}</div>
                </div>
                <div class="writer-body">
                    <p class="writer-bio">${writer.bio}</p>
                    <div class="writer-info">
                        <span class="info-label">Rate</span>
                        <span class="info-value">${writer.rate}</span>
                    </div>
                    <div class="writer-categories">${categoriesHtml}</div>
                    <div class="writer-footer">
                        <button class="btn btn-primary btn-contact" type="button" data-writer-id="${writer.id}">Contact Writer</button>
                        <a class="btn btn-secondary" href="mailto:lancenest@outlookmail.com?subject=${encodeURIComponent(`Inquiry about ${writer.name}`)}">Report</a>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    const contactButtons = document.querySelectorAll(".btn-contact");
    contactButtons.forEach(button => {
        button.addEventListener("click", () => {
            const writerId = Number(button.dataset.writerId);
            showContactModal(writerId);
        });
    });
}

function populateCategoryFilter() {
    const filter = document.getElementById("categoryFilter");
    if (!filter) return;

    filter.innerHTML = '<option value="">All Categories</option>' + canonicalCategories.map(option => {
        return `<option value="${option.value}">${option.label}</option>`;
    }).join("");
}

function setupFilters() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    if (searchInput) {
        searchInput.addEventListener("input", filterWriters);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterWriters);
    }
}

function filterWriters() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const searchTerm = normalizeText(searchInput ? searchInput.value : "");
    const selectedCategory = categoryFilter ? categoryFilter.value : "";

    const filtered = writersData.filter(writer => {
        const combinedText = [
            writer.name,
            writer.specialty,
            writer.bio,
            ...(writer.categories || [])
        ].join(" ").toLowerCase();

        const matchesSearch = !searchTerm || combinedText.includes(searchTerm);
        const matchesCategory = !selectedCategory || (writer.categories || []).includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    displayWriters(filtered);
}

function setupMainCTAs() {
    const floatCta = document.getElementById("float-cta");
    if (floatCta) {
        floatCta.addEventListener("click", openSignupModal);
    }

    const ctaSignup = document.getElementById("cta-signup");
    if (ctaSignup) {
        ctaSignup.addEventListener("click", openSignupModal);
    }

    const signupClose = document.getElementById("signup-close");
    if (signupClose) {
        signupClose.addEventListener("click", closeSignupModal);
    }

    const signupCancel = document.getElementById("signup-cancel");
    if (signupCancel) {
        signupCancel.addEventListener("click", closeSignupModal);
    }

    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", handleSignupSubmit);
    }

    const contactClose = document.getElementById("contact-close");
    if (contactClose) {
        contactClose.addEventListener("click", closeContactModal);
    }

    document.addEventListener("click", event => {
        if (event.target instanceof HTMLElement) {
            const modal = event.target.closest(".modal");
            if (modal && event.target === modal) {
                modal.setAttribute("aria-hidden", "true");
            }
        }
    });
}

function openSignupModal() {
    const modal = document.getElementById("signup-modal");
    if (!modal) return;

    modal.setAttribute("aria-hidden", "false");
    const emailInput = document.getElementById("signup-email");
    if (emailInput) {
        emailInput.focus();
    }
}

function closeSignupModal() {
    const modal = document.getElementById("signup-modal");
    if (!modal) return;

    modal.setAttribute("aria-hidden", "true");
    const form = document.getElementById("signup-form");
    if (form) {
        form.reset();
    }
}

function handleSignupSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById("signup-email");
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email || !email.includes("@")) {
        emailInput.focus();
        showToast("Please enter a valid email address.");
        return;
    }

    closeSignupModal();
    showToast("Thanks! Your interest has been recorded.");
}

function showContactModal(writerId) {
    const writer = writersData.find(item => item.id === writerId);
    const modal = document.getElementById("contact-modal");
    const body = document.getElementById("contact-body");

    if (!writer || !modal || !body) return;

    const safePayments = writer.payments || {};
    const paymentItems = [
        ["PayPal", safePayments.paypal],
        ["Wise", safePayments.wise],
        ["Bank (IBAN)", safePayments.bank],
        ["Other", safePayments.other]
    ].filter(([, value]) => value && String(value).trim());

    const paymentHtml = paymentItems.length
        ? paymentItems.map(([label, value]) => {
            const isLink = /^https?:\/\//i.test(String(value));
            if (isLink) {
                return `<li><span class=\"payment-label\">${label}</span><a href=\"${value}\" target=\"_blank\" rel=\"noopener noreferrer\">${value}</a></li>`;
            }
            return `<li><span class=\"payment-label\">${label}</span><span>${value}</span></li>`;
        }).join("")
        : '<p class="muted">Payment details are not yet available for this writer.</p>';

    body.innerHTML = `
        <p><strong>${writer.name}</strong> — ${writer.specialty}</p>
        <p class="payment-note">${writer.paymentTerms || "Terms available on request."}</p>
        <h4>Payment methods</h4>
        <ul class="payments-list">${paymentHtml}</ul>
        <div class="contact-cta">
            <a class="btn btn-primary" href="mailto:${writer.email}?subject=${encodeURIComponent(`Hire ${writer.name}`)}">Email &amp; Hire</a>
            <button class="btn btn-secondary" type="button" onclick="closeContactModal()">Close</button>
        </div>
    `;

    modal.setAttribute("aria-hidden", "false");
}

function closeContactModal() {
    const modal = document.getElementById("contact-modal");
    if (!modal) return;

    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
    populateCategoryFilter();
    displayWriters(writersData);
    setupFilters();
    setupMainCTAs();
});
