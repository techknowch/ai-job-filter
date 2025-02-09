import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  template: `
    <div class="upload-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Upload Your Resume</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="upload-area" 
               (dragover)="onDragOver($event)" 
               (drop)="onDrop($event)"
               [class.dragging]="isDragging">
            <input type="file" 
                   #fileInput 
                   (change)="onFileSelected($event)" 
                   accept=".pdf,.doc,.docx"
                   style="display: none">
            <div class="upload-content">
              <mat-icon>cloud_upload</mat-icon>
              <p>Drag and drop your resume here or</p>
              <button mat-raised-button color="primary" (click)="fileInput.click()">
                Browse Files
              </button>
            </div>
          </div>
          
          <mat-progress-bar *ngIf="uploadProgress > 0" 
                           mode="determinate" 
                           [value]="uploadProgress">
          </mat-progress-bar>
          
          <div *ngIf="uploadedFile" class="file-info">
            <p>{{uploadedFile.name}}</p>
            <button mat-button color="warn" (click)="removeFile()">Remove</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .upload-container {
      max-width: 600px;
      margin: 20px auto;
    }
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .upload-area.dragging {
      border-color: #2196F3;
      background: #E3F2FD;
    }
    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .file-info {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class ResumeUploadComponent {
  uploadProgress = 0;
  isDragging = false;
  uploadedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    if (this.isValidFileType(file)) {
      this.uploadedFile = file;
      this.uploadFile(file);
    } else {
      alert('Please upload a PDF, DOC, or DOCX file');
    }
  }

  isValidFileType(file: File): boolean {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('resume', file);

    this.http.post('http://localhost:3000/api/resume/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      }
    });
  }

  removeFile() {
    this.uploadedFile = null;
    this.uploadProgress = 0;
  }
}
