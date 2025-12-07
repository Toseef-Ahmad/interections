const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const distDir = path.join(__dirname, '..', 'dist');
const nodeModulesDir = path.join(__dirname, '..', 'node_modules');

console.log('Cleaning build artifacts...\n');

// Clean build directory
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true });
  console.log('✓ Removed build/ directory');
}

// Clean dist directory (legacy)
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
  console.log('✓ Removed dist/ directory');
}

console.log('\n✓ Clean complete!');
