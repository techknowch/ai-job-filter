import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="job-list-container">
      <h2>Available Jobs</h2>
      
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading && jobs.length === 0" class="no-jobs">
        No jobs available at the moment.
      </div>

      <div class="job-grid">
        <mat-card *ngFor="let job of jobs" class="job-card">
          <mat-card-header>
            <mat-card-title>{{job.title}}</mat-card-title>
            <mat-card-subtitle>{{job.company}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{job.description}}</p>
            <div class="skills-container">
              <span class="skill-tag" *ngFor="let skill of job.skills">{{skill}}</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="viewMatches(job._id)">View Matches</button>
            <button mat-button (click)="applyToJob(job._id)">Apply</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .job-list-container {
      padding: 20px;
    }
    .job-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .job-card {
      height: 100%;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .skill-tag {
      background: #e0e0e0;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .loading-spinner {
      display: flex;
      justify-content: center;
      margin: 50px 0;
    }
    .no-jobs {
      text-align: center;
      margin: 50px 0;
      color: #666;
    }
  `]
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  loading = true;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.loading = false;
      }
    });
  }

  viewMatches(jobId: string) {
    // Will implement later
  }

  applyToJob(jobId: string) {
    // Will implement later
  }
}
