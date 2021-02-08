import { Entry, IEntry } from '../models/entry';

export class EntryController {
    private entryModel: Entry;

    constructor() {
      this.entryModel = new Entry();
    }

    public addEntry(entry: IEntry): Promise<IEntry> {
      return this.entryModel.add(entry);
    }
}
