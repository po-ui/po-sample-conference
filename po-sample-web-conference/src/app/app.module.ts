import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { LoginService } from './login/login.service';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
