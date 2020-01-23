import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class VerenigingService {

  constructor(private readonly http: HttpClient) {}

  getTshirts(): any {
    return this.http.get('http://localhost:8000/tshirts');
  }
  registreerVerantwoordelijke(gebruiker): any {
    return this.http.post('http://localhost:8000/gebruiker/registreerverantwoordelijke', gebruiker);
  }
  registreerVereniging(vereniging): any {
    return this.http.post('http://localhost:8000/vereniging', vereniging);
  }
  getVerenigingMetLeden(): any {
    return this.http.get('http://localhost:8000/vereniging/verenigingmetleden');
  }
  addLid(lid): any {
    return this.http.post('http://localhost:8000/addlid', lid);
  }
  deleteLid(id): any {
    return this.http.delete('http://localhost:8000/deletelid/' + id);
  }
  getLid(id): any {
    return this.http.get('http://localhost:8000/getlid/' + id);
  }
  updateLid(id, lid): any {
    return this.http.put('http://localhost:8000/updatelid/' + id, lid);
  }

  getVerenigingVanIngelogdeGebruiker(): any {
    return this.http.get('http://localhost:8000/vereniging/verenigingingelogd');
  }
  updateVereniging(id, vereniging): any {
    return this.http.put('http://localhost:8000/vereniging/' + id, vereniging);
  }
}
