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
    return this.http.get(this.backendUrl + '/devices/' + id + '/heartbeats?size=' + pageSize)
      .map(data =>
        data['_embedded']['heartbeats']
          .map(beat => new Heartbeat(new Date(beat['timeStamp']), beat['value'])));
  }

}
