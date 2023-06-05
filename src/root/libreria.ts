import { Documento } from "./documento";

export class Libreria {
archivio : Array<Documento>;
constructor(archivio: Array<Documento>) {
  this.archivio = archivio;
}
}
