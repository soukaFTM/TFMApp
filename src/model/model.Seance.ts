import {Enfant} from "./model.Enfant";

export class Seance {

  CodeSeance: number ;
  dateDebut: string;
  heureFin:string;
  remarque:string;
  tauxRealisation:number;
  tauxRealisationPrevisible:number;
  Presence:Map<Enfant,boolean> = null;
  Remarques:Map<Enfant,string> = null;

}
