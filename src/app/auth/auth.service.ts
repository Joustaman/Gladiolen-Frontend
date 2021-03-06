import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toast: ToastrService,
  ) {}

  private readonly api = 'http://localhost:8000';
  private readonly JWT_TOKEN = 'token';
  private readonly ROL = 'rol';

  tryLogin(email: string, password: string) {
    return this.http
      .post<any>(`${this.api}/api/login`, {email, password})
      .pipe(tap(token => this.doLogin(token.token.toString())));
  }


  private doLogin(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
    this.getIngelogdeGebruiker().subscribe(
      result => {
        localStorage.setItem(this.ROL, result.rol_id);
        if (result.eersteAanmelding === 1) {
          this.toast.success('Vergeet uw wachtwoord niet te veranderen');
        }
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

  getRol() {
    return localStorage.getItem(this.ROL);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getIngelogdeGebruiker(): any {
    return this.http.get('http://localhost:8000/api/gebruiker/ingelogdegebruiker');
  }

  updateProfiel(user): any {
    return this.http.put('http://localhost:8000/api/gebruiker/updateingelogdegebruiker', user);
  }

  resetPassword(email): any {
    return this.http.post('http://localhost:8000/api/gebruiker/resetpassword', email);
  }

}
