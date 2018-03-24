import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Device} from './device';
import {Observable} from 'rxjs/Observable';
import {Heartbeat} from './heartbeat';

@Injectable()
export class BackendService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {

  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.backendUrl + '/devices');
  }

  getHeartbeatsForDevice(id: string, pageSize: number): Observable<Heartbeat[]> {
    return this.http.get<Heartbeat[]>(this.backendUrl + '/devices' + id + '/heartbeats?size=' + pageSize);
  }

}
