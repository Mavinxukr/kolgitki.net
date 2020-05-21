import React, { useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import styles from './NotFound.scss';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import MainLayout from '../../Layout/Global/Global';
import IconSearch from '../../../public/svg/search1.svg';
import { searchRequest } from '../../../services/notFound';
import { selectRoute } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const NotFound = () => {
  const [arrOptions, setArrOptions] = useState(null);
  const [selectedArr, setSelectedArr] = useState(null);

  const router = useRouter();

  const pushToPage = (e) => {
    e.preventDefault();
    if (selectedArr) {
      selectRoute({
        type: selectedArr[0].type,
        router,
        item: selectedArr[0].searchable,
        cookie: cookies,
      });
    } else {
      router.push('/not-result');
    }
  };

  return (
    <MainLayout>
      <div className={styles.notFound}>
        <h2 className={styles.title}>Упс! Страницы уже нет</h2>
        <h2 className={styles.titleLight}>Упс! Страницы уже нет</h2>
        <form className={styles.form} onSubmit={pushToPage}>
          <input
            type="text"
            placeholder="Поиск по сайту..."
            className={styles.field}
            onChange={(e) => {
              if (_.trim(e.target.value).length === 1 && !arrOptions) {
                searchRequest(
                  {},
                  {
                    search: _.trimStart(e.target.value),
                  },
                ).then((response) => {
                  setArrOptions(response.data);
                  setSelectedArr(response.data);
                });
              }
              if (!e.target.value.length) {
                setArrOptions(null);
                setSelectedArr(null);
              }
              if (arrOptions) {
                setSelectedArr(arrOptions.filter(item => item.searchable.name.indexOf(e.target.value) !== -1));
              }
            }}
          />
          <button
            onClick={pushToPage}
            type="button"
            className={styles.buttonSearch}
          >
            <IconSearch className={styles.icon} />
          </button>
          {selectedArr && (
            <ul className={styles.foundItems}>
              {selectedArr.map(item => (
                <li key={item.id} className={styles.foundItem}>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      selectRoute(
                        {
                          type: item.type,
                          router,
                          item: item.searchable,
                          cookie: cookies,
                        },
                      );
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </form>
        <ButtonRoute classNameWrapper={styles.buttonRouteWrapper} />
      </div>
    </MainLayout>
  );
};

export default NotFound;
