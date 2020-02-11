import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gebruikerFilter"
})
export class GebruikerFilterPipe implements PipeTransform {
  transform(gebruikers: any[], filter: any): any {
    if (!gebruikers || !filter || filter === "") {
      return gebruikers;
    }
    let filters = filter.split(" ");
    let alle: any[] = [];
    let first: boolean = true;

    filters.forEach(f => {
      let gefilterden: any[] = [];

      gebruikers.forEach(gebruiker => {
        let naam = gebruiker.name.toLowerCase();
        let voornaam = gebruiker.voornaam.toLowerCase();
        //let roepnaam = gebruiker.roepnaam.toLowerCase()
        if (naam.includes(f) || voornaam.includes(f)) {
          if (gefilterden.indexOf(gebruiker) === -1) {
            gefilterden.push(gebruiker);
          }
        }
      });

      if (first) {
        alle = [...gefilterden];
        first = false;
      } else {
        let nieuwe: any[] = [];
        alle.forEach(al => {
          gefilterden.forEach(gef => {
            if (
              al.voornaam === gef.voornaam &&
              al.name == gef.name &&
              al.geboortedatum === gef.geboortedatum
            ) {
              nieuwe.push(al);
            }
          });
        });

        alle = [...nieuwe];
      }
    });
    return alle;
  }
}
