import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../biblioteca.service';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  providers: [BibliotecaService],
  imports: [CommonModule],
  standalone: true,
})
export class InserisciComponent {}
