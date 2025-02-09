import { Routes } from '@angular/router';
import { JobPostComponent } from './components/job-post/job-post.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { MatchesComponent } from './components/matches/matches.component';

export const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobListComponent },
    { path: 'post-job', component: JobPostComponent },
    { path: 'upload-resume', component: ResumeUploadComponent },
    { path: 'matches', component: MatchesComponent },
];
