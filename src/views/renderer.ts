import Quill from 'quill';

const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: false,
  },
});

quill.focus();
