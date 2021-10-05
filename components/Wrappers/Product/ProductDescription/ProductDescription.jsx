import React, { useState, forwardRef, useEffect } from 'react';
import UIKit from '../../../../public/uikit/uikit';
import { parseText, setFiltersInCookies } from '../../../../utils/helpers';
import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';
import Rating from '../../../Layout/Rating/Rating';
import cx from 'classnames';
import styles from './ProductDescription.scss';
import { cookies } from '../../../../utils/getCookies';
import Button from '../../../Layout/Button/Button';
import PropTypes from 'prop-types';
import PaymentInfo from '../../../PaymentInfo/PaymentInfo';
import FacebookButton from '../../../FacebookButton/FacebookButton';
import { useDispatch } from 'react-redux';
import { loginViaFacebook } from '../../../../redux/actions/currentUser';
import Login from '../../Login/Login';
import Registration from '../../Registration/Registration';
import {
  addCommentData,
  editCommentData,
  deleteComment
} from '../../../../redux/actions/comment';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false }
);
const FormFeedback = ({
  userData,
  productData,
  setValueForFeedbackBlock,
  currentFeedback,
  setCurrentFeedback,
  formFeedbackRef,
  commentsFromStore,
  isAuth,
  router
}) => {
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
      ref={formFeedbackRef}
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
};

export const ProductDescription = forwardRef(
  (
    {
      email,
      router,
      isAuth,
      product,
      toggled,
      openPopup,
      setToggled,
      userData,
      commentsFromStore,
      deliveryData,
      currentFeedback,
      onOpenFormFeedback,
      setCurrentFeedback,
      valueForFeedbackBlock,
      formFeedbackRef,
      notAuthBLockFeedbackRef,
      setValueForFeedbackBlock
    },
    ref
  ) => {
    const [indexActive, setIndexActive] = useState(0);
    const [showComments, isShowComments] = useState(10);
    const [toggledDefault, setToggledDefault] = useState(true);
    const dispatch = useDispatch();

    const onSetIndexAccordion = id => {
      if (indexActive === id) {
        setIndexActive(0);
      } else {
        setIndexActive(id);
      }
    };

    const getTemplateForComments = () => {
      switch (valueForFeedbackBlock) {
        case 'formFeedback':
          return (
            <FormFeedback
              userData={userData}
              productData={product}
              formFeedbackRef={formFeedbackRef}
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
                    loginViaFacebook(
                      {},
                      { fbToken: response.accessToken },
                      true
                    )
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

    return (
      <div
        className={cx(styles.description, {
          [styles.description__margin]: email
        })}
      >
        <ul ref={ref} uk-accordion="multiple: false">
          <DynamicComponentWithNoSSRAccordion
            classNameWrapper={cx(
              styles.description__accordion,
              styles.description__customAccordion
            )}
            title={parseText(cookies, 'Описание', 'Опис')}
            toggled={toggledDefault}
            setToggled={setToggled}
            setToggledDefault={setToggledDefault}
            isProductAccordion
            setIndexActive={() => onSetIndexAccordion(1)}
            isCurrentAccordionActive={indexActive === 1}
          >
            <div className={styles.description__accordionContent}>
              <p
                className={styles.description__desc}
                dangerouslySetInnerHTML={{
                  __html: parseText(
                    cookies,
                    product?.good?.description,
                    product?.good?.description_uk
                  )
                }}
              />
              {/* {product?.good?.video_url && (
                <ReactPlayer
                  url={product?.good?.video_url}
                  width={'100%'}
                  controls
                  className={styles.description__player}
                />
              )} */}
            </div>
          </DynamicComponentWithNoSSRAccordion>
          <DynamicComponentWithNoSSRAccordion
            isProductAccordion
            title={parseText(cookies, 'Характеристики', 'Характеристики')}
            setToggled={setToggled}
            setToggledDefault={setToggledDefault}
            classNameWrapper={cx(
              styles.description__accordion,
              styles.description__customAccordion
            )}
            setIndexActive={() => onSetIndexAccordion(2)}
            isCurrentAccordionActive={indexActive === 2}
          >
            <div className={styles.description__accordionContent}>
              <ul className={styles.description__list}>
                {product?.good?.attributes.map(item => (
                  <li key={item.id} className={styles.description__item}>
                    <div className={styles.description__name}>
                      {parseText(cookies, item.name, item.name_uk)}
                    </div>
                    <div className={styles.description__value}>
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
              styles.description__accordion,
              styles.description__customAccordion
            )}
          >
            <div className={styles.description__accordionContent}>
              <div className={styles.description__reviews}>
                {product?.good?.comments?.length > 0 ? (
                  product?.good?.comments.map((item, index) => {
                    return (
                      <React.Fragment key={item.id}>
                        {index <= showComments - 1 && (
                          <article
                            key={item.id}
                            className={styles.description__review}
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
                                          comment_id: item.id
                                        },
                                        isPresent: !!router.query.present
                                      })
                                    );
                                    setValueForFeedbackBlock('');
                                    setCurrentFeedback(null);
                                  }}
                                >
                                  {parseText(cookies, 'Удалить', 'Видалити')}
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
              styles.description__accordion,
              styles.description__customAccordion
            )}
            setToggled={setToggled}
            setToggledDefault={setToggledDefault}
            setIndexActive={() => onSetIndexAccordion(4)}
            isCurrentAccordionActive={indexActive === 4}
          >
            <div className={styles.description__accordionContent}>
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
              styles.description__accordion,
              styles.description__customAccordion
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
            <div className={styles.description__accordionContent}>
              <div className={styles.paymentsWrapper}>
                {deliveryData.delivery.map(item => (
                  <PaymentInfo key={item.id} item={item} />
                ))}
              </div>
            </div>
          </DynamicComponentWithNoSSRAccordion>
        </ul>
      </div>
    );
  }
);

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
