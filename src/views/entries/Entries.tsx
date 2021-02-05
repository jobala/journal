import React from 'react';

import './entries.css';

interface IEntry {
  setEntryId: Function
}

const Entries = (props: IEntry) => {
  const { setEntryId } = props;

  // TODO: Get the last 30 entries from the database

  const handleCreateEntry = (event: any) => {
    // TODO: send a message to create an entry and get back the id of the entry
    setEntryId(1);
  };

  return (
    <div>
      <button type="button" onClick={handleCreateEntry}>Create Journal</button>
    </div>
  );
};

export default Entries;
