// This file automatically exports all page components
// Pages are registered here and will appear in the routing

import ExamplePage from './ExamplePage';
import MechanicalGearCounErAppPage from './MechanicalGearCounErAppPage';

const pages = [
{
    name: 'example',
    component: ExamplePage,
  },
  // Add more pages here, or use the create:page script,
  {
    name: 'mechanical-gear-coun-er-app',
    component: MechanicalGearCounErAppPage,
  },
];

export default pages;

