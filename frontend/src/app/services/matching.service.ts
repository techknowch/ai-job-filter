import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  constructor(private http: HttpClient) { }

  getMatchingCandidates(jobId: string): Observable<any> {
    return this.http.get(`${API_URL}/matching/job/${jobId}/candidates`);
  }

  getMatchingJobs(resumeId: string): Observable<any> {
    return this.http.get(`${API_URL}/matching/resume/${resumeId}/jobs`);
  }
}
