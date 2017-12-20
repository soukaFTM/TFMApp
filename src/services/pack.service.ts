import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Produit} from "../model/model.Produit";
import {Pack} from "../model/model.Pack";

@Injectable()
export class  PacksService
{
  constructor(public  http:Http){}

  getAllProduits()
  {
    return this.http.get("http://localhost:8080/AllProduits")
      .map(resp=>resp.json());
  }
  getAllPacks()
  {
    return this.http.get("http://localhost:8080/Allproduits")
      .map(resp=>resp.json());
  }
  getPacks(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PagePack?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherPack?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  savePackProduits(produit:Pack)
  {
      return this.http.post("http://localhost:8080/savePack",produit)//,produit.ListProduit
        .map(resp=>resp.json());
  }
  deleteProduit(produit:number)
  {
    return this.http.delete("http://localhost:8080/produits/"+produit);
  }
  addProduitToPack(produit:Produit,numProduit:number)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/addProduitToPack/"+numProduit,produit)
      .map(resp=>resp.json());
  }
  removeProduitFromPack(numProduit:number,produit:Produit)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/removeProduitFromPack/"+numProduit,produit)
      .map(resp=>resp.json());
  }
}
