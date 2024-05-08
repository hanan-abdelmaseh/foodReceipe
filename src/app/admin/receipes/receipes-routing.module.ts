import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceipesComponent } from './receipes.component';
import { ADDEDITComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
{ path: '' , redirectTo:"all" , pathMatch:'full'},
{
   path: 'all', component: ReceipesComponent ,
},
{
  path:'addEdit' , component:ADDEDITComponent
},
{ path:'Edit/:id' , component:ADDEDITComponent
  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceipesRoutingModule { }
