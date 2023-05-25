import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../documento';
import { Libreria } from '../libreria';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  providers: [BibliotecaService],
  imports: [ CommonModule ],
  standalone: true
})
export class RicercaComponent {
  // stringa per l'errore se non compili tutti i campi
  errore : string = '';


  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  Research() {
    //inizializzazione variabili tramite input 
    
    // controllo che i campi non siano vuoti
    //if (tit_aut.value.trim() === '') {
    //  this.errore = 'Riempi tutti i campi prima di inserire un documento!';
    //  return;}
    var newArchive : Array<Documento>
    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {
      var tit_aut: HTMLInputElement = document.getElementById("Titolo_Autore") as HTMLInputElement;
      console.log(tit_aut.value);
      //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON 
      var newArchive = JSON.parse(x.response)

      // creo la libreria con l'elenco dei libri
      var libreria : Libreria = newArchive.filter((doc:Documento)  => (doc.titolo+doc.autore).toLowerCase().includes(tit_aut.value));
      console.log(libreria);
    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
    });


    //svuoto i campi
    //tit_aut.value='';
    this.errore='';
  }
}
