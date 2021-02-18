import React from 'react';
import { IListProps, IEntry } from '../../types';

const showEntryPreviewTitle = (entry: IEntry): string => {
  const jsonEntry = JSON.parse(entry.text);
  return jsonEntry.ops[0].insert;
};

const showEntryPreviewBody = (entry: IEntry): string => {
  const jsonEntry = JSON.parse(entry.text);

  // This can be undefined when an entry doesn't have a body
  if (jsonEntry.ops[1]) {
    return jsonEntry.ops[1].insert;
  }
  return '';
};

export const ListItem = (props: IListProps) => {
  const { handleOnClick, entry } = props;

  const previewTitle = showEntryPreviewTitle(entry);
  const previewBody = showEntryPreviewBody(entry);

  return (
    <div onClick={() => handleOnClick(entry._id)} className="list-item">
      <div className="text">
        { previewTitle.length > 120
          ? `${previewTitle.substring(0, 120)}...`
          : previewTitle}
        <br />
        { previewBody.length > 80
          ? `${previewBody.substring(0, 80)}...`
          : previewBody }
      </div>
    </div>
  );
};
