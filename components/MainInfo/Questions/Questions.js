import React from 'react';
import Styles from './Questions.module.scss';

const Item = ({
  src, firstFeature, secondFeatures, desc,
}) => (
  <div className={Styles.Questions__Card}>
    <img className={Styles.Questions__CardImage} src={src} alt={src} />
    <ul className={Styles.Questions__FeaturesList}>
      <li className={Styles.Questions__FeaturesItem}>{firstFeature}</li>
      <li className={Styles.Questions__FeaturesItem}>{ secondFeatures}</li>
    </ul>
    <p className={Styles.Questions__CardDesc}>{desc}</p>
  </div>
);

const DropDownItem = ({ title, id }) => (
  <>
    <input className={Styles.Questions__Field} type="checkbox" id={id} />
    <div className={Styles.Questions__Item}>
      <div className={Styles.Questions__ControllerWrapper}>
        <label className={Styles.Questions__Controller} htmlFor={id}>{title}</label>
      </div>
      <div className={Styles.Questions__Info}>
        <p className={Styles.Questions__InfoDesc}>
          Лучше в магазине забирайте. У нас их много. На протяжении веков украинский народ развивал
          собственное музыкально искусство, театр и живопись. Некоторые украинские художники и их шедев
          известны не только в Украине, но и во всем мире.
        </p>
        <button className={Styles.Questions__Button} type="button">Показать магазины рядом</button>
      </div>
    </div>
  </>
);

const Questions = () => (
  <div className={Styles.Questions}>
    <h2 className={Styles.Questions__Title}>Доставка</h2>
    <p className={Styles.Questions__Desc}>
      Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата.
    </p>
    <div className={Styles.Questions__Deliveries}>
      <div className={Styles.Questions__CardWrapper}>
        <Item
          src="/images/logo-hor-ua.png"
          desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата."
          firstFeature="80 - 90 грн"
          secondFeatures="1-3 дня доставка"
        />
      </div>
      <Item
        src="/images/1280px-Ukrposhta-ua.svg.png"
        desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата."
        firstFeature="80 - 90 грн"
        secondFeatures="1-3 дня доставка"
      />
    </div>
    <h2 className={Styles.Questions__Title}>Оплата</h2>
    <div className={Styles.Questions__Payment}>
      <Item
        src="/images/1280px-LIQPAY.svg.png"
        desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата."
        firstFeature="Карта любого банка Visa, MasterCard"
        secondFeatures="2,7% Комиссия"
      />
    </div>
    <h2 className={Styles.Questions__Title}>Вопросы и Ответы</h2>
    <div className={Styles.Questions__DropDowns}>
      <DropDownItem title="Сколько стоит доставка" id="payment" />
      <DropDownItem title="Характеристики" id="characteristic" />
      <DropDownItem title="Какую доставку выбрать" id="deliveryChoose" />
    </div>
  </div>
);

export default Questions;
