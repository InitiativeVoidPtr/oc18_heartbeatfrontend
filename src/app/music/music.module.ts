import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeartbeatPlayerService} from './heartbeat-player.service';
import {Note} from './note';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [HeartbeatPlayerService],
  exports: []
})
export class MusicModule { }
