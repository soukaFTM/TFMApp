import { Component, OnInit } from '@angular/core';
import {Programme} from "../../model/model.Programme";
import {ProgrammeService} from "../../services/programme.service";
import {Http} from "@angular/http";

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


  constructor(private http:Http,public ProgrammeService:ProgrammeService) { }

  ngOnInit() {
    this.searchProgrammes();
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
  GetUpdateProgramme (Programme:Programme){
    this.Programme=Programme;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateProgramme(){
    this.ProgrammeService.saveProgramme(this.Programme)
      .subscribe(data=>{
        this.searchProgrammes();
        this.Programme=new Programme();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionProgramme (){
    if (this.action == "sauvgarder")
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
}
