import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import IconClothes from '../../public/svg/clothes1.svg';
import IconSale from '../../public/svg/sale1.svg';
import IconDelivery from '../../public/svg/free-delivery1.svg';
import styles from './FeaturesCards.scss';

const Card = ({ title, buttonTitle, children }) => (
  <article className={styles.card}>
    {children}
    <h4 className={styles.cardTitle}>{title}</h4>
    <hr className={styles.line} />
    <button type="button" className={styles.cardButton}>
      {buttonTitle}
    </button>
  </article>
);

const FeaturesCards = ({ classNameWrapper }) => (
  <div className={cx(styles.featuresCards, classNameWrapper)}>
    <Card
      title="Самовывоз из более 60 магазинов по Украине"
      buttonTitle="Показать магазины"
    >
      <IconClothes className={styles.icon} />
    </Card>
    <Card title="Низкие цены от производителя" buttonTitle="Все акции">
      <IconSale className={styles.icon} />
    </Card>
    <Card
      title="Бесплатная доставка при заказе от 500 грн"
      buttonTitle="Выбрать товар"
    >
      <IconDelivery className={styles.icon} />
    </Card>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

FeaturesCards.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default FeaturesCards;
