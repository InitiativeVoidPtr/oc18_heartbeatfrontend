import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Device} from './device';
import {Observable} from 'rxjs/Observable';
import {Heartbeat} from './heartbeat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';

@Injectable()
export class BackendService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {

  }

  getDevices(): Observable<Device[]> {
    return Observable.interval(1000)
      .mergeMap(() => this.http.get(this.backendUrl + '/devices')
        .map(data => data['_embedded']['devices']));
  }

  getHeartbeatsForDevice(id: string, pageSize: number): Observable<Heartbeat[]> {
    return Observable.interval(5000)
      .mergeMap(() => {
        return Observable.create((observer) => {
          this.http.get(this.backendUrl + '/devices/' + id + '/heartbeats')
            .map(data => data['_embedded']['heartbeats']
              .map(beat => new Heartbeat(new Date(beat['timeStamp']), beat['value'])))
            .subscribe(value => {
              if (value && value.length > 0) {
                for (let i = 0; i < 5; i++) {
                  const newValue = [...value].slice(i);
                  setTimeout(() => {
                    observer.next(newValue);
                  }, 1000 * (5 - i));
                }
              }
            });
        });
      });
  }

}
