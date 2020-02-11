import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gebruikerFilter"
})
export class GebruikerFilterPipe implements PipeTransform {
  transform(gebruikers: any[], filter: any): any {
    if (!gebruikers || !filter) {
      return gebruikers;
    }
    let filters = filter.split(" ");
    let gefilterden: any[] = [];

    filters.forEach(f => {
      gebruikers.forEach(gebruiker => {
        let naam = gebruiker.name.toLowerCase();
        let voornaam = gebruiker.voornaam.toLowerCase();
        //let roepnaam = gebruiker.roepnaam.toLowerCase()
        if (f !== "" && (naam.includes(f) || voornaam.includes(f))) {
          if (gefilterden.indexOf(gebruiker) === -1) {
            gefilterden.push(gebruiker);
          }
        }
      });
      
    });
    return gefilterden;
  }
}
