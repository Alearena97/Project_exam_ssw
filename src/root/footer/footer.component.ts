import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  footer: string = "Sviluppo di Servizi Web - Anno accademico 2022/2023 - Alessandro Arena 544907"
  
}