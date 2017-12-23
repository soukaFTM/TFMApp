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

const appRoutes:Routes = [
  {path : 'produits' , component: ProduitsComponent},
  {path : 'pack' , component: PackComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: '' , redirectTo :'/produits' , pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    PromotionsComponent,
    PackComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),HttpModule,
    FormsModule
  ],
  providers: [ProduitsService,PromotionsService,PacksService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
