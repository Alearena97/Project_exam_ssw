import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../documento';
import { Libreria } from '../libreria';
import { EliminaComponent} from './elimina/elimina.component'
import { NoleggiaComponent} from './noleggia/noleggia.component'
import { RestituisciComponent} from './restituisci/restituisci.component'


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  providers: [BibliotecaService],
  imports: [ CommonModule ,
  EliminaComponent,
  NoleggiaComponent,
  RestituisciComponent],
  standalone: true
})
export class RicercaComponent {
  messaggio : string = '';
  // stringa per l'errore 
  errore : string = '';
  // dichiarazione dell'array che conterrà i risultati filtrati
  elenco_libri : Array<Documento> = [];
  //creo una variabile di tipo documento vuota da utilizzare poi negli altri component tramite @INPUT 
  libro_selezionato : Documento = new Documento ('','','','');

  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  //funzione per fare l'aggiornamento della view dopo una funzionalità con tipo "any" perchè contiene sia un array che una stringa
  onUpdate_view(e:any){
    this.elenco_libri = e.update;
    //inserisco un timer per la scomparsa del messaggio
    this.messaggio = e.message;
    setInterval (() => {
    this.messaggio = ''
    },2000)
  }

  Research() {
    //inizializzazione variabili tramite input 
    var tit_aut: HTMLInputElement = document.getElementById("Titolo_Autore") as HTMLInputElement;
    //var libreria : Libreria.archivio = []
    // controllo che se l'input è vuoto l'elenco libri venga svuotato per non mostrarli 
    if (tit_aut.value == "") {
      this.elenco_libri = [];
      return;}
    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {

     // console.log(tit_aut.value);
      //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON 
      var newArchive = JSON.parse(x.response)

      // creo la libreria filtrando l'array di documenti con l'input inserito nella stringa 
      var libreria: Libreria = new Libreria(newArchive)
      this.elenco_libri = libreria.archivio.filter((doc:Documento)  => (doc.titolo+doc.autore).toLowerCase().includes(tit_aut.value.toLocaleLowerCase()));
      //console.log(this.elenco_libri);
      // controllo che ci siano risultati
      if (this.elenco_libri.length == 0) {
      this.errore = 'Nessun risultato trovato.';
      return;}
    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
    });


    //svuoto i campi
    this.errore='';
  }
}
