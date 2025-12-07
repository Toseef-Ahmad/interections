// This file automatically exports all page components
// Pages are registered here and will appear in the routing
// Add SEO metadata to each page object for better search engine optimization

import ExamplePage from './ExamplePage';
import MechanicalGearCounErAppPage from './MechanicalGearCounErAppPage';

const pages = [
  {
    name: 'example',
    component: ExamplePage,
    title: 'Example Component',
    description: 'An example interactive React component demonstrating the structure and functionality. Use this as a template for creating new interactive math tools and calculators.',
    keywords: 'react component, example, interactive demo, math tool template, calculator template',
  },
  {
    name: 'mechanical-gear-coun-er-app',
    component: MechanicalGearCounErAppPage,
    title: 'Mechanical Gear Calculator - Interactive Addition & Subtraction',
    description: 'Free interactive mechanical gear calculator with visual animations. Experience addition and subtraction operations through animated gears. Learn carry and borrow operations step-by-step. Perfect for students learning arithmetic.',
    keywords: 'mechanical calculator, gear calculator, visual calculator, interactive math tool, addition calculator, subtraction calculator, educational math tool, animated calculator, step by step calculator, carry operation, borrow operation, arithmetic calculator',
  },
  // Add more pages here, or use the create:page script
];

export default pages;

