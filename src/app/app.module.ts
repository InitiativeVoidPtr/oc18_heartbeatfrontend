import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {EkgModule} from './ekg/ekg.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule, BrowserAnimationsModule, EkgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
