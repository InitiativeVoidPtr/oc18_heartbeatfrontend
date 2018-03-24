import {Component, Input, OnInit} from '@angular/core';
import {Heartbeat} from '../heartbeat';

@Component({
  selector: 'app-ekg-table',
  templateUrl: './ekg-table.component.html',
  styleUrls: ['./ekg-table.component.css']
})
export class EkgTableComponent implements OnInit {

  @Input()
  data: Heartbeat[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log(this.data);
  }

}
