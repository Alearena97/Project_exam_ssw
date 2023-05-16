import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [ CommonModule ],
  standalone: true
})
export class RicercaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}