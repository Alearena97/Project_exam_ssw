import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  providers: [BibliotecaService],
  imports: [ CommonModule ],
  standalone: true
})
export class RicercaComponent implements OnInit {
  title: string = '';

  constructor() { }

  ngOnInit() {
  }

}