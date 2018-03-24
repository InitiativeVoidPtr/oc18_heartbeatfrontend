import {Note} from '../music/note';

export class Heartbeat {

  note: Note;

  constructor(public timestamp: Date, public bpm: number) {
  }
}
