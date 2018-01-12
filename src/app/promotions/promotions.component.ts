import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map"
import {PromotionsService} from "../../services/promotions.service";
import {Produit} from "../../model/model.Produit";
import {ProduitsService} from "../../services/produits.service";
import {Promo} from "../../model/model.promo";


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  pagePromotions:any;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  prodDetailPromotion:any;
  promotion:Promo=new Promo();
  listProduit:any=null;
  constructor(private http:Http,public promotionservice:PromotionsService,public produitservice:ProduitsService) { }
  selectedProduit:Produit;
  action:string="Sauvgarder";

  doSomething() {
    console.log(this.selectedProduit);
  }
  ngOnInit() {
    this.searchPromotions();
    this.GetProduits();
  }
  searchPromotions()
  {
    this.promotionservice.getPromotions(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        this.pagePromotions=data;
        this.pages=new Array(data.totalPages)
      },err=>{
        console.log(err);
      })
  }
  newSearch()
  {
    this.Currentpage=0;
  }
  goToPage(indexPage:number)
  {
    this.Currentpage=indexPage;
    this.searchPromotions();
  }
  ShowPromotionProduits(promotion:Promo)
  {
    this.prodDetailPromotion=promotion;

  }
  GetProduits()
  {
    this.produitservice.getAlltypeOfProduits()
      .subscribe(data=>{
        console.log(data);
        this.listProduit=data;
      },err=>{
        console.log(err);
      })
  }
  addProduitToPromotion(promotion:any)
  {
    console.log(this.selectedProduit);
    return this.promotionservice.addProduitToPromotion(this.selectedProduit,promotion.codePromo)
          .subscribe(data=>{
            console.log(data);
            this.prodDetailPromotion=data;
            this.searchPromotions();
          },err=>{
            console.log(err);
          })
  }
  removeProduitFromPromotion(promotion:any,produit:Produit)
  {
    console.log(this.selectedProduit);
    return this.promotionservice.removeProduitFromPromotion(promotion.codePromo,produit)
      .subscribe(data=>{
        console.log(data);
        this.prodDetailPromotion=data;
        this.searchPromotions();
      },err=>{
        console.log(err);
      })
  }
  SavePromotion(){
    this.promotionservice.savePromotion(this.promotion)
      .subscribe(data=>{
        console.log(data);
        this.searchPromotions();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateProduit (promotion:Promo){
    console.log(promotion);
    this.promotion=promotion;
    this.ShowPromotionProduits(promotion);
    this.action="modifier";
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdatePromotion(){
    this.promotionservice.savePromotion(this.promotion)
      .subscribe(data=>{
        this.searchPromotions();
        this.promotion=new Promo();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })
  }
  Annuler()
  {
    this.promotion=new Promo();
    this.action = "sauvgarder";
    document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
  }
  gestionPromotion (){
    if (this.action == "sauvgarder")
    {
      this.SavePromotion();
    } else {
      this.UpdatePromotion();
    }
  }


  deletePromotion(id:number)
  {
    this.promotionservice.deletePromotion(id)
      .subscribe(data=>{
        console.log(data);
        this.searchPromotions();
      },err=>{
        console.log(err);
      })
  }
}
