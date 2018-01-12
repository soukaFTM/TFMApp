import { Component, OnInit } from '@angular/core';
import {Pack} from "../../model/model.Pack";
import {PacksService} from "../../services/pack.service";
import {Http} from "@angular/http";
import {Produit} from "../../model/model.Produit";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {
  pageProduits:any;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  produit:Pack=new Pack();
  action:string="Sauvgarder";
  selectedProduit:any;
  listProduit:any=null;
  prodDetailPack:Pack=new Pack();

  constructor(private http:Http,public packService:PacksService) { }

  ngOnInit() {
    this.searchPack();
    this.GetProduits();

  }

  GetProduits()
  {
    this.packService.getAllProduits()
      .subscribe(data=>{
        this.listProduit=data;
      },err=>{
        console.log(err);
      })
  }
  ShowPackProduits(produit:Pack)
  {
    this.prodDetailPack=produit;

  }
  searchPack(){
    this.packService.getPacks(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageProduits=data;
        this.pages=new Array(data.totalPages)
      },err=>{
        console.log(err);
      })
  }
  newSearch(){
    this.Currentpage=0;
  }
  goToPage(indexPage:number){
    this.Currentpage=indexPage;
    this.searchPack();
  }
  saveProduit(){
    this.packService.savePackProduits(this.produit)
      .subscribe(data=>{
        console.log(data);
        this.searchPack();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateProduit (produit:Pack){
    this.produit=produit;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateProduit(){
    this.packService.savePackProduits(this.produit)
      .subscribe(data=>{
        this.searchPack();
        this.produit=new Pack();
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
    this.packService.deleteProduit(id)
      .subscribe(data=>{
        console.log(data);
        this.searchPack();
      },err=>{
        console.log(err);
      })
  }
  addProduitToPack(pack:any)
  {
    return this.packService.addProduitToPack(this.selectedProduit,pack.numProduit)
      .subscribe(data=>{
        console.log(data);
        this.prodDetailPack=data;
        this.searchPack();
      },err=>{
        console.log(err);
      })
  }
  removeProduitFromPack(pack:any,produit:Produit)
  {
    console.log(this.produit+"   / "+pack.numProduit);
    return this.packService.removeProduitFromPack(pack.numProduit,produit)
      .subscribe(data=>{
        console.log(data);
        this.prodDetailPack=data;
        this.searchPack();
      },err=>{
        console.log(err);
      })
  }

}
