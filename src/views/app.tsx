import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { ipcRenderer as ipc } from 'electron';

import { Editor } from './editor';
import { Entries } from './entries';
import './app.css';

const App = () => {
  const [entryId, setEntryId] = useState();

  useEffect(() => {
    if (ipc) {
      ipc.on('entry-created', (event, id) => {
        setEntryId(id);
      });
    }
  }, [entryId]);

  return (
    <div className="container">
      <aside>
        <Entries setEntryId={setEntryId} />
      </aside>
      <main>
        <div className="journal">
          <Editor entryId={entryId} />
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
