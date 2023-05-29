import { Component, OnInit } from '@angular/core';
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
export class RestituisciComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}