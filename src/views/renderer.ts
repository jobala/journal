import Quill from 'quill';

class Editor {
  private quill: Quill

  constructor() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
    });
  }
}

const editor = new Editor();
