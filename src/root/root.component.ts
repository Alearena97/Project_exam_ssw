import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { IntroduzioneComponent } from './introduzione/introduzione.component';
import { RicercaComponent } from './ricerca/ricerca.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [ CommonModule, IntroduzioneComponent, RicercaComponent ],
  standalone: true
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}