import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipesRoutingModule } from './receipes-routing.module';
import { ReceipesComponent } from './receipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUserREceipeComponent } from './components/view-user-receipe/view-user-receipe.component';


@NgModule({
  declarations: [
    ReceipesComponent,
    ViewUserREceipeComponent
  ],
  imports: [
    CommonModule,
    ReceipesRoutingModule ,
    SharedModule
  ]
})
export class ReceipesModule { }
