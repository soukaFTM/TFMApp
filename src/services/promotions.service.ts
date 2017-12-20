import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Produit} from "../model/model.Produit";
import {Promo} from "../model/model.promo";

@Injectable()
export class  PromotionsService
{
  constructor(public  http:Http){}

  getPromotions(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/promotions?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherPromotions?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  savePromotion(promotion:Promo)
  {
      return this.http.post("http://localhost:8080/savePromotion",promotion)
        .map(resp=>resp.json());

  }
  deletePromotion(promotion:number)
  {
    return this.http.delete("http://localhost:8080/promotion/"+promotion);
  }
  addProduitToPromotion(produit:Produit,codePromo:number)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/addProduitToPromotion/"+codePromo,produit)
      .map(resp=>resp.json());
  }
  removeProduitFromPromotion(codePromo:number,produit:Produit)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/removeProduitFromPromotion/"+codePromo,produit)
      .map(resp=>resp.json());
  }

}
