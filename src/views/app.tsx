import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import { Editor } from './editor';
import { Entries } from './entries';
import './app.css';

const App = () => {
  const [entryId, setEntryId] = useState('');
  const [entryUpdated, setEntryUpdated] = useState('');

  return (
    <div className="container">
      <aside>
        <Entries setEntryId={setEntryId} entryUpdated={entryUpdated} />
      </aside>
      <main>
        <div className="journal">
          <Editor entryId={entryId} setEntryUpdated={setEntryUpdated} />
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
