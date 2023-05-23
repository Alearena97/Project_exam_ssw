import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../documento';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  providers: [BibliotecaService],
  imports: [CommonModule],
  standalone: true,
})
export class InserisciComponent {

  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  newDocument() {
   // this.errore = '';
    var posizione: HTMLInputElement = document.getElementById("Posizione") as HTMLInputElement;
    var titolo: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    var autore: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;
    var noleggiatore: HTMLInputElement = document.getElementById("Noleggiatore") as HTMLInputElement;
    var newDocument : Documento = new Documento(posizione.value, autore.value, titolo.value, noleggiatore.value);
    this.bs.setDocument(newDocument).subscribe({
      next: (x: AjaxResponse<any>) =>{ },
      error: (err) =>{ }
    //    this.errore = 'La città non esiste',
    });
    posizione.value='';
    titolo.value='';
    autore.value='';
    noleggiatore.value='';
  }
}
