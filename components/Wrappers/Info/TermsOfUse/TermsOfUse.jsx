import React from 'react';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import styles from './TermsOfUse.scss';

const TermsOfUse = ({ termsData }) => (
  <div className={styles.termsOfUse}>
    <h3>
      {parseText(cookies, 'Пользовательское соглашение', 'Угода користувача')}
    </h3>
    {termsData.map(item => (
      <div key={item.id}>
        <h3 className={styles.titleDesc}>
          {parseText(cookies, item.name, item.name_ua)}
        </h3>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: parseText(cookies, item.description, item.description_ua),
          }}
        />
        <a className={styles.link} href={item.file_link} download>
          {parseText(cookies, 'Скачать', 'Завантажити')} &quot;
          {parseText(cookies, 'Условия использования', 'Умови використання')}&quot;
        </a>
      </div>
    ))}
  </div>
);

TermsOfUse.propTypes = {
  termsData: PropTypes.arrayOf(PropTypes.object),
};

export default TermsOfUse;
