import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map"
import {ProduitsService} from "../../services/produits.service";
import {Produit} from "../../model/model.Produit";
import {TypeProduit} from "../../model/model.TypeProduit";
import {Competence} from "../../model/model.Competence";
import {Projet} from "../../model/model.Projet";
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

  listProjet:Array<Projet>;
  listCompetence:Array<Competence>;
  selectedCompetence:Competence;
  selectedProjet:any;
  produitDetail:Produit;

  constructor(private http:Http,public produitService:ProduitsService) { }

  ngOnInit() {
    this.searchProduits();
    this.getTypesProduits();
    this.getCompetences();
    this.getProjets();
  }


  getTypesProduits(){
    this.produitService.getTypeProduits()
      .subscribe(data=>{
        this.typeProduits=data;
      },err=>{
        console.log(err);
      })
  }
  getProjets(){
    this.produitService.getProjets()
      .subscribe(data=>{
        this.listProjet=data;
      },err=>{
        console.log(err);
      })
  }

  getCompetences(){
    this.produitService.getCompetences()
      .subscribe(data=>{
        this.listCompetence=data;
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

  ShowDetailProduit(produit:Produit)
  {
    this.produitDetail=produit;
  }

  addProjetToProduit(produit:any)
  {
    return this.produitService.addProjetToProduit(this.selectedProjet,produit.numProduit)
      .subscribe(data=>{
        console.log(data);
        this.produitDetail=data;
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }
  removeProjetFromProduit(produit:any,projet:Projet)
  {
    return this.produitService.removeProjetFromProduit(produit.numProduit,projet)
      .subscribe(data=>{
        console.log(data);
        this.produitDetail=data;
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }

  addCompetenceToProduit(produit:any)
  {
    return this.produitService.addCompetenceToProduit(this.selectedCompetence,produit.numProduit)
      .subscribe(data=>{
        console.log(data);
        this.produitDetail=data;
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }
  removeCompetenceFromProduit(produit:any,Competence:Competence)
  {
    return this.produitService.removeCompetenceFromProduit(produit.numProduit,Competence)
      .subscribe(data=>{
        console.log(data);
        this.produitDetail=data;
        this.searchProduits();
      },err=>{
        console.log(err);
      })
  }
}
