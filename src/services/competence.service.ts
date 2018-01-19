import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Competence} from "../model/model.Competence";

@Injectable()
export class  CompetenceService
{
  constructor(public  http:Http){}

  
  getAllCompetences()
  {
    return this.http.get("http://localhost:8080/competences")
      .map(resp=>resp.json());

  }

  getCompetences(motCle:string,page:number,size:number)
  {
    if(motCle=="")
      return this.http.get("http://localhost:8080/PageCompetences?page="+page+"&size="+size)
        .map(resp=>resp.json());
    else
      return this.http.get("http://localhost:8080/ChercherCompetences?mc="+motCle+"&page="+page+"&size="+size)
        .map(resp=>resp.json());

  }
  saveCompetence(Competence:Competence)
  {
    return this.http.post("http://localhost:8080/saveCompetence",Competence)//,Competence.ListCompetence
      .map(resp=>resp.json());

  }
  deleteCompetence(competence:number)
  {
    return this.http.delete("http://localhost:8080/Competences/"+competence);
  }

}
