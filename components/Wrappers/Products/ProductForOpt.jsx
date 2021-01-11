import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import Link from 'next/link';
import { animateScroll as scroll } from 'react-scroll';
import styles from './Products.scss';
import Button from '../../Layout/Button/Button';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import Icon from '../../../public/svg/Path239.svg';
import Counter from '../../Layout/Counter/Counter';
import { addToCart } from '../../../redux/actions/cart';

const setArrForIdProducts = (arr) => {
  if (arr.length > 1) {
    if (arr[arr.length - 2].size_id === arr[arr.length - 1].size_id) {
      arr.splice(-2, 1);
    }
  }
  localStorage.setItem('arrOpt', JSON.stringify(arr));
};

const ProductForOpt = ({ item, isToggled, withPhoto }) => {
  const [toggled, setToggled] = useState(isToggled);
  const [submit, isSubmit] = useState(false);
  const dispatch = useDispatch();

  const classNameForLinkId = cx(styles.itemLinkId, styles.linkIdAfterRotate);

  const list = document.querySelectorAll('.Products_item');

  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains('uk-open')) {
      list[i].classList.add('Products_opened');
    } else {
      list[i].classList.remove('Products_opened');
    }
  }

  return (
    <div className={styles.item}>
      <div
        style={{ fontSize: 'initial' }}
        className={cx(styles.itemMainInfoWrapper, 'uk-accordion-title')}
      >
        <div className={styles.itemMainInfo}>
          <a
            className={classNameForLinkId}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem('arrOpt');
              setTimeout(() => {
                const centerScroll = document.querySelector('.Products_opened');
                if (centerScroll !== null) {
                  let heightScroll =
                    window.innerHeight - 200 < centerScroll.offsetHeight
                      ? centerScroll.offsetTop - 100
                      : centerScroll.offsetHeight / 2
                        + centerScroll.offsetTop
                        - window.innerHeight / 2;

                  if (window.innerWidth > 768) {
                    heightScroll += 120;
                  }

                  scroll.scrollTo(heightScroll, {
                    duration: 400,
                  });
                }
              }, 501);
              setToggled(!toggled);
            }}
          >
            <Icon />
          </a>
          {withPhoto && (
            <img
              className={styles.imageOpt}
              src={item.img_link}
              alt={item.name}
            />
          )}
          <Link
            href={{ pathname: '/Product/[slug]', query: item.id }}
            as={`/Product${item.crumbs}/${item.id}`}
            prefetch={false}
            passHref
          >
            <a style={{ display: 'grid' }}>
              {parseText(cookies, item.name, item.name_uk)}
              <p className={styles.mediaVendor}>
                {item.vendor_code || '-'}
              </p>
            </a>
          </Link>
        </div>
        <p className={styles.brandName}>
          {parseText(
            cookies,
            item.brand.name || '-',
            item.brand.name_ua || '-',
          )}
        </p>
        <p className={styles.categoriesName}>
          {parseText(cookies, item.name, item.name_uk)}
        </p>
        <p className={styles.priceForOPT}>{item.price} грн</p>
      </div>
      <div className="uk-accordion-content">
        {item.colors.length > 0 && (
          <ContentItem
            submit={submit}
            isSubmit={isSubmit}
            toggled={toggled}
            item={item}
          />
        )}
        <div className={styles.addToCard}>
          <Button
            buttonType="button"
            title={item.colors.length === 0 ? 'Нет в наличии' : 'В корзину'}
            titleUa={
              item.colors.length === 0 ? 'Немає в наявності' : 'До кошика'
            }
            viewType="pagination"
            disabled={item.colors.length === 0}
            onClick={() => {
              const arr = JSON.parse(localStorage.getItem('arrOpt'));
              const NoAdd = [0];
              const requestArr = arr.filter(i => NoAdd[0] !== i.count);
              dispatch(
                addToCart({
                  params: {},
                  body: {
                    goods: JSON.stringify(requestArr) || [],
                  },
                  isAddDataByArray: true,
                }),
              );
              isSubmit(!submit);
              localStorage.removeItem('arrOpt');
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ContentItem = React.memo(({
  item, toggled, submit, isSubmit,
}) => {
  const arrOpt = JSON.parse(localStorage.getItem('arrOpt')) || [];

  return (
    <>
      <div className={styles.infoHeader}>
        <p>{parseText(cookies, 'Размер', 'Розмір')}</p>
        <p>{parseText(cookies, 'Цвет', 'Колір')}</p>
        <p>{parseText(cookies, 'Артикул', 'Артикул')}</p>
        <p>{parseText(cookies, 'Наличие', 'Наявність')}</p>
        <p>{parseText(cookies, 'Цена', 'Ціна')}</p>
        <p>{parseText(cookies, 'Кол-во', 'К-сть')}</p>
      </div>
      {item.colors.map(itemProducts => itemProducts.sizes.map((itemProduct) => {
        const [amountOfProduct, setAmountOfProduct] = useState(0);

        useEffect(() => {
          setAmountOfProduct(0);
        }, [toggled]);

        useEffect(() => {
          setArrForIdProducts([
            ...arrOpt,
            {
              good_id: item.id,
              color_id: itemProducts.color.id,
              size_id: itemProduct.id,
              count: amountOfProduct,
            },
          ]);
        }, [amountOfProduct]);

        useEffect(() => {
          isSubmit(false);
          setAmountOfProduct(0);
        }, [submit]);

        return (
          <div className={styles.infoBody}>
            <p>{itemProduct.name}</p>
            <p className={styles.colorsBlock}>
              <div
                className={cx(styles.colorBock, {
                  [styles.withBorder]: itemProducts.color.name === 'White',
                })}
                style={{
                  background: itemProducts.color.hex
                    ? `${itemProducts.color.hex}`
                    : `url(${itemProducts.color.img_link})`,
                }}
              />
              <p>
                {parseText(
                  cookies,
                  itemProducts.color.name,
                  itemProducts.color.name_ua,
                )}
              </p>
            </p>
            <p>{item.vendor_code || '-'}</p>
            <p>
              {itemProduct.quantity > 0
                ? parseText(cookies, 'Есть', 'Є в наявності')
                : parseText(cookies, 'Нет', 'Немає')}
            </p>
            <p>{itemProduct.price} грн</p>
            <div>
              <Counter
                classNameForCounter={styles.counter}
                count={itemProduct.quantity}
                amountOfProduct={amountOfProduct || 0}
                setAmountOfProduct={setAmountOfProduct}
                optProduct
              />
            </div>
          </div>
        );
      }))}
    </>
  );
});

ProductForOpt.propTypes = {
  item: PropTypes.object,
  isToggled: PropTypes.bool,
  withPhoto: PropTypes.bool,
};

export default ProductForOpt;
