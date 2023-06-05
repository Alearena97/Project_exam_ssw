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
  titolo: string = 'Benvenuto in Biblioteca!';
  sottotitolo: string = "Seleziona l'azione che vuoi effettuare."
  

  constructor() { }

  ngOnInit() {
  }

}