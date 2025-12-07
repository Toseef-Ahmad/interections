# Page Creation Guide

Complete guide for adding new interactive pages/apps to the Interections project.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Method 1: Using the Script (Recommended)](#method-1-using-the-script-recommended)
3. [Method 2: Manual Creation](#method-2-manual-creation)
4. [SEO Best Practices](#seo-best-practices)
5. [Page Structure Requirements](#page-structure-requirements)
6. [Naming Conventions](#naming-conventions)
7. [Metadata Fields](#metadata-fields)
8. [Content Guidelines](#content-guidelines)
9. [Examples](#examples)
10. [Testing & Deployment](#testing--deployment)

---

## Quick Start

**Fastest way to create a new page:**
```bash
npm run create:page my-new-tool
```

This will:
- ✅ Create the component file
- ✅ Register it in the routing system
- ✅ Set up basic SEO metadata
- ✅ Generate the correct URL structure

Then edit the generated files to customize your page.

---

## Method 1: Using the Script (Recommended)

### Step 1: Run the Creation Script

```bash
npm run create:page <page-name>
```

**Examples:**
```bash
npm run create:page matrix-calculator
npm run create:page color-picker
npm run create:page unit-converter
```

**Rules:**
- ✅ Use **kebab-case** (lowercase with hyphens)
- ✅ Only letters and numbers
- ✅ No spaces or special characters
- ❌ Bad: `My Tool`, `my_tool`, `myTool`
- ✅ Good: `my-tool`, `matrix-calculator`, `unit-converter`

### Step 2: Customize Your Page

The script creates:
1. **Component file**: `src/pages/MyNewToolPage.js`
2. **Registration**: Added to `src/pages/index.js`

**Edit the component file** (`src/pages/MyNewToolPage.js`):

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const MyNewToolPage = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#1e1e1e', 
      color: '#cccccc',
      padding: '2rem',
      paddingTop: '80px'
    }}>
      <PageWrapper
        title="My New Tool"
        description="Interactive tool description for SEO"
        keywords="keyword1, keyword2, keyword3"
        url="/my-new-tool"
      />
      
      <nav className="nav-bar" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
        padding: '12px 24px'
      }}>
        <Link to="/" style={{ color: '#cccccc', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>My New Tool</h1>
        {/* Your interactive component here */}
      </div>
    </div>
  );
};

export default MyNewToolPage;
```

### Step 3: Update Metadata in `src/pages/index.js`

Edit the page entry to include proper SEO metadata:

```javascript
{
  name: 'my-new-tool',
  component: MyNewToolPage,
  title: 'My New Tool',
  description: 'Detailed description (150-160 characters) that explains what the tool does and why users should use it. Include main keywords naturally.',
  keywords: 'primary keyword, secondary keyword, tool type, use case, related terms',
  category: 'Calculators', // Choose from: Calculators, Converters, Generators, Visualizers, Utilities
  tags: ['tag1', 'tag2', 'tag3'], // 3-5 relevant tags
  featured: false, // Set to true for featured tools
  views: 0, // Will be tracked automatically
  rating: 0, // Will be tracked automatically
  createdAt: new Date().toISOString(),
}
```

---

## Method 2: Manual Creation

If you prefer to create pages manually:

### Step 1: Create Component File

Create `src/pages/YourToolNamePage.js`:

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const YourToolNamePage = () => {
  // Your component logic here
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#1e1e1e', 
      color: '#cccccc',
      padding: '2rem',
      paddingTop: '80px'
    }}>
      <PageWrapper
        title="Your Tool Name"
        description="SEO-friendly description"
        keywords="relevant, keywords, here"
        url="/your-tool-name"
      />
      
      {/* Navigation */}
      <nav className="nav-bar" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
        padding: '12px 24px'
      }}>
        <Link to="/" style={{ color: '#cccccc', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>

      {/* Your content */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Your Tool Name</h1>
        {/* Your interactive component */}
      </div>
    </div>
  );
};

export default YourToolNamePage;
```

### Step 2: Register in `src/pages/index.js`

1. **Add import:**
```javascript
import YourToolNamePage from './YourToolNamePage';
```

2. **Add to pages array:**
```javascript
const pages = [
  // ... existing pages
  {
    name: 'your-tool-name',
    component: YourToolNamePage,
    title: 'Your Tool Name',
    description: 'SEO description here',
    keywords: 'keywords here',
    category: 'Calculators',
    tags: ['tag1', 'tag2'],
    featured: false,
    views: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
  },
];
```

---

## SEO Best Practices

### 1. Title Tag
- **Length**: 50-60 characters
- **Format**: `Tool Name | Interections`
- **Include**: Primary keyword at the beginning
- **Example**: `Matrix Calculator | Interections`

### 2. Meta Description
- **Length**: 150-160 characters
- **Include**: 
  - Primary keyword
  - What the tool does
  - Why users should use it
  - Call to action
- **Example**: 
  ```
  Free online matrix calculator for addition, subtraction, multiplication, and determinant calculation. 
  Perfect for students and professionals. No registration required.
  ```

### 3. Keywords
- **Format**: Comma-separated, lowercase
- **Include**: 
  - Primary keyword (2-3 times)
  - Secondary keywords (1-2 times each)
  - Related terms
  - Long-tail keywords
- **Example**: 
  ```
  matrix calculator, matrix multiplication, matrix addition, determinant calculator, 
  linear algebra tool, matrix operations, matrix solver
  ```

### 4. URL Structure
- **Format**: `/tool-name` (kebab-case)
- **Keep it short**: 2-4 words maximum
- **Include keyword**: Primary keyword should be in URL
- **Examples**:
  - ✅ `/matrix-calculator`
  - ✅ `/color-picker`
  - ❌ `/my-awesome-matrix-calculator-tool`

### 5. Categories
Choose from these predefined categories:
- **Calculators**: Math, financial, scientific calculators
- **Converters**: Unit converters, format converters
- **Generators**: Random generators, code generators
- **Visualizers**: Data visualization, charts, graphs
- **Utilities**: Text tools, image tools, developer tools

### 6. Tags
- **Count**: 3-5 tags per page
- **Format**: Lowercase, single words or short phrases
- **Purpose**: Help with filtering and search
- **Examples**: `['calculator', 'math', 'matrix', 'linear-algebra']`

---

## Page Structure Requirements

### Required Elements

1. **PageWrapper Component**
   ```jsx
   <PageWrapper
     title="Page Title"
     description="SEO description"
     keywords="keywords"
     url="/page-url"
   />
   ```

2. **Navigation Bar**
   ```jsx
   <nav className="nav-bar" style={{ 
     position: 'fixed', 
     top: 0, 
     left: 0, 
     right: 0, 
     zIndex: 1000,
     backgroundColor: '#252526',
     borderBottom: '1px solid #3e3e42',
     padding: '12px 24px'
   }}>
     <Link to="/" style={{ color: '#cccccc', textDecoration: 'none' }}>
       ← Back to Home
     </Link>
   </nav>
   ```

3. **Main Container**
   ```jsx
   <div style={{ 
     minHeight: '100vh', 
     width: '100%',
     backgroundColor: '#1e1e1e', 
     color: '#cccccc',
     padding: '2rem',
     paddingTop: '80px' // Account for fixed nav
   }}>
     {/* Your content */}
   </div>
   ```

### Full-Page Components

For components that need full viewport (like the Mechanical Gear Calculator):

1. **Set `isFullPage` flag** in `src/App.js`:
   ```javascript
   const isFullPage = page.name.includes('your-tool-name');
   ```

2. **Use full viewport styling**:
   ```jsx
   <div style={{ 
     minHeight: '100vh', 
     width: '100%',
     backgroundColor: '#1e1e1e',
     // ... other styles
   }}>
   ```

---

## Naming Conventions

### File Names
- **Format**: `PascalCasePage.js`
- **Example**: `MatrixCalculatorPage.js`
- **Location**: `src/pages/`

### Component Names
- **Format**: `PascalCase` matching file name
- **Example**: `const MatrixCalculatorPage = () => { ... }`

### URL Names (page.name)
- **Format**: `kebab-case`
- **Example**: `matrix-calculator`
- **Rules**:
  - Lowercase only
  - Hyphens for word separation
  - No spaces or underscores
  - Keep it short (2-4 words)

### Display Names (title)
- **Format**: `Title Case`
- **Example**: `Matrix Calculator`
- **Rules**:
  - Capitalize important words
  - Keep it concise
  - Include primary keyword

---

## Metadata Fields

### Required Fields

```javascript
{
  name: 'tool-name',              // URL slug (kebab-case)
  component: ToolNamePage,       // React component
  title: 'Tool Name',            // Display title
  description: '...',            // SEO description (150-160 chars)
  keywords: '...',               // SEO keywords (comma-separated)
  category: 'Calculators',       // Category name
  tags: ['tag1', 'tag2'],       // Array of tags
  featured: false,               // Boolean
  views: 0,                     // Number (tracked automatically)
  rating: 0,                    // Number (tracked automatically)
  createdAt: new Date().toISOString(), // ISO date string
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | URL slug in kebab-case |
| `component` | Component | ✅ | React component reference |
| `title` | string | ✅ | Display title (50-60 chars) |
| `description` | string | ✅ | SEO description (150-160 chars) |
| `keywords` | string | ✅ | Comma-separated keywords |
| `category` | string | ✅ | One of predefined categories |
| `tags` | array | ✅ | Array of 3-5 tags |
| `featured` | boolean | ✅ | Whether to show in featured section |
| `views` | number | ✅ | View count (start at 0) |
| `rating` | number | ✅ | Rating (start at 0) |
| `createdAt` | string | ✅ | ISO date string |

---

## Content Guidelines

### Description Template

Use this template for descriptions:

```
[What it is] [Primary function] for [target audience]. [Key features]. [Benefit]. [No registration/Call to action].
```

**Example:**
```
Free online matrix calculator for students and professionals. Calculate matrix addition, 
subtraction, multiplication, and determinants instantly. No registration required.
```

### Keyword Research Tips

1. **Primary Keyword**: Main tool name (e.g., "matrix calculator")
2. **Secondary Keywords**: Related functions (e.g., "matrix multiplication", "determinant")
3. **Long-tail Keywords**: Specific use cases (e.g., "matrix calculator for linear algebra")
4. **Related Terms**: Synonyms and variations

### Content Quality Checklist

- ✅ Description is 150-160 characters
- ✅ Includes primary keyword naturally
- ✅ Explains what the tool does
- ✅ Mentions target audience
- ✅ Includes call to action
- ✅ No keyword stuffing
- ✅ Readable and engaging

---

## Examples

### Example 1: Simple Calculator

**File**: `src/pages/MatrixCalculatorPage.js`

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const MatrixCalculatorPage = () => {
  const [matrix, setMatrix] = useState([[0, 0], [0, 0]]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#1e1e1e', 
      color: '#cccccc',
      padding: '2rem',
      paddingTop: '80px'
    }}>
      <PageWrapper
        title="Matrix Calculator"
        description="Free online matrix calculator for addition, subtraction, multiplication, and determinant calculation. Perfect for students and professionals."
        keywords="matrix calculator, matrix multiplication, matrix addition, determinant calculator, linear algebra tool"
        url="/matrix-calculator"
      />
      
      <nav className="nav-bar" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
        padding: '12px 24px'
      }}>
        <Link to="/" style={{ color: '#cccccc', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Matrix Calculator</h1>
        {/* Your matrix calculator component */}
      </div>
    </div>
  );
};

export default MatrixCalculatorPage;
```

**Registration** (`src/pages/index.js`):

```javascript
{
  name: 'matrix-calculator',
  component: MatrixCalculatorPage,
  title: 'Matrix Calculator',
  description: 'Free online matrix calculator for addition, subtraction, multiplication, and determinant calculation. Perfect for students and professionals.',
  keywords: 'matrix calculator, matrix multiplication, matrix addition, determinant calculator, linear algebra tool, matrix operations',
  category: 'Calculators',
  tags: ['calculator', 'math', 'matrix', 'linear-algebra'],
  featured: true,
  views: 0,
  rating: 0,
  createdAt: new Date().toISOString(),
}
```

### Example 2: Converter Tool

**File**: `src/pages/ColorPickerPage.js`

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const ColorPickerPage = () => {
  const [color, setColor] = useState('#000000');

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#1e1e1e', 
      color: '#cccccc',
      padding: '2rem',
      paddingTop: '80px'
    }}>
      <PageWrapper
        title="Color Picker"
        description="Free online color picker tool. Select colors visually, convert between HEX, RGB, HSL formats. Perfect for designers and developers."
        keywords="color picker, color selector, hex color, rgb color, hsl color, color converter, color tool"
        url="/color-picker"
      />
      
      {/* Navigation and content */}
    </div>
  );
};

export default ColorPickerPage;
```

---

## Testing & Deployment

### Local Testing

1. **Start development server:**
   ```bash
   npm start
   ```

2. **Visit your page:**
   ```
   http://localhost:3000/your-tool-name
   ```

3. **Check:**
   - ✅ Page renders correctly
   - ✅ Navigation works
   - ✅ SEO metadata is correct (view page source)
   - ✅ Mobile responsive
   - ✅ No console errors

### SEO Verification

1. **View Page Source** (Right-click → View Page Source):
   - Check `<title>` tag
   - Check `<meta name="description">`
   - Check `<meta name="keywords">`
   - Check Open Graph tags
   - Check canonical URL

2. **Use SEO Tools:**
   - Google Search Console
   - Schema.org validator
   - Open Graph debugger

### Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Verify deployment:**
   ```
   https://toseef-ahmad.github.io/interections/your-tool-name
   ```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use spaces in URLs (`my tool` → use `my-tool`)
- Forget to add PageWrapper
- Skip SEO metadata
- Use generic descriptions
- Stuff keywords unnaturally
- Forget the navigation bar
- Use light theme colors (stick to dark theme)

✅ **Do:**
- Use kebab-case for URLs
- Include comprehensive SEO metadata
- Write unique, descriptive content
- Test locally before deploying
- Follow the dark theme (#1e1e1e background)
- Keep descriptions 150-160 characters
- Use proper category and tags

---

## Quick Reference

### Command Cheat Sheet
```bash
# Create new page
npm run create:page tool-name

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### File Locations
- **Pages**: `src/pages/`
- **Page Registry**: `src/pages/index.js`
- **Components**: `src/components/`
- **Styles**: `src/App.css`, `src/index.css`

### URL Structure
- **Development**: `http://localhost:3000/tool-name`
- **Production**: `https://toseef-ahmad.github.io/interections/tool-name`

---

## Need Help?

- Check existing pages for examples
- Review `INTERACTIVE_TOOLS_GUIDE.md` for tool ideas
- Follow the SEO best practices above
- Test locally before deploying

---

**Last Updated**: 2024
**Version**: 1.0

