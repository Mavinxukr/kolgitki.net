import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Filter.scss';

const Filter = ({
  title, arrSelects, id, classNameWrapper,
}) => (
  <div className={cx(styles.filter, classNameWrapper)}>
    <input className={styles.field} type="checkbox" id={id} />
    <label className={styles.paramController} htmlFor={id}>
      {title}
    </label>
    <div className={styles.dropDownListWrapper}>
      <ul className={styles.dropDownList}>
        {arrSelects.map(item => (
          <li className={styles.dropDownItem} key={item.id}>
            <input type="checkbox" id={item.value} className={styles.field} />
            <label htmlFor={item.value} className={styles.dropDownController}>
              {item.color ? (
                <span
                  className={styles.colorBlock}
                  style={{ backgroundColor: `${item.color}` }}
                />
              ) : null}
              {item.value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default Filter;
