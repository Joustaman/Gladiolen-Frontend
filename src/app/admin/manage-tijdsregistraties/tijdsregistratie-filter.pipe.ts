import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tijdsregistratieFilter"
})
export class TijdsregistratieFilterPipe implements PipeTransform {
  transform(gebruikers: any[], filter: any): any {
    if (!gebruikers || !filter || filter === "") {
      return gebruikers;
    }
    filter = filter.toLowerCase();

    let filters = filter.split(" ");
    let alle: any[] = [];
    let first: boolean = true;
    filters = filters.filter(Boolean);
    console.log(filters);

    filters.forEach(f => {
      let gefilterden: any[] = [];

      gebruikers.forEach(gebruiker => {
        let naam = gebruiker.gebruiker.name.toLowerCase();
        let voornaam = gebruiker.gebruiker.voornaam.toLowerCase();
        let eventNaam = gebruiker.evenement.naam.toLowerCase();
        let verenigingNaam = gebruiker.vereniging.naam.toLowerCase();
        let cin = gebruiker.checkIn ? gebruiker.checkIn : "";
        let cuit = gebruiker.checkUit ? gebruiker.checkUit : "";
        let manin = gebruiker.manCheckIn ? gebruiker.manCheckIn : "";
        let manuit = gebruiker.manCheckUit ? gebruiker.manCheckUit : "";
        let adin = gebruiker.adminCheckIn ? gebruiker.adminCheckIn : "";
        let aduit = gebruiker.adminCheckUit ? gebruiker.adminCheckUit : "";

        //let roepnaam = gebruiker.roepnaam.toLowerCase()
        if (
          naam.includes(f) ||
          voornaam.includes(f) ||
          eventNaam.includes(f) ||
          verenigingNaam.includes(f) ||
          cin.includes(f) ||
          cuit.includes(f) ||
          manin.includes(f) ||
          manuit.includes(f) ||
          adin.includes(f) ||
          aduit.includes(f)
        ) {
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
            if (al.id === gef.id) {
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
