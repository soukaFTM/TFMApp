import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map"
import {ProduitsService} from "../../services/produits.service";
import {Produit} from "../../model/model.Produit";
import {TypeProduit} from "../../model/model.TypeProduit";
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  pageProduits:Array<Produit> ;
  typeProduits:Array<TypeProduit>;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  produit:Produit=new Produit();
  action:string="Sauvgarder";


  constructor(private http:Http,public produitService:ProduitsService) { }

  ngOnInit() {
    this.searchProduits();
    this.getTypesProduits();
  }


  getTypesProduits(){
    this.produitService.getTypeProduits()
      .subscribe(data=>{
        console.log("tpes"+data);
        this.typeProduits=data;
      },err=>{
        console.log(err);
      })
  }

  searchProduits(){
    this.produitService.getProduits(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageProduits=data.content;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  newSearch(){
    this.Currentpage=0;
  }
  goToPage(indexPage:number){
    this.Currentpage=indexPage;
    this.searchProduits();
  }
  saveProduit(){
    this.produitService.saveProduits(this.produit)
      .subscribe(data=>{
        console.log(data);
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateProduit (produit:Produit){
    this.produit=produit;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateProduit(){
       this.produitService.saveProduits(this.produit)
      .subscribe(data=>{
        this.searchProduits();
        this.produit=new Produit();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionProduit (){
    if (this.action == "sauvgarder")
    {
      this.saveProduit();
    } else {

      this.UpdateProduit();
    }
  }
  deleteProduit(id:number){
    this.produitService.deleteProduit(id)
      .subscribe(data=>{
        console.log(data);
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }
}
