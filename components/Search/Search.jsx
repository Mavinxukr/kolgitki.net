import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import IconExit from '../../public/svg/Group5032.svg';
import IconSearch from '../../public/svg/search1.svg';
import { searchRequest } from '../../services/notFound';
import { prepareStr, selectRoute } from '../../utils/helpers';
import { arrVisitedPages } from '../../utils/fakeFetch/arrVisitedPages';

const Search = ({ isSearchActive, setIsSearchActive }) => {
  const button = useRef(null);
  const icon = useRef(null);

  const [text, setText] = useState('Поиск...');
  const [inputValue, setInputValue] = useState('');
  const [foundText, setFoundText] = useState(null);

  const router = useRouter();

  const classNameForSearch = cx(styles.search, {
    [styles.searchActive]: isSearchActive,
  });

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target && e.target.value.length > 0) {
      searchRequest(
        {},
        {
          search: e.target.value,
        },
      ).then((response) => {
        if (response.data.length > 0) {
          setFoundText(response.data[0]);
        } else {
          setFoundText(null);
        }
      });
      setText(e.target.value);
    } else {
      setText('Поиск...');
      setFoundText(null);
    }
  };

  return (
    <div className={classNameForSearch}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          button.current.classList.add(styles.block);
          if (foundText) {
            const isFoundRoute = arrVisitedPages.some(item => router.pathname.indexOf(item) !== -1);
            if (isFoundRoute) {
              setIsSearchActive(false);
            }
            setInputValue(foundText.searchable.name);
            selectRoute({
              type: foundText.type,
              slug: foundText.searchable.slug,
              router,
              id: foundText.searchable.id,
            });
          } else {
            router.push('/not-result');
          }
        }}
      >
        <span ref={icon}>
          <IconSearch className={styles.iconSearch} />
        </span>
        <div>
          <input
            type="text"
            className={styles.field}
            value={prepareStr(inputValue)}
            placeholder="Поиск..."
            onFocus={() => {
              icon.current.classList.add(styles.noBlock);
            }}
            onChange={handleChange}
            maxLength="50"
          />
          <p className={styles.textField}>
            {(foundText && prepareStr(foundText.searchable.name))
              || prepareStr(text)}
          </p>
        </div>
      </form>
      <button
        onClick={() => {
          setInputValue('');
          icon.current.classList.remove(styles.noBlock);
          button.current.classList.remove(styles.block);
          setFoundText(null);
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
