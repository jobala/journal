import Datastore from 'nedb';

export interface IEntry {
  _id?: string;
  tag?: string[];
  text: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

export interface IUpdatePayload {
  _id: string;
  text: string;
}

export class Entry {
  private db: Datastore

  constructor() {
    this.db = new Datastore({ filename: './journal_database.db', autoload: true });
  }

  public add(payload: IEntry): Promise<IEntry> {
    return new Promise((resolve: Function, reject: Function) => {
      this.db.insert(payload, (error: Error, newEntry: IEntry) => {
        if (error) {
          return reject(error);
        }
        return resolve(newEntry);
      });
    });
  }

  public update(payload: IUpdatePayload): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      this.db.update({ _id: payload._id }, {
        $set: {
          text: payload.text,
          updatedAt: Date.now().toString(),
        },
      }, {}, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve('success');
      });
    });
  }

  public find() {
    return new Promise((resolve: Function, reject: Function) => {
      this.db.find({}).sort({ createdAt: -1 }).exec((err: Error, docs: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      });
    });
  }

  public findOne(id: string): Promise<IEntry[]> {
    return new Promise((resolve: Function, reject: Function) => {
      this.db.find({ _id: id }, (err: Error, docs: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      });
    });
  }
}
