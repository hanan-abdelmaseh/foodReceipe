import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';


const routes: Routes = [{ path: '', component: UserComponent }, { path: 'receipes', loadChildren: () => import('./receipes/receipes.module').then(m => m.ReceipesModule) }, { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
