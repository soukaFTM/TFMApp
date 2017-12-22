import {Commande} from "./model.Commande";

export class Enfant {

  codeEnfant: number ;
  nom: string;
  prenom: string;
  dateNaissance: string;
  ListCommande: Commande[] = null;

}
