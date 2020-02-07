import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) {
  }

  $link = 'http://localhost:8000/';

  registreerVerantwoordelijke(gebruiker): any {
    return this.http.post(this.$link + 'api/gebruiker/registreerverantwoordelijke', gebruiker);
  }

  getGebruikers(): any {
    return this.http.get(this.$link + 'api/gebruiker');
  }

  getGebruiker(id): any {
    return this.http.get(this.$link + 'api/gebruiker/getGebruiker/' + id);
  }

  registreerGebruiker(gebruiker): any {
    return this.http.post(this.$link + 'api/gebruiker/registreergebruiker', gebruiker);
  }

  updateGebruiker(id, gebruiker): any {
    return this.http.put(this.$link + 'api/gebruiker/updatelid/' + id, gebruiker);
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

  getVerenigingByIdMetLeden(id): any {
    return this.http.get(this.$link + 'api/vereniging/verenigingbyidmetleden/' + id);
  }

  registreerEvenementVereniging(evenementVereniging) {
    return this.http.post(this.$link + 'api/evenementVereniging/postEvenementVereniging', evenementVereniging);
  }

  deleteVerenigingFromEvenement(ids) {
    return this.http.post(this.$link + 'api/evenementvereniging/deleteverenigingfromevenement', ids);
  }

  getRollen(): any {
    return this.http.get(this.$link + 'api/rol');
  }

  getKernleden(): any {
    return this.http.get(this.$link + 'api/gebruiker/getKernleden');
  }

  getTshirts(): any {
    return this.http.get(this.$link + 'api/tshirt');
  }

  createTshirt(tshirt): any {
    return this.http.post(this.$link + 'api/tshirt', tshirt);
  }

  updateTshirt(id, tshirt) {
    return this.http.put(this.$link + 'api/tshirt/' + id, tshirt);
  }

  getTijdsregistraties(): any {
    return this.http.get(this.$link + 'api/tijdsregistratie');
  }

  createTijdsregistraties(tijdsregistratie): any {
    return this.http.post(this.$link + 'api/tijdsregistratie', tijdsregistratie);
  }

  updateTijdsregistratie(id, tijdsregistratie): any {
    return this.http.put(this.$link + 'api/tijdsregistratie/' + id, tijdsregistratie);
  }

  getVerenigingenInAanvraag(): Observable<any[]> {
    return this.http.get<any[]>(this.$link + 'api/vereniging/inAanvraag');
  }

  acceptVereningInAanvraag(id: number): any {
    return this.http.get(this.$link + 'api/vereniging/accept/' + id);
  }

  denyVereningInAanvraag(id: number): any {
    return this.http.delete(this.$link + 'api/vereniging/deny/' + id);
  }

  getTaken(): any {
    return this.http.get(this.$link + 'api/taak');
  }

  createTaak(taak): any {
    return this.http.post(this.$link + 'api/taak', taak);
  }

  updateTaak(id, taak): any {
    return this.http.put(this.$link + 'api/taak/' + id, taak);
  }
}
