export class Heartbeat {

  static fromJSON(json: string): Heartbeat {
    const data = JSON.parse(json);
    return new Heartbeat(data.timestamp, data.bpm);
  }

  constructor(public timestamp: Date, public bpm: number) {}
}
