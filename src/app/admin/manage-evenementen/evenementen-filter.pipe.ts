import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "evenementenFilter"
})
export class EvenementenFilterPipe implements PipeTransform {
  transform(gebruikers: any[], filter: any): any {
    if (!gebruikers || !filter || filter === "") {
      return gebruikers;
    }
    filter = filter.toLowerCase();

    let filters = filter.split(" ");
    let alle: any[] = [];
    let first: boolean = true;
    filters = filters.filter(Boolean);

    filters.forEach(f => {
      let gefilterden: any[] = [];

      gebruikers.forEach(gebruiker => {
        let naam = gebruiker.naam.toLowerCase();

        if (naam.includes(f)) {
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
