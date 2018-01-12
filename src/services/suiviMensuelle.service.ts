import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Competence} from "../model/model.Competence";
import { suiviMensuelle } from "../model/model.suiviMensuelle";

@Injectable()
export class  suiviMensuelleService
{
  constructor(public  http:Http){}

  
  getFormateur(idFormateur:number)
  {
    return this.http.get("http://localhost:8080/getFormateurByID/"+idFormateur)
    .map(resp=>resp.json());

  }
  getSuiviMensuelleFormateur(idFormateur:number)
  {
    return this.http.get("http://localhost:8080/AllSuiviOfFormateur/"+idFormateur)
      .map(resp=>resp.json());

  }


  paiementFormateur(suivi:suiviMensuelle)
  {
    return this.http.put("http://localhost:8080/paiementFormateur",suivi);
  }

}
