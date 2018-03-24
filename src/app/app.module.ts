import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {EkgOverviewComponent} from './ekg-overview/ekg-overview.component';
import { EkgTableComponent } from './ekg-table/ekg-table.component';
import { EkgChartComponent } from './ekg-chart/ekg-chart.component';


@NgModule({
  declarations: [
    AppComponent, EkgOverviewComponent, EkgTableComponent, EkgChartComponent
  ],
  imports: [
    BrowserModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
