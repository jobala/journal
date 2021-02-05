import React from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
import './editor.css';

const Editor = () => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: false,
    },
  });

  console.log(quill);
  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
