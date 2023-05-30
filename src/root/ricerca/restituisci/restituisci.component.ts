import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../../documento';
import { Libreria } from '../../libreria';


@Component({
  selector: 'app-restituisci',
  templateUrl: './restituisci.component.html',
  styleUrls: ['./restituisci.component.css'],
  providers: [BibliotecaService],
  imports: [ CommonModule ],
  standalone: true
})

export class RestituisciComponent {
  // stringa per l'errore
  errore: string = '';

  @Input() libro_selezionato: Documento = new Documento('', '', '', '');
  // mando fuori un evento che comunica un array di documenti (libreria_update) e un messaggio
  @Output() onUpdate_return = new EventEmitter<{message:string,update:Documento[]}>();
  constructor(private bs: BibliotecaService) {}
  
  ngOnInit() {}

  RestituisciDocument() {


    //Inserisco un controllo che non permette di restituire un documento già disponibile con un timeout

    if (this.libro_selezionato.noleggiatore == "Disponibile") {
    this.errore = 'Non è possibile restituire un documento già disponibile.';
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
        // creo la libreria con l'elenco dei libri controllando tramite map la posizione del documento e sostituendo il valore di noleggiatore con "Disponibile".
        libreria.archivio.map(
          (doc) => {
            if (doc.posizione == this.libro_selezionato.posizione ){
             doc.noleggiatore = 'Disponibile';}
            });

        //ricarico la nuova libreria tramite la SET
        this.bs.setDocument(libreria.archivio).subscribe({
          next: (x: AjaxResponse<any>) => {},
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        //dopo aver eliminato emetto un evento che contiene l'array e un messaggio 
        this.onUpdate_return.emit({message: 'Documento restituito!',update: libreria.archivio})
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });

    //svuoto i campi

    this.errore = '';
  }
  
}
