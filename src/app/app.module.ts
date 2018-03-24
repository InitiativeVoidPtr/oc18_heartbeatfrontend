import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {EkgModule} from './ekg/ekg.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule, EkgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
