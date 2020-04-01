import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SiteMap.scss';

const MapItem = ({ title, arrOfLinks }) => (
  <div>
    {title && <a classNames={styles.titleItem}>{title}</a>}
    <ul className={styles.listsItemLinks}>
      {arrOfLinks.map((item, id) => (
        <li className={styles.listsItemLinkWrapper} key={id}>
          <a className={styles.listsItemLink} href="/">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SiteMap = () => (
  <div className={styles.siteMap}>
    <div className={cx(styles.item, styles.itemNoMargin)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={cx(styles.item, styles.itemNoMargin)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={cx(styles.item, styles.itemBorderLeft)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={styles.lists}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.itemHeader} />
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          title="Колготки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={cx(styles.item, styles.itemNoMargin)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={cx(styles.item, styles.itemBorderLeft)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
    <div className={cx(styles.item, styles.itemBorderLeft)}>
      <div className={styles.itemHeader}>
        <h3>Женщинам</h3>
      </div>
      <div className={cx(styles.lists, styles.listNoBorder)}>
        <MapItem
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
      </div>
    </div>
  </div>
);

MapItem.propTypes = {
  title: PropTypes.string,
  arrOfLinks: PropTypes.arrayOf(PropTypes.string),
};

export default SiteMap;
