import { Component } from '@angular/core';
import {HeartbeatPlayerService} from './music/heartbeat-player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public player: HeartbeatPlayerService) {}
}
