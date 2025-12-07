# Interections

A single React application hosting multiple interactive component pages, deployed on GitHub Pages.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interections
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
interections/
├── src/
│   ├── pages/              # Individual page components
│   │   ├── ExamplePage.js  # Example component
│   │   └── index.js        # Pages registry
│   ├── App.js              # Main app with routing
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── public/                 # Public assets
├── scripts/
│   ├── create-page.js      # Script to create new pages
│   └── clean.js            # Clean build artifacts
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
└── package.json
```

## ➕ Adding a New Page Component

### Quick Method

Simply run:

```bash
npm run create:page xyz
```

This will:
- Create `src/pages/XyzPage.js` component
- Register it in `src/pages/index.js`
- Make it accessible at `/xyz` route
- Appear automatically on the home page

### Manual Method

1. Create a new component file in `src/pages/`:
```javascript
// src/pages/XyzPage.js
import React from 'react';
import './PageTemplate.css';

function XyzPage() {
  return (
    <div className="component-page">
      <h1>XYZ Component</h1>
      <div className="component-content">
        {/* Your component code here */}
      </div>
    </div>
  );
}

export default XyzPage;
```

2. Register it in `src/pages/index.js`:
```javascript
import XyzPage from './XyzPage';

const pages = [
  // ... existing pages
  {
    name: 'xyz',
    component: XyzPage,
  },
];
```

## 🛠️ Development

### Running Locally

```bash
npm start
```

Visit `http://localhost:3000` to see the home page with all components listed.

Visit `http://localhost:3000/xyz` to see a specific component.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Cleaning Build Artifacts

```bash
npm run clean
```

## 📦 Deployment

### Automatic Deployment (GitHub Actions)

The repository is configured with GitHub Actions to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Update `homepage` in `package.json` to match your repo name:
   ```json
   {
     "homepage": "/your-repo-name"
   }
   ```
5. Push your changes to the `main` branch
6. The workflow will automatically build and deploy your app

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
npm run deploy
```

**Note:** Make sure you have `gh-pages` installed and configured with your GitHub credentials.

## 🔧 Configuration

### GitHub Pages Base Path

Update the `homepage` field in `package.json` to match your GitHub repository name:

```json
{
  "homepage": "/your-repo-name"
}
```

This ensures all routes work correctly on GitHub Pages.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run create:page <name>` | Create a new page component |
| `npm run clean` | Remove build artifacts |
| `npm run deploy` | Deploy to GitHub Pages (manual) |

## 🎯 How It Works

- **Single React App**: One React application with React Router
- **Multiple Pages**: Each page is a single React component in `src/pages/`
- **Automatic Routing**: Pages are automatically registered and routed
- **Home Page**: Lists all available components with links
- **Unique URLs**: Each component has its own URL like `/xyz`, `/abc`, etc.

## 📄 Example: Creating the "xyz" Component

```bash
npm run create:page xyz
```

This creates:
- `src/pages/XyzPage.js` - Your component file
- Registers it at route `/xyz`
- Makes it appear on the home page

Then edit `src/pages/XyzPage.js` to add your interactive component code!

## 🐛 Troubleshooting

### Routes Not Working on GitHub Pages

- Make sure `homepage` in `package.json` matches your repo name
- Ensure you're using `BrowserRouter` with `basename` (already configured)
- Check that GitHub Pages is set to use GitHub Actions as the source

### Component Not Appearing

- Make sure the component is registered in `src/pages/index.js`
- Check that the component name matches the route (kebab-case)
- Restart the dev server after adding new pages

## 📄 License

GPL-2.0

## 🤝 Contributing

Feel free to add new interactive components! Each component should be self-contained and independent.
