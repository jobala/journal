import Datastore from 'nedb';

import { IEntry, IUpdatePayload } from '../types';

export class Entry {
  private db: Datastore

  constructor() {
    // TODO: Pick db based on an environment variable
    this.db = new Datastore({ filename: './te', autoload: true });
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

  public find(): Promise<IEntry[]> {
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
