import React, {
  useState, useRef, useEffect, forwardRef,
} from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import styles from './Product.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import Counter from '../../Layout/Counter/Counter.jsx';
import Button from '../../Layout/Button/Button';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import Rating from '../../Layout/Rating/Rating';
import PaymentInfo from '../../PaymentInfo/PaymentInfo';
import Loader from '../../Loader/Loader';
import ProductCard from '../../Layout/ProductCard/ProductCard';
import {
  addCommentData,
  editCommentData,
  getCommentsData,
  deleteComment,
} from '../../../redux/actions/comment';
import { getProductsData } from '../../../redux/actions/products';
import {
  editCurrentUserData,
  loginViaFacebook,
} from '../../../redux/actions/currentUser';
import { addToFavourite } from '../../../redux/actions/favourite';
import { getProductData } from '../../../redux/actions/product';
import { addToCart } from '../../../redux/actions/cart';
import UIKit from '../../../public/uikit/uikit';
import {
  isDataReceivedProductSelector,
  productDataSelector,
  isAuthSelector,
  commentsDataSelector,
  userDataSelector,
} from '../../../utils/selectors';
import { addToCartFromLocale } from '../../../utils/helpers';
import IconLike from '../../../public/svg/like-border.svg';
import IconClothes from '../../../public/svg/clothes1.svg';
import IconSale from '../../../public/svg/sale1.svg';
import IconDelivery from '../../../public/svg/free-delivery1.svg';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../Accordion/Accordion'),
  { ssr: false },
);

