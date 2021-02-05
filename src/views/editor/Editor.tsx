import React from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const Editor = () => {
  const { quill, quillRef } = useQuill();

  console.log(quill);
  return (
    <div ref={quillRef} />
  );
};

export default Editor;
