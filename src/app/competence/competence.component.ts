import { Component, OnInit } from '@angular/core';
import { Competence } from '../../model/model.Competence';
import { CompetenceService } from '../../services/competence.service';
import {Http} from "@angular/http";

@Component({
  selector: 'app-Competence',
  templateUrl: './Competence.component.html',
  styleUrls: ['./Competence.component.css']
})
export class CompetenceComponent implements OnInit {
  pageCompetences:Array<Competence> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Competence:Competence=new Competence();
  action:string="Sauvgarder";


  constructor(private http:Http,public CompetenceService:CompetenceService) { }

  ngOnInit() {
    this.searchCompetences();
  }

  searchCompetences(){
    this.CompetenceService.getCompetences(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageCompetences=data.content;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  newSearch(){
    this.Currentpage=0;
  }
  goToPage(indexPage:number){
    this.Currentpage=indexPage;
    this.searchCompetences();
  }
  saveCompetence(){
    this.CompetenceService.saveCompetence(this.Competence)
      .subscribe(data=>{
        console.log(data);
        this.searchCompetences();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateCompetence (Competence:Competence){
    this.Competence=Competence;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateCompetence(){
    this.CompetenceService.saveCompetence(this.Competence)
      .subscribe(data=>{
        this.searchCompetences();
        this.Competence=new Competence();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionCompetence (){
    if (this.action == "sauvgarder")
    {
      this.saveCompetence();
    } else {

      this.UpdateCompetence();
    }
  }
  deleteCompetence(id:number){
    this.CompetenceService.deleteCompetence(id)
      .subscribe(data=>{
        console.log(data);
        this.searchCompetences();
      },err=>{
        console.log(err);
      })
  }
}
