import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';
import { entryController } from '../../controllers/entry';

interface IEditor {
  entryId: string
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
          const payload = {
            text: JSON.stringify(contents),
            _id: entryId,
          };

          entryController.updateEntry(payload)
            .then(() => console.log('Updated'))
            .catch((error: Error) => { throw error; });
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
