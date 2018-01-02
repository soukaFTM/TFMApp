import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Projet} from "../model/model.Projet";

@Injectable()
export class  ProjetService
{
  constructor(public  http:Http){}

  getAllProjets()
  {
    return this.http.get("http://localhost:8080/projets")
      .map(resp=>resp.json());

  }

  getProjets(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageProjet?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherProjet?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveProjet(Projet:Projet)
  {
    return this.http.post("http://localhost:8080/saveProjet",Projet)//,Projet.ListProjet
      .map(resp=>resp.json());

  }
  deleteProjet(Projet:number)
  {
    return this.http.delete("http://localhost:8080/Projets/"+Projet);
  }
 
}
