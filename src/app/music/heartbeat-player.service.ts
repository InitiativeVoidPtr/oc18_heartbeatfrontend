import {Injectable} from '@angular/core';
import {Note} from './note';

declare var require: any;
const Tone = require('tone');

@Injectable()
export class HeartbeatPlayerService {

  private static MAX_MIDI_VALUE = 107;
  private static MIN_MIDI_VALUE = 36; // tones below are too deep for laptop speakers

  mute = true;
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
    if (!this.mute) {
      this.synth.triggerAttackRelease(note.toString(), '2n');
    }
  }

  private mapNoteToPentatonicScale(note: Note) {
    if (this.isInScale(note)) {
      return note;
    }

    for (let i = 0; i < 4; i++) {
      const lowerValue = note.midiValue - i;
      if (lowerValue >= HeartbeatPlayerService.MIN_MIDI_VALUE) {
        const lower = new Note(lowerValue);
        if (this.isInScale(lower)) {
          return lower;
        }
      }

      const higherValue = note.midiValue + i;
      if (higherValue <= HeartbeatPlayerService.MAX_MIDI_VALUE) {
        const higher = new Note(higherValue);
        if (this.isInScale(higher)) {
          return higher;
        }
      }
    }

    throw new Error('Note ' + note.toString() + ' cannot be mapped to scale');
  }

  private isInScale(current: Note) {
    return this.scale.indexOf(current.name) >= 0;
  }

  private transformBpmToMidiValue(bpm: number): number {
    const borderedBpm = this.assureIsInBorders(bpm);
    const scale = (HeartbeatPlayerService.MAX_MIDI_VALUE - HeartbeatPlayerService.MIN_MIDI_VALUE)
      / (this.maxBpmValue - this.minBpmValue);
    return Math.round((borderedBpm - this.minBpmValue) * scale) + HeartbeatPlayerService.MIN_MIDI_VALUE;
  }

  private assureIsInBorders(bpm: number): number {
    if (bpm >= this.maxBpmValue) {
      return this.maxBpmValue;
    }
    if (bpm <= this.minBpmValue) {
      return this.minBpmValue;
    }
    return bpm;
  }
}
