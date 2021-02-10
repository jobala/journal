import React, { useEffect, useState } from 'react';
import ReactListView from 'react-listview-sticky-header';

import './entries.css';
import { entryController } from '../../controllers/entry';
import { IEntryProps, IEntry } from '../../types';
import { MONTHS } from '../../constants';

const getText = (entry: IEntry): string => JSON.parse(entry.text).ops[0].insert;

const styles = {
  outerDiv: {
    height: 'inherit',
    overflowY: 'auto',
    width: '100%',
  },

  ul: {
    margin: '0px',
    listStyleType: 'none',
    padding: '0px',
  },

  fixedPosition: {
    position: 'fixed',
    width: '347px',
    top: '0px',
  },

  listHeader: {
    width: '347px',
    height: '27px',
    background: '#94D6CF',
    color: 'white',
  },

  listItems: {
    color: '#908F8F',
    paddingleft: '10px',
    marginLeft: '10px',
  },
};

const Entries = (props: IEntryProps) => {
  const { setEntryId } = props;
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    entryController.getAll()
      .then((allEntries) => {
        const parsed = prepareDataList(allEntries);
        setEntries(parsed);
      });
  }, []);

  const parseEntries = (entries: IEntry[]) => entries.reduce((obj: any, entry: IEntry) => {
    const dateObj = new Date(Number(entry.createdAt));
    const month = MONTHS[dateObj.getMonth()];

    if (obj[month]) {
      obj[month].items.push({
        title: (
          <div onClick={() => handleOnClick(entry._id)} className="list-item">
            <p>
              {
                getText(entry).length > 130
                  ? `${getText(entry).substring(0, 130)} ...`
                  : getText(entry)
              }
            </p>

          </div>
        ),

      });
    } else {
      obj[month] = { items: [] };
    }

    return obj;
  }, {});

  const prepareDataList = (entries: IEntry[]) => {
    const parsedEntries = parseEntries(entries);
    return Object.keys(parsedEntries).map((month) => {
      const obj = {
        headerName: month,
        ...parsedEntries[month],
      };
      return obj;
    });
  };

  const handleCreateEntry = () => {
    const entry = {
      text: JSON.stringify({ ops: [{ insert: '' }] }),
      favorite: false,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    entryController.addEntry(entry).then((newEntry) => {
      setEntryId(newEntry._id);
    });
  };

  const handleOnClick = (id: string) => {
    console.log('Calling on Click');
    setEntryId(id);
  };

  return (
    <div>
      <div>
        {entries.length > 0
          && (
            <div>
              <ReactListView
                data={entries}
                headerAttName="headerName"
                itemsAttName="items"
                styles={styles}
              />
            </div>
          )}
      </div>
      <button type="button" onClick={handleCreateEntry}>Create Journal</button>
    </div>
  );
};

export default Entries;
