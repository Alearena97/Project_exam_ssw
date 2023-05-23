import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})


export class BibliotecaService {
  apiKey: string = "a6f082fc";
  myURL: string  =
    "https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/";

  constructor() { }

  getDocument(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.myURL+"get?key="+this.apiKey,
      crossDomain: true,
    });  

}
//cambiare parametro
setDocument(documento:string): Observable<AjaxResponse<any>> {
  return ajax({
    method: 'POST',
    url: this.myURL+"set?key="+this.apiKey,
    crossDomain: true,
    body: JSON.stringify(documento)
  });  

}
}