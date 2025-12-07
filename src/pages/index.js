// This file automatically exports all page components
// Pages are registered here and will appear in the routing
// Add SEO metadata to each page object for better search engine optimization

import MechanicalGearCounErAppPage from './MechanicalGearCounErAppPage';

const pages = [
  {
    name: 'mechanical-gear-calculator',
    component: MechanicalGearCounErAppPage,
    title: 'Mechanical Gear Calculator',
    description: 'Interactive mechanical gear calculator with visual animations. Experience addition and subtraction operations through animated gears. Learn carry and borrow operations step-by-step.',
    keywords: 'mechanical calculator, gear calculator, visual calculator, interactive math tool, addition calculator, subtraction calculator, educational math tool, animated calculator, step by step calculator, carry operation, borrow operation, arithmetic calculator',
    category: 'Calculators',
    tags: ['calculator', 'arithmetic', 'visual', 'educational', 'interactive'],
    featured: true,
    views: 0,
    rating: 0,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  // Add more pages here, or use the create:page script
];

export default pages;

