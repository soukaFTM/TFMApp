import { Component, OnInit } from '@angular/core';
import {Commande} from "../../model/model.Commande";
import {CommandeService} from "../../services/commande.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  pageCommandes:Array<Commande> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Commande:Commande=new Commande();
  action:string="Sauvgarder";


  constructor(private http:Http,public CommandeService:CommandeService) { }

  ngOnInit() {
    this.searchCommandes();
  }

  searchCommandes(){
    this.CommandeService.getCommandes(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageCommandes=data.content;
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
    this.searchCommandes();
  }
  saveCommande(){
    this.CommandeService.saveCommande(this.Commande)
      .subscribe(data=>{
        console.log(data);
        this.searchCommandes();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateCommande (Commande:Commande){
    this.Commande=Commande;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateCommande(){
    this.CommandeService.saveCommande(this.Commande)
      .subscribe(data=>{
        this.searchCommandes();
        this.Commande=new Commande();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionCommande (){
    if (this.action == "sauvgarder")
    {
      this.saveCommande();
    } else {

      this.UpdateCommande();
    }
  }
  deleteCommande(id:number){
    this.CommandeService.deleteCommande(id)
      .subscribe(data=>{
        console.log(data);
        this.searchCommandes();
      },err=>{
        console.log(err);
      })
  }
}
