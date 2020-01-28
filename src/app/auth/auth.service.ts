import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private readonly api = 'http://localhost:8000';
  private readonly JWT_TOKEN = 'token';

  tryLogin(email: string, password: string) {
    return this.http
      .post<any>(`${this.api}/api/login`, {email, password})
      .pipe(tap(token => this.doLogin(token.token.toString())));
  }


  private doLogin(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
    this.getIngelogdeGebruiker().subscribe(
      result => {
        if (result.rol_id === 1) {
          this.router.navigate(['adminHome']);
        } else if (result.rol_id === 3) {
          this.router.navigate(['keuzemenu']);
        }
      }
    );
  }


  checkIfLoggedIn() {
    if (localStorage.getItem(this.JWT_TOKEN) != null) {
      return true;
    } else {
      return false;
    }
  }


  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }


  getAccountInformation(): any {
    return this.http.get<any>(`${this.api}/user/me`);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getIngelogdeGebruiker(): any {
    return this.http.get('http://localhost:8000/api/gebruiker/ingelogdegebruiker');
  }
}
