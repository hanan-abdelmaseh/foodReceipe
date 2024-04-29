import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { RouterModule } from '@angular/router';
//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteComponent } from './components/delete/delete.component';
//angular material 
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ViewComponent } from './components/view/view.component';




//

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteComponent,
    ViewComponent
  ],
  imports: [
    CommonModule ,
    NgxDropzoneModule,
    RouterModule ,
    //material
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,MatPaginatorModule











    
  ],
  exports:[
    NgxDropzoneModule ,
    SidebarComponent,
    NavbarComponent ,
    HomeComponent,
    //material 
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  

  ]
})
export class SharedModule { }
