import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Programme} from "../model/model.Programme";
import {Produit} from "../model/model.Produit";
import {Formateur} from "../model/model.Formateur";
import {Seance} from "../model/model.Seance";

@Injectable()
export class  ProgrammeService
{
  constructor(public  http:Http){}

  getProgrammes(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageProgramme?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherProgramme?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveProgrammes(programme:Programme,type:string)
  {
      return this.http.post("http://localhost:8080/saveProgramme",programme)//,Programme.ListProgramme
        .map(resp=>resp.json());

  }
  deleteProgramme(programme:number)
  {
    return this.http.delete("http://localhost:8080/Programmes/"+programme);
  }
  addProduitToProgramme(produit:Produit,numProgramme:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addProduitToProgramme/"+numProgramme,produit)
      .map(resp=>resp.json());
  }
  addFormateurToProgramme(formateur:Formateur,numProgramme:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addEnfantToProgramme/"+numProgramme,formateur)
      .map(resp=>resp.json());
  }
  addSeanceToProgramme(seance:Seance,numProgramme:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addSeanceToProgramme/"+numProgramme,seance)
      .map(resp=>resp.json());
  }

}
