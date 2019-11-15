import React, { useState } from 'react';
import ReactSiema from 'react-siema';
import Link from 'next/link';
import IconLeftArrow from '../../../assets/svg/Path8.svg';
import IconRightArrow from '../../../assets/svg/Path7.svg';
import IconLike from '../../../assets/svg/like-border.svg';
import Styles from './BestProductCard.module.scss';

const BestProductCard = ({
  item: {
    src, model, price, colors, id,
  },
}) => {
  const [slider, setSlider] = useState(null);

  const options = {
    resizeDebounce: 250,
    duration: 1000,
    perPage: 1,
    draggable: true,
    loop: true,
  };

  return (
    <article className={Styles.BestProductCard__Card}>
      <div className={Styles.BestProductCard__Slider}>
        <ReactSiema {...options} ref={siema => setSlider(siema)}>
          {
            src.map((item, index) => <img src={item} key={index} alt={model} />)
          }
        </ReactSiema>
        <button className={Styles.BestProductCard__ButtonLeft} type="button" onClick={() => slider.prev()}>
          <IconLeftArrow />
        </button>
        <button className={Styles.BestProductCard__ButtonRight} type="button" onClick={() => slider.next()}>
          <IconRightArrow />
        </button>
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
};

export default BestProductCard;
