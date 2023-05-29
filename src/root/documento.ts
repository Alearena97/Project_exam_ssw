export class Documento {
posizione: string;
autore: string;
titolo: string;
noleggiatore?: string;
constructor(posizione: string, autore: string, titolo: string, noleggiatore?: string) {
  this.posizione=posizione;
  this.autore=autore;
  this.titolo=titolo;
  this.noleggiatore=noleggiatore;
}
}