import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipesRoutingModule } from './receipes-routing.module';
import { ReceipesComponent } from './receipes.component';


@NgModule({
  declarations: [
    ReceipesComponent
  ],
  imports: [
    CommonModule,
    ReceipesRoutingModule
  ]
})
export class ReceipesModule { }
