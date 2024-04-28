import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }, 
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) }, 
  { path: 'receipes', loadChildren: () => import('./receipes/receipes.module').then(m => m.ReceipesModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
