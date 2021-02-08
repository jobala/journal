import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { ipcRenderer as ipc } from 'electron';

import 'quill/dist/quill.snow.css';
import './editor.css';

interface IEditor {
  entryId: number
}

const Editor = (props: IEditor) => {
  const { entryId } = props;

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: false,
    },
  });

  if (quill) {
    quill.focus();
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setTimeout(() => {
          const contents = quill.getContents();
          ipc.send('update-entry', { text: JSON.stringify(contents), _id: entryId });
        }, 500);
      });
    }
  }, [quill, entryId]);

  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
