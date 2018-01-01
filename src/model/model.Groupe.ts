import {Enfant} from "./model.Enfant";
import {RealisationProjet} from "./model.RealisationProjet";
import {Formateur} from "./model.Formateur";

export class Groupe {

  codeGroupe: number ;
  heureDebut:string;
  heureFin:string;
  jour:string;
  listEnfant: Enfant[] = null;
  listProjet: RealisationProjet[] = null;
  responsable:Formateur = null;
  nombreInscrit:number=0;


}
