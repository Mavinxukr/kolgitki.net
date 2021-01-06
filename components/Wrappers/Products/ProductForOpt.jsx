import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
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

  const arrOpt = JSON.parse(localStorage.getItem('arrOpt')) || [];

  const classNameForAccordionItem = cx(styles.item);

  const classNameForLinkId = cx(styles.itemLinkId, styles.linkIdAfterRotate);

  return (
    <div className={classNameForAccordionItem}>
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
          <div style={{ display: 'grid' }}>
            {parseText(cookies, item.name, item.name_uk)}
            <p className={styles.mediaVendor}>
              Артикул: {item.vendor_code || '-'}
            </p>
          </div>
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
        <p>{item.price} грн</p>
      </div>
      <div className="uk-accordion-content">
        {item.colors.length > 0 && (
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
                  <p>
                    <div
                      className={cx(styles.colorBock, {
                        [styles.withBorder]:
                            itemProducts.color.name === 'White',
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
                      amountOfProduct={amountOfProduct}
                      setAmountOfProduct={setAmountOfProduct}
                      optProduct
                    />
                  </div>
                </div>
              );
            }))}
          </>
        )}
        <div className={styles.addToCard}>
          <Button
            buttonType="button"
            title={item.colors.length === 0 ? 'Нет в наличии' : 'В Корзину'}
            titleUa={
              item.colors.length === 0 ? 'Немає в наявності' : 'До Кошика'
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

ProductForOpt.propTypes = {
  item: PropTypes.object,
  isToggled: PropTypes.bool,
  withPhoto: PropTypes.bool,
};

export default ProductForOpt;
