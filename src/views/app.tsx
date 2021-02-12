import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import { Editor } from './editor';
import { Entries } from './entries';
import './app.css';

const App = () => {
  const [entryId, setEntryId] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="container">
      <aside>
        <Entries setEntryId={setEntryId} setShowEditor={setShowEditor} />
      </aside>
      <main>
        <div className="journal">
          {
            showEditor
              ? <Editor entryId={entryId} />
              : (<div className="entry-placeholder"><h1>No Entry Selected</h1></div>)
          }
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
