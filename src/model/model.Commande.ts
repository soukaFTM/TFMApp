import { Programme } from "./model.Programme";
import { Enfant } from "./model.Enfant";

export class Commande {

  codeCommande: number ;
  programme:Programme;
  listEnfant:Enfant[];
  totale: number ;
  paiement: boolean;
}
