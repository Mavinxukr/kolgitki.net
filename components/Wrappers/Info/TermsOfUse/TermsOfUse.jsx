import React from 'react';
import PropTypes from 'prop-types';
import styles from './TermsOfUse.scss';

const TermsOfUse = ({ termsData }) => (
  <div className={styles.termsOfUse}>
    <h3>Пользовательское соглашение</h3>
    <h3 className={styles.titleDesc}>Использования персональных данных</h3>
    <p className={styles.desc}>
      Поддерживать высокие ожидания для студентов с ограниченными возможностями.
      Опрошенные признали, что не каждый учащийся с ограниченными возможностями
      может достичь высоких стандартов, но они порекомендовали придерживаться
      высоких ожиданий и поддерживать давление на систему, чтобы обеспечить
      обучение на более высоком уровне.
    </p>
    <h3 className={styles.titleDesc}>Передача контактов</h3>
    <p className={styles.desc}>
      Поддерживать высокие ожидания для студентов с ограниченными возможностями.
      Опрошенные признали, что не каждый учащийся с ограниченными возможностями
      может достичь высоких стандартов, но они порекомендовали придерживаться
      высоких ожиданий и поддерживать давление на систему, чтобы обеспечить
      обучение на более высоком уровне.
    </p>
    <a className={styles.link} href="/">
      Скачать &quot;Условия использования&quot;
    </a>
  </div>
);

TermsOfUse.propTypes = {
  termsData: PropTypes.arrayOf(PropTypes.object),
};

export default TermsOfUse;
