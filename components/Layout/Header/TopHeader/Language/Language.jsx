import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { cookies } from '../../../../../utils/getCookies';
import styles from './Language.scss';
// import { withResponse } from '../../../../hoc/withResponse';

export const Language = () => {
  const router = useRouter();
  const clickHandle = id => {
    cookies.set('language', arrOptionsLang[id]);
    router.reload();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (process.browser && !cookies.get('language')) {
      cookies.set('language', arrOptionsLang[0]);
    }
  }, []);

  const arrOptionsLang = [
    { id: 1, lang: 'ru', title: 'Русский' },
    { id: 2, lang: 'ua', title: 'Українська' }
  ];

  return (
    <div className={styles.language}>
      {arrOptionsLang.map((item, index) => {
        let classes = [styles.language_button];
        if (item.id === cookies.get('language').id) {
          classes.push(styles.language_success);
        }
        return (
          <button
            onClick={() => clickHandle(index)}
            className={classes.join(' ')}
            key={item.id}
          >
            {item.lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

// export default withResponse(Language);
