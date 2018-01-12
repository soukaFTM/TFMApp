///<reference path="../services/promotions.service.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PromotionsComponent } from './promotions/promotions.component';
import {ProduitsComponent} from "./produits/produits.component";
import {RouterModule,Routes} from "@angular/router";
import {HttpModule} from "@angular/http";
import {ProduitsService} from "../services/produits.service";
import {PromotionsService} from "../services/promotions.service";
import {FormsModule} from "@angular/forms";
import { PackComponent } from './pack/pack.component';
import {PacksService} from "../services/pack.service";
import { ClientsComponent } from './clients/clients.component';
import {ClientService} from "../services/client.service";
import { FormateurComponent } from './formateur/formateur.component';
import { ProgrammeComponent } from './programme/programme.component';
import {FormateurService} from "../services/formateur.service";
import {SeanceService} from "../services/seance.service";
import {ProgrammeService} from "../services/programme.service";
import { CommandeComponent } from './commande/commande.component';
import {CommandeService} from "../services/commande.service";
import { GroupeComponent } from './groupe/groupe.component';
import { RealisationProjetComponent } from './realisation-projet/realisation-projet.component';
import { CompetenceComponent } from './competence/competence.component';
import { ProjetComponent } from './projet/projet.component';
import { CompetenceService } from '../services/competence.service';
import { ProjetService } from '../services/projet.service';
import { GroupeService } from '../services/groupe.service';
import { RealisationProjet } from '../model/model.RealisationProjet';
import { RealisationProjetService } from '../services/realisationProjet.service';
import { suiviMensuelle } from '../model/model.suiviMensuelle';
import { suiviMensuelleService } from '../services/suiviMensuelle.service';
import { SuiviFormateurComponent } from './suiviFormateur/suiviFormateur.component';

const appRoutes:Routes = [
  {path : 'produits' , component: ProduitsComponent},
  {path : 'pack' , component: PackComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'formateurs', component: FormateurComponent},
  {path: 'programmes', component: ProgrammeComponent},
  {path: 'commandes/:id', component: CommandeComponent},
  {path: 'competences', component: CompetenceComponent},
  {path: 'projets', component: ProjetComponent},
  {path: 'groupe/:id', component: GroupeComponent},
  {path: 'realisationProjet/:id', component: RealisationProjetComponent},
  {path: 'suiviFormateur/:id', component: SuiviFormateurComponent},
  {path: '' , redirectTo :'/produits' , pathMatch:'full'}
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    PromotionsComponent,
    PackComponent,
    ClientsComponent,
    FormateurComponent,
    ProgrammeComponent,
    SuiviFormateurComponent,
    CommandeComponent,
    GroupeComponent,
    RealisationProjetComponent,
    CompetenceComponent,
    ProjetComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),HttpModule,
    FormsModule
  ],
  providers: [ProduitsService,PromotionsService,PacksService,ClientService,FormateurService,
    SeanceService,ProgrammeService,CommandeService,CompetenceService,ProjetService,GroupeService,RealisationProjetService,
    suiviMensuelleService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
