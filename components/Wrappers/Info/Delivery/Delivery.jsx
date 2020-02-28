import React from 'react';
import dynamic from 'next/dynamic';
import PaymentInfo from '../../../PaymentInfo/PaymentInfo';
import Button from '../../../Layout/Button/Button';
import styles from './Delivery.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const DropDownItem = () => (
  <div className={styles.info}>
    <p className={styles.infoDesc}>
      Лучше в магазине забирайте. У нас их много. На протяжении веков украинский народ развивал
      собственное музыкально искусство, театр и живопись. Некоторые украинские художники и их шедев
      известны не только в Украине, но и во всем мире.
    </p>
    <Button
      buttonType="button"
      title="Показать магазины рядом"
      classNameWrapper={styles.button}
      viewType="black"
    />
  </div>
);

const Delivery = () => (
  <div className={styles.delivery}>
    <h3>Доставка</h3>
    <p className={styles.desc}>
      Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата.
    </p>
    <div className={styles.deliveries}>
      <PaymentInfo
        classNameWrapper={styles.cardWrapper}
        src="/images/logo-hor-ua.png"
        desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата."
        firstFeature="80 - 90 грн"
        secondFeatures="1-3 дня доставка"
      />
      <PaymentInfo
        src="/images/1280px-Ukrposhta-ua.svg.png"
        desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
      и разработали максимально простую и удобную процедуру возврата."
        firstFeature="80 - 90 грн"
        secondFeatures="1-3 дня доставка"
      />
    </div>
    <h3>Оплата</h3>
    <PaymentInfo
      classNameWrapper={styles.payment}
      src="/images/1280px-LIQPAY.svg.png"
      desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
    и разработали максимально простую и удобную процедуру возврата."
      firstFeature="Карта любого банка Visa, MasterCard"
      secondFeatures="2,7% Комиссия"
    />
    <h3>Вопросы и Ответы</h3>
    <ul className={styles.accordion} uk-accordion="multiple: true">
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Сколько стоит доставка"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Характеристики"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Какую доставку выбрать"
        toggled
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
    </ul>
  </div>
);

export default Delivery;
