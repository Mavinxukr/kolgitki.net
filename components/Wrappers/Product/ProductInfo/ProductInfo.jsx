import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import styles from '../Product.scss';
import IconLike from '../../../../public/svg/like-border.svg';
import Counter from '../../../Layout/Counter/Counter.jsx';
import Button from '../../../Layout/Button/Button';
import Rating from '../../../Layout/Rating/Rating';
import { parseText, calculateProcents } from '../../../../utils/helpers';
import BuyOneClick from '../../BuyOneClick/BuyOneClick';
import Login from '../../Login/Login';
import { cookies } from '../../../../utils/getCookies';
import { emailValidation } from '../../../../utils/validation';
import { getProductsData } from '../../../../redux/actions/products';
import {
  addToFavourite,
  deleteFromFavourite
} from '../../../../redux/actions/favourite';
import { addToCart } from '../../../../redux/actions/cart';
import { goodMailingRequest } from '../../../../services/product';
import UIKit from '../../../../public/uikit/uikit';
import {
  productsSelector,
  loadingSelectorForProducts,
  cartDataSelector,
  loadingSelectorForCart
} from '../../../../utils/selectors';

const checkOnSimilarParams = (
  arrOfProducts,
  selectedSizeId,
  selectedColorId
) => {
  if (arrOfProducts) {
    return arrOfProducts.findIndex(
      item =>
        item.color_id === selectedColorId && item.size_id === selectedSizeId
    );
  }
  return -1;
};

const setArrForIdProducts = (arr, keyArr) => {
  localStorage.setItem(keyArr, JSON.stringify(arr));
};

const addToCartForNotAuthUser = ({
  product,
  amountOfProduct,
  selectedSizeId,
  selectedColorId,
  key
}) => {
  const keyArr = key === 'present_id' ? 'arrOfIdPresent' : 'arrOfIdProduct';
  const arrOfIdProduct = JSON.parse(localStorage.getItem(keyArr));
  const indexExistParams = checkOnSimilarParams(
    arrOfIdProduct,
    selectedSizeId,
    selectedColorId
  );
  if (!arrOfIdProduct) {
    setArrForIdProducts(
      [
        {
          [key]: product?.good?.id,
          count: amountOfProduct,
          color_id: selectedColorId,
          size_id: selectedSizeId
        }
      ],
      keyArr
    );
    return;
  }
  if (arrOfIdProduct && indexExistParams === -1) {
    setArrForIdProducts(
      [
        ...arrOfIdProduct,
        {
          [key]: product?.good?.id,
          [key]: product?.good?.id,
          count: amountOfProduct,
          color_id: selectedColorId,
          size_id: selectedSizeId
        }
      ],
      keyArr
    );
    return;
  }
  if (indexExistParams !== -1) {
    const newArr = arrOfIdProduct.map((item, index) =>
      index === indexExistParams
        ? { ...item, count: amountOfProduct + item.count }
        : item
    );
    setArrForIdProducts(newArr, keyArr);
  }
};

