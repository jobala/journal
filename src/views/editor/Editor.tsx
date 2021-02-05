import React, { useEffect } from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';

const Editor = () => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: false,
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const text = quill.getContents();
        console.log(text);
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
