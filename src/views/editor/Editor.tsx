import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';
import { entryController } from '../../controllers/entry';
import { IEditorProps } from '../../types';
import { WEEKDAYS, MONTHS } from '../../constants';
import { debounce } from '../util/util';

const Editor = (props: IEditorProps) => {
  let { entryId } = props;
  const { setEntryUpdated } = props;
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
  }, [entryId]);

  if (quill) {
    quill.focus();
  }

  useEffect(() => {
    const returnedFunction = debounce(() => {
      const contents = quill.getContents();
      const payload = {
        text: JSON.stringify(contents),
        _id: entryId,
      };

      entryController.updateEntry(payload)
        .then(() => setEntryUpdated(payload.text))
        .catch((error: Error) => { throw error; });
    }, 500);

    if (quill) {
      quill.on('text-change', returnedFunction);
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
          {date && `${WEEKDAYS[dateObj.getDay()]}, ${MONTHS[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`}
        </h1>
      </div>
      <hr />
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
