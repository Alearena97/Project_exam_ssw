import { Component, OnInit, Input } from '@angular/core';
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
  imports: [ CommonModule],
  standalone: true
})

export class EliminaComponent {
  // stringa per l'errore 
  errore : string = '';

  
  @Input() libro_selezionato : Documento = new Documento ('','','','')

  constructor(private bs: BibliotecaService) {}
  ngOnInit() {}

  DeleteDocument() {

    if (this.libro_selezionato.noleggiatore != 'Disponibile') {
     this.errore = 'Riempi tutti i campi prima di inserire un documento!';
     return;
    }

    // richiedo l'archivio vuoto
    this.bs.getDocument().subscribe({
      next: (x: AjaxResponse<any>) => {
        
      //associo ad una variabile l'array di documenti scaricato e lo rendo una stringa di tipo JSON 
      var newArchive = JSON.parse(x.response)
      
      // creo la libreria con l'elenco dei libri controllando tramite filter tutti gli elementi che hanno posizione diversa da quella selezionata
      var libreria : Libreria = newArchive.archivio.filter((doc:Documento)  => (doc.posizione != this.libro_selezionato.posizione)) ;

      //ricarico la nuova libreria tramite la SET
      this.bs.setDocument(libreria.archivio).subscribe({
        next: (x: AjaxResponse<any>) => {

        },
        error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))

      })
    },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err))
    });


    //svuoto i campi

    this.errore='';
  }
}