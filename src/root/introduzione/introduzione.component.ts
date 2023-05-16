import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduzione',
  templateUrl: './introduzione.component.html',
  styleUrls: ['./introduzione.component.css'],
  imports: [ CommonModule ],
  standalone: true
})
export class IntroduzioneComponent implements OnInit {
  title: string = 'Benvenuto in Biblioteca!';
  subtitle: string = 'Inserisci le specifiche del libro che cerchi.'

  constructor() { }

  ngOnInit() {
  }

}