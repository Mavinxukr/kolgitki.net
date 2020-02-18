import React, {
  useState, useRef, useEffect, forwardRef,
} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
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
import {
  editCurrentUserData,
  loginViaFacebook,
} from '../../../redux/actions/currentUser';
import { addToFavourite } from '../../../redux/actions/favourite';
import { getProductData } from '../../../redux/actions/product';
import { addToCart } from '../../../redux/actions/cart';
import UIKit from '../../../public/uikit/uikit';
import IconLike from '../../../assets/svg/like-border.svg';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../Accordion/Accordion'),
  { ssr: false },
);

const ProductSlider = ({ productData }) => {
  const [index, setIndex] = useState(0);
  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <div className={styles.productSlider}>
      {productData.images.length > 1 ? (
        <div uk-lightbox="animation: fade;" className={styles.addPhotos}>
          {productData.images.map((item, slideIndex) => {
            if (slideIndex !== 0) {
              return (
                <a
                  key={item.id}
                  href={item.image_link}
                  style={{ backgroundImage: `url(${item.image_link})` }}
                  className={styles.linkAddImage}
                />
              );
            }
          })}
        </div>
      ) : null}
      <div
        ref={value}
        uk-slideshow="pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`uk-slideshow-items ${styles.list}`}>
          {productData.images.map(slide => (
            <li className={styles.item} key={slide.id}>
              <div uk-lightbox="animation: fade">
                <a href={slide.image_link}>
                  <img
                    className={styles.image}
                    src={slide.image_link}
                    alt={slide.image_link}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
        {productData.images.length > 1 ? (
          <SliderNav
            index={index}
            sliderLength={productData.images.length}
            classNameWrapper={styles.sliderNav}
          />
        ) : null}
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
          {errorMessageForField.length > 0 ? (
            <p>{errorMessageForField}</p>
          ) : null}
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

const checkOnSimilarProduct = (arrOfProducts, product) => {
  if (arrOfProducts) {
    return arrOfProducts.findIndex(item => item.id === product.good.id);
  }
  return -1;
};

const setArrForIdProducts = (arr) => {
  localStorage.setItem('arrOfIdProduct', JSON.stringify(arr));
};

const addToCartForNotAuthUser = (product, amountOfProduct) => {
  const arrOfIdProduct = JSON.parse(localStorage.getItem('arrOfIdProduct'));
  const idx = checkOnSimilarProduct(arrOfIdProduct, product);
  if (!arrOfIdProduct) {
    setArrForIdProducts([{ id: product.good.id, count: amountOfProduct }]);
  }
  if (arrOfIdProduct && idx === -1) {
    setArrForIdProducts([
      ...arrOfIdProduct,
      { id: product.good.id, count: amountOfProduct },
    ]);
  }
  if (idx !== -1) {
    const newArr = arrOfIdProduct.map((item, index) => index === idx
      ? { id: product.good.id, count: amountOfProduct + item.count }
      : item);
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
}) => {
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setAmountOfProduct(1);
    setIsSuccess(false);
  }, [product]);

  const addProductToCart = () => {
    if (isAuth) {
      dispatch(
        addToCart({
          params: {},
          body: {
            good_id: product.good.id,
            count: amountOfProduct,
          },
        }),
      );
      setIsSuccess(true);
    } else {
      addToCartForNotAuthUser(product, amountOfProduct);
    }
    setIsSuccess(true);
  };

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
        {isAuth ? (
          <button
            className={styles.buttonLike}
            onClick={() => {
              dispatch(
                addToFavourite(
                  {},
                  {
                    good_id: product.good.id,
                  },
                ),
              );
            }}
            type="button"
          >
            <IconLike className={styles.iconLike} />
          </button>
        ) : null}
      </div>
      <div className={styles.addInfoBlock}>
        <p className={styles.price}>{product.good.price},00 ₴</p>
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
          {product.good.images.map(item => (
            <button
              key={item.colors.id}
              type="button"
              style={{ backgroundColor: item.colors.hex }}
              className={styles.buttonColor}
            />
          ))}
        </div>
      </div>
      <div className={styles.sizes}>
        <div className={styles.sizesFirstBlock}>
          <h6>Размер</h6>
          <div className={styles.buttonsSize}>
            <button type="button" className={styles.buttonSize}>
              1
            </button>
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
          viewType="black"
          onClick={addProductToCart}
        />
        <Button
          width="46%"
          title="Купить в один клик"
          buttonType="button"
          viewType="white"
        />
      </div>
      {!userData.mailing ? (
        <button
          type="button"
          className={styles.subscribeButton}
          onClick={() => dispatch(editCurrentUserData({}, { mailing: 1 }))}
        >
          Подписаться на оповещение по цене
        </button>
      ) : null}
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

const commentsSelector = createSelector(
  state => state.comments.comments,
  comments => comments,
);

const userDataSelector = createSelector(
  state => state.currentUser.userData,
  userData => userData,
);

const Product = ({
  viewedProducts, product, isAuth, dispatch, router,
}) => {
  const commentsFromStore = useSelector(commentsSelector);
  const userData = useSelector(userDataSelector);

  const [valueForFeedbackBlock, setValueForFeedbackBlock] = useState('');
  const [toggled, setToggled] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

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
          <ProductSlider productData={product.good} />
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
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.similarProducts}>
            <h4 className={styles.title}>Похожие товары</h4>
            <div className={styles.similarProductsContent}>
              {product.similar.length > 0
                ? product.similar.map(item => (
                  <ProductCard
                    key={item.id}
                    classNameWrapper={styles.similarProductsCard}
                    item={item}
                  />
                ))
                : null}
            </div>
          </div>
          <div className={styles.dropdowns}>
            <ul ref={accordionRef} uk-accordion="multiple: true">
              <DynamicComponentWithNoSSRAccordion title="Описание" toggled>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </DynamicComponentWithNoSSRAccordion>
              <DynamicComponentWithNoSSRAccordion
                title="Характеристики"
                toggled
              >
                <ul className={styles.attributesList}>
                  {product.good.attributes.map(item => (
                    <li key={item.id} className={styles.attributesItem}>
                      <div className={styles.attributesName}>{item.name}</div>
                      <div className={styles.attributesValue}>
                        {item.value[0].value}
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
              >
                <div className={styles.dropdownBlock}>
                  {commentsFromStore.length > 0 ? (
                    commentsFromStore.map(item => (
                      <article key={item.id} className={styles.dropdownItem}>
                        <div className={styles.dropdownFeedback}>
                          {item.user.stars ? (
                            <Rating
                              classNameWrapper={styles.startWrapper}
                              amountStars={item.user.stars.assessment}
                            />
                          ) : null}
                          {currentFeedback && currentFeedback.id === item.id ? (
                            <h2 className={styles.dropdownName}>
                              Вы:{' '}
                              <span className={styles.userNameEdit}>
                                {item.user.snp}
                              </span>
                            </h2>
                          ) : (
                            <h2 className={styles.dropdownName}>
                              {item.user.snp}
                            </h2>
                          )}
                        </div>
                        <p className={styles.dropdownMessage}>{item.comment}</p>
                        {currentFeedback && currentFeedback.id === item.id ? (
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
                        ) : null}
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
                title="Доставка и Оплата"
                toggled={false}
              >
                <div className={styles.paymentsWrapper}>
                  <PaymentInfo
                    src="/images/logo-hor-ua.png"
                    firstFeature="80 - 90 грн"
                    secondFeatures="1-3 дня доставка"
                    desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга
                    был максимально , и разработали максимально простую и удобную
                    процедуру возврата."
                  />
                  <PaymentInfo
                    src="/images/1280px-Ukrposhta-ua.svg.png"
                    firstFeature="80 - 90 грн"
                    secondFeatures="1-3 дня доставка"
                    desc="Мы делаем все для того, чтобы ваш опыт онлайн-шопинга
                    был максимально , и разработали максимально простую и удобную
                    процедуру возврата."
                  />
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

const isDataReceivedSelector = createSelector(
  state => state.product.isDataReceived,
  isDataReceived => isDataReceived,
);

const productSelector = createSelector(
  state => state.product.product,
  product => product,
);

const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

const ProductWrapper = ({ viewedProducts }) => {
  const isDataReceived = useSelector(isDataReceivedSelector);
  const product = useSelector(productSelector);
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
    images: PropTypes.arrayOf(PropTypes.object),
  }),
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    good: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.object),
      vendor_code: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      attributes: PropTypes.arrayOf(PropTypes.object),
      count: PropTypes.number,
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
};

Product.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object,
  isAuth: PropTypes.bool,
  dispatch: PropTypes.func,
  router: PropTypes.object,
};

export default ProductWrapper;
