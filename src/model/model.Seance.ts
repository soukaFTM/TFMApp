import {Enfant} from "./model.Enfant";
import { Presence } from "./model.Presence.";

export class Seance {

  CodeSeance: number ;
  dateDebut: string;
  heureFin:string;
  remarque:string;
  tauxRealisation:number;
  tauxRealisationPrevisible:number;
  presenceEnfants:Presence[] = null;

}
