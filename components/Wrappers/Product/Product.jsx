import React, { useState, useRef, forwardRef, useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Product.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FeaturesCards from '../../FeaturesCards/FeaturesCards';
import Loader from '../../Loader/Loader';
import { CardProduct } from '../../Layout/CardProduct/CardProduct';
import { ProductSlider } from '../../Slider/ProductSlider/ProductSlider';

import GiftProductCard from '../../Layout/GiftProductCard/GiftProductCard';
import { getCommentsData } from '../../../redux/actions/comment';
import { getPresentSet } from '../../../redux/actions/presentSet';
import {
  getProductData,
  clearProductData
} from '../../../redux/actions/product';
import { getViewedProducts } from '../../../services/product';
import {
  isDataReceivedProductSelector,
  productDataSelector,
  isAuthSelector,
  commentsDataSelector,
  userDataSelector,
  presentSetDataSelector,
  isDataReceivedPresentSetSelector
} from '../../../utils/selectors';

import {
  definiteUrlAndFunc,
  parseText,
  setFiltersInCookies
} from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import withPopup from '../../hoc/withPopup';

import { cookies } from '../../../utils/getCookies';
import { ProductInfo } from './ProductInfo/ProductInfo';
import ProductsSimilar from './ProductsSimilar/ProductsSimilar';
import { ProductFeatures } from './ProductFeatures/ProductFeatures';
import { ProductDescription } from './ProductDescription/ProductDescription';

const Product = ({
  viewedProducts,
  product,
  isAuth,
  dispatch,
  router,
  deliveryData,
  isDesktopScreen,
  isMobile,
  openPopup
}) => {
  const commentsFromStore = useSelector(commentsDataSelector);
  const userData = useSelector(userDataSelector);
  const [valueForFeedbackBlock, setValueForFeedbackBlock] = useState('');
  const [toggled, setToggled] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sliderProduct, setSliderProduct] = useState(null);
  const [viewedArr, setViewedArr] = useState(viewedProducts);
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
    <div className={styles.product}>
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
      <div className={styles.product__wrapper}>
        <div className={styles.product__start}>
          <div className={styles.product__slider}>
            <ProductSlider
              sliderProduct={sliderProduct}
              setSliderProduct={setSliderProduct}
              isMobile={isMobile}
              product={product}
              openPopup={openPopup}
            />
            <ProductFeatures />
          </div>
          <div className={styles.product__info}>
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
            <ProductDescription
              product={product}
              email={email}
              isEmail={isEmail}
              ref={accordionRef}
              formFeedbackRef={formFeedbackRef}
              setToggled={setToggled}
              toggled={toggled}
              userData={userData}
              currentFeedback={currentFeedback}
              setCurrentFeedback={setCurrentFeedback}
              valueForFeedbackBlock={valueForFeedbackBlock}
              setValueForFeedbackBlock={setValueForFeedbackBlock}
              isAuth={isAuth}
              onOpenFormFeedback={onOpenFormFeedback}
              deliveryData={deliveryData}
              notAuthBLockFeedbackRef={notAuthBLockFeedbackRef}
              router={router}
              openPopup={openPopup}
            />
          </div>
        </div>
        <div className={styles.product__second}>
          <div className={styles.product__similar}>
            {product?.similar && product?.similar.length > 0 && (
              <ProductsSimilar similar={product.similar} router={router} />
            )}
          </div>
          <div className={styles.seenProducts}>
            <h4 className={styles.titleSeenProduct}>
              {parseText(cookies, 'Просмотренные', 'Переглянуті')}
            </h4>
            <div className={styles.seenProductsContent}>
              {viewedArr.map((item, index) => {
                const Card = item.presentsets ? GiftProductCard : CardProduct;
                return (
                  <React.Fragment key={index}>
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
      </div>
    </div>
  );
};

const ProductWrapper = ({
  viewedProducts,
  deliveryData,
  isDesktopScreen,
  isMobile,
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
          isMobile={isMobile}
        />
      </ParentTag>
    </MainLayout>
  );
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
