import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { authResponse, payloadAuth } from '../models/auth.model';
import { AppEndpoints } from './app.endpoints';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
   apiUri: string = environment.env_url;
  isRefreshing = false;
  private currentTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public currentToken$ = this.currentTokenSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }


  login(payload: payloadAuth) {
    const url = this.apiUri + AppEndpoints.auth;
    return this.http.post<authResponse>(url, payload).pipe(
      tap((res) => {
        if (res?.access) {
          localStorage.setItem('token', res.access);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 5000);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let msg = 'Unknown error';

        if (typeof error.error === 'string') {
          msg = error.error;
        } else if (error.error?.error) {
          msg = error.error.error; // 👈 AQUÍ está tu mensaje
        } else if (error.message) {
          msg = error.message;
        }

        return throwError(() => new Error(msg));
      }),
    );

  }
  logout() {

  }



}
