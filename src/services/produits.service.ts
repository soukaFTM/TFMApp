import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Produit} from "../model/model.Produit";
import {Projet} from "../model/model.Projet";
import {Competence} from "../model/model.Competence";

@Injectable()
export class  ProduitsService
{
  constructor(public  http:Http){}

  getAlltypeOfProduits()
  {
    return this.http.get("http://localhost:8080/getAllProduits")
  .map(resp=>resp.json());
  }
  getAllProduits()
  {
    return this.http.get("http://localhost:8080/Allproduits")
      .map(resp=>resp.json());
  }
  getProduits(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageProduits?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherProduits?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());
  }
  saveProduits(produit:Produit)
  {
      return this.http.post("http://localhost:8080/saveProduit",produit)
        .map(resp=>resp.json());

  }
  deleteProduit(produit:number)
  {
    return this.http.delete("http://localhost:8080/produits/"+produit);
  }

  getTypeProduits()
  {
    return this.http.get("http://localhost:8080/typeProduits")
      .map(resp=>resp.json());

  }

  addProjetToProduit(projet:Projet,numProduit:number)
  {
    return this.http.put("http://localhost:8080/addProjetToProduit/"+numProduit,projet)
      .map(resp=>resp.json());
  }
  removeProjetFromProduit(numProduit:number,projet:Projet)
  {
    return this.http.put("http://localhost:8080/removeProjetFromProduit/"+numProduit,projet)
      .map(resp=>resp.json());
  }
  addCompetenceToProduit(Competence:Competence,numProduit:number)
  {
    return this.http.put("http://localhost:8080/addCompetenceToProduit/"+numProduit,Competence)
      .map(resp=>resp.json());
  }
  removeCompetenceFromProduit(numProduit:number,Competence:Competence)
  {
    return this.http.put("http://localhost:8080/removeCompetenceFromProduit/"+numProduit,Competence)
      .map(resp=>resp.json());
  }

}
