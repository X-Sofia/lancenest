# LanceNest - Freelancer Platform for Writers

A professional marketplace platform connecting businesses and clients with talented writers from around the world.

## Features

✅ **Browse Writers** - Explore profiles of verified writers
✅ **Search & Filter** - Find writers by specialty, name, or category
✅ **Writer Profiles** - Detailed information about each writer's expertise and rates
✅ **Direct Contact** - Connect directly with writers via email
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Easy Management** - Simple to add, edit, or remove writers

## Getting Started

### 1. Set Up GitHub Pages (Deploy Your Site)

1. Go to your repository: `https://github.com/X-Sofia/lancenest`
2. Click on **Settings** (top right)
3. Scroll down to **Pages** section
4. Under "Source", select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://X-Sofia.github.io/lancenest/`

### 2. View Your Website

Your LanceNest platform is now live! Visit:
```
https://X-Sofia.github.io/lancenest/
```

## How to Add/Edit Writers

All writers are stored in the `script.js` file in the `writersData` array.

### Adding a New Writer

1. Open `script.js`
2. Find the `writersData` array
3. Add a new writer object:

```javascript
{
    id: 9,
    name: "Your Writer Name",
    specialty: "Their Specialty",
    bio: "A short bio about the writer",
    rate: "$XX-XX/project",
    categories: ["Category1", "Category2"],
    email: "writer@example.com",
    avatar: "emoji"
}
```

### Common Writer Emojis
- 📝 - Blog Writing
- ✍️ - Copywriting
- 💻 - Technical Writing
- 📱 - Social Media
- ✏️ - Editing
- 📖 - Creative Writing
- 📧 - Email Marketing
- 🎯 - Resume Writing

## Customization Guide

### Change Colors

Edit `styles.css` and look for color values:
- `#3498db` - Primary blue color
- `#2c3e50` - Dark color
- Change these hex codes to your preferred colors

### Change Website Name

1. In `index.html` and `writers.html`, change:
   ```html
   <div class="logo">LanceNest</div>
   ```
   To your preferred name

2. In `styles.css`, find `.logo` section and adjust if needed

### Change Contact Email

In `index.html` and `writers.html`, change:
```html
lancenest@outlookmail.com
```
To your contact email

## File Structure

```
lancenest/
├── index.html      (Home page)
├── writers.html    (Browse writers page)
├── styles.css      (Website styling)
├── script.js       (Writer data & search functionality)
└── README.md       (This file)
```

## Writer Categories

Available categories for writers:
- Blog Writing
- Copywriting
- Technical Writing
- Social Media Content
- Editing & Proofreading
- Creative Writing
- Email & Newsletters
- Resume Writing

## Search & Filter Features

- **Search by name**: Find writers by their name
- **Search by specialty**: Find writers by their expertise
- **Search by skill**: Search across all writer skills
- **Filter by category**: Select a specific category to narrow results

## Contact

**Platform Owner**: Sofia Wolf
**Email**: lancenest@outlookmail.com

## License

This project is open source and available for personal use.

---

**Happy hiring!** 🚀
