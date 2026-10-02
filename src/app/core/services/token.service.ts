import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'token';


  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }


  getRoles(): string[] {
    const decoded = this.decodeToken();
    return decoded?.roles || [];
  }


  isLogged(): boolean {
    return !!this.getToken();
  }


  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
