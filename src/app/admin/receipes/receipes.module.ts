import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipesRoutingModule } from './receipes-routing.module';
import { ReceipesComponent } from './receipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ADDEDITComponent } from './components/add-edit/add-edit.component';
import { ViewReceipeComponent } from './components/view-receipe/view-receipe.component';



@NgModule({
  declarations: [
    ReceipesComponent,
    ADDEDITComponent,
    ViewReceipeComponent,
  
  ],
  imports: [
    CommonModule,
    ReceipesRoutingModule,
    SharedModule
  ]
})
export class ReceipesModule { }
