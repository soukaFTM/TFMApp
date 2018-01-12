import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Commande} from "../model/model.Commande";


@Injectable()
export class  CommandeService
{
  constructor(public  http:Http){}

  getCommandes(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageCommande?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherCommande?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  
  reglerPaiment(Commande:Commande)
  {
    return this.http.put("http://localhost:8080/PaimentCommande",Commande)//,Commande.ListCommande
      .map(resp=>resp.json());

  }
  saveCommande(Commande:Commande)
  {
    return this.http.post("http://localhost:8080/saveCommande",Commande)//,Commande.ListCommande
      .map(resp=>resp.json());

  }
  deleteCommande(Commande:number)
  {
    return this.http.delete("http://localhost:8080/Commandes/"+Commande);
  }

  ///////////////////////////////////////////////////////
  getClientsCommands(idClient:number)
  {
    return this.http.get("http://localhost:8080/getClientsCommands/"+idClient)
         .map(resp=>resp.json());
  }
  ///////////////////////////////////////////////////////// 
}
