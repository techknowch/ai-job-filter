import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatchingService } from '../../services/matching.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatProgressBarModule],
  template: `
    <div class="matches-container">
      <mat-tab-group>
        <mat-tab label="Matching Candidates">
          <div class="matches-grid" *ngIf="!loading; else loadingTpl">
            <mat-card *ngFor="let match of candidateMatches" class="match-card">
              <mat-card-header>
                <mat-card-title>Match Score: {{(match.score * 100).toFixed(1)}}%</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="match-details">
                  <h3>Matched Skills</h3>
                  <div class="skills-container">
                    <span class="skill-tag" *ngFor="let skill of match.matchedKeywords">
                      {{skill}}
                    </span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Profile</button>
                <button mat-button>Contact</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Matching Jobs">
          <div class="matches-grid" *ngIf="!loading; else loadingTpl">
            <mat-card *ngFor="let match of jobMatches" class="match-card">
              <mat-card-header>
                <mat-card-title>{{match.title}}</mat-card-title>
                <mat-card-subtitle>{{match.company}}</mat-card-subtitle>
                <mat-card-subtitle>Match Score: {{(match.score * 100).toFixed(1)}}%</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="match-details">
                  <h3>Matched Keywords</h3>
                  <div class="skills-container">
                    <span class="skill-tag" *ngFor="let keyword of match.matchedKeywords">
                      {{keyword}}
                    </span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">Apply Now</button>
                <button mat-button>Save Job</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>

    <ng-template #loadingTpl>
      <div class="loading-container">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <p>Finding best matches...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .matches-container {
      padding: 20px;
    }
    .matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .match-card {
      height: 100%;
    }
    .match-details {
      margin: 15px 0;
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
    .loading-container {
      padding: 40px;
      text-align: center;
    }
  `]
})
export class MatchesComponent implements OnInit {
  loading = true;
  candidateMatches: any[] = [];
  jobMatches: any[] = [];

  constructor(private matchingService: MatchingService) { }

  ngOnInit() {
    // For demo, we'll load both types of matches
    this.loadMatches();
  }

  loadMatches() {
    // Example job ID - in real app, this would come from route params or state
    const jobId = 'example-job-id';
    const resumeId = 'example-resume-id';

    Promise.all([
      this.matchingService.getMatchingCandidates(jobId).toPromise(),
      this.matchingService.getMatchingJobs(resumeId).toPromise()
    ]).then(([candidates, jobs]) => {
      this.candidateMatches = candidates || [];
      this.jobMatches = jobs || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading matches:', error);
      this.loading = false;
    });
  }
}
