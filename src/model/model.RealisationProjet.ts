import {Seance} from "./model.Seance";
import {Projet} from "./model.Projet";

export class RealisationProjet {

  codeRealisation: number ;
  projet:Projet = null;
  evaluationGlobal: number;
  remarque: string;
  listSeance: Seance[] = null;

}
