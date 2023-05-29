import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';
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

  @Input() libro_selezionato: Documento = new Documento('', '', '', '');
  // mando fuori un evento che comunica un array di documenti (libreria_update)
  @Output() onUpdate_delete : EventEmitter<Documento[]> = new EventEmitter<Documento[]>();
  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  DeleteDocument() {
    // if (this.libro_selezionato.noleggiatore != undefined) {
    // console.log(this.libro_selezionato.noleggiatore)
    //   this.errore = 'Non è possibile eliminare un documento noleggiato';
    //  return;
    //  }

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
        console.log(libreria);

        //ricarico la nuova libreria tramite la SET
        this.bs.setDocument(libreria_update).subscribe({
          next: (x: AjaxResponse<any>) => {},
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        //dopo aver eliminato emetto un evento che contiene l'array
        this.onUpdate_delete.emit(libreria_update)
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });

    //svuoto i campi

    this.errore = '';
  }
}
