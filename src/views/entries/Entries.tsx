import React, { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron';

import './entries.css';
import { IEntry } from 'models/entry';
import { entryController } from '../../controllers/entry';

interface IEntries {
  setEntryId: Function
}

const Entries = (props: IEntries) => {
  const { setEntryId } = props;
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    entryController.getAll()
      .then((allEntries) => setEntries(allEntries));
  }, [entries]);

  const handleCreateEntry = (event: any) => {
    const entry = {
      text: JSON.stringify({ ops: [{ insert: '' }] }),
      favorite: false,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    entryController.addEntry(entry).then((newEntry) => {
      setEntryId(newEntry._id);
    });
  };

  const handleOnClick = (id: string) => {
    setEntryId(id);
  };

  const getText = (entry: IEntry): string => JSON.parse(entry.text).ops[0].insert;
  return (
    <div>
      <button type="button" onClick={handleCreateEntry}>Create Journal</button>
      <div>
        <ul>
          {entries.length > 0 && entries.map((entry) => (
            <div onClick={() => handleOnClick(entry._id)} className="list-item">
              <li className="text">
                {getText(entry).length > 130
                  ? `${getText(entry).substring(0, 130)} ...`
                  : getText(entry)}

              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Entries;
