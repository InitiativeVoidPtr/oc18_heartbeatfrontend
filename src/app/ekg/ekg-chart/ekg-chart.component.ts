import {Component, Input, OnInit} from '@angular/core';
import {Heartbeat} from '../heartbeat';
import {Device} from '../device';

@Component({
  selector: 'app-ekg-chart',
  templateUrl: './ekg-chart.component.html',
  styleUrls: ['./ekg-chart.component.css']
})
export class EkgChartComponent implements OnInit {

  private _devices: Device[];
  private _data: Map<string, Heartbeat[]>;

  results = [];

  constructor() {
  }

  @Input()
  set data(value: Map<string, Heartbeat[]>) {
    this._data = value;
    this._data.forEach( (val, key) => {
      this.updateDeviceResults(key);
    });

    this.setResultsUpdated();
  }

  private updateDeviceResults(key) {
    const deviceResult = this.results.find(result => result.id === key);
    if (deviceResult) {
      deviceResult.series = this._data.get(key).map(heartbeat => {
        return {value: heartbeat.bpm, name: heartbeat.timestamp.toTimeString()};
      });
    }
  }

  @Input()
  set devices(value: Device[]) {
    this._devices = value;
    this._devices.forEach(device => {
      this.pushToResultsIfNotPresent(device);
    });

    this.setResultsUpdated();
  }

  private pushToResultsIfNotPresent(device) {
    const deviceExists = this.results.some(result => result.id === device.id);
    if (!deviceExists) {
      this.results.push({
        id: device.id,
        name: device.name,
        series: []
      });
    }
  }

  private setResultsUpdated() {
    this.results = [...this.results];
  }

  ngOnInit() {
  }

}
