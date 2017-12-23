import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Seance} from "../model/model.Seance";

@Injectable()
export class  SeanceService
{
  constructor(public  http:Http){}

  getSeances(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageSeance?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherSeance?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveSeance(seance:Seance)
  {
    return this.http.post("http://localhost:8080/saveSeance",seance)//,Seance.ListSeance
      .map(resp=>resp.json());

  }
  deleteSeance(seance:number)
  {
    return this.http.delete("http://localhost:8080/Seances/"+seance);
  }
 /* addProduitToSeance(produit:Produit,numSeance:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addProduitToSeance/"+numSeance,produit)
      .map(resp=>resp.json());
  }
  addFormateurToSeance(formateur:Formateur,numSeance:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addEnfantToSeance/"+numSeance,formateur)
      .map(resp=>resp.json());
  }
  addSeanceToSeance(seance:Seance,numSeance:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addSeanceToSeance/"+numSeance,seance)
      .map(resp=>resp.json());
  }
*/
}
