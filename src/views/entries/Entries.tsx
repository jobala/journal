import React, { useEffect } from 'react';
import { ipcRenderer as ipc } from 'electron';

import './entries.css';

interface IEntry {
  // setEntryId: Function
}

const Entries = (props: IEntry) => {
  const handleCreateEntry = (event: any) => {
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
