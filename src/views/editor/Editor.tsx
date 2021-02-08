import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';
import { entryController } from '../../controllers/entry';

interface IEditor {
  entryId: string;
}

const Editor = (props: IEditor) => {
  let { entryId } = props;

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: false,
    },
  });

  useEffect(() => {
    if (quill) {
      entryController.get(entryId).then((result: any) => {
        quill.setContents(JSON.parse(result[0].text).ops);
      });
    }
  }, [entryId]);

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
  }, [quill, entryId]);

  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
