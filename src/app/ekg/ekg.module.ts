import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkgChartComponent} from './ekg-chart/ekg-chart.component';
import {EkgOverviewComponent} from './ekg-overview/ekg-overview.component';
import {EkgTableComponent} from './ekg-table/ekg-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EkgOverviewComponent, EkgTableComponent, EkgChartComponent],
  exports: [EkgOverviewComponent, EkgTableComponent, EkgChartComponent]
})
export class EkgModule { }
