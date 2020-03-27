import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NotFound.scss';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import MainLayout from '../../Layout/Global/Global';
import IconSearch from '../../../public/svg/search1.svg';
import { searchRequest } from '../../../services/notFound';
import { selectRoute } from '../../../utils/helpers';

const NotFound = () => {
  const [arrOptions, setArrOptions] = useState([]);

  const router = useRouter();

  const pushToPage = (e) => {
    e.preventDefault();
    if (arrOptions.length) {
      selectRoute({
        type: arrOptions[0].type,
        slug: arrOptions[0].searchable.slug,
        router,
        id: arrOptions[0].searchable.id,
      });
    } else {
      router.push('/not-result');
    }
  };

  return (
    <MainLayout>
      <div className={styles.notFound}>
        <h2>Упс! Страницы уже нет</h2>
        <form className={styles.form} onSubmit={pushToPage}>
          <input
            type="text"
            placeholder="Поиск по сайту..."
            className={styles.field}
            onChange={(e) => {
              if (e.target.value.length) {
                searchRequest(
                  {},
                  {
                    search: e.target.value,
                  },
                ).then(response => setArrOptions(response.data));
              }
            }}
          />
          <button
            onClick={pushToPage}
            type="button"
            className={styles.buttonSearch}
          >
            <IconSearch />
          </button>
          {!!arrOptions.length && (
            <ul className={styles.foundItems}>
              {arrOptions.map(item => (
                <li key={item.id} className={styles.foundItem}>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      selectRoute(
                        {
                          type: item.type,
                          slug: item.searchable.slug,
                          router,
                          id: item.searchable.id,
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
