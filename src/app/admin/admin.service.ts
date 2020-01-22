import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) {
  }

  getTshirts(): any {
    return this.http.get('http://localhost:8000/tshirts');
  }

  registreerGebruiker(gebruiker): any {
    return this.http.post('http://localhost:8000/gebruiker', gebruiker);
  }

  getEvenementen(): any {
    return this.http.get('http://localhost:8000/evenement');
  }

  registreerEvenement(evenement): any {
    return this.http.post('http://localhost:8000/evenement', evenement);
  }
}
