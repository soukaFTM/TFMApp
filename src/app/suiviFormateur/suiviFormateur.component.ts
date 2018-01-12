import { Component, OnInit } from '@angular/core';
import {suiviMensuelle} from "../../model/model.suiviMensuelle";
import {suiviMensuelleService} from "../../services/suiviMensuelle.service";
import {Http} from "@angular/http";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Formateur } from '../../model/model.Formateur';

@Component({
  selector: 'app-suiviFormateur',
  templateUrl: './suiviFormateur.component.html',
  styleUrls: ['./suiviFormateur.component.css']
})
export class SuiviFormateurComponent implements OnInit {
  suivi:Array<suiviMensuelle> ;

  idFormateur:number;
  formateur:Formateur = new Formateur();
  constructor(private http:Http,public SuiviFormateurService:suiviMensuelleService ,
    public router:Router,public activatedRoute:ActivatedRoute) { 
    this.idFormateur=activatedRoute.snapshot.params['id']
    }

  ngOnInit() {
    this.GetFormateur();
  }

  GetFormateur(){
    this.SuiviFormateurService.getFormateur(this.idFormateur)
    .subscribe(data=>{
      this.formateur=data;
    },err=>{
      console.log(err);
    })
  }
  GetSuivi(){
    this.SuiviFormateurService.getSuiviMensuelleFormateur(this.idFormateur)
      .subscribe(data=>{
        this.formateur.suivi=data;

      },err=>{
        console.log(err);
      })
  }
  reglerPaiment(suivi:suiviMensuelle){
    this.SuiviFormateurService.paiementFormateur(suivi)
      .subscribe(data=>{
        console.log(data);
        this.GetSuivi();

      },err=>{
        console.log(err);
      })
    
    
  }

}
