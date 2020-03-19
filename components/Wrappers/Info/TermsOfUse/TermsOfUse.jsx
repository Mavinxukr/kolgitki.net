import React from 'react';
import PropTypes from 'prop-types';
import styles from './TermsOfUse.scss';

const TermsOfUse = ({ termsData }) => (
  <div className={styles.termsOfUse}>
    <h3>Пользовательское соглашение</h3>
    {termsData.map(item => (
      <div key={item.id}>
        <h3 className={styles.titleDesc}>{item.name}</h3>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <a className={styles.link} href={item.file_link} download>
          Скачать &quot;Условия использования&quot;
        </a>
      </div>
    ))}
  </div>
);

TermsOfUse.propTypes = {
  termsData: PropTypes.arrayOf(PropTypes.object),
};

export default TermsOfUse;
