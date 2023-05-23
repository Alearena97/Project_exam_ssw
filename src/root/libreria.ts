import { Documento } from "./documento";

export class Libreria {
scaffale1: Array<Documento>;
scaffale2: Array<Documento>;
scaffale3: Array<Documento>;
constructor(scaffale1: Array<Documento>,scaffale2: Array<Documento>,scaffale3: Array<Documento>) {
  this.scaffale1=scaffale1;
  this.scaffale2=scaffale2;
  this.scaffale3=scaffale3;
}
}
