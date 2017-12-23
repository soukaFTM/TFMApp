import { Component, OnInit } from '@angular/core';
import {Seance} from "../../model/model.Seance";
import {SeanceService} from "../../services/seance.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit {
  pageSeances:Array<Seance> ;
  motCle:string="";
  Currentpage:number=0;
  size:number=10;
  pages:Array<number>;
  Seance:Seance=new Seance();
  action:string="Sauvgarder";


  constructor(private http:Http,public SeanceService:SeanceService) { }

  ngOnInit() {
    this.searchSeances();
  }

  searchSeances(){
    this.SeanceService.getSeances(this.motCle,this.Currentpage,this.size)
      .subscribe(data=>{
        console.log(data.content);
        this.pageSeances=data.content;
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
    this.searchSeances();
  }
  saveSeance(){
    this.SeanceService.saveSeance(this.Seance)
      .subscribe(data=>{
        console.log(data);
        this.searchSeances();
      },err=>{
        console.log(err);
      })
  }
  GetUpdateSeance (Seance:Seance){
    this.Seance=Seance;
    this.action="modifier"
    document.getElementById("btnSave").setAttribute("value", "Modifier");
  }
  UpdateSeance(){
    this.SeanceService.saveSeance(this.Seance)
      .subscribe(data=>{
        this.searchSeances();
        this.Seance=new Seance();
        this.action = "sauvgarder";
        document.getElementById("btnSave").setAttribute("value", "Sauvgarder");
      },err=>{
        console.log(err);
      })

  }
  gestionSeance (){
    if (this.action == "sauvgarder")
    {
      this.saveSeance();
    } else {

      this.UpdateSeance();
    }
  }
  deleteSeance(id:number){
    this.SeanceService.deleteSeance(id)
      .subscribe(data=>{
        console.log(data);
        this.searchSeances();
      },err=>{
        console.log(err);
      })
  }
}
