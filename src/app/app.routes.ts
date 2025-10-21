import { Routes } from '@angular/router';

import { FullscreenMap } from './pages/fullscreen-map/fullscreen-map';
import { Houses } from './pages/houses/houses';
import { Markers } from './pages/markers/markers';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMap,
    title: 'Fullscreen Map',
  },
  {
    path: 'markers',
    component: Markers,
    title: 'Markers',
  },
  {
    path: 'houses',
    component: Houses,
    title: 'Houses for sale',
  },
  {
    path: '**',
    redirectTo: 'fullscreen',
  },
];
