import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) {
  }

  $link = 'http://localhost:8000/';

  getTshirts(): any {
    return this.http.get(this.$link + 'tshirt');
  }


  registreerVerantwoordelijke(gebruiker): any {
    return this.http.post(this.$link+'gebruiker/registreerverantwoordelijke', gebruiker);
  }

  updateTshirt(id, tshirt) {
    return this.http.put('http://localhost:8000/tshirt/' + id, tshirt);
  }

  getGebruikers(): any {
    return this.http.get(this.$link + 'api/gebruikers');
  }

  getGebruiker(id): any {
    return this.http.get(this.$link + 'api/gebruiker/getGebruiker/' + id);
  }

  registreerGebruiker(gebruiker): any {
    return this.http.post(this.$link + 'api/gebruiker/registreergebruiker', gebruiker);
  }

  updateGebruiker(id, gebruiker): any {
    return this.http.put(this.$link + 'api/gebruiker/' + id, gebruiker);
  }

  getEvenementen(): any {
    return this.http.get(this.$link + 'api/evenement');
  }

  registreerEvenement(evenement): any {
    return this.http.post(this.$link + 'api/evenement', evenement);
  }

  updateEvenement(id, evenement): any {
    return this.http.put(this.$link + 'api/evenement/' + id, evenement);
  }


  getVerenigingen(): any {
    return this.http.get(this.$link + 'api/vereniging');
  }

  getVereniging(id): any {
    return this.http.get(this.$link + 'api/vereniging/getVereniging/' + id);
  }

  getVerenigingenMetLeden(): any {
    return this.http.get(this.$link + 'api/vereniging/verenigingmetleden');
  }

  registreerVereniging(vereniging): any {
    return this.http.post(this.$link + 'api/vereniging', vereniging);
  }

  updateVereniging(id, vereniging): any {
    return this.http.put(this.$link + 'api/vereniging/' + id, vereniging);
  }

  getVerenigingenByEvenementId(evenementId): any {
    return this.http.get(this.$link + 'api/evenementVereniging/getVerenigingenByEvenementId/' + evenementId);
  }

  registreerEvenementVereniging(evenementVereniging) {
    return this.http.post(this.$link + 'api/evenementVereniging/postEvenementVereniging', evenementVereniging);
  }

  getRollen(): any {
    return this.http.get(this.$link + 'api/rol');
  }
  getKernleden(): any {
    return this.http.get(this.$link + 'api/gebruiker/getKernleden');
  }
  createTshirt(tshirt): any {
    return this.http.post(this.$link+'api/tshirt', tshirt);
  }

}
