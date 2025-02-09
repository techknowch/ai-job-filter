import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) { }

  postJob(jobData: any): Observable<any> {
    return this.http.post(`${API_URL}/jobs`, jobData);
  }

  getJobs(): Observable<any> {
    return this.http.get(`${API_URL}/jobs`);
  }

  getJobById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/jobs/${id}`);
  }
}
