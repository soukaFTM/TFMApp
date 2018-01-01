import { Component, OnInit } from '@angular/core';
import { Projet } from '../../model/model.Projet';
import { ProjetService } from '../../services/projet.service';
import {Http} from "@angular/http";

@Component({
  selector: 'app-Projet',
  templateUrl: './Projet.component.html',
  styleUrls: ['./Projet.component.css']
})
export class ProjetComponent implements OnInit {
  pageProjets:Array<Projet> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Projet:Projet=new Projet();
  action:string="Sauvgarder";


  constructor(private http:Http,public ProjetService:ProjetService) { }

  ngOnInit() {
    this.searchProjets();
  }

  searchProjets(){
    this.ProjetService.getProjets(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageProjets=data.content;
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
    this.searchProjets();
  }
  saveProjet(){
    this.ProjetService.saveProjet(this.Projet)
      .subscribe(data=>{
        console.log(data);
        this.searchProjets();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateProjet (Projet:Projet){
    this.Projet=Projet;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateProjet(){
    this.ProjetService.saveProjet(this.Projet)
      .subscribe(data=>{
        this.searchProjets();
        this.Projet=new Projet();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionProjet (){
    if (this.action == "sauvgarder")
    {
      this.saveProjet();
    } else {

      this.UpdateProjet();
    }
  }
  deleteProjet(id:number){
    this.ProjetService.deleteProjet(id)
      .subscribe(data=>{
        console.log(data);
        this.searchProjets();
      },err=>{
        console.log(err);
      })
  }
}
