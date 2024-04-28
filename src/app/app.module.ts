import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//to contact with api 
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// toaster 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
    HttpClientModule ,
    ReactiveFormsModule ,
    FormsModule ,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [
    {
    provide :HTTP_INTERCEPTORS ,
    useClass:GlobalInterceptor ,
    multi:true // to use other interceptors 
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
