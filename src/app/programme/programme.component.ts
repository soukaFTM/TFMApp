import { Component, OnInit } from '@angular/core';
import {Programme} from "../../model/model.Programme";
import {ProgrammeService} from "../../services/programme.service";
import {Http} from "@angular/http";
import { ProduitsService } from '../../services/produits.service';
import { Produit } from '../../model/model.Produit';
import { Groupe } from '../../model/model.Groupe';
import { AbstractProduit } from '../../model/model.AbstractProduit';
import { Formateur } from '../../model/model.Formateur';
import { GroupeComponent } from '../groupe/groupe.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {
  pageProgrammes:Array<Programme> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Programme:Programme=new Programme();
  
  action:string="Sauvgarder";
  actionGroupe:string="Sauvgarder";
  programmeDetail:Programme = new Programme();
  listProduit:Array<Produit>;
  listResponsable:Array<Formateur>;
  constructor(private http:Http,public ProgrammeService:ProgrammeService, public produitservice:ProduitsService
  ,public router:Router) { }
  groupe:Groupe=new Groupe();
  ngOnInit() {
    this.searchProgrammes();
    this.GetProduits();
    
  }

  GetProduits()
  {
    this.produitservice.getAlltypeOfProduits()
      .subscribe(data=>{
        console.log(data);
        this.listProduit=data;
      },err=>{
        console.log(err);
      })
  }

  DetailGroupe(id:number)
  {
    this.router.navigate(["groupe",id]);
  }

  GetResponsables(produit:AbstractProduit)
  {
    this.ProgrammeService.getAllResponsableForProgramme(produit.numProduit)
      .subscribe(data=>{
        console.log(data);
        this.listResponsable=data;
      },err=>{
        console.log(err);
      })
  }
  showProgrammeDetail(programme:Programme)
  {
    this.programmeDetail=programme;
    this.GetResponsables(this.programmeDetail.produit);
  }
  searchProgrammes(){
    this.ProgrammeService.getProgrammes(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageProgrammes=data.content;
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
    this.searchProgrammes();
  }
  saveProgramme(){
    this.ProgrammeService.saveProgramme(this.Programme)
      .subscribe(data=>{
        console.log(data);
        this.searchProgrammes();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateProgramme (programme:Programme){
    this.Programme=programme;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateProgramme(){
    this.ProgrammeService.saveProgramme(this.Programme)
      .subscribe(data=>{
        this.searchProgrammes();
        this.Programme=new Programme();
        this.action = "Sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionProgramme (){
    if (this.action == "Sauvgarder")
    {
      this.saveProgramme();
    } else {

      this.UpdateProgramme();
    }
  }
  deleteProgramme(id:number){
    this.ProgrammeService.deleteProgramme(id)
      .subscribe(data=>{
        console.log(data);
        this.searchProgrammes();
      },err=>{
        console.log(err);
      })
  }

  test()
  {

  }
  gestionGroupe (){
    if (this.actionGroupe == "Sauvgarder")
    {
      alert(this.groupe.heureDebut);

      this.addGroupeToProgramme();
      this.groupe= new Groupe();
    } else {
      //this.UpdateGroupe();
    }
  }
  addGroupeToProgramme()
  {
    return this.ProgrammeService.addGroupeToProgramme(this.groupe,this.programmeDetail.codeProgramme)
      .subscribe(data=>{
        console.log(data);
        this.programmeDetail=data;
        this.searchProgrammes();
      },err=>{
        console.log(err);
      })
  }
}
