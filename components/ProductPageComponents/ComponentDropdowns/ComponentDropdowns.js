import React from 'react';
import Styles from './ComponentDropdowns.module.scss';
import IconStar from '../../../assets/svg/star.svg';
import IconArrow from '../../../assets/svg/Path 239.svg';
import { feedbacks } from './dataForFeedbacks';

const ComponentDropdowns = () => (
  <div className={Styles.ComponentDropdowns}>
    <input type="checkbox" id="desc" className={Styles.ComponentDropdowns__Input} />
    <div className={Styles.ComponentDropdowns__Item}>
      <label className={Styles.ComponentDropdowns__Label} htmlFor="desc">
        Описание <span><IconArrow className={`${Styles.ComponentDropdowns__IconArrow} ${Styles.ComponentDropdowns__IconArrowOne}`} /></span>
      </label>
    </div>
    <input type="checkbox" id="characters" className={Styles.ComponentDropdowns__Input} />
    <div className={Styles.ComponentDropdowns__Item}>
      <label className={Styles.ComponentDropdowns__Label} htmlFor="characters">
        Характеристики <span><IconArrow className={`${Styles.ComponentDropdowns__IconArrow} ${Styles.ComponentDropdowns__IconArrowTwo}`} /></span>
      </label>
    </div>
    <input type="checkbox" id="feedbacks" className={Styles.ComponentDropdowns__Input} />
    <div className={`${Styles.ComponentDropdowns__Item} ${Styles.ComponentDropdowns__ItemFeedbacks}`}>
      <label className={Styles.ComponentDropdowns__Label} htmlFor="feedbacks">
        Отзывы <span className={Styles.ComponentDropdowns__Count}>(3)</span>
        <span><IconArrow className={`${Styles.ComponentDropdowns__IconArrow} ${Styles.ComponentDropdowns__IconArrowThree}`} /></span>
      </label>
      <div className={Styles.ComponentDropdowns__DropdownBlock}>
        {
          feedbacks.map(item => (
            <article className={Styles.ComponentDropdowns__DropdownItem}>
              <div className={Styles.ComponentDropdowns__DropdownFeedback}>
                <p>
                  <span>
                    <IconStar className={Styles.ComponentDropdowns__IconStar} />
                  </span>
                  <span>
                    <IconStar className={Styles.ComponentDropdowns__IconStar} />
                  </span>
                  <span>
                    <IconStar className={Styles.ComponentDropdowns__IconStar} />
                  </span>
                  <span>
                    <IconStar className={Styles.ComponentDropdowns__IconStar} />
                  </span>
                  <span>
                    <IconStar className={Styles.ComponentDropdowns__IconStar} />
                  </span>
                </p>
                <p className={Styles.ComponentDropdowns__DropdownMessage}>{item.message}</p>
              </div>
              <h2 className={Styles.ComponentDropdowns__DropdownName}>{item.name}</h2>
            </article>
          ))
        }
        <button type="button" className={Styles.ComponentDropdowns__DropdownButton}>Добавить свой отзыв</button>
      </div>
    </div>
    <input type="checkbox" id="pay" className={Styles.ComponentDropdowns__Input} />
    <div className={Styles.ComponentDropdowns__Item}>
      <label className={Styles.ComponentDropdowns__Label} htmlFor="pay">
        Доставка и Оплата
        <span><IconArrow className={`${Styles.ComponentDropdowns__IconArrow} ${Styles.ComponentDropdowns__IconArrowFour}`} /></span>
      </label>
    </div>
  </div>
);

export default ComponentDropdowns;
