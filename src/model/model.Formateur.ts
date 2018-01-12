import {Competence} from "./model.Competence";
import { suiviMensuelle } from "./model.suiviMensuelle";

export class Formateur {

  codeFormateur: number ;
  nom: string;
  prenom: string;
  cin:string;
  typedecontrat:string;
  dateDebut:string;
  listCompetence: Competence[] = null;
  suivi: suiviMensuelle[] = null;


}
