import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewFavReceipeComponent } from './components/view-fav-receipe/view-fav-receipe.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    ViewFavReceipeComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule ,
    SharedModule
  ]
})
export class FavoritesModule { }
