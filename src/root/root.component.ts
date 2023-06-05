import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from './biblioteca.service';
import { IntroduzioneComponent } from './introduzione/introduzione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { FooterComponent } from './footer/footer.component'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [
    CommonModule,
    IntroduzioneComponent,
    RicercaComponent,
    InserisciComponent,
    FooterComponent,
  ],
  providers: [BibliotecaService],
  standalone: true,
})
export class RootComponent implements OnInit {

  buttonIns: boolean = false;
  openIns() {
    this.buttonIns = !this.buttonIns;
  }

  buttonRic: boolean = false;
  openRic() {
    this.buttonRic = !this.buttonRic;
  }
  ngOnInit() {}


}
