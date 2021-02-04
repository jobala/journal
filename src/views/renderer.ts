import Quill from 'quill';

class Editor {
  private quill: Quill

  constructor() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Start writing',
      modules: {
        toolbar: false,
      },
    });
  }
}

const editor = new Editor();
