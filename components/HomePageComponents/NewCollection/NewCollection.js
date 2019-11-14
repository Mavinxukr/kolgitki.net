import React from 'react';
import Styles from './NewCollection.module.scss';

const NewCollection = () => (
  <div className={Styles.NewCollection}>
    <h2 className={Styles.NewCollection__Title}> Новые коллекции</h2>
    <div className={Styles.NewCollection__Cards}>
      <article className={Styles.NewCollection__BigCard}>
        <article className={`${Styles.NewCollection__BigCardChildCard} ${Styles.NewCollection__ChildCard}`}>
          <h2 className={Styles.NewCollection__TitleCard}>Колготки</h2>
          <p className={`${Styles.NewCollection__Desc} ${Styles.NewCollection__DescCardBig}`}>Зима 19-20 / Giulia</p>
          <div className={Styles.NewCollection__GroupBig}>
            <a href="/" className={Styles.NewCollection__Link}>Подробнее</a>
            <p className={Styles.NewCollection__Price}>от 159 ₴</p>
          </div>
        </article>
      </article>
      <div className={Styles.NewCollection__SmallCards}>
        <article className={Styles.NewCollection__SmallCard}>
          <article className={`${Styles.NewCollection__SmallCardChildCard} ${Styles.NewCollection__ChildCard}`}>
            <div className={Styles.NewCollection__GroupSmall}>
              <h2 className={Styles.NewCollection__TitleCard}>Легинсы</h2>
              <p className={Styles.NewCollection__Price}>от 159 ₴</p>
            </div>
            <div className={Styles.NewCollection__GroupSmall}>
              <p className={Styles.NewCollection__Desc}>Зима 19-20 / Giulia</p>
              <a href="/" className={Styles.NewCollection__Link}>Подробнее</a>
            </div>
          </article>
        </article>
        <article className={Styles.NewCollection__SmallCard}>
          <article className={`${Styles.NewCollection__SmallCardChildCard} ${Styles.NewCollection__ChildCard}`}>
            <div className={Styles.NewCollection__GroupSmall}>
              <h2 className={Styles.NewCollection__TitleCard}>Брюки</h2>
              <p className={Styles.NewCollection__Price}>от 420 ₴</p>
            </div>
            <div className={Styles.NewCollection__GroupSmall}>
              <p className={Styles.NewCollection__Desc}>Зима 19-20 / Giulia</p>
              <a href="/" className={Styles.NewCollection__Link}>Подробнее</a>
            </div>
          </article>
        </article>
      </div>
    </div>
  </div>
);

export default NewCollection;
