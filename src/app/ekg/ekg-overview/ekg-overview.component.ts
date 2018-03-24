import {Component, OnInit} from '@angular/core';
import {Device} from '../device';
import {Heartbeat} from '../heartbeat';

@Component({
  selector: 'app-ekg-overview',
  templateUrl: './ekg-overview.component.html',
  styleUrls: ['./ekg-overview.component.css']
})
export class EkgOverviewComponent implements OnInit {

  public devices: Device[] = [];
  public beatMap: Map<string, Heartbeat[]> = new Map<string, Heartbeat[]>();

  constructor() {
    const device = new Device('42', 'Test');
    this.beatMap.set(device.id, [
      new Heartbeat(new Date(), 72),
      new Heartbeat(new Date(), 120),
      new Heartbeat(new Date(), 55),
      new Heartbeat(new Date(), 56),
      new Heartbeat(new Date(), 72)
    ]);

    this.devices.push(device);

    console.log(this.beatMap.get('42'));
  }

  ngOnInit() {
  }

}
