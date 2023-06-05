import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
})
export class FooterComponent implements OnInit {

  ngOnInit() {
  }
  footer: string = "Sviluppo di Servizi Web - Anno accademico 2022/2023 - Alessandro Arena 544907"
  
}