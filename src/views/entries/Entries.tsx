import React, { useEffect } from 'react';
import { ipcRenderer as ipc } from 'electron';

import './entries.css';

interface IEntry {
  setEntryId: Function
}

const Entries = (props: IEntry) => {
  const { setEntryId } = props;

  useEffect(() => {
    if (ipc) {
      ipc.on('entry-created', (event, entryId) => {
        console.log(entryId);
      });
    }
  });
  // TODO: Get the last 30 entries from the database

  const handleCreateEntry = (event: any) => {
    // TODO: send a message to create an entry and get back the id of the entry
    setEntryId(1);
    const entry = {
      text: '',
      favorite: false,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    ipc.send('create-entry', entry);
  };

  return (
    <div>
      <button type="button" onClick={handleCreateEntry}>Create Journal</button>
    </div>
  );
};

export default Entries;
