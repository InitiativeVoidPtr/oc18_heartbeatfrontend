import {Component, OnInit} from '@angular/core';
import {Device} from '../device';
import {Heartbeat} from '../heartbeat';
import {BackendService} from '../backend.service';
import {HeartbeatPlayerService} from '../../music/heartbeat-player.service';

@Component({
  selector: 'app-ekg-overview',
  templateUrl: './ekg-overview.component.html',
  styleUrls: ['./ekg-overview.component.css']
})
export class EkgOverviewComponent implements OnInit {

  public devices: Device[] = [];
  public beatMap: Map<string, Heartbeat[]> = new Map<string, Heartbeat[]>();

  constructor(private backendService: BackendService, private player: HeartbeatPlayerService) {
    this.backendService.getDevices().subscribe(devices => {
      this.devices = devices;

      this.devices.forEach(device => {
        this.subscribeToDeviceHeartbeats(device);
      });
    });

  }

  private subscribeToDeviceHeartbeats(device) {
    this.backendService.getHeartbeatsForDevice(device.id, 10).subscribe(heartbeats => {
      this.beatMap.set(device.id, heartbeats.map(beat => {
        beat.note = this.player.mapBpmToNote(beat.bpm);
        return beat;
      }));
      this.beatMap = new Map(this.beatMap);
    });
  }

  deviceById(id: string): Device {
    return this.devices.find(device => device.id === id);
  }

  ngOnInit() {
  }

}