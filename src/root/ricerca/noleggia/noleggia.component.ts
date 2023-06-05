import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../../documento';
import { Libreria } from '../../libreria';

@Component({
  selector: 'app-noleggia',
  templateUrl: './noleggia.component.html',
  styleUrls: ['./noleggia.component.css'],
  providers: [BibliotecaService],
  imports: [ CommonModule],
  standalone: true
})
export class NoleggiaComponent {
  // stringa per l'errore
  errore: string = '';
  errore2 : string = '';
  // inizializzazione di una variabile che cambia da true a false per mostrare il div del noleggio
  noleggioVisibile: boolean = false;

  // funzione per cambiare la variabile

  toggleNoleggio() {
    this.noleggioVisibile = !this.noleggioVisibile;
  }



  // prendo in input da ricerca la variabile libro selezionato
  @Input() libro_selezionato: Documento = new Documento('', '', '', '');
  // mando  un evento che comunica un array di documenti (libreria_update) e un messaggio
  @Output() onUpdate_borrow = new EventEmitter<{message:string,update:Documento[]}>();
  constructor(private bs: BibliotecaService) {}
  

  NoleggiaDocument() {

    var prestatario: HTMLInputElement = document.getElementById("Prestatario") as HTMLInputElement;

    //Inserisco un controllo che non permette di lasciare il campo vuoto con un timeout

    if (prestatario.value.trim() === '' ) {
      this.errore = 'Riempi il campo con il tuo nome prima di noleggiare il documento!';
      setInterval (() => {
        this.errore = ''
        },5000)
        return;
    }
   //Inserisco un controllo che non permette di eliminare un documento già noleggiato con un timeout
    if (this.libro_selezionato.noleggiatore != "Disponibile") {
    this.errore = 'Non è possibile noleggiare un documento già noleggiato';
    setInterval (() => {
    this.errore = ''
    },5000)
    return;
    }

    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {
        //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
        var newArchive = JSON.parse(x.response);

        let libreria: Libreria = new Libreria(newArchive);
        // creo la libreria con l'elenco dei libri controllando tramite map la posizione del documento e sostituendo il valore 'noleggiatore' con quello in input di prestatario.
        libreria.archivio.map(
          (doc) => {
            if (doc.posizione == this.libro_selezionato.posizione ){
             doc.noleggiatore = prestatario.value;}
            });

        //ricarico la nuova libreria tramite la SET
        this.bs.setDocument(libreria.archivio).subscribe({
          next: (x: AjaxResponse<any>) => {},
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        //dopo aver eliminato emetto un evento che contiene l'array e un messaggio 
        this.onUpdate_borrow.emit({message: 'Documento noleggiato!',update: libreria.archivio})
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });

    //svuoto i campi

    this.errore = '';
  }
  
}
