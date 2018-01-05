import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/model.Client";
import {Enfant} from "../../model/model.Enfant";
import {Commande} from "../../model/model.Commande";
import {ClientService} from "../../services/client.service";
import {PacksService} from "../../services/pack.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  pageClients:any=null;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  actionClient:string="sauvgarder";
  actionEnfant:string="sauvgarder";
  actionCommande:string="sauvgarder";
  listEnfantCommande:Array<Enfant>;

  typeClientE:boolean=true;
  typeClientP:boolean=true;
  typeClientM:boolean=true;
  typeClientPH:boolean=true;

  typeNewClient:string;
  client:Client=new Client();
  enfant:Enfant=new Enfant();
  commande:Commande=new Commande();
  listProduit:any=null;
  selectedClient:Client=new Client();
  constructor(private http:Http,public clientService:ClientService) { }

  ngOnInit() {
    this.searchClient();
  }


  GetCurrentClient(client:Client)
  {
    this.selectedClient=client;
    console.log(this.selectedClient);
  }

  searchClient(){
    this.clientService.getClients(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageClients=data.content;
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
    this.searchClient();
  }
  /** Gestion Client **/
  saveClient(){
    this.clientService.saveClients(this.client,this.typeNewClient)
      .subscribe(data=>{
        console.log(data);
        this.searchClient();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateClient (client:Client){
    this.client=client;
    if(this.client.statutJuridique==null)
      this.typeNewClient = 'P';
    else
    this.typeNewClient = 'M';

    this.actionClient="modifier"
    document.getElementById("btnSaveClient").setAttribute("value", "Modifier");
  }
 UpdateClient(){
    this.clientService.saveClients(this.client,this.typeNewClient)
      .subscribe(data=>{
        this.searchClient();
        this.client=new Client();
        this.actionClient = "sauvgarder";
        document.getElementById("btnSaveClient").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionClient (){
    if (this.actionClient == "sauvgarder")
    {
      this.saveClient();
    } else {

      this.UpdateClient();
    }
  }
  deleteClient(id:number){
    this.clientService.deleteClient(id)
      .subscribe(data=>{
        console.log(data);
        this.searchClient();
      },err=>{
        console.log(err);
      })
  }

  /*** Gestion Enfants ****/

  GetUpdateEnfant(enfant:Enfant){
    this.enfant=enfant;
    this.actionEnfant="modifier"
    document.getElementById("btnSaveEnfant").setAttribute("value", "Modifier");
  }
  /*UpdateEnfant(){
    this.clientService.saveClients(this.client)
      .subscribe(data=>{
        this.searchClient();
        this.client=new Client();
        this.actionEnfant = "sauvgarder";
        document.getElementById("btnSaveClient").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }*/
  gestionEnfant (){
    if (this.actionEnfant == "sauvgarder")
    {
      this.addEnfantToClient();
      this.enfant= new Enfant();
    } else {
      //this.UpdateEnfant();
    }
  }





  addEnfantToClient()
  {
    return this.clientService.addEnfantToClient(this.enfant,this.selectedClient.codeClient)
      .subscribe(data=>{
        console.log(data);
        this.selectedClient=data;
        this.searchClient();
      },err=>{
        console.log(err);
      })
  }
  /*removeProduitFromPack(pack:any,produit:Produit)
  {
    console.log(this.produit+"   / "+pack.numProduit);
    return this.clientService.removeProduitFromPack(pack.numProduit,produit)
      .subscribe(data=>{
        console.log(data);
        this.prodDetailPack=data;
        this.searchPack();
      },err=>{
        console.log(err);
      })
  }*/




}
