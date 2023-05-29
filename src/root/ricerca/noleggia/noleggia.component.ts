import { Component, OnInit } from '@angular/core';
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
export class NoleggiaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}