import React from 'react';
import styles from './SiteMap.scss';

const MapItem = ({ title, arrOfLinks }) => (
  <div className={styles.listsItem}>
    {title ? <h2 className={styles.listsItemTitle}>{title}</h2> : null}
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
    <div className={styles.item}>
      <h2 className={styles.title}>Женщинам</h2>
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
      <h2 className={styles.title}>Мужчинам</h2>
      <div className={styles.lists}>
        <MapItem
          title="Одежда"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
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
    <div
      className={`${styles.item} ${styles.itemBorder} ${styles.itemForChildren}`}
    >
      <h2 className={styles.title}>Детям</h2>
      <div className={styles.lists}>
        <MapItem
          title="Чулки"
          arrOfLinks={[
            'Классические',
            'Колготки с рисунком',
            'Теплые колготки',
            'Большие размеры',
            'Материал',
          ]}
        />
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
    <div className={styles.itemLinksGroup}>
      <div className={`${styles.item} ${styles.itemAdaptive}`}>
        <h2 className={styles.title}>Клиентам</h2>
        <div className={styles.lists}>
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
      <div className={`${styles.item} ${styles.itemBorder} ${styles.itemAdaptive}`}>
        <h2 className={styles.title}>
          Оптовым <br /> покупатели
        </h2>
        <div className={styles.lists}>
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
      <div className={`${styles.item} ${styles.itemBorder}`}>
        <h2 className={styles.title}>О нас</h2>
        <div className={styles.lists}>
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
  </div>
);

export default SiteMap;
