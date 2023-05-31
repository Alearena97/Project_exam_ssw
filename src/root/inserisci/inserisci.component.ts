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
  // stringa per l'errore se non compili tutti i campi
  errore : string = '';
  messaggio : string = '';

  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  newDocument() {
    //inizializzazione variabili 
    var posizione: HTMLInputElement = document.getElementById("Posizione") as HTMLInputElement;
    var titolo: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    var autore: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;
    var noleggiatore: string = 'Disponibile';
    // controllo che i campi non siano vuoti
    if (posizione.value.trim() === '' || titolo.value.trim() === '' || autore.value.trim() === '') {
      this.errore = 'Riempi tutti i campi prima di inserire un documento!';
      return;
    }

    // inizializzaione nuovo oggetto di classe documento che verrà inserito
    var newDocument : Documento = new Documento(posizione.value, autore.value, titolo.value,noleggiatore)
    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {
        
      //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON 
       var newArchive = JSON.parse(x.response)

      // creo la libreria con l'elenco dei libri
      var libreria : Libreria = new Libreria(newArchive);
      //inserisco il nuovo documento nell'archivio
      libreria.archivio.push(newDocument)
      this.bs.setDocument(libreria.archivio).subscribe({
        next: (x: AjaxResponse<any>) => {
            this.messaggio = 'Documento inserito correttamente!';
            setInterval (() => {
            this.messaggio = ''
            },5000)
            return;
            
        },
        error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))

      })
    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
    });


    //svuoto i campi
    posizione.value='';
    titolo.value='';
    autore.value='';
    this.errore='';
  }
}
