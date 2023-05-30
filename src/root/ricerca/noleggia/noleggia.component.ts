import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
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
  noleggioVisibile: boolean = false;

  toggleNoleggio() {
    this.noleggioVisibile = !this.noleggioVisibile;
  }




  @Input() libro_selezionato: Documento = new Documento('', '', '', '');
  // mando fuori un evento che comunica un array di documenti (libreria_update) e un messaggio
  @Output() onUpdate_borrow = new EventEmitter<{message:string,update:Documento[]}>();
  constructor(private bs: BibliotecaService) {}
  
  ngOnInit() {}

  NoleggiaDocument() {

    //Inserisco un controllo che non permette di eliminare un documento già noleggiato con un timeout

    var prestatario: HTMLInputElement = document.getElementById("Prestatario") as HTMLInputElement;


    if (this.libro_selezionato.noleggiatore != "Disponibile") {
    this.errore = 'Non è possibile noleggiare un documento già noleggiato';
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
