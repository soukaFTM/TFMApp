import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Formateur} from "../model/model.Formateur";


@Injectable()
export class  FormateurService
{
  constructor(public  http:Http){}

  getFormateurs(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageFormateur?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherFormateur?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveFormateur(formateur:Formateur,type:string)
  {
    return this.http.post("http://localhost:8080/saveFormateur",formateur)//,Formateur.ListFormateur
      .map(resp=>resp.json());

  }
  deleteFormateur(formateur:number)
  {
    return this.http.delete("http://localhost:8080/Formateurs/"+formateur);
  }


}
