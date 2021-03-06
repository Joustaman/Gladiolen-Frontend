import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {identifierModuleUrl} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class VerenigingService {

  constructor(private readonly http: HttpClient) {
  }

  getTshirts(): any {
    return this.http.get('http://localhost:8000/api/tshirt');
  }

  createTshirt(tshirt): any {
    return this.http.post('http://localhost:8000/api/tshirt', tshirt);
  }

  updateTshirt(id, tshirt) {
    return this.http.put('http://localhost:8000/api/tshirt/' + id, tshirt);
  }

  getLid(id): any {
    return this.http.get('http://localhost:8000/api/gebruiker/getlid/' + id);
  }

  addLid(lid): any {
    return this.http.post('http://localhost:8000/api/gebruiker/addlid', lid);
  }

  addLidAdmin(lid, verenigingId): any {
    return this.http.post('http://localhost:8000/api/gebruiker/addlidadmin/'+verenigingId, lid);
  }

  deleteLid(id): any {
    return this.http.delete('http://localhost:8000/api/gebruiker/deletelid/' + id);
  }

  deleteLidAdmin(id, verenigingId): any {
    return this.http.delete('http://localhost:8000/api/gebruiker/deletelidadmin/'+verenigingId+'/'+id);
  }

  updateLid(id, lid): any {
    return this.http.put('http://localhost:8000/api/gebruiker/updatelid/' + id, lid);
  }

  registreerVerantwoordelijke(gebruiker): any {
    return this.http.post('http://localhost:8000/api/gebruiker/registreerverantwoordelijke', gebruiker);
  }

  registreerVereniging(vereniging): any {
    return this.http.post('http://localhost:8000/api/vereniging', vereniging);
  }

  getVerenigingMetLeden(): any {
    return this.http.get('http://localhost:8000/api/vereniging/verenigingmetleden');
  }

  getVerenigingMetLedenById(id): any {
    return this.http.get('http://localhost:8000/api/vereniging/verenigingbyidmetledentshirt/' + id);
  }

  getVerenigingVanIngelogdeGebruiker(): any {
    return this.http.get('http://localhost:8000/api/vereniging/verenigingingelogd');
  }

  updateVereniging(id, vereniging): any {
    return this.http.put('http://localhost:8000/api/vereniging/' + id, vereniging);
  }

  getRolVanIngelogdeGebruiker(): any {
    return this.http.get('http://localhost:8000/api/rol/getRol');
  }
  getRolIdWhereNaam(naam): any {
    return this.http.get('http://localhost:8000/api/rol/getRolIdWhereNaam', naam);
  }
}
