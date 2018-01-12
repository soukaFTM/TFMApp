import { Component, OnInit } from '@angular/core';
import {Commande} from "../../model/model.Commande";
import {CommandeService} from "../../services/commande.service";
import {Http} from "@angular/http";
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/model.Client';
import { ProgrammeService } from '../../services/programme.service';
import { Programme } from '../../model/model.Programme';
import { Groupe } from '../../model/model.Groupe';
import { PromotionsService } from '../../services/promotions.service';
import { Command } from 'protractor';
import { Promo } from '../../model/model.promo';
import { GroupeService } from '../../services/groupe.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  ClientCommandes:Array<Commande> ;
  
  Commande:Commande=new Commande();

  idClient:number;
  selectedClient:Client = new Client();
  programmes:Array<Programme> = new Array<Programme>();
  selectedGroupe:Groupe= new Groupe();
  selectedProgramme:any;
  ListPromotion:any;
  modePaiement:string="";
  modeFacturation:string="";
  val:number;

  prixTotal:number=0;
  prixNegocie:number=0;
  prixFixe:number=0;
  ListSelectedPromotion:Array<Promo> = new Array<Promo>();
  flag:boolean=true;

 

  constructor(private http:Http,public CommandeService:CommandeService,
    public ClientService:ClientService,
    public ProgrammeService:ProgrammeService,
    public PromotionService:PromotionsService,
    public GroupeService:GroupeService,
    public activatedRoute:ActivatedRoute) { 
    this.idClient=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getClient();
    this.searchCommandes();
    this.getProgrammes();
    this.getPromotionProduit(1);
  }



  SelectPromotion(promo:Promo)
 {
    this.flag=true;
    this.ListSelectedPromotion.forEach((item, index) => {
      if(item.codePromo==promo.codePromo)
      {
        this.ListSelectedPromotion.splice(index, 1); 
        this.flag=false;
      }
    });
    if(this.flag)
    {
      this.ListSelectedPromotion.push(promo);
    }
    this.selectModeFacturation();

      
 }
  selectModeFacturation()
  {
    if(this.modeFacturation=='PF')
    {
      this.prixFixe=this.Commande.programme.produit.prix;
      this.ListSelectedPromotion.forEach((item, index) => {
          this.prixFixe=this.prixFixe-this.prixFixe*(item.taux/100);     
      });
      if(this.Commande.listEnfant)
          this.prixTotal= this.prixFixe*this.Commande.listEnfant.length;
      else
          this.prixTotal= this.prixFixe*0;

    }
    else
    {
      if(this.Commande.listEnfant)
       this.prixTotal= this.prixNegocie*this.Commande.listEnfant.length;
      else
        this.prixTotal= this.prixNegocie*0;


    }
  }
  getClient()
  {
    this.ClientService.getClientByID(this.idClient)
      .subscribe(data=>{
        this.selectedClient=data;
      },err=>{
        console.log(err);
      })
    
  }
  getProgrammes()
  {
    this.ProgrammeService.getAllProgrammes()
      .subscribe(data=>{
        this.programmes=data;
      },err=>{
        console.log(err);
      })
    
  }

  getPromotionProduit(numProduit:number)
  {
    this.PromotionService.getPromotionOfProduit(numProduit)
      .subscribe(data=>{
        this.ListPromotion=data;
      },err=>{
        console.log(err);
      })

  }
  setGroupeEnfant(gr:Groupe)
  {
    this.selectedGroupe=gr;
  }
  
  searchCommandes(){
    this.CommandeService.getClientsCommands(this.idClient)
      .subscribe(data=>{
        console.log(data);
        this.ClientCommandes=data;
      },err=>{
        console.log(err);
      })
  }
  
  
  reglerPaiment(cmd:Commande){
    this.CommandeService.reglerPaiment(cmd)
      .subscribe(data=>{
        console.log(data);
        this.searchCommandes();

      },err=>{
        console.log(err);
      })
    
    
  }
 
  saveCommande(){
    this.Commande.totale=this.prixTotal;
    this.CommandeService.saveCommande(this.Commande)
      .subscribe(data=>{
        console.log(data);

        this.GroupeService.addEnfantsToGroupe(this.Commande.listEnfant,this.selectedGroupe.codeGroupe)
        .subscribe(data=>{
          console.log(data);
          this.searchCommandes();
          
        },err=>{
          console.log(err);
        })

        this.searchCommandes();

      },err=>{
        console.log(err);
      })
    
    
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
