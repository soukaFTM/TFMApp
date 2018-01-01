import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { RealisationProjetService } from '../../services/realisationProjet.service';

@Component({
  selector: 'app-realisation-projet',
  templateUrl: './realisation-projet.component.html',
  styleUrls: ['./realisation-projet.component.css']
})
export class RealisationProjetComponent implements OnInit {

  idProjet:number;
  constructor(public activatedRoute:ActivatedRoute,private http:Http,public RealisationProjetService:RealisationProjetService) { 
    this.idProjet=activatedRoute.snapshot.params['id']
  }
  ngOnInit() {
  }

}
