import {TypeProduit} from "./model.TypeProduit";
import {AbstractProduit} from "./model.AbstractProduit";
import {Projet} from "./model.Projet";
import {Competence} from "./model.Competence";

export class Produit extends AbstractProduit{

  typeProduit: TypeProduit;
  ListProjet: Projet[] = null;
  ListCompetence: Competence[] = null;

}
