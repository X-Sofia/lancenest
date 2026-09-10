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
        avatar: "📝"
    },
    {
        id: 2,
        name: "Marcus Chen",
        specialty: "Copywriting",
        bio: "Expert copywriter for marketing campaigns and sales pages. Proven track record of increasing conversions.",
        rate: "$75-150/project",
        categories: ["Copywriting", "Marketing"],
        email: "marcus@example.com",
        avatar: "✍️"
    },
    {
        id: 3,
        name: "Sarah Williams",
        specialty: "Technical Writing",
        bio: "Technical writer with expertise in software documentation and user guides. Computer science background.",
        rate: "$60-100/hour",
        categories: ["Technical Writing", "Documentation"],
        email: "sarah@example.com",
        avatar: "💻"
    },
    {
        id: 4,
        name: "Alex Rodriguez",
        specialty: "Social Media Content",
        bio: "Social media specialist creating engaging posts and strategies for various platforms.",
        rate: "$40-70/week",
        categories: ["Social Media", "Content Strategy"],
        email: "alex@example.com",
        avatar: "📱"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        specialty: "Editing & Proofreading",
        bio: "Professional editor with attention to detail. Specializes in academic and business writing.",
        rate: "$35-60/hour",
        categories: ["Editing", "Proofreading"],
        email: "lisa@example.com",
        avatar: "✏️"
    },
    {
        id: 6,
        name: "James Park",
        specialty: "Creative Writing",
        bio: "Fiction and creative content writer. Published author with unique storytelling style.",
        rate: "$55-120/project",
        categories: ["Creative", "Storytelling"],
        email: "james@example.com",
        avatar: "📖"
    },
    {
        id: 7,
        name: "Rachel Green",
        specialty: "Email Marketing",
        bio: "Specialized in crafting compelling email newsletters and marketing sequences.",
        rate: "$45-90/project",
        categories: ["Email", "Marketing"],
        email: "rachel@example.com",
        avatar: "📧"
    },
    {
        id: 8,
        name: "David Brown",
        specialty: "Resume Writing",
        bio: "Expert resume writer helping professionals land their dream jobs. Career coaching included.",
        rate: "$80-150/resume",
        categories: ["Resume", "Career"],
        email: "david@example.com",
        avatar: "🎯"
    }
];

// Load writers on page load
document.addEventListener('DOMContentLoaded', function() {
    displayWriters(writersData);
    setupFilters();
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
                    <button class="btn btn-primary btn-contact">
                        <a href="mailto:${writer.email}?subject=Hire%20${writer.name}%20for%20Writing%20Project">Contact Writer</a>
                    </button>
                    <button class="btn btn-secondary btn-contact">
                        <a href="mailto:lancenest@outlookmail.com?subject=Inquiry%20about%20${writer.name}">Report</a>
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