const ProductSlider = ({ productData, sliderProduct, setSliderProduct }) => {
  const [index, setIndex] = useState(0);
  const productSliderData = [
    { good_img_link: productData.good.img_link, id: 9 },
    ...productData.good.colors,
  ];

  const value = useRef(null);

  useEffect(() => {
    setSliderProduct(UIKit.slideshow(value.current));
  }, []);

  useEffect(() => {
    if (sliderProduct) {
      value.current.addEventListener('itemshow', () => {
        setIndex(sliderProduct.index);
      });
    }
  }, [sliderProduct]);

  return (
    <div className={styles.productSlider}>
      {productData.good.colors.length > 0 && (
        <div uk-lightbox="animation: fade;" className={styles.addPhotos}>
          {productData.good.colors.map(item => (
            <a
              key={item.id}
              href={item.good_img_link}
              style={{ backgroundImage: `url(${item.good_img_link})` }}
              className={styles.linkAddImage}
            />
          ))}
        </div>
      )}
      <div
        ref={value}
        uk-slideshow="pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`uk-slideshow-items ${styles.list}`}>
          {productSliderData.map(slide => (
            <li className={styles.item} key={slide.id}>
              <div uk-lightbox="animation: fade">
                <a href={slide.good_img_link}>
                  <img
                    className={styles.image}
                    src={slide.good_img_link}
                    alt={slide.good_img_link}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
        {productSliderData.length > 0 && (
          <SliderNav
            index={index}
            sliderLength={productSliderData.length}
            classNameWrapper={styles.sliderNav}
          />
        )}
      </div>
    </div>
  );
};

const FormFeedback = forwardRef(
  (
    {
      userData,
      productData,
      setValueForFeedbackBlock,
      currentFeedback,
      setCurrentFeedback,
      commentsFromStore,
      isAuth,
    },
    ref,
  ) => {
    const dispatch = useDispatch();

    const [commentFieldValue, setCommentFieldValue] = useState('');
    const [errorMessageForField, setErrorMessageForField] = useState('');
    const [countOfStar, setCountOfStar] = useState(0);

    const onSubmitCommentData = (e) => {
      e.preventDefault();
      if (productData.can_comment) {
        dispatch(
          addCommentData({
            params: {},
            body: {
              text: commentFieldValue,
              good_id: productData.good.id,
              assessment: countOfStar,
            },
          }),
        );
      } else {
        dispatch(
          editCommentData({
            params: {},
            body: {
              text: commentFieldValue,
              rating: countOfStar,
            },
            id: currentFeedback.id,
          }),
        );
      }
      setValueForFeedbackBlock('');
      setCurrentFeedback(null);
    };

    useEffect(() => {
      if (!productData.can_comment && isAuth) {
        setCurrentFeedback(
          commentsFromStore.find(item => item.user.id === userData.id),
        );
      }
      if (currentFeedback) {
        setCommentFieldValue(
          currentFeedback ? currentFeedback.comment : commentFieldValue,
        );
        setCountOfStar(
          currentFeedback.user.stars
            ? currentFeedback.user.stars.assessment
            : countOfStar,
        );
      }
    }, [currentFeedback]);

    const onChangeCommentFieldValue = (e) => {
      if (e.target.value === '') {
        setErrorMessageForField('Поле обязательное для заполнения');
        setCommentFieldValue('');
      } else {
        setErrorMessageForField('');
        setCommentFieldValue(e.target.value);
      }
    };

    return (
      <form
        ref={ref}
        className={styles.feedbackForm}
        onSubmit={onSubmitCommentData}
      >
        {!productData.can_comment ? (
          <p className={styles.formInfo}>Редактировать</p>
        ) : (
          <div className={styles.formInfo}>
            Вы: <span className={styles.userNameValue}>{userData.snp}</span>
          </div>
        )}
        <div className={styles.fieldFeedbackWrapper}>
          <textarea
            placeholder="Комментарий"
            className={styles.fieldFeedback}
            value={commentFieldValue}
            onChange={onChangeCommentFieldValue}
          />
          {errorMessageForField.length > 0 && <p>{errorMessageForField}</p>}
        </div>
        <div className={styles.chooseRating}>
          Выберите
          <Rating
            amountStars={countOfStar}
            classNameWrapper={styles.ratingWrapperForFeedbacks}
            onClick={setCountOfStar}
          />
        </div>
        <Button
          title="Добавить свой отзыв"
          buttonType="submit"
          viewType="black"
          classNameWrapper={styles.sendFeedbackButton}
          onSubmit={onSubmitCommentData}
          disabled={errorMessageForField.length > 0}
        />
      </form>
    );
  },
);

const checkOnSimilarParams = (arrOfProducts, selectedSizeId, selectedColorId) => {
  if (arrOfProducts) {
    return arrOfProducts.findIndex(
      item => item.color_id === selectedColorId && item.size_id === selectedSizeId,
    );
  }
  return -1;
};

const setArrForIdProducts = (arr) => {
  localStorage.setItem('arrOfIdProduct', JSON.stringify(arr));
};

const addToCartForNotAuthUser = ({
  product,
  amountOfProduct,
  selectedSizeId,
  selectedColorId,
}) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const indexExistParams = checkOnSimilarParams(
    arrOfIdProduct,
    selectedSizeId,
    selectedColorId,
  );
  if (!arrOfIdProduct) {
    setArrForIdProducts([
      {
        good_id: product.good.id,
        count: amountOfProduct,
        color_id: selectedColorId,
        size_id: selectedSizeId,
      },
    ]);
    return;
  }
  if (arrOfIdProduct && indexExistParams === -1) {
    setArrForIdProducts([
      ...arrOfIdProduct,
      {
        good_id: product.good.id,
        count: amountOfProduct,
        color_id: selectedColorId,
        size_id: selectedSizeId,
      },
    ]);
    return;
  }
  if (indexExistParams !== -1) {
    const newArr = arrOfIdProduct.map((item, index) => index === indexExistParams ? { ...item, count: amountOfProduct + item.count } : item);
    setArrForIdProducts(newArr);
  }
};

const ProductInfo = ({
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
}) => {
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAddFavourite, setIsAddFavourite] = useState(false);
  const [arrOfSizes, setArrOfSizes] = useState([]);

  useEffect(() => {
    setAmountOfProduct(1);
    setIsSuccess(false);
    setSelectedColorId(null);
    setSelectedSizeId(null);
    setArrOfSizes([]);
  }, [product]);

  const addProductToCart = () => {
    if (isAuth) {
      dispatch(
        addToCart({
          params: {},
          body: {
            good_id: product.good.id,
            count: amountOfProduct,
            color_id: selectedColorId,
            size_id: selectedSizeId,
          },
        }),
      );
      setIsSuccess(true);
    } else {
      addToCartForNotAuthUser({
        product,
        amountOfProduct,
        selectedSizeId,
        selectedColorId,
      });
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct'),
          },
        ),
      );
    }
    setIsSuccess(true);
  };

  const classNameForButtonFavourite = cx(styles.buttonLike, {
    [styles.buttonLikeSelected]: product.good.isFavorite || isAddFavourite,
  });

  return (
    <div className={styles.productDetails}>
      <div className={styles.productDetailsHeader}>
        <div>
          <h4>
            {product.good.name}
            <span className={styles.addInfo}>{product.good.vendor_code}</span>
          </h4>
          <p className={styles.descModel}>
            Тонкие колготки с кружевным поясом Giulia™
          </p>
        </div>
        {isAuth && (
          <button
            className={classNameForButtonFavourite}
            disabled={product.good.isFavorite || isAddFavourite}
            onClick={() => {
              dispatch(
                addToFavourite(
                  {},
                  {
                    good_id: product.good.id,
                  },
                ),
              );
              setIsAddFavourite(true);
            }}
            type="button"
          >
            <IconLike className={styles.iconLike} />
          </button>
        )}
      </div>
      <div className={styles.addInfoBlock}>
        <p className={styles.price}>{product.good.new_price || product.good.price} ₴</p>
        <div className={styles.ratingWrapper}>
          <Rating
            amountStars={product.good.stars}
            classNameWrapper={styles.countAssessment}
          />
          <span className={styles.countFeedbacks}>
            ({commentsFromStore.length})
          </span>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onOpenFormFeedback();
              setToggled(true);
              if (
                !toggled
                && UIKit.accordion(accordionRef.current).items[2].offsetHeight
                  < 140
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
                  top,
                  left: 0,
                  behavior: 'smooth',
                });
              }, 500);
            }}
            className={styles.addFeedback}
          >
            Добавить отзыв
          </a>
        </div>
      </div>
      <hr className={`${styles.lineOne} ${styles.line}`} />
      <div className={styles.colors}>
        <h6>Цвета</h6>
        <div className={styles.buttonsColor}>
          {product.good.colors.map((item, index) => {
            const classNameForButton = cx(styles.buttonColor, {
              [styles.buttonColorActive]:
                selectedColorId && selectedColorId === item.color.id,
            });

            return (
              <button
                key={item.color.id}
                type="button"
                style={{
                  background: item.color.hex
                    ? `${item.color.hex}`
                    : `url(${item.color.img_link})`,
                }}
                className={classNameForButton}
                onClick={() => {
                  setArrOfSizes(item.sizes);
                  sliderProduct.show(index + 1);
                  setSelectedColorId(item.color.id);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.sizes}>
        <div className={styles.sizesFirstBlock}>
          <h6>Размер</h6>
          <div className={styles.buttonsSize}>
            {!!arrOfSizes.length
              && arrOfSizes.map((item) => {
                const classNameForButton = cx(styles.buttonSize, {
                  [styles.buttonSizeActive]:
                    selectedSizeId && selectedSizeId === item.id,
                });

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={classNameForButton}
                    onClick={() => setSelectedSizeId(item.id)}
                  >
                    {item.size}
                  </button>
                );
              })}
          </div>
        </div>
        <p>Размерная сетка</p>
      </div>
      <div className={styles.counterBlock}>
        <h6>Кол-во</h6>
        <Counter
          classNameForCounter={styles.counter}
          count={product.good.count}
          amountOfProduct={amountOfProduct}
          setAmountOfProduct={setAmountOfProduct}
        />
      </div>
      <hr className={`${styles.lineTwo} ${styles.line}`} />
      <div className={styles.controlButtons}>
        <Button
          width="51%"
          title={isSuccess ? 'Добавить еще 1' : 'Добавить в корзину'}
          buttonType="button"
          disabled={!selectedColorId || !selectedSizeId}
          viewType="black"
          onClick={addProductToCart}
          classNameWrapper={styles.buttonAddToCart}
        />
        <Button
          width="46%"
          title="Купить в один клик"
          buttonType="button"
          viewType="white"
        />
      </div>
      {!userData.mailing && (
        <button
          type="button"
          className={styles.subscribeButton}
          onClick={() => dispatch(editCurrentUserData({}, { mailing: 1 }))}
        >
          Подписаться на оповещение по цене
        </button>
      )}
      <div className={styles.featuresBlock}>
        <article className={styles.featuresItem}>
          <IconClothes className={styles.featuresIcon} />
          <p className={styles.featuresDesc}>
            Самовывоз из более 60 <br />
            магазинов по Украине
          </p>
        </article>
        <article className={styles.featuresItem}>
          <IconSale className={styles.featuresIcon} />
          <p className={styles.featuresDesc}>
            Низкие цены <br />
            от производителя
          </p>
        </article>
        <article className={styles.featuresItem}>
          <IconDelivery className={styles.featuresIcon} />
          <p className={styles.featuresDesc}>
            Бесплатная доставка <br />
            при заказе от 500 грн
          </p>
        </article>
      </div>
    </div>
  );
};

const Product = ({
  viewedProducts, product, isAuth, dispatch, router, deliveryData,
}) => {
  const commentsFromStore = useSelector(commentsDataSelector);
  const userData = useSelector(userDataSelector);

  const [valueForFeedbackBlock, setValueForFeedbackBlock] = useState('');
  const [toggled, setToggled] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sliderProduct, setSliderProduct] = useState(null);

  const accordionRef = useRef(null);
  const notAuthBLockFeedbackRef = useRef(null);
  const formFeedbackRef = useRef(null);

  useEffect(() => {
    dispatch(getCommentsData({}, product.good.id));
  }, []);

  useEffect(() => {
    const url = isAuth ? 'goodbyid' : 'goods';
    dispatch(
      getProductData({
        params: {},
        id: Number(router.query.pid),
        url,
      }),
    );
    return () => {
      setValueForFeedbackBlock('');
      setCurrentFeedback(null);
      if (sliderProduct) {
        sliderProduct.show(0);
      }
    };
  }, [commentsFromStore]);

  const onOpenFormFeedback = () => {
    if (isAuth) {
      setValueForFeedbackBlock('formFeedback');
    } else {
      setValueForFeedbackBlock('notAuthBlock');
    }
  };

  useEffect(() => {
    if (isAuth) {
      setValueForFeedbackBlock('');
    }
  }, [isAuth]);

  const getTemplateForComments = () => {
    switch (valueForFeedbackBlock) {
      case 'formFeedback':
        return (
          <FormFeedback
            userData={userData}
            productData={product}
            ref={formFeedbackRef}
            setValueForFeedbackBlock={setValueForFeedbackBlock}
            currentFeedback={currentFeedback}
            setCurrentFeedback={setCurrentFeedback}
            commentsFromStore={commentsFromStore}
            isAuth={isAuth}
          />
        );

      case 'notAuthBlock':
        return (
          <div
            ref={notAuthBLockFeedbackRef}
            className={styles.notAuthBlockComment}
          >
            <h5 className={styles.notAuthBlockTitle}>
              Чтобы добавить комментарий вам нужно авторизоваться
            </h5>
            <FacebookLogin
              appId="490339138347349"
              autoLoad={false}
              callback={(response) => {
                dispatch(
                  loginViaFacebook({}, { fbToken: response.accessToken }),
                );
                setTimeout(() => {
                  dispatch(
                    getProductData({
                      params: {},
                      id: Number(router.query.pid),
                      url: 'goodbyid',
                    }),
                  );
                  addToCartFromLocale(dispatch);
                }, 800);
              }}
              cssClass={styles.facebookButton}
              textButton="Войти через Facebook"
            />
            <div className={styles.noAuthBlockButtons}>
              <Link href="/login">
                <a className={styles.linkForLogin}>Войти</a>
              </Link>
              <Link href="/registration">
                <a className={styles.linkForRegistration}>Зарегистрироваться</a>
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <>
            {(!product.can_comment && isAuth)
            || commentsFromStore.some(item => item.user.id === userData.id) ? (
              <Button
                title="Вы уже добавили свой комментарий. Отредактировать его?"
                buttonType="button"
                viewType="footerButton"
                classNameWrapper={styles.editButton}
                onClick={() => setValueForFeedbackBlock('formFeedback')}
              />
              ) : (
                <Button
                  title="Добавить свой отзыв"
                  buttonType="button"
                  viewType="black"
                  classNameWrapper={styles.dropdownButton}
                  onClick={onOpenFormFeedback}
                />
              )}
          </>
        );
    }
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Колготки', product.good.name]} />
        <div className={styles.productData}>
          <ProductSlider
            productData={product}
            sliderProduct={sliderProduct}
            setSliderProduct={setSliderProduct}
          />
          <ProductInfo
            product={product}
            commentsFromStore={commentsFromStore}
            onOpenFormFeedback={onOpenFormFeedback}
            setToggled={setToggled}
            accordionRef={accordionRef}
            isAuth={isAuth}
            toggled={toggled}
            formFeedbackRef={formFeedbackRef}
            notAuthBLockFeedbackRef={notAuthBLockFeedbackRef}
            dispatch={dispatch}
            userData={userData}
            sliderProduct={sliderProduct}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.similarProducts}>
            <h4 className={styles.title}>Похожие товары</h4>
            <div className={styles.similarProductsContent}>
              {product.similar.length > 0
                && product.similar.map(item => (
                  <ProductCard
                    key={item.id}
                    classNameWrapper={styles.similarProductsCard}
                    item={item}
                  />
                ))}
            </div>
          </div>
          <div className={styles.dropdowns}>
            <ul ref={accordionRef} uk-accordion="multiple: true">
              <DynamicComponentWithNoSSRAccordion
                classNameWrapper={styles.accordionWrapper}
                title="Описание"
                toggled
              >
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: product.good.description }}
                />
              </DynamicComponentWithNoSSRAccordion>
              <DynamicComponentWithNoSSRAccordion
                title="Характеристики"
                toggled
                classNameWrapper={styles.accordionWrapper}
              >
                <ul className={styles.attributesList}>
                  {product.good.attributes.map(item => (
                    <li key={item.id} className={styles.attributesItem}>
                      <div className={styles.attributesName}>{item.name}</div>
                      <div className={styles.attributesValue}>
                        {item.pivot.value}
                      </div>
                    </li>
                  ))}
                </ul>
              </DynamicComponentWithNoSSRAccordion>
              <DynamicComponentWithNoSSRAccordion
                title="Отзывы"
                count={commentsFromStore.length}
                toggled={toggled}
                setToggled={setToggled}
                classNameWrapper={styles.accordionWrapper}
              >
                <div className={styles.dropdownBlock}>
                  {commentsFromStore.length > 0 ? (
                    commentsFromStore.map(item => (
                      <article key={item.id} className={styles.dropdownItem}>
                        <div className={styles.dropdownFeedback}>
                          {item.user.stars && (
                            <Rating
                              classNameWrapper={styles.startWrapper}
                              amountStars={item.user.stars.assessment}
                            />
                          )}
                          <h2 className={styles.dropdownName}>
                            {currentFeedback
                            && currentFeedback.id === item.id ? (
                              <>
                                Вы:{' '}
                                <span className={styles.userNameEdit}>
                                  {item.user.snp}
                                </span>
                              </>
                              ) : (
                                item.user.snp
                              )}
                          </h2>
                        </div>
                        <p className={styles.dropdownMessage}>{item.comment}</p>
                        {currentFeedback && currentFeedback.id === item.id && (
                          <div className={styles.dropdownButtons}>
                            <button
                              className={styles.buttonControlComment}
                              type="button"
                              onClick={() => {
                                dispatch(
                                  deleteComment({
                                    params: {},
                                    body: {
                                      comment_id: item.id,
                                    },
                                  }),
                                );
                                setValueForFeedbackBlock('');
                                setCurrentFeedback(null);
                              }}
                            >
                              Удалить
                            </button>
                            <button
                              className={styles.buttonControlComment}
                              type="button"
                              onClick={(e) => {
                                UIKit.scroll(e.target).scrollTo(
                                  formFeedbackRef.current,
                                );
                              }}
                            >
                              Редактировать
                            </button>
                          </div>
                        )}
                      </article>
                    ))
                  ) : (
                    <p className={styles.textNoComments}>
                      здесь пока нет комментариев
                    </p>
                  )}
                </div>
                {getTemplateForComments()}
              </DynamicComponentWithNoSSRAccordion>
              <DynamicComponentWithNoSSRAccordion
                classNameWrapper={styles.accordionWrapper}
                title="Доставка и Оплата"
                toggled={false}
              >
                <div className={styles.paymentsWrapper}>
                  {deliveryData.delivery.map(item => (
                    <PaymentInfo
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </DynamicComponentWithNoSSRAccordion>
            </ul>
          </div>
        </div>
        <div className={styles.seenProducts}>
          <h4 className={styles.titleSeenProduct}>Просмотренные</h4>
          <div className={styles.seenProductsContent}>
            {viewedProducts.map(item => (
              <ProductCard
                key={item.id}
                classNameWrapper={styles.seenProductsCard}
                item={item.goods}
              />
            ))}
          </div>
        </div>
        <FeaturesCards classNameWrapper={styles.featuresCardsWrapper} />
      </div>
    </MainLayout>
  );
};

const ProductWrapper = ({ viewedProducts, deliveryData }) => {
  const isDataReceived = useSelector(isDataReceivedProductSelector);
  const product = useSelector(productDataSelector);
  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const url = isAuth ? 'goodbyid' : 'goods';
    dispatch(
      getProductData({
        params: {},
        id: Number(router.query.pid),
        url,
      }),
    );
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <Product
      viewedProducts={viewedProducts}
      product={product}
      isAuth={isAuth}
      dispatch={dispatch}
      router={router}
      deliveryData={deliveryData}
    />
  );
};

