
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RealisationProjet} from "../model/model.RealisationProjet";
import {Formateur} from "../model/model.Formateur";
import {Seance} from "../model/model.Seance";

@Injectable()
export class  RealisationProjetService {
  constructor(public  http: Http) {
  }

  getRealisationProjets(motCle: string, page: number, size: number) {
    if (motCle == "")
      return this.http.get("http://localhost:8080/PageRealisationProjet?page=" + page + "&size=" + size)
        .map(resp => resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherRealisationProjet?mc=" + motCle + "&page=" + page + "&size=" + size)
        .map(resp => resp.json());

  }

  saveRealisationProjet(RealisationProjet: RealisationProjet) {
    return this.http.post("http://localhost:8080/saveRealisationProjet", RealisationProjet)//,RealisationProjet.ListRealisationProjet
      .map(resp => resp.json());

  }

  deleteRealisationProjet(RealisationProjet: number) {
    return this.http.delete("http://localhost:8080/RealisationProjets/" + RealisationProjet);
  }


  addSeanceToRealisationProjet(seance: Seance, numRealisationProjet: number) {

    console.log("in service ");
    return this.http.put("http://localhost:8080/addSeanceToRealisationProjet/" + numRealisationProjet, seance)
      .map(resp => resp.json());
  }

  findProduitOfProjet(id:number) {
    return this.http.get("http://localhost:8080/findProduitOfProjet/"+id)
      .map(resp => resp.json());
  }
  
}
