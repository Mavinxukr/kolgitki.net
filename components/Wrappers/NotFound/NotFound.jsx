import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NotFound.scss';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import MainLayout from '../../Layout/Global/Global';
import IconSearch from '../../../public/svg/search1.svg';
import { searchRequest } from '../../../services/notFound';

const NotFound = () => {
  const [arrOptions, setArrOptions] = useState([]);

  const router = useRouter();

  const pushToPage = (e) => {
    e.preventDefault()
    if (arrOptions.length) {
      if (arrOptions[0].type === 'goods') {
        router.push(
          '/Products/[pid]',
          `/Products/${arrOptions[0].searchable.id}`,
        );
      } else {
        router.push('/Products');
      }
    } else {
      router.push('/fd');
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
                  {item.type === 'goods' ? (
                    <Link
                      href="/Products/[pid]"
                      as={`/Products/${item.searchable.id}`}
                    >
                      <a>{item.title}</a>
                    </Link>
                  ) : (
                    <Link href="/Products">
                      <a>{item.title}</a>
                    </Link>
                  )}
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
