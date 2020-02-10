import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import formatString from 'format-string-by-pattern';
import { Field, Form } from 'react-final-form';
import styles from './Order.scss';
import MainLayout from '../../Layout/Global/Global';
import RadioButton from '../../RadioButton/RadioButton';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { sendCurrentUserData } from '../../../redux/actions/currentUser';
import { getCartData } from '../../../redux/actions/cart';
import {
  getUserBonuses,
  checkPromoCode,
  getDataNewPost,
} from '../../../services/order';
import { calculateTotalSum } from '../../../utils/totalSum';

import {
  composeValidators,
  emailValidation,
  required,
  snpValidation,
} from '../../../utils/validation';
import {
  renderInput,
  renderCheckbox,
  renderSelect,
} from '../../../utils/renderInputs';

const DropDownWrapper = ({ title, children, id }) => (
  <div className={styles.dropDownBlock}>
    <input type="checkbox" id={id} className={styles.field} />
    <ul className={styles.dropDownList} uk-accordion="multiple: true;">
      <li className="uk-open">
        <label
          className={`${styles.dropDownWrapperController} uk-accordion-title`}
          htmlFor={id}
        >
          {title}
        </label>
        <div className="uk-accordion-content">{children}</div>
      </li>
    </ul>
  </div>
);

const userDataSelector = createSelector(
  state => state.currentUser.userData,
  userData => userData,
);

const isAuthSelector = createSelector(
  state => state.currentUser.isAuth,
  isAuth => isAuth,
);

const isDataReceivedSelector = createSelector(
  state => state.cart.isDataReceived,
  isDataReceived => isDataReceived,
);

const cartDataSelector = createSelector(
  state => state.cart.cartData,
  cartData => cartData,
);

const calculateBonusSum = (bonuses) => {
  let sum = 0;
  if (bonuses) {
    for (let i = 0; i < bonuses.bonus.length; i += 1) {
      sum += bonuses.bonus[i].count;
    }
  }
  return sum;
};

const makeArrOptions = (arr) => (
  arr.map(item => {  })
)

