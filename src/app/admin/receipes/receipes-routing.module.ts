import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceipesComponent } from './receipes.component';

const routes: Routes = [{ path: '', component: ReceipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceipesRoutingModule { }
