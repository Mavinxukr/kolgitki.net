import React, { useRef, useState } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import IconExit from '../../public/svg/Group5032.svg';
import IconSearch from '../../public/svg/search1.svg';
import { searchRequest } from '../../services/notFound';
import { selectRoute, prepareStr } from '../../utils/helpers';
import { arrVisitedPages } from '../../utils/fakeFetch/arrVisitedPages';

const Search = ({ isSearchActive, setIsSearchActive }) => {
  const button = useRef(null);
  const searchIcon = useRef(null);

  const [text, setText] = useState('Поиск...');
  const [inputValue, setInputValue] = useState('');
  const [foundArr, setFoundArr] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();

  const classNameForSearch = cx(styles.search, {
    [styles.searchActive]: isSearchActive,
  });

  const handleChange = (e) => {
    if (e.target && _.trimStart(e.target.value).length === 1 && !foundArr) {
      searchRequest(
        {},
        {
          search: e.target.value,
        },
      ).then((response) => {
        if (response.status && response.data.length > 0) {
          setFoundArr(response.data);
          setSelectedItem(response.data[0]);
        }
      });
    }
    if (foundArr) {
      setSelectedItem(
        foundArr.find(item => item.searchable.name.slice(0, e.target.value.length) === e.target.value),
      );
    }
    if (_.trimStart(e.target.value).length > 0) {
      setText(e.target.value);
      setInputValue(e.target.value);
    } else {
      setText('Поиск...');
      setFoundArr(null);
      setSelectedItem(null);
      setInputValue(_.trimStart(e.target.value));
    }
  };

  return (
    <div className={classNameForSearch}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          button.current.classList.add(styles.block);
          if (selectedItem) {
            const isFoundRoute = arrVisitedPages.some(
              item => router.pathname.indexOf(item) !== -1,
            );
            if (isFoundRoute) {
              setIsSearchActive(false);
            }
            setInputValue(selectedItem.searchable.name);
            selectRoute({
              type: selectedItem.type,
              router,
              id: selectedItem.searchable.id,
            });
          } else {
            router.push('/not-result');
          }
        }}
      >
        <span ref={searchIcon}>
          <IconSearch className={styles.iconSearch} />
        </span>
        <div>
          <input
            type="text"
            className={styles.field}
            value={prepareStr(inputValue)}
            placeholder="Поиск..."
            onFocus={() => {
              button.current.classList.add(styles.block);
              searchIcon.current.classList.add(styles.noBlock);
            }}
            onChange={handleChange}
            maxLength="50"
            onKeyUp={(e) => {
              if (e.keyCode === 32) {
                setText(`${text}\u00A0`);
              }
            }}
          />
          <p className={styles.textField}>
            {(inputValue.length > 0
              && selectedItem
              && prepareStr(selectedItem.searchable.name))
              || prepareStr(text)}
          </p>
        </div>
      </form>
      <button
        onClick={() => {
          setInputValue('');
          button.current.classList.remove(styles.block);
          setFoundArr(null);
          setSelectedItem(null);
          setText('Поиск...');
        }}
        ref={button}
        className={styles.buttonClear}
        type="button"
      >
        <IconExit className={styles.icon} />
      </button>
    </div>
  );
};

Search.propTypes = {
  isSearchActive: PropTypes.bool,
  setIsSearchActive: PropTypes.func,
};

export default Search;
