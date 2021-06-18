import React, {
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useEffect
} from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Product.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import SliderNav from '../../Layout/SliderNav/SliderNav';
import Counter from '../../Layout/Counter/Counter.jsx';
import Button from '../../Layout/Button/Button';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import Rating from '../../Layout/Rating/Rating';
import PaymentInfo from '../../PaymentInfo/PaymentInfo';
import FacebookButton from '../../FacebookButton/FacebookButton';
import Loader from '../../Loader/Loader';
import BuyOneClick from '../BuyOneClick/BuyOneClick';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ProductCard from '../../Layout/ProductCard/ProductCard';
import { CardProduct } from '../../Layout/CardProduct/CardProduct';
import { ProductSlider } from '../../Slider/ProductSlider/ProductSlider';
import InnerImageZoom from 'react-inner-image-zoom';

import GiftProductCard from '../../Layout/GiftProductCard/GiftProductCard';
import {
  addCommentData,
  editCommentData,
  getCommentsData,
  deleteComment
} from '../../../redux/actions/comment';
import { emailValidation } from '../../../utils/validation';
import { getProductsData } from '../../../redux/actions/products';
import { getPresentSet } from '../../../redux/actions/presentSet';
import { loginViaFacebook } from '../../../redux/actions/currentUser';
import {
  addToFavourite,
  deleteFromFavourite
} from '../../../redux/actions/favourite';
import {
  getProductData,
  clearProductData
} from '../../../redux/actions/product';
import { addToCart } from '../../../redux/actions/cart';
import {
  getViewedProducts,
  goodMailingRequest
} from '../../../services/product';
import UIKit from '../../../public/uikit/uikit';
import {
  isDataReceivedProductSelector,
  productDataSelector,
  isAuthSelector,
  commentsDataSelector,
  userDataSelector,
  presentSetDataSelector,
  isDataReceivedPresentSetSelector,
  productsSelector,
  loadingSelectorForProducts,
  cartDataSelector,
  loadingSelectorForCart
} from '../../../utils/selectors';

import {
  definiteUrlAndFunc,
  parseText,
  setFiltersInCookies,
  calculateProcents
} from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import withPopup from '../../hoc/withPopup';
import IconLike from '../../../public/svg/like-border.svg';

import IconQuestion from '../../../public/svg/question.svg';
import { cookies } from '../../../utils/getCookies';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { ProductsSimilar } from './ProductsSimilar/ProductsSimilar';
import { ProductFeatures } from './ProductFeatures/ProductFeatures';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../Accordion/Accordion'),
  { ssr: false }
);

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
      router
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const [commentFieldValue, setCommentFieldValue] = useState('');
    const [errorMessageForField, setErrorMessageForField] = useState('');
    const [countOfStar, setCountOfStar] = useState(0);

    const onSubmitCommentData = e => {
      e.preventDefault();
      if (productData.can_comment) {
        const key = router.query.present ? 'present_id' : 'good_id';
        dispatch(
          addCommentData({
            params: {},
            body: {
              text: commentFieldValue,
              [key]: productData.good.id,
              assessment: countOfStar
            }
          })
        );
      } else {
        dispatch(
          editCommentData({
            params: {},
            body: {
              text: commentFieldValue,
              rating: countOfStar
            },
            id: currentFeedback.id,
            isPresent: !!router.query.present
          })
        );
      }
      setValueForFeedbackBlock('');
      setCurrentFeedback(null);
    };

    useEffect(() => {
      if (!productData.can_comment && isAuth) {
        setCurrentFeedback(
          commentsFromStore.find(item => item?.user?.id === userData.id)
        );
      }
      if (currentFeedback) {
        setCommentFieldValue(
          currentFeedback ? currentFeedback.comment : commentFieldValue
        );
        setCountOfStar(
          currentFeedback.stars ? currentFeedback.stars.assessment : countOfStar
        );
      }
    }, [currentFeedback]);

    const onChangeCommentFieldValue = e => {
      if (e.target.value === '') {
        setErrorMessageForField(
          parseText(
            cookies,
            'Поле обязательное для заполнения',
            "Поле обов'язкове для заповнення"
          )
        );
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
          <p className={styles.formInfo}>
            {parseText(cookies, 'Редактировать', 'Редагувати')}
          </p>
        ) : (
          <div className={styles.formInfo}>
            {parseText(cookies, 'Вы: ', 'Ви: ')}
            <span className={styles.userNameValue}>{userData.snp}</span>
          </div>
        )}
        <div className={styles.fieldFeedbackWrapper}>
          <textarea
            placeholder={parseText(cookies, 'Комментарий', 'Коментар')}
            className={styles.fieldFeedback}
            value={commentFieldValue}
            onChange={onChangeCommentFieldValue}
          />
          {errorMessageForField.length > 0 && <p>{errorMessageForField}</p>}
        </div>
        <div className={styles.chooseRating}>
          {parseText(cookies, 'Выберите', 'Оберіть')}
          <Rating
            amountStars={countOfStar}
            classNameWrapper={styles.ratingWrapperForFeedbacks}
            onClick={setCountOfStar}
          />
        </div>
        <Button
          title="Добавить свой отзыв"
          titleUa="Додати свій відгук"
          buttonType="black"
          viewType="white"
          classNameWrapper={styles.sendFeedbackButton}
          onSubmit={onSubmitCommentData}
          disabled={errorMessageForField.length > 0}
        />
      </form>
    );
  }
);

