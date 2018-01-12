import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {FormateurService} from "../../services/formateur.service";
import {Formateur} from "../../model/model.Formateur";
import { Competence } from '../../model/model.Competence';
import { CompetenceService } from '../../services/competence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {
  pageFormateurs:Array<Formateur> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Formateur:Formateur=new Formateur();
  action:string="Sauvgarder";
  selectedCompetence:Competence;
  listCompetence:Array<Competence>;


  constructor(private http:Http,public FormateurService:FormateurService, public competenceService:CompetenceService
    ,public router:Router) { }

  ngOnInit() {
    this.searchFormateurs();
    this.getCompetences();
  }

  searchFormateurs(){
    this.FormateurService.getFormateurs(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageFormateurs=data.content;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }

  getCompetences(){
    this.competenceService.getAllCompetences()
      .subscribe(data=>{
        this.listCompetence=data;
      },err=>{
        console.log(err);
      })
  }

  newSearch(){
    this.Currentpage=0;
  }
  goToPage(indexPage:number){
    this.Currentpage=indexPage;
    this.searchFormateurs();
  }
  saveFormateur(){
    this.FormateurService.saveFormateur(this.Formateur)
      .subscribe(data=>{
        console.log(data);
        this.searchFormateurs();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateFormateur (Formateur:Formateur){
    this.Formateur=Formateur;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateFormateur(){
    this.FormateurService.saveFormateur(this.Formateur)
      .subscribe(data=>{
        this.searchFormateurs();
        this.Formateur=new Formateur();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionFormateur (){
    if (this.action == "sauvgarder")
    {
      this.saveFormateur();
    } else {

      this.UpdateFormateur();
    }
  }
  deleteFormateur(id:number){
    this.FormateurService.deleteFormateur(id)
      .subscribe(data=>{
        console.log(data);
        this.searchFormateurs();
      },err=>{
        console.log(err);
      })
  }

  addCompetenceToFormateur(Formateur:any)
  {
    return this.FormateurService.addCompetenceToFormateur(this.selectedCompetence,Formateur.codeFormateur)
      .subscribe(data=>{
        console.log(data);
        this.Formateur=data;
        this.searchFormateurs();
      },err=>{
        console.log(err);
      })
  }
  removeCompetenceFromFormateur(formateur:any,Competence:Competence)
  {
    return this.FormateurService.removeCompetenceFromFormateur(formateur.codeFormateur,Competence)
      .subscribe(data=>{
        console.log(data);
        this.Formateur=data;
        this.searchFormateurs();
      },err=>{
        console.log(err);
      })
  }


  suiviMensuelle(formateur:Formateur)
  {
    this.router.navigate(["suiviFormateur",formateur.codeFormateur]);
  }
}
