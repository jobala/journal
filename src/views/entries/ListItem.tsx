import React from 'react';
import { IListProps, IEntry } from '../../types';

const getText = (entry: IEntry): string => JSON.parse(entry.text).ops[0].insert;

export const ListItem = (props: IListProps) => {
  const { handleOnClick, entry } = props;

  return (
    <div onClick={() => handleOnClick(entry._id)} className="list-item">
      <p>
        {
          getText(entry).length > 130
            ? `${getText(entry).substring(0, 130)} ...`
            : getText(entry)
        }
      </p>

    </div>
  );
};
