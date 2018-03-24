import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkgChartComponent} from './ekg-chart/ekg-chart.component';
import {EkgOverviewComponent} from './ekg-overview/ekg-overview.component';
import {EkgTableComponent} from './ekg-table/ekg-table.component';
import {BackendService} from './backend.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, NgxChartsModule
  ],
  declarations: [EkgOverviewComponent, EkgTableComponent, EkgChartComponent],
  exports: [EkgOverviewComponent, EkgTableComponent, EkgChartComponent],
  providers: [
    {provide: BackendService, useClass: BackendService}
  ]
})
export class EkgModule { }
