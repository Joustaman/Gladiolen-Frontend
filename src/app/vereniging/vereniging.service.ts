import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerenigingService {

  constructor(private readonly http: HttpClient) {}

  getTshirts(): any {
    return this.http.get('http://localhost:8000/tshirts');
  }
  registreerVerantwoordelijke(gebruiker): any {
    return this.http.post('http://localhost:8000/gebruiker',gebruiker);
  }
}
