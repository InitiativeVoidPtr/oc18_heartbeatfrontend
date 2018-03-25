declare var require: any;
const MIDIUtils = require('midiutils');

export class Note {

  name: string;
  octave: number;

  constructor(public midiValue: number) {
    const name = MIDIUtils.noteNumberToName(midiValue);
    this.formatNameAndSetAttributes(name);
  }

  private formatNameAndSetAttributes(name: string) {
    let nameParts = name.split('-');
    if (nameParts.length === 2) {
      this.name = nameParts[0];
      this.octave = Number(nameParts[1]);
    } else if (nameParts.length === 1) {
      nameParts = name.split('#');
      this.name = nameParts[0] + '#';
      this.octave = Number(nameParts[1]);
    } else {
      throw Error('Unknown note name ' + name);
    }
  }

  toString() {
    return this.name + this.octave;
  }
}
