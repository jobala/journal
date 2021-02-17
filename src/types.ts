export interface IEntry {
  _id?: string;
  tag?: string[];
  text: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

export interface IUpdatePayload {
  _id: string;
  text: string;
}

export interface IEntryProps {
  setEntryId: Function;
  entryUpdated: string;
}

export interface IEditorProps {
  entryId: string;
  setEntryUpdated: Function;
}

export interface IListProps {
  handleOnClick: Function;
  entry: IEntry;
}
