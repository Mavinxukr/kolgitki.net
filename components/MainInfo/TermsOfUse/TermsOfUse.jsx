import React from 'react';
import styles from './TermsOfUse.scss';

const TermsOfUse = () => (
  <div className={styles.termsOfUse}>
    <h2 className={styles.title}>Пользовательское соглашение</h2>
    <h2 className={styles.titleDesc}>Использования персональных данных</h2>
    <p className={styles.desc}>
      Поддерживать высокие ожидания для студентов с ограниченными возможностями.
      Опрошенные признали, что не каждый учащийся с ограниченными возможностями
      может достичь высоких стандартов, но они порекомендовали придерживаться
      высоких ожиданий и поддерживать давление на систему, чтобы обеспечить
      обучение на более высоком уровне.
    </p>
    <h2 className={styles.titleDesc}>Передача контактов</h2>
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

export default TermsOfUse;
