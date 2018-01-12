import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { RealisationProjetService } from '../../services/realisationProjet.service';
import { Groupe } from '../../model/model.Groupe';
import { GroupeService } from '../../services/groupe.service';
import { Projet } from '../../model/model.Projet';
import { RealisationProjet } from '../../model/model.RealisationProjet';
import { Seance } from '../../model/model.Seance';
import { Formateur } from '../../model/model.Formateur';
import { ProgrammeService } from '../../services/programme.service';
import { Enfant } from '../../model/model.Enfant';
import { Presence } from '../../model/model.Presence.';
import { forEach } from '@angular/router/src/utils/collection';
import { SeanceService } from '../../services/seance.service';

@Component({
  selector: 'app-realisation-projet',
  templateUrl: './realisation-projet.component.html',
  styleUrls: ['./realisation-projet.component.css']
})
export class RealisationProjetComponent implements OnInit {

  idProjet:number;
  idProduit:number=1;
  listResponsable:Array<Formateur>=null;
  groupe:Groupe;
  projet:RealisationProjet;
  newSeance:boolean=false;
  seance:Seance= new Seance();
  listPresence:Array<Presence> = new Array<Presence>();
  presence:Presence;
  ind:number;

  constructor(public activatedRoute:ActivatedRoute,private http:Http,public RealisationProjetService:RealisationProjetService
    ,public GroupeService:GroupeService, public ProgrammeService:ProgrammeService, public SeanceService:SeanceService,) { 
    this.idProjet=activatedRoute.snapshot.params['id']
  }
  ngOnInit() {
    this.GetGroupe();
    this.GetProduit();
    
  }

  GetGroupe(){
    this.GroupeService.findGroupeOfProjet(this.idProjet)
      .subscribe(data=>{
        this.groupe=data;
        this.GetRealisationProjet();
        this.setPresenceList()

        console.log(data);
      },err=>{
        console.log(err);
      })
  }

  setPresenceList()
  {
    this.groupe.listEnfant.forEach((item, index) => {
      this.presence = new Presence();
      this.presence.enfant = item ;
      this.presence.presence= false;
      this.listPresence.push(this.presence);
   });
  }

  setPresenceEnfant(enfant:Enfant)
  {
    this.listPresence.forEach((item, index) => {
      if(item.enfant.codeEnfant==enfant.codeEnfant)
      {
        if(!item.presence)
          item.presence=true;
        else
          item.presence=false;
      }
      
   });
  }
  countPresence(seance:Seance)
  {
    this.ind=0;
    seance.presenceEnfants.forEach((item, index) => {
      if(item.presence)
        {
          this.ind++;
        }
  });
  return this.ind;
  }


  GetProduit(){
    this.RealisationProjetService.findProduitOfProjet(this.idProjet)
      .subscribe(data=>{
        this.idProduit=data;
        this.GetResponsables(this.idProduit);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  GetRealisationProjet(){
    
    this.groupe.listProjet.forEach((item, index) => {
      if(item.codeRealisation==this.idProjet)
        {
          this.projet=item;
          console.log(this.projet);
          return;
        }
  });
  }

  GetResponsables(idproduit:number)
  {
    this.ProgrammeService.getAllResponsableForProgramme(idproduit)
      .subscribe(data=>{
        console.log("resp list"+data);
        this.listResponsable=data;
      },err=>{
        console.log(err);
      })
  }

  updateSeance(seance:Seance)
  {
    this.newSeance=true;

    this.seance=seance;
    this.listPresence= seance.presenceEnfants;

    this.listPresence.forEach((item, index) => {
      if(item.presence)
      document.getElementById("check"+item.enfant.codeEnfant).setAttribute("checked", "checked");
      else
      document.getElementById("check"+item.enfant.codeEnfant).removeAttribute("checked");
      
   });

    

  }

  NewSeance()
  {
    if(!this.newSeance)
      this.newSeance=true;
    else
      {
        this.seance.presenceEnfants=this.listPresence;
        this.RealisationProjetService.addSeanceToRealisationProjet(this.seance,this.idProjet)
        .subscribe(data=>{
          console.log(data);
          this.projet=data;
          //this.();
          this.newSeance=false;
          this.seance= new Seance();
        },err=>{
          console.log(err);
        })
       
      }
  }
 
  setPresence(enfant:Enfant,idCheck:number)
  {
    this.listPresence[idCheck]
  }
}

