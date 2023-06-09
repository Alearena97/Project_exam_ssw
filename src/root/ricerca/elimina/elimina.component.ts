import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Documento } from '../../documento';
import { Libreria } from '../../libreria';

@Component({
  selector: 'app-elimina',
  templateUrl: './elimina.component.html',
  styleUrls: ['./elimina.component.css'],
  providers: [BibliotecaService],
  imports: [CommonModule],
  standalone: true,
})
export class EliminaComponent {
  // stringa per l'errore
  errore: string = '';
  
  // prendo in input da ricerca la variabile libro selezionato
  @Input() libro_selezionato: Documento = new Documento('', '', '', '');
  // mando un evento che comunica un array di documenti (libreria_update) e un messaggio
  @Output() onUpdate_delete = new EventEmitter<{message:string,update:Documento[]}>();

  constructor(private bs: BibliotecaService) {}
  

  DeleteDocument() {

    //Inserisco un controllo che non permette di eliminare un documento già noleggiato con un timeout
    if (this.libro_selezionato.noleggiatore != "Disponibile") {
    this.errore = 'Non è possibile eliminare un documento noleggiato!';
    setInterval (() => {
    this.errore = ''
    },3000)
    
    return;
    }
    
    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {
        //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON
        var newArchive = JSON.parse(x.response);
        let libreria: Libreria = new Libreria(newArchive);
        // creo la libreria con l'elenco dei libri controllando tramite filter tutti gli elementi che hanno posizione diversa da quella selezionata
        var libreria_update = libreria.archivio.filter(
          (doc: Documento) => doc.posizione != this.libro_selezionato.posizione
        );

        //ricarico la nuova libreria tramite la SET
        this.bs.setDocument(libreria_update).subscribe({
          next: (x: AjaxResponse<any>) => {},
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        //dopo aver eliminato emetto un evento che contiene l'array e un messaggio 
        this.onUpdate_delete.emit({message: 'Documento eliminato!',update: libreria_update})
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });

    //svuoto i campi

    this.errore = '';
  }
}
