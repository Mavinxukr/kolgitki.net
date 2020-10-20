import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './Search.scss';
import IconSearch from '../../public/svg/search1.svg';
import {
  prepareStr,
  parseText,
  createBodyForRequestCatalog,
} from '../../utils/helpers';
import { getProductsByCategories } from '../../services/product';
import { cookies } from '../../utils/getCookies';
import { getCatalogProducts } from '../../redux/actions/catalogProducts';

const Search = () => {
  const searchIcon = useRef(null);
  const searchRef = useRef(null);

  const [text, setText] = useState();
  const [inputValue, setInputValue] = useState('');
  const [foundArr, setFoundArr] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const onSearchOutsideClick = ({ target }) => {
    const { current: currentElement } = searchRef;
    const isOutside =
      currentElement
      && !currentElement.contains(target)
      && !target.classList.contains('search-initiator');
  };

  useEffect(() => {
    document.addEventListener('click', onSearchOutsideClick, false);

    return () => {
      document.removeEventListener('click', onSearchOutsideClick);
    };
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (inputValue[inputValue.length - 1] === ' ') {
      setText(`${text}\u00A0`);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setText(e.target.value);
      setInputValue(e.target.value);
    } else {
      setText(`${parseText(cookies, 'Поиск', 'Пошук')}...`);
      setFoundArr(null);
      setSelectedItem(null);
      setInputValue(e.target.value);
    }
  };

  return (
    <div className={styles.search} ref={searchRef}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          cookies.remove('filters');
          cookies.set('search', prepareStr(text));
          getCatalogProducts(
            {},
            {
              ...createBodyForRequestCatalog(cookies.get('filters')),
              page: 1,
              language: cookies.get('language').lang,
              search: cookies.get('search'),
            },
            true,
          );
          setInputValue('');
          setText('');
          router.push('/Products');
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
            onChange={(e) => {
              setInputValue(e.target.value);
              setText(e.target.value);
              getProductsByCategories(
                {},
                {
                  page: 1,
                  language: cookies.get('language').lang,
                  search: e.target.value,
                },
              ).then(response => setFoundArr(response.data.data));
              cookies.set('search', e.target.value);
            }}
            maxLength="50"
          />
          <p
            className={cx(styles.textField, {
              [styles.active]: foundArr?.length > 0,
            })}
          >
            {foundArr && inputValue.length > 0 ? (
              <div>
                {foundArr.map(itemSearch => (
                  <button
                    type="submit"
                    onClick={() => {
                      setInputValue(itemSearch.name);
                      setText(itemSearch.name);
                    }}
                  >
                    {itemSearch.name}
                  </button>
                ))}
              </div>
            ) : (
              text
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Search;
