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
    return this.http.post('http://localhost:8000/registreergebruiker', gebruiker);
  }

  getRollen(): any {
    return this.http.get('http://localhost:8000/rols');
  }

  getGebruikers(): any {
    return this.http.get('http://localhost:8000/gebruikers');
  }

  getGebruiker(id): any {
    return this.http.get('http://localhost:8000/gebruiker/getGebruiker/' + id);
  }

  updateGebruiker(id, gebruiker): any {
    return this.http.put('http://localhost:8000/gebruiker/' + id, gebruiker);
  }

  getVerenigingen(): any {
    return this.http.get('http://localhost:8000/verenigings');
  }

  getVereniging(id): any {
    return this.http.get('http://localhost:8000/vereniging/getVereniging/' + id);
  }

  getVerenigingenByEvenementId(evenementId): any {
    return this.http.get('http://localhost:8000/evenementVereniging/getVerenigingenByEvenementId/' + evenementId);
  }

  registreerEvenementVereniging(evenementVereniging) {
    return this.http.post('http://localhost:8000/evenementVereniging/postEvenementVereniging', evenementVereniging);
  }

  registreerVereniging(vereniging): any {
    return this.http.post('http://localhost:8000/vereniging', vereniging);
  }

  updateVereniging(id, vereniging): any {
    return this.http.put('http://localhost:8000/vereniging/' + id, vereniging);
  }

  getEvenementen(): any {
    return this.http.get('http://localhost:8000/evenement');
  }

  registreerEvenement(evenement): any {
    return this.http.post('http://localhost:8000/evenement', evenement);
  }

  updateEvenement(id, evenement): any {
    return this.http.put('http://localhost:8000/evenement/' + id, evenement);
  }
}
