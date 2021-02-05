import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import { Editor } from './editor';
import { Entries } from './entries';
import './app.css';

const App = () => {
  const [entryId, setEntryId] = useState(0);

  return (
    <div className="container">
      <aside>
        <Entries setEntryId={setEntryId} />
      </aside>
      <main>
        <div className="journal">
          <div id="date">
            <h1>Thursday, February 4th, 2021</h1>
          </div>
          <hr />
          <Editor entryId={entryId} />
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
