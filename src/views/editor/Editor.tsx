import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';
import { entryController } from '../../controllers/entry';
import { IEditorProps } from '../../types';
import { WEEKDAYS, MONTHS } from '../../constants';

const Editor = (props: IEditorProps) => {
  let { entryId } = props;
  const [date, setDate] = useState('');
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: false,
    },
  });

  useEffect(() => {
    if (quill) {
      entryController.get(entryId).then((result: any) => {
        quill.setContents(JSON.parse(result[0].text).ops);
        setDate(result[0].createdAt);
      });
    }
  });

  if (quill) {
    quill.focus();
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const contents = quill.getContents();
        const payload = {
          text: JSON.stringify(contents),
          _id: entryId,
        };

        entryController.updateEntry(payload)
          .then(() => console.log())
          .catch((error: Error) => { throw error; });
      });
    }

    return () => {
      entryId = undefined;
    };
  });

  const dateObj = new Date(Number(date));
  return (
    <div className="editor-container">
      <div id="date">
        <h1>
          {`${WEEKDAYS[dateObj.getDay()]}, ${MONTHS[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`}
        </h1>
      </div>
      <hr />
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
