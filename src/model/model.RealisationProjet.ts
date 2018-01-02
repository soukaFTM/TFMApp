import {Seance} from "./model.Seance";
import {Projet} from "./model.Projet";

export class RealisationProjet {

  CodeRealisation: number ;
  projet:Projet = null;
  evaluationGlobal: number;
  remarque: string;
  ListSeance: Seance[] = null;

}
