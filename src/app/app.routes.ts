import { Routes } from '@angular/router';

import { ContentComponent } from './layout/content/content.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { NotImplementedComponent } from './pages/not-implemented/not-implemented.component';

export const routes: Routes = [
  // { path: 'qualifications',  component: NotImplementedComponent },
  // { path: 'profile',  component: NotImplementedComponent },
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', redirectTo: '/jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobsComponent },
      { path: 'qualifications', component: NotImplementedComponent },
      { path: 'profile', component: NotImplementedComponent },
      { path: '**', component: NotImplementedComponent }
    ]
  },
  { path: '**',  component: NotImplementedComponent, pathMatch: 'full' }, // redirect to `first-component`
];

// export const AppRoutingModule = RouterModule.forRoot(routes, { standalone: true });