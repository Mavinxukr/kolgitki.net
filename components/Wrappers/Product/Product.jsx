import React, {
  useState, useRef, useEffect, forwardRef,
} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
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
import { sendCommentData } from '../../../redux/actions/comment';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import UIKit from '../../../public/uikit/uikit';
import IconLike from '../../../assets/svg/like-border.svg';
import IconClothes from '../../../assets/svg/clothes1.svg';
import IconSale from '../../../assets/svg/sale1.svg';
import IconDelivery from '../../../assets/svg/free-delivery1.svg';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../Accordion/Accordion'),
  { ssr: false },
);

const ProductSlider = ({ productData }) => {
  const [index, setIndex] = useState(0);
  const value = useRef(null);
  let slider;
  useEffect(() => {
    slider = UIKit.slideshow(value.current);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  const goToSlide = (id) => {
    slider = UIKit.slideshow(value.current);
    slider.show(id);
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.addPhotos}>
        <ButtonShowSlide goToSlide={goToSlide} id={1} />
        <ButtonShowSlide goToSlide={goToSlide} id={2} />
      </div>
      <div
        ref={value}
        uk-slideshow="pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`uk-slideshow-items ${styles.list}`}>
          {productData.images.map(slide => (
            <li className={styles.item} key={slide.id}>
              <img
                className={styles.image}
                src={slide.image_link}
                alt={slide.image_link}
              />
            </li>
          ))}
        </ul>
        <SliderNav
          index={index}
          sliderLength={productData.images.length}
          classNameWrapper={styles.sliderNav}
        />
      </div>
    </div>
  );
};

const FormFeedback = forwardRef(
  ({
    userData, productId, cookies, setValueForFeedbackBlock,
  }, ref) => {
    const dispatch = useDispatch();

    const [commentFieldValue, setCommentFieldValue] = useState('');
    const [errorMessageForField, setErrorMessageForField] = useState('');
    const [countOfStar, setCountOfStar] = useState(0);

    const onSubmitCommentData = (e) => {
      e.preventDefault();
      dispatch(
        sendCommentData(
          {},
          {
            text: commentFieldValue,
            good_id: productId,
            assessment: countOfStar,
          },
          cookies.get('token'),
        ),
      );
      setValueForFeedbackBlock('');
    };

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
        <div className={styles.nameUser}>
          Вы:{' '}
          <span className={styles.userNameValue}>
            {userData ? userData.snp : ''}
          </span>
        </div>
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

const ButtonShowSlide = ({ goToSlide, id }) => (
  <button onClick={() => goToSlide(id)} className={styles.button} type="button">
    <img src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
  </button>
);

const Product = ({
  commentsData,
  productData,
  viewedProducts,
  cookies,
}) => {
  const [valueForFeedbackBlock, setValueForFeedbackBlock] = useState('');
  const [toggled, setToggled] = useState(false);

  const commentsFromStore = useSelector(state => state.comments.comments);
  const userData = useSelector(state => state.currentUser.userData);

  const dispatch = useDispatch();

  const accordionRef = useRef(null);
  const notAuthBLockFeedbackRef = useRef(null);
  const formFeedbackRef = useRef(null);

  useEffect(() => {
    if (cookies.get('token')) {
      dispatch(sendCurrentUserData({}, cookies.get('token')));
    }
  }, []);

  const onOpenFormFeedback = () => {
    if (cookies.get('token')) {
      setValueForFeedbackBlock('formFeedback');
    } else {
      setValueForFeedbackBlock('notAuthBlock');
    }
  };

  const getTemplateForComments = () => {
    switch (valueForFeedbackBlock) {
      case 'formFeedback':
        return (
          <FormFeedback
            userData={userData}
            productId={productData.id}
            cookies={cookies}
            ref={formFeedbackRef}
            setValueForFeedbackBlock={setValueForFeedbackBlock}
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
            <Button
              viewType="facebook"
              classNameWrapper={styles.buttonAuthViaFacebook}
              buttonType="button"
              title="Войти через Facebook"
            />
            <div className={styles.noAuthBlockButtons}>
              <Link href="/login">
                <Button
                  viewType="red"
                  classNameWrapper={styles.noAuthBlockButton}
                  buttonType="button"
                  title="Войти"
                />
              </Link>
              <Link href="/registration">
                <Button
                  viewType="auth"
                  classNameWrapper={styles.noAuthBlockButton}
                  buttonType="button"
                  title="Зарегистрироваться"
                />
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <Button
            title="Добавить свой отзыв"
            buttonType="button"
            viewType="black"
            classNameWrapper={styles.dropdownButton}
            onClick={onOpenFormFeedback}
          />
        );
    }
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Колготки', productData.name]} />
        <div className={styles.productData}>
          <ProductSlider productData={productData} />
          <div className={styles.productDetails}>
            <div className={styles.productDetailsHeader}>
              <div>
                <h4>
                  {productData.name}
                  <span className={styles.addInfo}>
                    {productData.vendor_code}
                  </span>
                </h4>
                <p className={styles.descModel}>
                  Тонкие колготки с кружевным поясом Giulia™
                </p>
              </div>
              <button className={styles.buttonLike} type="button">
                <IconLike className={styles.iconLike} />
              </button>
            </div>
            <div className={styles.addInfoBlock}>
              <p className={styles.price}>{productData.price},00 ₴</p>
              <div className={styles.ratingWrapper}>
                <Rating
                  amountStars={productData.stars}
                  classNameWrapper={styles.countAssessment}
                />
                <span className={styles.countFeedbacks}>
                  ({commentsData.length + commentsFromStore.length})
                </span>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenFormFeedback();
                    setToggled(true);
                    if (!toggled && UIKit.accordion(accordionRef.current).items[2].offsetHeight < 140) {
                      UIKit.accordion(accordionRef.current).toggle(2, true);
                    }
                    setTimeout(() => {
                      let top;
                      if (cookies.get('token')) {
                        top = formFeedbackRef.current.getBoundingClientRect().y;
                      } else {
                        top = notAuthBLockFeedbackRef.current.getBoundingClientRect().y;
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
                {productData.images.map(item => (
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
              <Counter classNameForCounter={styles.counter} />
            </div>
            <hr className={`${styles.lineTwo} ${styles.line}`} />
            <div className={styles.controllButtons}>
              <Button
                width="51%"
                title="Добавить в корзину"
                buttonType="button"
                viewType="black"
              />
              <Button
                width="46%"
                title="Купить в один клик"
                buttonType="button"
                viewType="white"
              />
            </div>
            <button type="button" className={styles.subscribeButton}>
              Подписаться на оповещение по цене
            </button>
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
        </div>
        <div className={styles.productInfo}>
          {/* <div className={styles.similarProducts}> */}
          {/*  <h4 className={styles.title}>Похожие товары</h4> */}
          {/*  <div className={styles.similarProductsContent}> */}
          {/*    {arrProducts.map(item => ( */}
          {/*      <DynamicComponentWithNoSSRProductCard */}
          {/*        key={item.id} */}
          {/*        classNameWrapper={styles.similarProductsCard} */}
          {/*        item={item} */}
          {/*      /> */}
          {/*    ))} */}
          {/*  </div> */}
          {/* </div> */}
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
                  {productData.attributes.map(item => (
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
                count={commentsData.length + commentsFromStore.length}
                toggled={toggled}
                setToggled={setToggled}
              >
                <div className={styles.dropdownBlock} id="addComment">
                  {[...commentsData, ...commentsFromStore].map(item => (
                    <article key={item.id} className={styles.dropdownItem}>
                      <div className={styles.dropdownFeedback}>
                        {item.user.stars ? (
                          <Rating
                            classNameWrapper={styles.startWrapper}
                            amountStars={item.user.stars.assessment}
                          />
                        ) : null}
                        <h2 className={styles.dropdownName}>{item.user.snp}</h2>
                      </div>
                      <p className={styles.dropdownMessage}>{item.comment}</p>
                    </article>
                  ))}
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
              <DynamicComponentWithNoSSRProductCard
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

Product.propTypes = {
  commentsData: PropTypes.arrayOf(PropTypes.object),
  productData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    vendor_code: PropTypes.string,
    price: PropTypes.number,
    stars: PropTypes.number,
    attributes: PropTypes.arrayOf(PropTypes.object),
  }),
  viewedProducts: PropTypes.arrayOf(PropTypes.object),
  cookies: PropTypes.object,
};

ButtonShowSlide.propTypes = {
  goToSlide: PropTypes.func,
  id: PropTypes.number,
};

FormFeedback.propTypes = {
  userData: PropTypes.shape({
    snp: PropTypes.string,
    token: PropTypes.string,
  }),
  productId: PropTypes.number,
  cookies: PropTypes.object,
  setValueForFeedbackBlock: PropTypes.func,
};

export default Product;
