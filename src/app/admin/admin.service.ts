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
    return this.http.get(this.$link+'tshirts');
  }

  registreerGebruiker(gebruiker): any {
    return this.http.post(this.$link+'registreergebruiker', gebruiker);
  }

  getRollen(): any {
    return this.http.get(this.$link+'rols');
  }

  getGebruikers(): any {
    return this.http.get(this.$link+'gebruikers');
  }

  getGebruiker(id): any {
    return this.http.get(this.$link+'getGebruiker/' + id);
  }

  updateGebruiker(id, gebruiker): any {
    return this.http.put(this.$link+'gebruiker/' + id, gebruiker);
  }

  getVerenigingen(): any {
    return this.http.get(this.$link+'verenigings');
  }

  getVereniging(id): any {

    return this.http.get(this.$link+'vereniging/getVereniging/' + id);
  }

  getVerenigingenByEvenementId(evenementId): any {
    return this.http.get(this.$link+'evenementVereniging/getVerenigingenByEvenementId/' + evenementId);
  }

  registreerEvenementVereniging(evenementVereniging) {
    return this.http.post(this.$link+'evenementVereniging/postEvenementVereniging', evenementVereniging);
  }

  getVerenigingenMetLeden(): any{
    return this.http.get(this.$link+'vereniging/verenigingmetleden');
  }
  registreerVereniging(vereniging): any {
    return this.http.post(this.$link+'vereniging', vereniging);
  }

  updateVereniging(id, vereniging): any {
    return this.http.put(this.$link+'vereniging/' + id, vereniging);
  }

  getEvenementen(): any {
    return this.http.get(this.$link+'evenement');
  }

  registreerEvenement(evenement): any {
    return this.http.post(this.$link+'evenement', evenement);
  }

  updateEvenement(id, evenement): any {
    return this.http.put(this.$link+'evenement/' + id, evenement);
  }
}
