import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-post',
  standalone: true,
  imports: [],
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.scss'
})
export class JobPostComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.jobService.postJob(this.jobForm.value).subscribe(
        response => {
          console.log('Job posted successfully', response);
          this.jobForm.reset();
        },
        error => console.error('Error posting job', error)
      );
    }
  }
}
