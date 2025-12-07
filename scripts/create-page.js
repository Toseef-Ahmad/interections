const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];

if (!pageName) {
  console.log('Usage: npm run create:page <page-name>');
  console.log('\nExample:');
  console.log('  npm run create:page xyz');
  console.log('  npm run create:page my-component');
  process.exit(1);
}

// Validate page name (kebab-case)
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pageName)) {
  console.error('Error: Page name must be in kebab-case (e.g., my-component)');
  process.exit(1);
}

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const examplePagePath = path.join(pagesDir, 'ExamplePage.js');
const newPagePath = path.join(pagesDir, `${pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Page.js`);
const pagesIndexPath = path.join(pagesDir, 'index.js');

// Check if page already exists
if (fs.existsSync(newPagePath)) {
  console.error(`Error: Page "${pageName}" already exists!`);
  process.exit(1);
}

// Check if example page exists
if (!fs.existsSync(examplePagePath)) {
  console.error('Error: Example page not found. Cannot create new page from template.');
  process.exit(1);
}

console.log(`Creating new page component: ${pageName}...\n`);

try {
  // Read example page
  let pageContent = fs.readFileSync(examplePagePath, 'utf8');
  
  // Convert kebab-case to PascalCase for component name
  const componentName = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Page';
  
  const displayName = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Replace content
  pageContent = pageContent.replace(/ExamplePage/g, componentName);
  pageContent = pageContent.replace(/Example Component/g, displayName);
  pageContent = pageContent.replace(/example/g, pageName);
  
  // Add PageWrapper import if not present
  if (!pageContent.includes("import PageWrapper")) {
    pageContent = pageContent.replace(
      /import React from 'react';/,
      `import React from 'react';\nimport PageWrapper from '../components/PageWrapper';`
    );
  }
  
  // Wrap content with PageWrapper if not already wrapped
  if (!pageContent.includes('<PageWrapper')) {
    // Find the return statement and wrap content
    pageContent = pageContent.replace(
      /return \(\s*<div className="component-page">/,
      `return (\n    <PageWrapper\n      title="${displayName}"\n      description="Interactive ${displayName.toLowerCase()} component built with React."\n      keywords="react, component, interactive, ${pageName}"\n      url="/${pageName}"\n    >\n      <div className="component-page">`
    );
    
    // Close PageWrapper before the closing of the component
    pageContent = pageContent.replace(
      /(\s*)<\/div>\s*\);\s*}\s*export default/,
      `$1</div>\n    </PageWrapper>\n  );\n}\n\nexport default`
    );
  }

  // Write new page file
  fs.writeFileSync(newPagePath, pageContent);
  console.log(`✓ Created ${newPagePath}`);

  // Update pages/index.js
  let pagesIndex = fs.readFileSync(pagesIndexPath, 'utf8');
  
  // Add import
  const importLine = `import ${componentName} from './${componentName}';`;
  if (!pagesIndex.includes(importLine)) {
    // Find the last import and add after it
    const lastImportIndex = pagesIndex.lastIndexOf('import');
    const nextLineIndex = pagesIndex.indexOf('\n', lastImportIndex);
    pagesIndex = pagesIndex.slice(0, nextLineIndex + 1) + importLine + '\n' + pagesIndex.slice(nextLineIndex + 1);
  }

  // Add to pages array
  const pagesArrayMatch = pagesIndex.match(/const pages = \[([\s\S]*?)\];/);
  if (pagesArrayMatch) {
    const pagesArrayContent = pagesArrayMatch[1];
    const hasContent = pagesArrayContent.trim().length > 0;
    
    // Remove trailing comma from existing content if present
    let cleanContent = pagesArrayContent.trim();
    if (cleanContent.endsWith(',')) {
      cleanContent = cleanContent.slice(0, -1).trim();
    }
    
    const newPageEntry = `  {\n    name: '${pageName}',\n    component: ${componentName},\n    title: '${displayName}',\n    description: 'Interactive ${displayName.toLowerCase()} component built with React.',\n    keywords: 'react, component, interactive, ${pageName}',\n    category: 'Calculators',\n    tags: ['calculator', 'interactive', '${pageName}'],\n    featured: false,\n    views: 0,\n    rating: 0,\n    createdAt: new Date().toISOString(),\n  }`;
    
    // Build the new array content
    const newArrayContent = hasContent 
      ? `${cleanContent},\n${newPageEntry}`
      : newPageEntry;
    
    // Replace the array content
    pagesIndex = pagesIndex.replace(
      /const pages = \[([\s\S]*?)\];/,
      `const pages = [\n${newArrayContent},\n];`
    );
  }

  fs.writeFileSync(pagesIndexPath, pagesIndex);
  console.log('✓ Updated src/pages/index.js');

  console.log(`\n✓ Page "${pageName}" created successfully!\n`);
  console.log(`📄 Component file: ${newPagePath}`);
  console.log(`🌐 URL: /${pageName}`);
  console.log(`\nStart developing:`);
  console.log('  npm start');
  console.log(`\nThen visit: http://localhost:3000/${pageName}`);

} catch (error) {
  console.error(`Error creating page: ${error.message}`);
  // Clean up on error
  if (fs.existsSync(newPagePath)) {
    fs.rmSync(newPagePath);
  }
  process.exit(1);
}

