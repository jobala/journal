import Datastore from 'nedb';

export interface IEntry {
    _id?: string;
    tag: string[];
    text: string;
    createdAt: string;
    updatedAt: string;
    favorite: boolean;
}

export class Entry {
    private db: Datastore

    constructor() {
      this.db = new Datastore({ filename: 'entries.db', autoload: true });
    }

    public add(payload: IEntry) {
      this.db.insert(payload, (err, newDoc) => {
        if (err) {
          // Tell renderer process we got an error
        }
        console.log(newDoc);
        // Tell renderer process entry was created successfully
      });
    }
}
