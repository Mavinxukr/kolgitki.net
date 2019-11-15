import React from 'react';
import { feedbacks } from "./dataForFeedbacks";
import IconStar from '../../../assets/svg/star.svg';

const ComponentDropdowns = () => (
  <div>
    <input type="checkbox" id="desc" />
    <div>
      <label htmlFor="desc">Описание</label>
      <hr />
    </div>
    <div>
      <label htmlFor="desc">Характеристики</label>
      <hr />
    </div>
    <div>
      <label htmlFor="desc">Отзывы <span>(3)</span></label>
      <hr />
      <div>
        {
          feedbacks.map(item => (
            <article>
              {
                () => {
                  for (let i = 0; i < item.countStar; i += 1) {
                    return
                  }
                }
              }
              <h2>{item.name}</h2>
              <p>{item.message}</p>
            </article>
          ))
        }
      </div>
    </div>
    <div>
      <label htmlFor="desc">Доставка и Оплата</label>
      <hr />
    </div>
  </div>
);

export default ComponentDropdowns;
