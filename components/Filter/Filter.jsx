import React from 'react';
import styles from './Filter.scss';

const Filter = ({
  title, arrSelects, id, width,
}) => (
  <div style={{ width: `${width}` }} className={styles.filter}>
    <input className={styles.field} type="checkbox" id={id} />
    <label className={styles.paramController} htmlFor={id}>
      {title}
    </label>
    <div className={styles.dropDownListWrapper}>
      <ul className={styles.dropDownList}>
        {arrSelects.map(item => (
          <li className={styles.dropDownItem} key={item.id}>
            <input type="checkbox" id={item.value} className={styles.field} />
            {item.color ? (
              <label htmlFor={item.value} className={styles.dropDownController}>
                <span
                  className={styles.colorBlock}
                  style={{ backgroundColor: `${item.color}` }}
                />{' '}
                {item.value}
              </label>
            ) : (
              <label htmlFor={item.value} className={styles.dropDownController}>
                {item.value}
              </label>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Filter;
