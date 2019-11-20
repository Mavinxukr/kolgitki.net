import React from 'react';
import Link from 'next/link';
import IconLeftArrow from '../../../assets/svg/Path8.svg';
import IconRightArrow from '../../../assets/svg/Path7.svg';
import IconLike from '../../../assets/svg/like-border.svg';
import Styles from './BestProductCard.module.scss';

const BestProductCard = ({
  item: {
    id, model, price, colors, src,
  },
}) => (
  <article className={Styles.BestProductCard__Card}>
    <div uk-slideshow="ratio: 7:3, pause-on-hover: true" className={Styles.BestProductCard__Slider}>
      <ul className={`${Styles.BestProductCard__List} uk-slideshow-items`}>
        {
          src.map((item, index) => (
            <li key={index}>
              <img className={Styles.BestProductCard__SliderImage} src={item} alt={model} />
            </li>
          ))
        }
      </ul>
      <a href="/" className={Styles.BestProductCard__ButtonLeft} uk-slideshow-item="previous">
        <IconLeftArrow className={`${Styles.Slider__Arrow} ${Styles.Slider__ArrowLeft}`} />
      </a>
      <a href="/" className={Styles.BestProductCard__ButtonRight} uk-slideshow-item="next">
        <IconRightArrow className={`${Styles.Slider__Arrow}`} />
      </a>
      <button className={Styles.BestProductCard__ButtonBuy} type="button">Купить</button>
    </div>
    <div className={Styles.BestProductCard__Content}>
      <Link href={{ pathname: '/Products/[pid]', query: { pathNameOne: 'Главная', pathNameTwo: model } }} as={`/Products/${id}`}>
        <a className={Styles.BestProductCard__ContentTitle}>{model}</a>
      </Link>
      <div className={Styles.BestProductCard__ContentInfo}>
        <p className={Styles.BestProductCard__ContentPrice}>{price}</p>
        <p className={Styles.BestProductCard__ContentColors}>{colors.length} цвета</p>
      </div>
      <div className={Styles.BestProductCard__Colors}>
        <div>
          {
            colors.map((item, index) => (
              <span
                key={index}
                style={{
                  width: '20px', height: '20px', borderRadius: '6px', background: `${item}`, display: 'inline-block', marginRight: '7px',
                }}
              />
            ))
          }
        </div>
        <button type="button">
          <IconLike />
        </button>
      </div>
    </div>
  </article>
);

export default BestProductCard;
