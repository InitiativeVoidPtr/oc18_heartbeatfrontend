import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {Device} from './device';
import {Heartbeat} from './heartbeat';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MockBackendService extends BackendService {
  private static INTERVAL = 1000;

  private static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getDevices(): Observable<Device[]> {
    return Observable.create(observer => {
      observer.next([
        new Device('42', 'Device 0'),
        new Device('43', 'Device 1'),
        new Device('44', 'Device 2')
      ]);
    });
  }

  getHeartbeatsForDevice(id: string, pageSize: number): Observable<Heartbeat[]> {
    return Observable.create(observer => {
      const randomBeats = [];
      setInterval(() => {
        this.addNewRandomBeat(randomBeats, pageSize, observer);
      }, MockBackendService.INTERVAL);
    });
  }

  private addNewRandomBeat(randomBeats: any[], pageSize: number, observer) {
    randomBeats.push(new Heartbeat(new Date(), MockBackendService.getRandomInt(70, 120)));
    if (!pageSize || randomBeats.length >= pageSize) {
      randomBeats.splice(0, 1);
    }
    observer.next(randomBeats);
  }
}
