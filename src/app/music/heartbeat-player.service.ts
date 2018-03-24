import {Injectable} from '@angular/core';
import {Note} from './note';

declare var require: any;
const Tone = require('tone');

@Injectable()
export class HeartbeatPlayerService {

  private static MAX_MIDI_VALUE = 126;
  private static MIN_MIDI_VALUE = 0;

  maxBpmValue = 150;
  minBpmValue = 30;
  scale = ['C', 'D', 'E', 'G', 'A'];

  synth;

  constructor() {
    this.synth = new Tone.PolySynth(10).toMaster();
  }

  mapBpmToNote(bpm: number): Note {
    const note = new Note(this.transformBpmToMidiValue(bpm));
    return this.mapNoteToPentatonicScale(note);
  }

  playNote(note: Note) {
    this.synth.triggerAttackRelease(note.toString(), '2n');
  }

  private mapNoteToPentatonicScale(note: Note) {
    return note; // TODO
  }

  private transformBpmToMidiValue(bpm: number): number {
    const scale = (HeartbeatPlayerService.MAX_MIDI_VALUE - HeartbeatPlayerService.MIN_MIDI_VALUE)
      / (this.maxBpmValue - this.minBpmValue);
    return Math.round((bpm - this.minBpmValue) * scale);
  }
}
