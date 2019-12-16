import React from 'react';
import styles from './ComponentDropdowns.module.scss';
import IconStar from '../../../assets/svg/star.svg';
import IconArrow from '../../../assets/svg/Path 239.svg';
import { feedbacks } from './dataForFeedbacks';

const ComponentDropdowns = () => (
  <div className={styles.ComponentDropdowns}>
    <ul uk-accordion="multiple: true">
      <li className="uk-open">
        <a className="uk-accordion-title" href="/">
          Описание
        </a>
        <div className="uk-accordion-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </li>
      <li>
        <a className="uk-accordion-title" href="/">
          Характеристики
        </a>
        <div className="uk-accordion-content">
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            reprehenderit.
          </p>
        </div>
      </li>
      <li>
        <a className="uk-accordion-title" href="/">
          Отзывы <span>(3)</span>
        </a>
        <div className="uk-accordion-content">
          <div className={styles.ComponentDropdowns__DropdownBlock}>
            {feedbacks.map(item => (
              <article
                key={item.id}
                className={styles.ComponentDropdowns__DropdownItem}
              >
                <div className={styles.ComponentDropdowns__DropdownFeedback}>
                  <p>
                    <span>
                      <IconStar
                        className={styles.ComponentDropdowns__IconStar}
                      />
                    </span>
                    <span>
                      <IconStar
                        className={styles.ComponentDropdowns__IconStar}
                      />
                    </span>
                    <span>
                      <IconStar
                        className={styles.ComponentDropdowns__IconStar}
                      />
                    </span>
                    <span>
                      <IconStar
                        className={styles.ComponentDropdowns__IconStar}
                      />
                    </span>
                    <span>
                      <IconStar
                        className={styles.ComponentDropdowns__IconStar}
                      />
                    </span>
                  </p>
                  <p className={styles.ComponentDropdowns__DropdownMessage}>
                    {item.message}
                  </p>
                </div>
                <h2 className={styles.ComponentDropdowns__DropdownName}>
                  {item.name}
                </h2>
              </article>
            ))}
            <button
              type="button"
              className={styles.ComponentDropdowns__DropdownButton}
            >
              Добавить свой отзыв
            </button>
          </div>
        </div>
      </li>
      <li>
        <a className={`${styles.ComponentDropdowns__LinkDrop} uk-accordion-title`} href="/">
          Доставка и Оплата
        </a>
        <div className="uk-accordion-content">
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat proident.
          </p>
        </div>
      </li>
    </ul>
  </div>
);

export default ComponentDropdowns;
