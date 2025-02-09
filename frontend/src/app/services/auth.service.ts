import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/api/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(
            JSON.parse(localStorage.getItem('currentUser') || 'null')
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post(`${API_URL}/login`, { email, password })
            .pipe(map(response => {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
                return response;
            }));
    }

    register(userData: any) {
        return this.http.post(`${API_URL}/register`, userData)
            .pipe(map(response => {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
                return response;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }
} 