import React from 'react';
import { data } from './data';
import Styles from './ProfileWholesaleDocs.module.scss';

const ProfileWholesaleDocs = () => (
  <div className={Styles.ProfileWholesaleDocs}>
    <h2 className={Styles.ProfileWholesaleDocs__Title}>Документы</h2>
    <ul className={Styles.ProfileWholesaleDocs__Items}>
      {
        data.map(item => (
          <li className={Styles.ProfileWholesaleDocs__Item} key={item.id}>
            <p className={Styles.ProfileWholesaleDocs__ItemDesc}>{item.title}</p>
            <button className={Styles.ProfileWholesaleDocs__ItemButtonView} type="button">Просмотреть</button>
            <button className={Styles.ProfileWholesaleDocs__ItemButtonDelete} type="button">Удалить</button>
          </li>
        ))
      }
    </ul>
    <button className={Styles.ProfileWholesaleDocs__ButtonAdd} type="button">Добавить документ</button>
  </div>
);

export default ProfileWholesaleDocs;
