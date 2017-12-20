import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Produit} from "../model/model.Produit";

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
}
