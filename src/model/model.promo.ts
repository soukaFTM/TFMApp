import {Produit} from "./model.Produit";

export class Promo {
  ListeProduit: Produit[] = null;
  dateDebut: string;
  dateFin: string;
  codePromo: number ;
  intituler: string;
  description: string;
  taux: number = 0;
  dateCreation: string;
  dateModification: string;
  dateSuppression: string;


}
