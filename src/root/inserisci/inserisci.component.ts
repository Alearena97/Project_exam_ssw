import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../documento';
import { Libreria } from '../libreria';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  providers: [BibliotecaService],
  imports: [CommonModule],
  standalone: true,
})
export class InserisciComponent {
  errore : string = '';
  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  newDocument() {
    
    var posizione: HTMLInputElement = document.getElementById("Posizione") as HTMLInputElement;
    var titolo: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    var autore: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;

    if (posizione.value.trim() === '' || titolo.value.trim() === '' || autore.value.trim() === '') {
      this.errore = 'Riempi tutti i campi prima di inserire un documento!';
      return;
    }

    var newDocument : Documento = new Documento(posizione.value, autore.value, titolo.value,);
    this.bs.setDocument(newDocument).subscribe({
      next: (x: AjaxResponse<any>) =>{ },
      error: (err) =>{
       }
    });
    posizione.value='';
    titolo.value='';
    autore.value='';
    this.errore='';
  }
}