FormFeedback.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    snp: PropTypes.string,
    token: PropTypes.string,
  }),
  setValueForFeedbackBlock: PropTypes.func,
  productData: PropTypes.shape({
    good: PropTypes.object,
    can_comment: PropTypes.bool,
  }),
  currentFeedback: PropTypes.object,
  setCurrentFeedback: PropTypes.func,
  commentsFromStore: PropTypes.arrayOf(PropTypes.object),
  isAuth: PropTypes.bool,
};

ProductSlider.propTypes = {
  productData: PropTypes.shape({
    good: PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.object),
      img_link: PropTypes.string,
    }),
  }),
  sliderProduct: PropTypes.object,
  setSliderProduct: PropTypes.func,
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    good: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      colors: PropTypes.arrayOf(PropTypes.object),
      vendor_code: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      attributes: PropTypes.arrayOf(PropTypes.object),
      count: PropTypes.number,
      isFavorite: PropTypes.bool,
      new_price: PropTypes.number,
    }),
  }),
  commentsFromStore: PropTypes.arrayOf(PropTypes.object),
  onOpenFormFeedback: PropTypes.func,
  setToggled: PropTypes.func,
  accordionRef: PropTypes.object,
  toggled: PropTypes.bool,
  formFeedbackRef: PropTypes.object,
  notAuthBLockFeedbackRef: PropTypes.object,
  dispatch: PropTypes.func,
  userData: PropTypes.object,
  isAuth: PropTypes.bool,
  sliderProduct: PropTypes.object,
};

Product.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object,
  isAuth: PropTypes.bool,
  dispatch: PropTypes.func,
  router: PropTypes.object,
  deliveryData: PropTypes.shape({
    delivery: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default ProductWrapper;
