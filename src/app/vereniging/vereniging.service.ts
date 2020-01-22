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
    return this.http.post('http://localhost:8000/gebruiker', gebruiker);
  }
  registreerVereniging(vereniging): any {
    return this.http.post('http://localhost:8000/vereniging', vereniging);
  }
  getLeden(): any {
    return this.http.get('http://localhost:8000/eigenleden');
  }
  addLid(lid): any {
    return this.http.post('http://localhost:8000/addlid', lid);
  }
  deleteLid(id): any {
    return this.http.delete('http://localhost:8000/deletelid?id=' + id);
  }
  getLid(id): any {
    return this.http.get('http://localhost:8000/getlid?id=' + id);
  }
}