const Order = () => {
  const onSubmit = values => console.log(values);
  const userData = useSelector(userDataSelector);
  const isAuth = useSelector(isAuthSelector);
  const isDataReceived = useSelector(isDataReceivedSelector);
  const cartData = useSelector(cartDataSelector);

  const [bonus, setBonus] = useState(0);
  const [countBonuses, setCountBonuses] = useState(0);
  const [promoCodeResult, setPromoCodeResult] = useState(null);
  const [arrOptionsForAreas, setArrOptionsForAreas] = useState(null);
  const [arrOptionsForCities, setArrOptionsForCities] = useState(null);

  const getPromoCodeMessage = () => promoCodeResult.status ? (
    <p className={styles.promoCodeMessage}>Промокод действителен</p>
  ) : (
    <p className={styles.promoCodeMessage}>Промокод не действителен</p>
  );

  const calculateSumProducts = () => {
    const totalSum = calculateTotalSum(cartData);

    if (promoCodeResult && promoCodeResult.status) {
      return (
        totalSum
        - (totalSum * promoCodeResult.data.discount) / 100
        - countBonuses
      );
    }

    return totalSum - countBonuses;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCurrentUserData({}));
    getDataNewPost({}, 'getAreas').then((response) => {
      const newArrOptions = response.data.map(item => ({
        value: item.Description,
        label: item.Description,
      }));
      setArrOptionsForAreas(newArrOptions);
    });
  }, []);

  // useEffect(() => {
  //   if (arrOptionsForAreas) {
  //     getDataNewPost({}, 'getCities', '')
  //   }
  // }, [arrOptionsForCities])

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
      getUserBonuses({}).then(response => setBonus(calculateBonusSum(response.data)));
    }
  }, [isAuth]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className={styles.orderContent}>
              <div className={styles.orderSteps}>
                <DropDownWrapper id="info" title="Информация">
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <Field
                        name="sername"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={userData.snp.split(' ')[0]}
                      >
                        {renderInput({
                          placeholder: 'Фамилия',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="name"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={userData.snp.split(' ')[1]}
                      >
                        {renderInput({
                          placeholder: 'Имя',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="patronymic"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={userData.snp.split(' ')[2]}
                      >
                        {renderInput({
                          placeholder: 'Отчество',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="e-mail"
                        validate={composeValidators(required, emailValidation)}
                        defaultValue={userData.email}
                      >
                        {renderInput({
                          placeholder: 'E-mail',
                          type: 'email',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="numberPhone"
                        validate={composeValidators(required)}
                        parse={formatString('+99 (999) 999 99 99')}
                      >
                        {renderInput({
                          placeholder: '+38 (____) ___ __ __',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                    </div>
                    {!isAuth ? (
                      <Field
                        name="shouldCreateAccount"
                        render={renderCheckbox({
                          name: 'info',
                          title: 'Создать аккаунт',
                          classNameWrapper: styles.checkboxWrapper,
                        })}
                      />
                    ) : null}
                  </div>
                </DropDownWrapper>
                <DropDownWrapper title="Доставка" id="delivery">
                  <Field name="deliveryMethod">
                    {({ input }) => (
                      <div>
                        <RadioButton
                          name={input.name}
                          title="Новая Почта"
                          value="newPost"
                          checked={input.value === 'newPost'}
                          onChange={input.onChange}
                          inputName="newPost"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="Новая Почта адрес"
                          value="newPostAddress"
                          checked={input.value === 'newPostAddress'}
                          onChange={input.onChange}
                          inputName="newPostAddress"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="Самовывоз из магазина GIULIA"
                          value="pickup"
                          checked={input.value === 'pickup'}
                          onChange={input.onChange}
                          inputName="pickup"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                      </div>
                    )}
                  </Field>
                  <div className={styles.selectsWrapper}>
                    <Field
                      name="state"
                      component={renderSelect({
                        placeholder: 'Область',
                        classNameWrapper: styles.selectWrapperSmall,
                      })}
                      options={arrOptionsForAreas}
                    />
                    <Field
                      name="city"
                      component={renderSelect({
                        placeholder: 'Город',
                        classNameWrapper: styles.selectWrapperSmall,
                        onFocusCustom: () => {
                          getDataNewPost({}, 'getCities', values.state)
                            .then(response => {

                            })
                        },
                      })}
                      // options={options}
                    />
                  </div>
                  <Field
                    name="numberPost"
                    component={renderSelect({
                      placeholder: 'Отделение НП',
                      classNameWrapper: styles.selectWrapperBig,
                      onFocusCustom: () => console.log('hello'),
                    })}
                    // options={options}
                  />
                </DropDownWrapper>
                <DropDownWrapper title="Оплата" id="pay">
                  <Field name="payMethod">
                    {({ input }) => (
                      <div>
                        <RadioButton
                          name={input.name}
                          title="Картой"
                          value="card"
                          checked={input.value === 'card'}
                          onChange={input.onChange}
                          inputName="card"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="При получении"
                          value="cash"
                          checked={input.value === 'cash'}
                          onChange={input.onChange}
                          inputName="cash"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                      </div>
                    )}
                  </Field>
                  <div className={styles.discount}>
                    {isAuth ? (
                      <div className={styles.discountItem}>
                        <h2 className={styles.discountTitle}>
                          Бонусов:{' '}
                          <span className={styles.discountCount}>{bonus}</span>
                        </h2>
                        <Field name="bonus">
                          {renderInput({
                            placeholder: '00, 00 ₴',
                            type: 'text',
                            viewTypeForm: 'info',
                            classNameWrapper: styles.discountField,
                          })}
                        </Field>
                        <button
                          onClick={() => {
                            if (bonus >= Number(values.bonus)) {
                              setCountBonuses(Number(values.bonus));
                              setBonus(bonus - Number(values.bonus));
                            }
                          }}
                          className={styles.discountButton}
                          type="button"
                          disabled={bonus < Number(values.bonus)}
                        >
                          Применить
                        </button>
                        {bonus < Number(values.bonus) ? (
                          <p className={styles.promoCodeMessage}>
                            У вас недостаточно бонусов
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    <div className={styles.discountItem}>
                      <h2 className={styles.discountTitle}>Промокод</h2>
                      <Field name="promo">
                        {renderInput({
                          placeholder: 'ваш промокод',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: cx(
                            styles.discountField,
                            styles.discountFieldCode,
                          ),
                        })}
                      </Field>
                      <button
                        onClick={() => {
                          checkPromoCode(
                            {},
                            {
                              code: values.promo,
                            },
                          ).then(response => setPromoCodeResult(response));
                        }}
                        className={styles.discountButton}
                        type="button"
                      >
                        Применить
                      </button>
                      {promoCodeResult ? getPromoCodeMessage() : null}
                    </div>
                  </div>
                </DropDownWrapper>
                <div className={styles.saleConfirm}>
                  <h2 className={styles.orderTitle}>Комментарий к заказу</h2>
                  <Field name="wish">
                    {renderInput({
                      placeholder: 'Ваши полелания',
                      type: 'text',
                      classNameWrapper: styles.orderFieldWrapper,
                      classNameWrapperForInput: styles.orderField,
                    })}
                  </Field>
                </div>
              </div>
              <div className={styles.saleTotalBlock}>
                <div className={styles.totalPriceItemTitle}>
                  <h2 className={styles.title}>
                    {cartData.length} Товара на сумму:
                  </h2>
                  <button className={styles.buttonEdit} type="button">
                    Изменить
                  </button>
                </div>
                <hr className={styles.totalPriceLineFirst} />
                <div className={styles.totalPriceItem}>
                  <p className={styles.totalPriceDesc}>Доставка:</p>
                  <p className={styles.totalPriceValue}>278,00 ₴</p>
                </div>
                <div className={styles.totalPriceItem}>
                  <p className={styles.totalPriceDesc}>Сумма заказа:</p>
                  <p className={styles.totalPriceValue}>
                    {calculateSumProducts()},00 ₴
                  </p>
                </div>
                <hr className={styles.totalPriceLineSecond} />
                <div className={styles.totalPriceItemAll}>
                  <p className={styles.totalPriceDescAll}>Итого:</p>
                  <p className={styles.totalPriceValue}>570,00 ₴</p>
                </div>
                <Button
                  buttonType="submit"
                  title="Оформить заказ"
                  disabled={invalid}
                  viewType="black"
                  classNameWrapper={styles.totalPriceButton}
                />
                <Field
                  name="notConfirmOrder"
                  render={renderCheckbox({
                    name: 'notConfirmOrder',
                    title: 'Не звонить для подтверждения заказа',
                    classNameWrapper: styles.notConfirmWrapper,
                  })}
                />
                <hr className={styles.totalPriceLineThird} />
                <input
                  type="checkbox"
                  id="openDetails"
                  className={styles.field}
                />
                <div className={styles.discountContentWrapper}>
                  <label
                    className={styles.controllerDetails}
                    htmlFor="openDetails"
                  >
                    Подробно
                  </label>
                  <div className={styles.discountContent}>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDesc}>Без скидки:</p>
                      <p className={styles.discountContentPrice}>
                        {calculateTotalSum(cartData)},00 ₴
                      </p>
                    </div>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDescRed}>Скидка:</p>
                      <p className={styles.discountContentPriceRed}>
                        {promoCodeResult
                          ? (-calculateTotalSum(cartData)
                              * promoCodeResult.data.discount)
                            / 100
                          : 0}
                        ,00 ₴
                      </p>
                    </div>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDesc}>
                        Оплачено бонусами:
                      </p>
                      <p className={styles.discountContentPrice}>
                        {countBonuses ? -countBonuses : 0},00 ₴
                      </p>
                    </div>
                    <hr className={styles.discountContentLine} />
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDescGreen}>
                        Начислено бонусов:
                      </p>
                      <p className={styles.discountContentPriceGreen}>
                        +59,70 ₴
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </MainLayout>
  );
};

DropDownWrapper.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Order;
