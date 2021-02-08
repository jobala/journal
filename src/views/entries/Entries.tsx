import React, { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron';

import './entries.css';
import { entryController } from '../../controllers/entry';

interface IEntry {
  setEntryId: Function
}

const Entries = (props: IEntry) => {
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

  return (
    <div>
      <button type="button" onClick={handleCreateEntry}>Create Journal</button>
      <div>
        <ul>
          {entries.length > 0 && entries.map((entry) => (
            <div onClick={() => handleOnClick(entry._id)}>
              <li>
                {JSON.parse(entry.text).ops[0].insert}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Entries;
