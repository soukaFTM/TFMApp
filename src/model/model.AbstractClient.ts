import {Enfant} from "./model.Enfant";

export class AbstractClient {

  codeClient: number ;
  nom: string;
  prenom: string;
  adress: string;
  numTelePortable: string;
  numTeleFixe: string;
  ListEnfant: Enfant[] = null;

}
