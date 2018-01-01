import {AbstractProduit} from "./model.AbstractProduit";
import {Groupe} from "./model.Groupe";

export class Programme {

  codeProgramme: number ;
  produit:any = null;
  listGroupes:Groupe[] = null;
  dateDebut:DateTimeFormat;
  dateFin:DateTimeFormat;
  nombreInscrit:number=0;

}
