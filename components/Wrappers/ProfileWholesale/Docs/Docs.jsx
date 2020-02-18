import React from 'react';
import { data } from './data';
import Button from '../../../Layout/Button/Button';
import styles from './Docs.scss';

const ProfileWholesaleDocs = () => (
  <div className={styles.profileWholesaleDocs}>
    <h3>Документы</h3>
    <ul className={styles.items}>
      {
        data.map(item => (
          <li className={styles.item} key={item.id}>
            <p className={styles.itemDesc}>{item.title}</p>
            <button className={styles.itemButtonView} type="button">Просмотреть</button>
            <button className={styles.itemButtonDelete} type="button">Удалить</button>
          </li>
        ))
      }
    </ul>
    <Button
      title="Добавить документ"
      buttonType="button"
      classNameWrapper={styles.buttonAdd}
      viewType="auth"
    />
  </div>
);

export default ProfileWholesaleDocs;
