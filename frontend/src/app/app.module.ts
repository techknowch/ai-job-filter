import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { MatchesComponent } from './components/matches/matches.component';

@NgModule({
    declarations: [
        AppComponent,
        JobPostComponent,
        JobListComponent,
        ResumeUploadComponent,
        MatchesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { } 