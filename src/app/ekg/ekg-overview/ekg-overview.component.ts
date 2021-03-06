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

  constructor(private backendService: BackendService, public player: HeartbeatPlayerService) {
    this.backendService.getDevices().subscribe(devices => {
      this.devices = devices;

      this.devices.forEach(device => {
        this.subscribeToDeviceHeartbeats(device);
      });
    });

  }

  private subscribeToDeviceHeartbeats(device) {
    this.backendService.getHeartbeatsForDevice(device.id, 10).subscribe(heartbeats => {
      if (heartbeats && heartbeats.length > 0) {
        let heartbeatsWithNotes = this.addNotesToHeartbeats(heartbeats);
        this.sortHeartBeatsByTimestampDesc(heartbeatsWithNotes);
        heartbeatsWithNotes = heartbeatsWithNotes.slice(0, 10);

        this.beatMap.set(device.id, heartbeatsWithNotes);
        this.beatMap = new Map(this.beatMap);
        this.player.playNote(heartbeatsWithNotes[0].note);
      }
    });
  }

  private sortHeartBeatsByTimestampDesc(heartbeatsWithNotes: any) {
    heartbeatsWithNotes.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });
  }

  private addNotesToHeartbeats(heartbeats) {
    return heartbeats.map(beat => {
      beat.note = this.player.mapBpmToNote(beat.bpm);
      return beat;
    });
  }

  deviceById(id: string): Device {
    return this.devices.find(device => device.id === id);
  }

  ngOnInit() {
  }

}
