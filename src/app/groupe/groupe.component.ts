import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { GroupeService } from '../../services/groupe.service';
import { Router } from '@angular/router';
import { Groupe } from '../../model/model.Groupe';
import { Projet } from '../../model/model.Projet';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  idGroupe:number;
  groupe:Groupe;
  listeProjets:any;
  selectedProjet:Projet;
  constructor(public activatedRoute:ActivatedRoute,private http:Http,public GroupeService:GroupeService,
    public router:Router) { 
    this.idGroupe=activatedRoute.snapshot.params['id']
  }

  ngOnInit() {
    this.GetGroupe();
    this.GetProjets();
  }
  DetailProjet(id:number)
  {
    this.router.navigate(["realisationProjet",id]);
  }

  GetGroupe(){
    this.GroupeService.getGroupe(this.idGroupe)
      .subscribe(data=>{
        this.groupe=data;
      },err=>{
        console.log(err);
      })
  }

  GetProjets(){
    this.GroupeService.getProjets(this.idGroupe)
      .subscribe(data=>{
        this.listeProjets=data;
      },err=>{
        console.log(err);
      })
  }
  addProjettoGroupe()
  {
    return this.GroupeService.addRealisationProjetToGroupe(this.selectedProjet,this.idGroupe)
    .subscribe(data=>{
      console.log(data);
      this.groupe=data;
    },err=>{
      console.log(err);
    })
  }

}