const Product = ({
  viewedProducts,
  product,
  isAuth,
  dispatch,
  router,
  deliveryData,
  isDesktopScreen,
  openPopup
}) => {
  const commentsFromStore = useSelector(commentsDataSelector);
  const userData = useSelector(userDataSelector);
  const [valueForFeedbackBlock, setValueForFeedbackBlock] = useState('');
  const [showComments, isShowComments] = useState(10);
  const [toggled, setToggled] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sliderProduct, setSliderProduct] = useState(null);
  const [viewedArr, setViewedArr] = useState(viewedProducts);
  const [indexActive, setIndexActive] = useState(0);
  const [toggledDefault, setToggledDefault] = useState(true);
  const [email, isEmail] = useState(false);

  const accordionRef = useRef(null);
  const notAuthBLockFeedbackRef = useRef(null);
  const formFeedbackRef = useRef(null);

  const productUrl = router.query.slug;

  useEffect(() => {
    dispatch(
      getCommentsData(
        {},
        Number(productUrl[productUrl.length - 1]),
        !!router.query.present
      )
    );
    getViewedProducts({}).then(response => setViewedArr(response.data));
  }, []);

  useEffect(() => {
    const params = definiteUrlAndFunc(
      router.query,
      isAuth,
      getPresentSet,
      getProductData
    );
    dispatch(
      params.func({
        params: {},
        id: Number(productUrl[productUrl.length - 1]),
        url: params.url
      })
    );
    return () => {
      setValueForFeedbackBlock('');
      setCurrentFeedback(null);
    };
  }, [commentsFromStore]);

  const onSetIndexAccordion = id => {
    if (indexActive === id) {
      setIndexActive(0);
    } else {
      setIndexActive(id);
    }
  };

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
            commentsFromStore={product?.good?.comments}
            isAuth={isAuth}
            router={router}
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
            <FacebookButton
              handleCallback={response => {
                dispatch(
                  loginViaFacebook({}, { fbToken: response.accessToken }, true)
                );
              }}
              classNameWrapper={styles.facebookButton}
            />
            <div className={styles.noAuthBlockButtons}>
              <button
                type="button"
                onClick={() =>
                  openPopup({
                    PopupContentComponent: Login
                  })
                }
                className={styles.linkForLogin}
              >
                {parseText(cookies, 'Войти', 'Ввійти')}
              </button>
              <button
                type="button"
                className={styles.linkForRegistration}
                onClick={() =>
                  openPopup({
                    PopupContentComponent: Registration
                  })
                }
              >
                {parseText(cookies, 'Зарегистрироваться', 'Зареєструватись')}
              </button>
            </div>
          </div>
        );

      default:
        return (
          <>
            {!product.can_comment &&
            isAuth &&
            commentsFromStore.some(item => {
              return item.user !== null && item.user.id === userData.id;
            }) ? (
              <Button
                title="Отредактировать комментарий?"
                titleUa="Відредагувати коментар?"
                buttonType="button"
                viewType="footerButton"
                classNameWrapper={styles.editButton}
                onClick={() => setValueForFeedbackBlock('formFeedback')}
              />
            ) : (
              <Button
                title="Добавить свой отзыв"
                titleUa="Додати свій відгук"
                buttonType="button"
                viewType="white"
                styleCenter="centerButton"
                classNameWrapper={styles.dropdownButton}
                onClick={onOpenFormFeedback}
              />
            )}
          </>
        );
    }
  };

  const breadCrumbs = [];
  if (product) {
    product?.crumbs?.map(itemCrumbs =>
      breadCrumbs.push({
        id: itemCrumbs.id,
        name: itemCrumbs.slug,
        categoryName: parseText(cookies, itemCrumbs.name, itemCrumbs.name_ua),
        pathname: `/${itemCrumbs.slug}`
      })
    );
  }
  setFiltersInCookies(cookies, {
    categories: breadCrumbs
  });

  return (
    <div className={styles.content}>
      {router.query.present ? (
        <BreadCrumbs
          isGift
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Подарочные наборы',
              nameUa: 'Подарункові набори',
              pathname: 'gift-backets'
            },
            ...(breadCrumbs.map(item => ({
              id: item.id,
              name: item.categoryName,
              nameUa: item.categoryName,
              pathname: item.pathname
            })) || []),
            {
              id: 100,
              name: product?.good?.name,
              nameUa: product?.good?.name_uk
            }
          ]}
        />
      ) : (
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Категории',
              nameUa: 'Категорії',
              pathname: 'products'
            },
            ...(breadCrumbs.map(item => ({
              id: item.id,
              name: item.categoryName,
              nameUa: item.categoryName,
              pathname: item.pathname
            })) || []),
            {
              id: 100,
              name: product?.good?.name,
              nameUa: product?.good?.name_uk
            }
          ]}
        />
      )}
      <div className={styles.productData}>
        <div className={styles.productSliderWrapper}>
          <ProductSlider
            sliderProduct={sliderProduct}
            setSliderProduct={setSliderProduct}
            product={product}
            openPopup={openPopup}
          />
          <ProductFeatures />
        </div>

        <ProductInfo
          product={product}
          commentsFromStore={product?.good?.comments}
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
          setSliderProduct={setSliderProduct}
          router={router}
          isDesktopScreen={isDesktopScreen}
          openPopup={openPopup}
          email={email}
          isEmail={isEmail}
        />
      </div>
      <div className={styles.product__second}>
        <div className={styles.product__similar}>
          {product?.similar && product?.similar.length > 0 && (
            <ProductsSimilar similar={product.similar} router={router} />
          )}
        </div>

        <div
          className={cx(styles.product__description, {
            [styles.margin]: email
          })}
        >
          <ul ref={accordionRef} uk-accordion="multiple: false">
            <DynamicComponentWithNoSSRAccordion
              classNameWrapper={cx(
                styles.accordionWrapper,
                styles.customeStyleAccordion
              )}
              title={parseText(cookies, 'Описание', 'Опис')}
              toggled={toggledDefault}
              setToggled={setToggled}
              setToggledDefault={setToggledDefault}
              isProductAccordion
              setIndexActive={() => onSetIndexAccordion(1)}
              isCurrentAccordionActive={indexActive === 1}
            >
              <div className={styles.accordionProductContent}>
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: parseText(
                      cookies,
                      product?.good?.description,
                      product?.good?.description_uk
                    )
                  }}
                />
                {product?.good?.video_url && (
                  <ReactPlayer
                    url={product?.good?.video_url}
                    width={(isDesktopScreen && '94%') || '100%'}
                    className={styles.productVideo}
                  />
                )}
              </div>
            </DynamicComponentWithNoSSRAccordion>
            <DynamicComponentWithNoSSRAccordion
              isProductAccordion
              title={parseText(cookies, 'Характеристики', 'Характеристики')}
              setToggled={setToggled}
              setToggledDefault={setToggledDefault}
              classNameWrapper={cx(
                styles.accordionWrapper,
                styles.customeStyleAccordion
              )}
              setIndexActive={() => onSetIndexAccordion(2)}
              isCurrentAccordionActive={indexActive === 2}
            >
              <div className={styles.accordionProductContent}>
                <ul className={styles.attributesList}>
                  {product?.good?.attributes.map(item => (
                    <li key={item.id} className={styles.attributesItem}>
                      <div className={styles.attributesName}>
                        {parseText(cookies, item.name, item.name_uk)}
                      </div>
                      <div className={styles.attributesValue}>
                        {parseText(
                          cookies,
                          item.pivot.value,
                          item.pivot.value_uk
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </DynamicComponentWithNoSSRAccordion>
            <DynamicComponentWithNoSSRAccordion
              isProductAccordion
              title={parseText(cookies, 'Отзывы', 'Відгуки')}
              count={product?.good?.comments?.length}
              toggled={toggled}
              setIndexActive={() => onSetIndexAccordion(3)}
              isCurrentAccordionActive={indexActive === 3}
              setToggled={setToggled}
              setToggledDefault={setToggledDefault}
              classNameWrapper={cx(
                styles.accordionWrapper,
                styles.customeStyleAccordion
              )}
            >
              <div className={styles.accordionProductContent}>
                <div className={styles.dropdownBlock}>
                  {product?.good?.comments?.length > 0 ? (
                    product?.good?.comments.map((item, index) => {
                      return (
                        <React.Fragment key={item.id}>
                          {index <= showComments - 1 && (
                            <article
                              key={item.id}
                              className={styles.dropdownItem}
                            >
                              <div className={styles.dropdownFeedback}>
                                {item?.user_name === 'KOLGOT.NET'
                                  ? null
                                  : (item.stars || item.stars === 0) && (
                                      <Rating
                                        classNameWrapper={styles.startWrapper}
                                        amountStars={
                                          item.stars.assessment || item.stars
                                        }
                                      />
                                    )}
                                <h2 className={styles.dropdownName}>
                                  {currentFeedback &&
                                  currentFeedback.id === item.id ? (
                                    <>
                                      Вы:{' '}
                                      <span className={styles.userNameEdit}>
                                        {item?.user?.snp || item.user_name}
                                      </span>
                                    </>
                                  ) : (
                                    item?.user?.snp || item.user_name
                                  )}
                                </h2>
                              </div>
                              <p className={styles.dropdownMessage}>
                                {item.comment}
                              </p>
                              {currentFeedback &&
                                currentFeedback.id === item.id && (
                                  <div className={styles.dropdownButtons}>
                                    <button
                                      className={styles.buttonControlComment}
                                      type="button"
                                      onClick={() => {
                                        dispatch(
                                          deleteComment({
                                            params: {},
                                            body: {
                                              comment_id: item.id
                                            },
                                            isPresent: !!router.query.present
                                          })
                                        );
                                        setValueForFeedbackBlock('');
                                        setCurrentFeedback(null);
                                      }}
                                    >
                                      {parseText(
                                        cookies,
                                        'Удалить',
                                        'Видалити'
                                      )}
                                    </button>
                                    <button
                                      className={styles.buttonControlComment}
                                      type="button"
                                      onClick={e => {
                                        UIKit.scroll(e.target).scrollTo(
                                          formFeedbackRef.current
                                        );
                                      }}
                                    >
                                      {parseText(
                                        cookies,
                                        'Редактировать',
                                        'Редагувати'
                                      )}
                                    </button>
                                  </div>
                                )}
                            </article>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <p className={styles.textNoComments}>
                      {parseText(
                        cookies,
                        'Здесь пока нет комментариев',
                        'тут поки немає коментарів'
                      )}
                    </p>
                  )}
                  {product?.good?.comments?.length > showComments && (
                    <Button
                      title="Показать еще"
                      titleUa="Показати ще"
                      buttonType="button"
                      viewType="black"
                      classNameWrapper={styles.showMore}
                      privateClass={styles.privateStyle}
                      onClick={() => isShowComments(showComments + 10)}
                    />
                  )}
                  {getTemplateForComments()}
                </div>
              </div>
            </DynamicComponentWithNoSSRAccordion>
            <DynamicComponentWithNoSSRAccordion
              isProductAccordion
              title="Бренд"
              classNameWrapper={cx(
                styles.accordionWrapper,
                styles.customeStyleAccordion
              )}
              setToggled={setToggled}
              setToggledDefault={setToggledDefault}
              setIndexActive={() => onSetIndexAccordion(4)}
              isCurrentAccordionActive={indexActive === 4}
            >
              <div className={styles.accordionProductContent}>
                <div className={styles.brandContainer}>
                  {product.good.brand && (
                    <>
                      <h3>
                        {parseText(
                          cookies,
                          product?.good?.brand.name,
                          product?.good?.brand.name_ua
                        )}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseText(
                            cookies,
                            product?.good?.brand.description,
                            product?.good?.brand.description_ua
                          )
                        }}
                        className={styles.brandDesc}
                      />
                      {product?.good?.brand.video_url && (
                        <ReactPlayer
                          url={product?.good?.brand.video_url}
                          width="100%"
                          className={styles.productVideo}
                        />
                      )}
                      {product?.good?.brand.image_link && (
                        <img
                          className={styles.brandPicture}
                          alt={product.good.brand.name}
                          src={product.good.brand.image_link}
                        />
                      )}
                    </>
                  )}
                  <Button
                    viewType="black"
                    href
                    onClick={e => {
                      e.preventDefault();
                      setFiltersInCookies(cookies, {
                        brands: [
                          {
                            id: product?.good?.brand.id,
                            name: product?.good?.brand.name
                          }
                        ]
                      });
                      router.push(
                        '/brands/[bid]',
                        `/brands/${product?.good?.brand.name}`
                      );
                    }}
                    title={`Перейти ${parseText(cookies, 'к', 'до')} бренду`}
                    classNameWrapper={styles.linkToBrand}
                  />
                </div>
              </div>
            </DynamicComponentWithNoSSRAccordion>
            <DynamicComponentWithNoSSRAccordion
              isProductAccordion
              classNameWrapper={cx(
                styles.accordionWrapper,
                styles.customeStyleAccordion
              )}
              title={parseText(
                cookies,
                'Доставка и Оплата',
                'Доставка та Оплата'
              )}
              setToggled={setToggled}
              setToggledDefault={setToggledDefault}
              setIndexActive={() => onSetIndexAccordion(5)}
              isCurrentAccordionActive={indexActive === 5}
            >
              <div className={styles.accordionProductContent}>
                <div className={styles.paymentsWrapper}>
                  {deliveryData.delivery.map(item => (
                    <PaymentInfo key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </DynamicComponentWithNoSSRAccordion>
          </ul>
        </div>
      </div>

      <div className={styles.seenProducts}>
        <h4 className={styles.titleSeenProduct}>
          {parseText(cookies, 'Просмотренные', 'Переглянуті')}
        </h4>
        <div className={styles.seenProductsContent}>
          {viewedArr.map((item, index) => {
            const Card = item.presentsets ? GiftProductCard : CardProduct;
            return (
              <React.Fragment key={item.good_id}>
                {index < 5 && (
                  <div className={styles.seenProductsCard}>
                    <Card
                      height={338}
                      classNameWrapper={styles.seenProductsCard}
                      item={item.presentsets}
                      data={item.goods}
                      isSimpleProduct
                      userDataId={userData?.role?.id}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <FeaturesCards classNameWrapper={styles.featuresCardsWrapper} />
    </div>
  );
};

const ProductWrapper = ({
  viewedProducts,
  deliveryData,
  isDesktopScreen,
  openPopup
}) => {
  const isDataReceived = useSelector(isDataReceivedProductSelector);
  const isDataReceivedPresent = useSelector(isDataReceivedPresentSetSelector);
  const present = useSelector(presentSetDataSelector);
  const product = useSelector(productDataSelector);
  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const router = useRouter();
  const productUrl = router.query.slug;

  useEffect(() => {
    const params = definiteUrlAndFunc(
      router.query,
      isAuth,
      getPresentSet,
      getProductData
    );
    dispatch(
      params.func({
        params: {},
        id: Number(productUrl[productUrl.length - 1]),
        url: params.url
      })
    );
  }, []);

  useEffect(() => {
    dispatch(clearProductData());
    const params = definiteUrlAndFunc(
      router.query,
      isAuth,
      getPresentSet,
      getProductData
    );
    dispatch(
      params.func({
        params: {},
        id: Number(productUrl[productUrl.length - 1]),
        url: params.url
      })
    );
  }, [router.query]);

  if (!isDataReceived && !isDataReceivedPresent) {
    return <Loader />;
  }

  const ParentTag =
    (product && product.good && product?.good?.seo_no_index && 'noindex') ||
    'div';

  return (
    <MainLayout seo={product.good}>
      <ParentTag>
        <Product
          viewedProducts={viewedProducts}
          product={(_.isEmpty(product) && present) || product}
          isAuth={isAuth}
          dispatch={dispatch}
          router={router}
          deliveryData={deliveryData}
          isDesktopScreen={isDesktopScreen}
          openPopup={openPopup}
        />
      </ParentTag>
    </MainLayout>
  );
};

FormFeedback.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    snp: PropTypes.string,
    token: PropTypes.string
  }),
  setValueForFeedbackBlock: PropTypes.func,
  productData: PropTypes.shape({
    good: PropTypes.object,
    can_comment: PropTypes.bool
  }),
  currentFeedback: PropTypes.object,
  setCurrentFeedback: PropTypes.func,
  commentsFromStore: PropTypes.arrayOf(PropTypes.object),
  isAuth: PropTypes.bool,
  router: PropTypes.object
};

Product.propTypes = {
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object,
  isAuth: PropTypes.bool,
  dispatch: PropTypes.func,
  router: PropTypes.object,
  deliveryData: PropTypes.shape({
    delivery: PropTypes.arrayOf(PropTypes.object)
  }),
  isDesktopScreen: PropTypes.bool,
  openPopup: PropTypes.func
};

export default withPopup(withResponse(ProductWrapper));
