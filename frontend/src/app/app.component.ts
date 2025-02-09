import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>AI Job Filter</span>
      <div class="spacer"></div>
      <a mat-button routerLink="/jobs">Jobs</a>
      <a mat-button routerLink="/post-job">Post Job</a>
      <a mat-button routerLink="/upload-resume">Upload Resume</a>
      <a mat-button routerLink="/matches">Matches</a>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'AI Job Filter';
}
