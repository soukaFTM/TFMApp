import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {FormateurService} from "../../services/formateur.service";
import {Formateur} from "../../model/model.Formateur";

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


  constructor(private http:Http,public FormateurService:FormateurService) { }

  ngOnInit() {
    this.searchFormateurs();
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
}
