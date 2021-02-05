import React, { useEffect } from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';

interface IEditor {
  entryId: number
}

const Editor = (props: IEditor) => {
  const { entryId } = props;
  console.log(entryId);

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
        const text = quill.getContents();
        console.log(text, entryId);
      });
    }
  }, [quill]);

  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
