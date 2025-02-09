import { Routes } from '@angular/router';
import { JobPostComponent } from './components/job-post/job-post.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', component: JobListComponent },
    {
        path: 'post-job',
        component: JobPostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'upload-resume',
        component: ResumeUploadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'matches',
        component: MatchesComponent,
        canActivate: [AuthGuard]
    }
];
