import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import IconExit from '../../public/svg/Group5032.svg';
import IconSearch from '../../public/svg/search1.svg';
import { searchRequest } from '../../services/notFound';
import { prepareStr, parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { getCatalogProductsSuccess } from '../../redux/actions/catalogProducts';

const Search = ({ isSearchActive, setIsSearchActive }) => {
  const button = useRef(null);
  const searchIcon = useRef(null);
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const [text, setText] = useState(
    `${parseText(cookies, 'Поиск', 'Пошук')}...`,
  );
  const [inputValue, setInputValue] = useState('');
  const [foundArr, setFoundArr] = useState(null);

  const onSearchOutsideClick = ({ target }) => {
    const { current: currentElement } = searchRef;
    const isOutside =
      currentElement
      && !currentElement.contains(target)
      && !target.classList.contains('search-initiator');

    if (isOutside) {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onSearchOutsideClick, false);

    return () => {
      document.removeEventListener('click', onSearchOutsideClick);
    };
  }, []);

  const router = useRouter();

  const classNameForSearch = cx(styles.search, {
    [styles.searchActive]: isSearchActive,
  });

  useEffect(() => {
    if (inputValue[inputValue.length - 1] === ' ') {
      setText(`${text}\u00A0`);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={classNameForSearch} ref={searchRef}>
      <button
        type="button"
        className={styles.buttonExit}
        onClick={() => setIsSearchActive(false)}
      >
        <IconExit />
      </button>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          // searchRequest({}, { search: inputValue }).then(response => );
          if (foundArr) {
            dispatch(getCatalogProductsSuccess({ data: response }));
            router.push('/Products');
          } else {
            router.push('/not-result');
          }
          button.current.classList.add(styles.block);
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
            placeholder={`${parseText(cookies, 'Поиск', 'Пошук')}...`}
            onFocus={() => {
              button.current.classList.add(styles.block);
              searchIcon.current.classList.add(styles.noBlock);
            }}
            onChange={handleChange}
            maxLength="50"
          />
          <p className={styles.textField}>{prepareStr(text)}</p>
        </div>
      </form>
      <button
        onClick={() => {
          setInputValue('');
          button.current.classList.remove(styles.block);
          setFoundArr(null);
          setText(`${parseText(cookies, 'Поиск', 'Пошук')}...`);
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
