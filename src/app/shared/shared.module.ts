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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ViewComponent } from './components/view/view.component';
import {MatSelectModule} from '@angular/material/select';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';





//

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteComponent,
    ViewComponent,
    NoDataComponent,
    LogoutComponent,
    ProfileComponent,
    UpdateProfileComponent,
   
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
    MatFormFieldModule,MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,

    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })









    
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
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule ,
    NoDataComponent,
  
    MatCardModule,
    NgxSpinnerModule 
  ]
})
export class SharedModule { }
