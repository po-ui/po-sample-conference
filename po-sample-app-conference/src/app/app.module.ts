import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { PoSyncModule } from '@po-ui/ng-sync';
import { PoStorageModule } from '@po-ui/ng-storage';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { LectureDetailModule } from './lecture-detail/lecture-detail.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    PoModule,
    HammerModule,
    PoStorageModule.forRoot(),
    PoSyncModule,
    LectureDetailModule,
    PoPageLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    PoTemplatesModule
  ],
  declarations: [AppComponent],
  providers: [InAppBrowser, SplashScreen, StatusBar],
  bootstrap: [AppComponent]
})
export class AppModule {}
