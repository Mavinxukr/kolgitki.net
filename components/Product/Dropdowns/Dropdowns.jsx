import React from 'react';
import styles from './Dropdowns.scss';
import IconStar from '../../../assets/svg/star.svg';
import { feedbacks } from './dataForFeedbacks';

const DropDownItem = ({
  title, id, children, count,
}) => (
  <>
    <li className={styles.accordionItem} id={id}>
      <label
        className={`${styles.accordionLabel} uk-accordion-title`}
        htmlFor={id}
      >
        {title}
        {count ? (
          <span className={styles.accordionCount}>({count})</span>
        ) : null}
      </label>
      <div className="uk-accordion-content">{children}</div>
    </li>
  </>
);

const Dropdowns = () => (
  <div className={styles.dropdowns}>
    <input type="checkbox" className={styles.field} id="desc" />
    <input type="checkbox" className={styles.field} id="characteristics" />
    <input type="checkbox" className={styles.field} id="feedbacks" />
    <input type="checkbox" className={styles.field} id="info" />
    <ul className={styles.accordionList} uk-accordion="multiple: true">
      <DropDownItem title="Описание" id="desc">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </DropDownItem>
      <DropDownItem title="Характеристики" id="characteristics">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </DropDownItem>
      <DropDownItem title="Отзывы" id="feedbacks" count={15}>
        <div className={styles.dropdownBlock}>
          {feedbacks.map(item => (
            <article key={item.id} className={styles.dropdownItem}>
              <div className={styles.dropdownFeedback}>
                <p>
                  <span>
                    <IconStar className={styles.iconStar} />
                  </span>
                  <span>
                    <IconStar className={styles.iconStar} />
                  </span>
                  <span>
                    <IconStar className={styles.iconStar} />
                  </span>
                  <span>
                    <IconStar className={styles.iconStar} />
                  </span>
                  <span>
                    <IconStar className={styles.iconStar} />
                  </span>
                </p>
                <p className={styles.dropdownMessage}>{item.message}</p>
              </div>
              <h2 className={styles.dropdownName}>{item.name}</h2>
            </article>
          ))}
        </div>
        <button type="button" className={styles.dropdownButton}>
          Добавить свой отзыв
        </button>
      </DropDownItem>
      <DropDownItem title="Доставка и Оплата" id="info">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </DropDownItem>
    </ul>
  </div>
);

export default Dropdowns;
