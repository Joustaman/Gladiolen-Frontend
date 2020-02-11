import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "verenigingFilter"
})
export class VerenigingFilterPipe implements PipeTransform {
  transform(gebruikers: any[], filter: any): any {
    if (!gebruikers || !filter || filter === "") {
      return gebruikers;
    }
    filter = filter.toLowerCase();
    let filters = filter.split(" ");
    let alle: any[] = [];
    let first: boolean = true;

    filters.forEach(f => {
      let gefilterden: any[] = [];

      gebruikers.forEach(gebruiker => {
        let naam = gebruiker.naam.toLowerCase();
        let voornaam = gebruiker.hoofd.voornaam.toLowerCase();
        let achternaam = gebruiker.hoofd.name.toLowerCase();
        //let roepnaam = gebruiker.roepnaam.toLowerCase()
        if (naam.includes(f) || voornaam.includes(f)||achternaam.includes(f)) {
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
              al.naam === gef.naam &&
              al.hoofd.name == gef.hoofd.name &&
              al.hoofd.achternaam === gef.hoofd.achternaam
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
