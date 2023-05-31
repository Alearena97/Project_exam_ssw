import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { Documento } from './documento';
import { BibliotecaService } from './biblioteca.service';
import { IntroduzioneComponent } from './introduzione/introduzione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserisciComponent } from './inserisci/inserisci.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [
    CommonModule,
    IntroduzioneComponent,
    RicercaComponent,
    InserisciComponent,
  ],
  providers: [BibliotecaService],
  standalone: true,
})
export class RootComponent implements OnInit {
  constructor() {}

  buttonIns: boolean = false;
  openIns() {
    this.buttonIns = !this.buttonIns;
  }

  buttonRic: boolean = false;
  openRic() {
    this.buttonRic = !this.buttonRic;
  }
  ngOnInit() {}

  footer: string = "Sviluppo di Servizi Web - Anno accademico 2022/2023 - Alessandro Arena 544907"
}
