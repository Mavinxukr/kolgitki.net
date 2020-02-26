import React, { useState } from 'react';
import cx from 'classnames';
import ProfileOrderHeader from '../../../ProfileOrderHeader/ProfileOrderHeader';
import { checkHaveIndex } from '../../../../utils/helpers';
import styles from './OrdersWholesale.scss';

const mockData = [
  {
    id: 1,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 2,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 3,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
  {
    id: 4,
    idOrder: '№1234',
    date: '12.09.1290',
    time: '22.47',
    event: 'купил',
    eventPrice: '1212,00 ₴',
    done: true,
  },
];

const OrdersWholesale = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className={styles.profileOrder}>
      <h3>Заказы</h3>
      <ul className={styles.accordionWrapper} uk-accordion="multiple: true">
        {mockData.map((item) => {
          const classNameForButtonShow = cx(styles.controllerPhoto, {
            [styles.buttonChecked]: checkHaveIndex(item.id, selectedItems),
          });

          return (
            <ProfileOrderHeader
              key={item.id}
              isIdWithArrow={false}
              isToggled={false}
              item={item}
            >
              <div className={styles.header}>
                <button className={styles.buttonPrint} type="button">
                  Распечатать документ по заказу
                </button>
                <button
                  onClick={() => {
                    const id = checkHaveIndex(item.id, selectedItems);
                    if (id) {
                      setSelectedItems(
                        selectedItems.filter(index => index !== id),
                      );
                    } else {
                      setSelectedItems([...selectedItems, item.id]);
                    }
                  }}
                  className={classNameForButtonShow}
                  type="button"
                >
                  Показать с фото
                </button>
              </div>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <div className={styles.mainInfo}>
                    {checkHaveIndex(item.id, selectedItems) && (
                      <img
                        src="/images/IMPRESSO_20_image_10059892.png"
                        alt="name"
                        className={styles.image}
                      />
                    )}
                    <div>
                      <a className={styles.model} href="/">
                        Rio 150 model 5
                      </a>
                      <p className={styles.series}>KT-1005989</p>
                    </div>
                  </div>
                  <div className={styles.details}>
                    <p className={styles.size}>Размер: 2Etra</p>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        background: '#1F2533',
                        display: 'inline-block',
                        marginRight: '10px',
                        marginLeft: '19px',
                      }}
                    />
                    <p className={styles.colorName}>#1F2533</p>
                  </div>
                  <p className={styles.countProducts}>5 шт</p>
                  <p className={styles.price}>75,00 ₴</p>
                  <p className={styles.price}>500,00 ₴</p>
                </li>
              </ul>
              <div className={styles.totalInfoWrapper}>
                <div className={styles.totalInfo}>
                  <p className={styles.totalInfoText}>Итого:</p>
                  <p className={styles.totalInfoPrice}>560,00 ₴</p>
                </div>
              </div>
            </ProfileOrderHeader>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersWholesale;
