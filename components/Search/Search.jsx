import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import IconSearch from '../../public/svg/search1.svg';
import IconClose from '../../public/svg/Group795.svg';
import { withResponse } from '../hoc/withResponse';
import {
  prepareStr,
  parseText,
  createBodyForRequestCatalog,
} from '../../utils/helpers';
import { getProductsByCategories } from '../../services/product';
import { cookies } from '../../utils/getCookies';
import { getCatalogProducts } from '../../redux/actions/catalogProducts';

const Search = ({ setIsOpenMenu, isMobileScreen = true }) => {
  const searchIcon = useRef(null);
  const searchRef = useRef(null);

  const [text, setText] = useState();
  const [inputValue, setInputValue] = useState('');
  const [foundArr, setFoundArr] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (inputValue[inputValue.length - 1] === ' ') {
      setText(`${text}\u00A0`);
    }
  }, [inputValue]);

  return (
    <div className={styles.search} ref={searchRef}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          cookies.remove('filters');
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
        {isMobileScreen ? (
          <button
            type="button"
            className={styles.iconSearch}
            onClick={() => {
              setIsOpenMenu(false);
            }}
          >
            <IconClose />
          </button>
        ) : (
          <span ref={searchIcon}>
            <IconSearch className={styles.iconSearch} />
          </span>
        )}
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
              ).then(response => setFoundArr(response?.data?.data));
              cookies.set('search', e.target.value);
            }}
            maxLength="50"
          />
          {foundArr && inputValue.length > 0 && (
            <p
              className={cx(styles.textField, {
                [styles.active]: foundArr?.length > 0,
              })}
            >
              {foundArr && inputValue.length > 0 ? (
                <div>
                  {foundArr.map(itemSearch => (
                    <button
                      type="button"
                      onClick={(e) => {
                        cookies.remove('filters');
                        setInputValue(itemSearch.name);
                        setText(itemSearch.name);
                        cookies.set('search', itemSearch.name);
                        e.preventDefault();
                        getCatalogProducts(
                          {},
                          {
                            ...createBodyForRequestCatalog(
                              cookies.get('filters'),
                            ),
                            page: 1,
                            language: cookies.get('language').lang,
                            search: cookies.get('search'),
                          },
                          true,
                        );
                        setInputValue('');
                        setText('');
                        setIsOpenMenu(false);
                        router.push('/Products');
                      }}
                    >
                      {itemSearch.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div />
              )}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  setIsOpenMenu: PropTypes.func,
  isMobileScreen: PropTypes.bool,
};

export default withResponse(Search);
