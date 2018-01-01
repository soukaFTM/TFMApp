import {Competence} from "./model.Competence";

export class Formateur {

  codeFormateur: number ;
  nom: string;
  prenom: string;
  cin:string;
  typedecontrat:string;
  dateDebut:string;
  listCompetence: Competence[] = null;


}
