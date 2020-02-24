import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../admin.service";
import { HotTableRegisterer } from "@handsontable/angular";
import * as Handsontable from "handsontable";
import "handsontable/languages/nl-NL";
import * as XLSX from "xlsx";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-manage-gebruikers",
  templateUrl: "./manage-gebruikers.component.html",
  styleUrls: ["./manage-gebruikers.component.scss"]
})
export class ManageGebruikersComponent implements OnInit {
  gebruikers: any = [];
  maat: any;
  geslacht: any;
  pageLoaded = false;
  str = "";
  private hotRegisterer = new HotTableRegisterer();
  id = "hotInstance";
  data: any = [];
  colHeaders = [
    "Naam",
    "Voornaam",
    "Geboortedatum",
    "Rol",
    "Email",
    "Telefoon",
    "Opmerking",
    "Rijksregisternummer",
    "Actief"
  ];
  excelModus = false;
  columns: any = [
    { data: "naam", readOnly: true },
    { data: "voornaam", readOnly: true },
    { data: "geboortedatum", readOnly: true },
    { data: "rol", readOnly: true },
    { data: "email", readOnly: true },
    { data: "telefoon", readOnly: true },
    { data: "opmerking", readOnly: true },
    { data: "rijksregisternummer", readOnly: true },
    { data: "actief", readOnly: true }
  ];

  constructor(
    private adminService: AdminService,
    private readonly datepipe: DatePipe,
    private toastr: ToastrService
  ) {}

  gebruikerForm = new FormGroup({
    name: new FormControl(""),
    voornaam: new FormControl(""),
    roepnaam: new FormControl(""),
    geboortedatum: new FormControl(""),
    email: new FormControl(""),
    telefoon: new FormControl(""),
    opmerking: new FormControl(""),
    rol: new FormControl(null),
    rijksregisternr: new FormControl(""),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null),
    tshirt: new FormControl(null)
  });

  ngOnInit() {
    this.adminService.getGebruikers().subscribe(result => {
      this.gebruikers = result;
      this.createDataForTable(result);
      this.pageLoaded = true;
    });
  }

  onClickDetailGebruiker(gebruiker) {
    this.maat = gebruiker.tshirts[0].maat;
    this.geslacht = gebruiker.tshirts[0].geslacht;

    this.gebruikerForm.patchValue({
      name: gebruiker.name,
      voornaam: gebruiker.voornaam,
      roepnaam: gebruiker.roepnaam,
      geboortedatum: this.datepipe.transform(
        gebruiker.geboortedatum,
        "yyyy-MM-dd"
      ),
      email: gebruiker.email,
      telefoon: gebruiker.telefoon,
      opmerking: gebruiker.opmerking,
      rijksregisternr: gebruiker.rijksregisternr,
      eersteAanmelding: gebruiker.eersteAanmelding,
      lunchpakket: gebruiker.lunchpakket,
      qrcode: gebruiker.qrcode,
      foto: gebruiker.foto,
      rol: gebruiker.rol.naam,
      tshirt: this.geslacht + " / " + this.maat
    });
  }

  createDataForTable(apiData: any) {
    apiData.forEach(gebruiker => {
      this.data.push({
        naam: gebruiker.name,
        voornaam: gebruiker.voornaam,
        geboortedatum: gebruiker.geboortedatum,
        rol: gebruiker.rol.naam,
        email: gebruiker.email,
        telefoon: gebruiker.telefoon,
        opmerking: gebruiker.opmerking,
        rijksregisternummer: gebruiker.rijksregisternr,
        actief: gebruiker.actief === 1 ? "Ja" : "Nee"
      });
    });
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }

  export() {
    const exportPlugin = this.hotRegisterer
      .getInstance(this.id)
      .getPlugin("exportFile");

    exportPlugin.downloadFile("csv", {
      columnDelimiter: ",",
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: "csv",
      filename: "Gebruikers_[YYYY]-[MM]-[DD]",
      mimeType: "text/csv"
    });
  }

  onFileChange(evt: any) {
    let exceldata;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      throw new Error("Cannot use multiple files");
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: "binary",
        cellDates: true
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      exceldata = XLSX.utils.sheet_to_json(ws, { header: 1 });

      this.createObjectOfExcelArrays(exceldata);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  createObjectOfExcelArrays(exceldata) {
    let objectArray = [];
    console.log(exceldata);
    let headers = [...exceldata[0]];
    console.log("headers: ", headers);
    exceldata.splice(0, 1);

    exceldata.forEach(array => {
      let object = {};
      array.forEach((value, index) => {
        console.log(value);
        console.log(index);
        Object.assign(object, {
          [headers[index]]: value,
          rol_id: 4,
          password: null,
          eersteAanmelding: true,
          lunchpakket: false,
          actief: true,
          foto: null
        });
        object["geboortedatum"] = new Date(object["geboortedatum"]);
        object["geboortedatum"] = object["geboortedatum"].toLocaleDateString(
          "fr-CA"
        );
        if (!("opmerking" in object)) {
          object["opmerking"] = "/";
        }
      });
      objectArray.push(object);
    });
    console.log(objectArray);
    this.adminService.importGebruikers({ gebruikers: objectArray }).subscribe(
      result => {
        this.toastr.success("Gebruikers zijn geïmporteerd");
        this.ngOnInit();
      },
      error => {
        console.log(error);
        this.toastr.error("Er is iets misgegaan. Verbeter het excelbestand");
      }
    );
  }
  deleteGebruiker(gebruiker) {
    console.log(gebruiker);

    this.adminService.deleteGebruiker(gebruiker.id).subscribe(res => {
      this.adminService.getGebruikers().subscribe(result => {
        this.gebruikers = result;
        this.createDataForTable(result);
      });
    });
  }
}
