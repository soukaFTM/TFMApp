import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Client} from "../model/model.Client";
import {Enfant} from "../model/model.Enfant";
import { Commande } from "../model/model.Commande";

@Injectable()
export class  ClientService
{
  constructor(public  http:Http){}

  //////////////////////////////////////////////////////////////////
  getClientByID(id:number)
  {
    return this.http.get("http://localhost:8080/getClientByID/"+id)
         .map(resp=>resp.json());
  }
 
  addCommandeToEnfant(commande:Commande,numEnfant:number)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/addCommandeToEnfant/"+numEnfant,commande)
      .map(resp=>resp.json());
  }
  removeCommandeFromEnfant(commande:Commande,numEnfant:number)
  {
    console.log("in service ");
    return this.http.put("http://localhost:8080/addCommandeToEnfant/"+numEnfant,commande)
      .map(resp=>resp.json());
  }
  

  //////////////////////////////////////////////////////////////////


  getClients(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageClient?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherClient?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveClients(client:Client,type:string)
  {
    if(type=="M")
      return this.http.post("http://localhost:8080/saveClientMoral",client)//,client.Listclient
         .map(resp=>resp.json());
    else
      return this.http.post("http://localhost:8080/saveClientPhysique",client)//,client.Listclient
        .map(resp=>resp.json());
  }
  deleteClient(client:number)
  {
    return this.http.delete("http://localhost:8080/Clients/"+client);
  }
  addEnfantToClient(enfant:Enfant,numclient:number)
  {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addEnfantToClient/"+numclient,enfant)
      .map(resp=>resp.json());
  }
  /*
 */
}
