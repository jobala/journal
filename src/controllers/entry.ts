import { Entry, IEntry, IUpdatePayload } from '../models/entry';

class EntryController {
  private entryModel: Entry;

  constructor() {
    this.entryModel = new Entry();
  }

  public addEntry(entry: IEntry): Promise<IEntry> {
    return this.entryModel.add(entry);
  }

  public updateEntry(payload: IUpdatePayload): Promise<string> {
    return this.entryModel.update(payload);
  }

  public getAll(): Promise<IEntry[]> {
    return this.entryModel.find();
  }

  public get(id: string): Promise<IEntry[]> {
    return this.entryModel.findOne(id);
  }
}

export const entryController = new EntryController();
