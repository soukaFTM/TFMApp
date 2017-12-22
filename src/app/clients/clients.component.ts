import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/model.Client";
import {Enfant} from "../../model/model.Enfant";
import {Commande} from "../../model/model.Commande";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  pageClients:any=null;
  typeClientE:boolean=true;
  typeClientP:boolean=true;
  typeClientM:boolean=true;
  typeClientPH:boolean=true;

  typeNewClient:string;
  client:Client=new Client();
  enfant:Enfant=new Enfant();
  commande:Commande=new Commande();
  listProduit:any=null;
  selectedClient:Client=new Client;
  constructor() { }

  ngOnInit() {
  }
  test()
  {
    alert(this.typeClientE);
  }

}
