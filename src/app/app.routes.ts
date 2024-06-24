import { Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { QualificationsComponent } from './pages/qualifications/qualifications.component';
import { QualificationRedirectComponent } from './pages/qualifications/qualifications-redirect/qualifications-redirect.component'; // Import the redirect component
import { NotImplementedComponent } from './pages/not-implemented/not-implemented.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', redirectTo: '/jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/:track/:position/:seniority', component: JobsComponent },
      { path: 'qualifications', component: QualificationsComponent },
      { path: 'qualifications/:category/:title/:level', component: QualificationsComponent },
      { path: 'qualifications/:title/:level', component: QualificationRedirectComponent }, // New route for redirection
      { path: 'profile', component: NotImplementedComponent },
      { path: '**', component: NotImplementedComponent }
    ]
  },
  { path: '**', component: NotImplementedComponent, pathMatch: 'full' },
];
