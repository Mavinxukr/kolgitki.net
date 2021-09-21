import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cookies } from '../../../utils/getCookies';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { userDataSelector } from '../../../utils/selectors';
import styles from './CardProduct.scss';
import IconQuestion from '../../../public/svg/question.svg';
import IconHint from '../../../public/svg/Group2966.svg';
import Rating from '../Rating/Rating';
import cx from 'classnames';

const Price = ({ item, user }) => {
  if (user && user.role?.id === 3) {
    return <div className={styles.card_price}>{item.price} грн</div>;
  }
  if (item.new_price) {
    return (
      <div className={styles.card_price}>
        <p className={styles.card_price__new}>{`${Math.round(
          item.new_price
        )} грн`}</p>
        <p className={styles.card_price__old}>{`${Math.round(
          item.price
        )} грн`}</p>
        {item.price_for_3 && (
          <p className={styles.card_price__tree}>
            {parseText(cookies, 'или', 'або')} 3/{item.price_for_3} грн
            <IconQuestion className={styles.iconQuestion} />
            <span className={styles.card_price__title}>
              {parseText(
                cookies,
                'Выгода! Плати за 2 шт - получай 3! Т.е. одну шт. дарим',
                'Вигода! Плати за 2 шт - отримуй 3! Тобто одну шт. даруємо'
              )}
            </span>
          </p>
        )}
      </div>
    );
  } else {
    return <div className={styles.card_price}>{item.price} грн</div>;
  }
};
const Label = ({ labels, discount }) => {
  if (labels.length > 0) {
    return (
      <ul className={styles.card_label}>
        {labels.map((item, index) => (
          <li
            className={styles.card_label__item}
            style={{
              background:
                item?.color?.hex ||
                (item?.color?.img_link && `url(${item?.color?.img_link})`) ||
                '#f04950'
            }}
            key={item.id}
          >
            <p className={styles.card_label__text}>
              {parseText(cookies, item.text, item.text_ua)}
              {discount && index === 0 && ` -${discount}%`}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  if (discount) {
    return (
      <ul className={styles.card_label}>
        <li className={styles.card_stock}>-{discount}%</li>
      </ul>
    );
  }
  return null;
};
const Prompt = ({ data }) => {
  return (
    <div className={styles.card_prompt}>
      <IconHint className={styles.card_prompt__icon} />
      <div className={styles.card_prompt__hover}>
        <div className={styles.card_prompt__wrapper}>
          <h4 className={styles.card_prompt__title}>
            {parseText(cookies, data.help_title, data.help_title_uk)}
          </h4>
          <p className={styles.card_prompt__description}>
            {parseText(cookies, data.help, data.help_uk)}
          </p>
          <Link
            href={{ pathname: '/product/[slug]', query: data.id }}
            as={`/product${data.crumbs}/${data.id}`}
            prefetch={false}
            passHref
          >
            <a className={styles.card_prompt__link}>
              {parseText(cookies, 'Подробнее', 'Детальніше')}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CardProduct = ({ data, customClass }) => {
  console.log(data);
  const [hover, setHover] = useState(false);
  const userData = useSelector(userDataSelector);
  return (
    <div
      onMouseEnter={ev => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={styles.card}
    >
      <Link prefetch={false} href={`/product${data.crumbs}/${data.id}`}>
        <a className={styles.card_link}>
          <div className={cx(styles.card_image, customClass)}>
            <div className={styles.card_picture}>
              {data.first_img_link ? (
                <img
                  className={styles.card_source}
                  src={hover ? data.first_img_link : data.img_link}
                />
              ) : (
                <img className={styles.card_source} src={data.img_link} />
              )}
            </div>
          </div>
          <div className={styles.card_info}>
            <span className={styles.card_brand}>
              {parseText(cookies, data.brand.name, data.brand.name_ua)}
            </span>
            <span className={styles.card_title}>
              {parseText(cookies, data.name, data.name_uk)}
            </span>
            <span className={styles.card_description}>
              {parseText(cookies, data.site_name, data.site_name_uk)}
            </span>
            <Price item={data} user={userData} />
            <div className={styles.card_hover}>
              <div className={styles.card_raring}>
                <Rating amountStars={data.stars} />
                <p className={styles.card_comments}> ({data.count_comments})</p>
              </div>
              <div className={styles.card_colors}>
                {getCorrectWordCount(
                  data.count_colors,
                  parseText(
                    cookies,
                    ['цвет', 'цвета', 'цветов'],
                    ['колір', 'кольори', 'кольорів']
                  )
                )}
              </div>
            </div>
          </div>
          {data.labels || (userData?.role?.id !== 3 && data.new_price) ? (
            <Label
              labels={data.labels}
              discount={
                data.new_price
                  ? Math.round(
                      (data.price - data.new_price) / (data.price / 100)
                    )
                  : null
              }
            />
          ) : null}
        </a>
      </Link>
      {data.help && <Prompt data={data} />}
    </div>
  );
};