export const ProductInfo = ({
  product,
  commentsFromStore,
  onOpenFormFeedback,
  setToggled,
  accordionRef,
  toggled,
  formFeedbackRef,
  notAuthBLockFeedbackRef,
  dispatch,
  userData,
  isAuth,
  sliderProduct,
  setSliderProduct,
  router,
  isDesktopScreen,
  openPopup,
  email,
  isEmail
}) => {
  const cartItems = useSelector(isAuth ? cartDataSelector : productsSelector);
  const loading = useSelector(
    isAuth ? loadingSelectorForCart : loadingSelectorForProducts
  );
  const productType = router.query.present ? 'present' : 'good';

  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setColor] = useState(null);
  const [sizesList, setSizesList] = useState([]);
  const [selectedSize, setSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setColor(product.good.colors[0]);
    product.good.colors[0]?.sizes && setSizesList(product.good.colors[0].sizes);
  }, [product]);

  useEffect(() => {
    if (selectedColor) {
      const color = product.good.colors.filter(
        item => item.color.id === selectedColor.color.id
      )[0];

      setQuantity(
        Math.max(
          reduceCountProduct(color?.sizes) -
            reduceCountProductInCartThisColor(),
          0
        )
      );
      setSizesList(color.sizes);
      setSize(null);
    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedSize) {
      setQuantity(
        selectedSize.quantity - reduceCountProductInCartThisColorAndSize()
      );
    }
  }, [selectedSize, cartItems]);

  const [productIsFavorite, setProductIsFavorite] = useState(
    product?.good?.isFavorite
  );

  const [isSuccess, setIsSuccess] = useState(false);
  const [emailValue, isEmailValue] = useState('');
  const [emailErr, isEmailErr] = useState(false);
  const [res, isRes] = useState(false);
  const errorColor = useRef(null);
  const errorSize = useRef(null);

  const reduceCountProduct = arr => {
    return arr.reduce((sum, current) => sum + current.quantity, 0);
  };

  const reduceCountProductInCartThisColorAndSize = () => {
    if (!selectedColor || !selectedSize) {
      return 0;
    }
    let thisItemInCart = cartItems
      .filter(item => item.hasOwnProperty(productType))
      .filter(item => item[productType]?.id === product.good.id)
      .filter(item => item.color.id === selectedColor.color.id)
      .filter(item => item.size.id === selectedSize.id);

    return thisItemInCart.reduce((sum, current) => sum + current.count, 0);
  };

  const reduceCountProductInCartThisColor = () => {
    if (!selectedColor) {
      return 0;
    }
    let thisItemInCart = cartItems
      .filter(item => item.hasOwnProperty(productType))
      .filter(item => item[productType]?.id === product.good.id)
      .filter(item => item.color.id === selectedColor.color.id);

    return thisItemInCart.reduce((sum, current) => sum + current.count, 0);
  };

  const isErrorData = () => {
    if (!selectedColor) {
      errorColor.current.classList.add('Product_show');
      return;
    }
    errorColor.current.classList.remove('Product_show');

    if (!selectedSize) {
      errorSize.current.classList.add('Product_show');
      return;
    }
    errorSize.current.classList.remove('Product_show');

    return true;
  };

  const addProductToCart = () => {
    const key = (router.query.present && 'present_id') || 'good_id';

    if (isAuth) {
      dispatch(
        addToCart({
          params: {},
          body: {
            [key]: product?.good?.id,
            count: selectedQuantity,
            color_id: selectedColor.color.id,
            size_id: selectedSize.id
          }
        })
      );
      setIsSuccess(true);
    } else {
      addToCartForNotAuthUser({
        product,
        amountOfProduct: selectedQuantity,
        selectedSizeId: selectedSize.id,
        selectedColorId: selectedColor.color.id,
        key
      });
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct') || '[]',
            presents: localStorage.getItem('arrOfIdPresent') || '[]'
          }
        )
      );
    }
    setIsSuccess(true);
  };

  const classNameForButtonFavourite = cx(styles.buttonLike, {
    [styles.buttonLikeSelected]: productIsFavorite,
    [styles.buttonHidden]: userData?.role?.id === 3
  });
  if (res) {
    setTimeout(() => {
      isRes(!res);
    }, 2000);
  }
  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetailsHeader}>
        <div className={styles.productTitleBlock}>
          <h1 className={styles.productTitle}>
            {parseText(
              cookies,
              product?.good?.site_name,
              product?.good?.site_name_uk
            )}{' '}
            {parseText(cookies, product?.good?.name, product?.good?.name_uk)}
          </h1>
          {product?.good?.vendor_code && (
            <span className={styles.addInfo}>{product?.good?.vendor_code}</span>
          )}
        </div>
        <button
          className={classNameForButtonFavourite}
          onClick={() => {
            if (isAuth) {
              const key = router.query.present ? 'present_id' : 'good_id';
              if (productIsFavorite) {
                dispatch(
                  deleteFromFavourite(
                    {},
                    { [`${key}s`]: JSON.stringify([product?.good?.id]) },
                    key === 'present_id'
                  )
                );
                setProductIsFavorite(!productIsFavorite);
              } else {
                dispatch(
                  addToFavourite(
                    {},
                    {
                      [key]: product?.good?.id
                    },
                    !!router.query.present
                  )
                );
                setProductIsFavorite(!productIsFavorite);
              }
            } else {
              openPopup({
                PopupContentComponent: Login
              });
            }
          }}
          type="button"
        >
          <IconLike className={styles.iconLike} />
        </button>
      </div>
      <div className={styles.addInfoBlock}>
        <div className={styles.priceBlock}>
          {userData && userData?.role?.id === 3 ? (
            <p className={styles.price}>{product?.good?.price} грн</p>
          ) : (
            <>
              {product?.good?.new_price ? (
                <>
                  <p className={styles.salePrice}>
                    {product?.good?.new_price} грн
                    <span>
                      <span>
                        -
                        {calculateProcents(
                          product?.good?.new_price,
                          product?.good?.price
                        )}
                        %
                      </span>
                      <span className={styles.oldPrice}>
                        {product?.good?.price} грн
                      </span>
                    </span>
                    {product?.good?.price_for_3 && (
                      <p>3/{product?.good?.price_for_3} грн</p>
                    )}
                  </p>
                </>
              ) : (
                <span className={styles.price}>
                  {product?.good?.price} грн
                  {product?.good?.price_for_3 && (
                    <span
                      style={{
                        color: '#f04950',
                        marginLeft: '5px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      или 3/{product?.good?.price_for_3} грн
                      <p className={styles.iconBlock}>
                        <IconQuestion className={styles.iconQuestion} />
                        <span className={styles.prompt}>
                          {parseText(
                            cookies,
                            'Выгода! Плати за 2 шт - получай 3! Т.е. одну шт. дарим',
                            'Вигода! Плати за 2 шт - отримуй 3! Тобто одну шт. даруємо'
                          )}
                        </span>
                      </p>
                    </span>
                  )}
                </span>
              )}
            </>
          )}
        </div>

        <div className={styles.ratingWrapper}>
          <div className={styles.ratingBlock}>
            <Rating
              amountStars={product?.good?.stars}
              classNameWrapper={styles.countAssessment}
            />
            <span className={styles.countFeedbacks}>
              (
              {commentsFromStore?.length === undefined
                ? '0'
                : commentsFromStore?.length}
              )
            </span>
          </div>
          <div className={styles.addComentBlock}>
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                onOpenFormFeedback();
                setToggled(true);
                if (
                  !toggled &&
                  UIKit.accordion(accordionRef.current).items[2].offsetHeight <
                    140
                ) {
                  UIKit.accordion(accordionRef.current).toggle(2, true);
                }
                setTimeout(() => {
                  let top;
                  if (isAuth) {
                    top = formFeedbackRef.current.getBoundingClientRect().y;
                  } else {
                    top = notAuthBLockFeedbackRef.current.getBoundingClientRect()
                      .y;
                  }
                  window.scrollTo({
                    top: top - 200,
                    left: 0,
                    behavior: 'smooth'
                  });
                }, 500);
              }}
              className={styles.addFeedback}
            >
              {parseText(cookies, 'Добавить отзыв', 'Додати відгук')}
            </a>
          </div>
        </div>
      </div>
      <p className={styles.checkCount}>
        {quantity || 0} {parseText(cookies, 'товаров', 'товарів')} в{' '}
        {parseText(cookies, 'наличии', 'наявності')}
      </p>
      <hr className={`${styles.lineOne} ${styles.line}`} />
      {product?.good?.colors?.length > 0 ? (
        <>
          <div className={styles.colors}>
            <h6>
              {parseText(cookies, 'Цвет: ', 'Колір: ')}
              <span>{selectedColor ? selectedColor.color.name : ''}</span>
            </h6>
            <div className={styles.buttonsColor}>
              {product?.good?.colors.map((item, index) => {
                const classNameForButton = cx(styles.buttonColor, {
                  [styles.buttonColorActive]:
                    selectedColor && selectedColor.color.id === item.color.id,
                  [styles.withBorder]: item.color.name === 'White'
                });

                return (
                  <button
                    key={item.color.id}
                    type="button"
                    style={{
                      background: item.color.hex
                        ? `${item.color.hex}`
                        : `url(${item.color.img_link})`
                    }}
                    className={classNameForButton}
                    onClick={() => {
                      setColor(item);
                      setSliderProduct(item);
                    }}
                  />
                );
              })}
            </div>
            <p ref={errorColor}>
              {parseText(cookies, 'Выберите цвет', 'Виберіть колір')}
            </p>
          </div>
          <div className={styles.sizes}>
            <h6>{parseText(cookies, 'Размер', 'Розмір')}</h6>
            <div className={styles.buttonsSize}>
              {sizesList.map(item => {
                const classNameForButton = cx(styles.buttonSize, {
                  [styles.buttonSizeActive]:
                    selectedSize && selectedSize.id === item.id
                });
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={classNameForButton}
                    onClick={() => {
                      setSize(item);
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
              <p ref={errorSize}>
                {parseText(cookies, 'Выберите размер', 'Виберіть розмір')}
              </p>
            </div>
            {product?.good?.chart_size && (
              <div
                className={styles.linkAddImageWrapper}
                uk-lightbox="animation: fade;"
              >
                <a
                  href={product?.good?.chart_size.image_link}
                  className={styles.linkAddImage}
                >
                  {parseText(cookies, 'Узнать размер', 'Дізнатися розмір')}
                </a>
              </div>
            )}
          </div>
          {quantity > 0 && selectedSize && (
            <div className={styles.counterBlock}>
              <h6>{parseText(cookies, 'Кол-во', 'К-сть')}</h6>
              <Counter
                classNameForCounter={styles.counter}
                count={quantity}
                amountOfProduct={selectedQuantity}
                setAmountOfProduct={setSelectedQuantity}
              />
            </div>
          )}

          <hr className={`${styles.lineTwo} ${styles.line}`} />
          <div className={styles.controlButtons}>
            <Button
              title={
                isSuccess
                  ? parseText(cookies, 'Добавить еще 1', 'Додати ще 1')
                  : parseText(cookies, 'Добавить в корзину', 'Додати в кошик')
              }
              buttonType="button"
              viewType="black"
              disabled={quantity <= 0 || loading}
              onClick={() => {
                if (isErrorData()) {
                  addProductToCart();
                }
                setSelectedQuantity(1);
              }}
              classNameWrapper={styles.buttonAddToCart}
            />
            <Button
              classNameWrapper={styles.buttonBuyOneClick}
              title="Купить в один клик"
              titleUa="Купити в один клік"
              buttonType="button"
              viewType="white"
              disabled={quantity <= 0 || loading}
              onClick={() => {
                if (isErrorData()) {
                  const key = router.query.present ? 'present_id' : 'good_id';
                  openPopup({
                    PopupContentComponent: BuyOneClick,
                    content: {
                      [key]: product?.good?.id,
                      color_id: selectedColor.color.id,
                      size_id: selectedSize.id,
                      count: selectedQuantity
                    }
                  });
                }
              }}
            />
            <button
              type="button"
              className={styles.openSubscribe}
              onClick={() => {
                isEmail(true);
              }}
            >
              {parseText(
                cookies,
                'Подписаться на оповещение по цене',
                'Підписатись на сповіщення по ціні'
              )}
            </button>
          </div>
        </>
      ) : (
        <h2 style={{ margin: '30px 0 0px' }}>
          {parseText(
            cookies,
            'Товара нет в наличии',
            'Товару немає в наявності'
          )}
        </h2>
      )}

      {res && (
        <p style={{ marginTop: '15px' }}>
          {parseText(cookies, 'Вы подписаны успешно', 'Ви підписані успішно')}
        </p>
      )}
      {email && (
        <div className={styles.form}>
          <p>{parseText(cookies, 'Введите email', 'Введіть email')}</p>
          <input
            className={styles.fieldInput}
            onChange={e => {
              isEmailValue(e.target.value);
              if (emailValidation(emailValue) === undefined) {
                isEmailErr(false);
              }
            }}
            type="email"
            onBlur={() => emailValidation(emailValue)}
          />
          <p style={{ marginBottom: '10px', color: '#f04950' }}>
            {emailErr && emailValidation(emailValue)}
          </p>
          <Button
            classNameWrapper={styles.buttonBuyOneClick}
            title="Отправить"
            titleUa="Надіслати"
            buttonType="button"
            viewType={
              emailValidation(emailValue) === undefined ? 'red' : 'white'
            }
            onClick={() => {
              if (emailValidation(emailValue) !== undefined) {
                isEmailErr(true);
                isEmail(true);
              } else {
                goodMailingRequest(
                  {},
                  {
                    good_id: product?.good?.id,
                    email: emailValue
                  }
                ).then(() => isRes(!res));
                isEmail(false);
                isEmailValue('');
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
