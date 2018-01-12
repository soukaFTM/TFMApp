
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Groupe} from "../model/model.Groupe";
import {Formateur} from "../model/model.Formateur";
import {Seance} from "../model/model.Seance";
import {RealisationProjet} from "../model/model.RealisationProjet";
import { Projet } from "../model/model.Projet";
import { Enfant } from "../model/model.Enfant";

@Injectable()
export class  GroupeService {
  constructor(public  http: Http) {
  }

  getGroupe(id:number) {
    return this.http.get("http://localhost:8080/Groupe/"+id)
      .map(resp => resp.json());
}


findGroupeOfProjet(id:number) {
  return this.http.get("http://localhost:8080/findGroupeOfProjet/"+id)
    .map(resp => resp.json());
}

getProjets(id:number) {
  return this.http.get("http://localhost:8080/ProjetsDuGroupe/"+id)
    .map(resp => resp.json());
}

  addRealisationProjetToGroupe(projet: Projet, numGroupe: number) {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addRealisationProjetToGroupe/" + numGroupe, projet)
      .map(resp => resp.json());
  }

  addEnfantsToGroupe(ListEnfant:Array<Enfant>, numGroupe: number) {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addEnfantsToGroupe/" + numGroupe, ListEnfant)
      .map(resp => resp.json());
  }


}
