import React from 'react';
import { IListProps, IEntry } from '../../types';

const getText = (entry: IEntry): string => JSON.parse(entry.text).ops[0].insert;

export const ListItem = (props: IListProps) => {
  const { handleOnClick, entry } = props;

  return (
    <div onClick={() => handleOnClick(entry._id)} className="list-item">
      <div className="text">
        {
          getText(entry).length > 120
            ? `${getText(entry).substring(0, 120)} ...`
            : getText(entry)
        }
      </div>
    </div>
  );
};
