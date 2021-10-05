import React, { useRef, useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import IconSearch from '../../public/svg/search1.svg';
import IconClose from '../../public/svg/Group795.svg';
import { withResponse } from '../hoc/withResponse';
import { prepareStr, parseText } from '../../utils/helpers';
import { getProductsByCategories } from '../../services/product';
import { cookies } from '../../utils/getCookies';
import Link from 'next/link';
import { Spinner } from '../Spinner/Spinner';

const Search = () => {
  const searchIcon = useRef(null);
  const searchRef = useRef(null);

  const [text, setText] = useState();
  const [inputValue, setInputValue] = useState('');
  const [foundArr, setFoundArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  const changeHandle = ev => {
    setInputValue(ev.target.value);
    setText(ev.target.value);
    setLoading(true);
    getProductsByCategories(
      {},
      {
        page: 1,
        language: cookies.get('language').lang,
        search: ev.target.value
      }
    )
      .then(response => {
        setLoading(false);
        ref.current.focus();
        setFoundArr(response?.data?.data);
      })
      .catch(() => {
        setLoading(false);
        ref.current.focus();
      });
    cookies.set('search', ev.target.value);
  };

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
        onSubmit={e => {
          e.preventDefault();
          setInputValue('');
          setText('');
          router.push(`/products?search=${text}`);
        }}
      >
        <span ref={searchIcon}>
          <IconSearch className={styles.iconSearch} />
        </span>

        <input
          type="text"
          ref={ref}
          className={styles.field}
          disabled={loading}
          value={prepareStr(inputValue)}
          placeholder={`${parseText(cookies, 'Поиск', 'Пошук')}...`}
          onChange={ev => changeHandle(ev)}
          maxLength="50"
        />
        {inputValue && (
          <div
            onClick={() => setInputValue('')}
            className={styles.overflow}
          ></div>
        )}

        {inputValue.length > 0 && (
          <div className={cx(styles.textField, styles.active)}>
            {loading ? (
              <Spinner></Spinner>
            ) : foundArr.length > 0 ? (
              foundArr.map(itemSearch => {
                console.log(itemSearch);
                return (
                  <Link
                    prefetch={false}
                    key={itemSearch.id}
                    href={`/product${itemSearch.crumbs}/${itemSearch.id}`}
                  >
                    <a
                      title={parseText(
                        cookies,
                        itemSearch.site_name,
                        itemSearch.site_name_uk
                      )}
                      className={styles.searchItem}
                    >
                      {parseText(
                        cookies,
                        itemSearch.site_name,
                        itemSearch.site_name_uk
                      )}
                    </a>
                  </Link>
                );
              })
            ) : (
              parseText(cookies, 'Ничего не найдено', 'Нічого не знайдено')
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default withResponse(Search);
