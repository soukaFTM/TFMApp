import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Programme} from "../model/model.Programme";
import {Produit} from "../model/model.Produit";
import {Formateur} from "../model/model.Formateur";
import {Seance} from "../model/model.Seance";
import {Groupe} from "../model/model.Groupe";

@Injectable()
export class  ProgrammeService
{
  constructor(public  http:Http){}

  getAllProgrammes()
  {
    return this.http.get("http://localhost:8080/AllProgramme")
    .map(resp=>resp.json());
  }
  getProgrammes(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageProgramme?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherProgramme?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveProgramme(programme:Programme)
  {
    if(programme.produit.listProduit==null)
      return this.http.post("http://localhost:8080/saveProgramme",programme)//,Programme.ListProgramme
        .map(resp=>resp.json());
    else
    return this.http.post("http://localhost:8080/saveProgrammePack",programme)//,Programme.ListProgramme
        .map(resp=>resp.json());

  }
  deleteProgramme(programme:number)
  {
    return this.http.delete("http://localhost:8080/Programmes/"+programme);
  }
  addGroupeToProgramme(groupe:Groupe,numProgramme:number)
  {
    return this.http.put("http://localhost:8080/addGroupeToProgramme/"+numProgramme,groupe)
      .map(resp=>resp.json());
  }

  getAllResponsableForProgramme(produit:number)
  {
    return this.http.get("http://localhost:8080/getAllResponsableForProgramme/"+produit)
        .map(resp=>resp.json());

  }

  /*
 */

}
