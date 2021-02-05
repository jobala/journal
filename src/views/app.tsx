import ReactDOM from 'react-dom';
import React from 'react';

import { Editor } from './editor';
import { Entries } from './entries';
import './app.css';

const App = () => (
  <div className="container">
    <aside>
      <Entries />
    </aside>
    <main>
      <div id="date">
        <h1>Thursday, February 4th, 2021</h1>
      </div>
      <hr />
      <Editor />
    </main>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
