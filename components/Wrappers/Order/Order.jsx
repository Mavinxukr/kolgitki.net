import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import formatString from 'format-string-by-pattern';
import { Field, Form } from 'react-final-form';
import PlacesAutocomplete from 'react-places-autocomplete';
import styles from './Order.scss';
import MainLayout from '../../Layout/Global/Global';
import RadioButton from '../../RadioButton/RadioButton';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import IconArrow from '../../../public/svg/Path193.svg';
import { getCartData } from '../../../redux/actions/cart';
import { getProductsData } from '../../../redux/actions/products';
import { getBonuses } from '../../../redux/actions/bonuses';
import { checkPromoCode, createOrder } from '../../../services/order';
import { registration } from '../../../services/registration';
import {
  calculateTotalSum,
  calculateBonusSum,
  getArrOptionsCities,
  getNewPostOffice,
  getCitiesShops,
  getCityShops,
  calculateSumWithoutStock,
} from '../../../utils/helpers';

import {
  composeValidators,
  emailValidation,
  required,
  snpValidation,
  numberValidation,
  passwordValidation,
} from '../../../utils/validation';
import {
  renderInput,
  renderCheckbox,
  renderSelect,
} from '../../../utils/renderInputs';
import { cookies } from '../../../utils/getCookies';
import {
  isAuthSelector,
  userDataSelector,
  isDataReceivedSelectorForCart,
  isDataReceivedSelectorForProducts,
  bonusesDataSelector,
  productsSelector,
  cartDataSelector,
} from '../../../utils/selectors';

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

const calculateSumForDelivery = (value) => {
  switch (value) {
    case 'Новая почта':
      return 55;
    case 'Новая почта адрес':
      return 69;
    default:
      return 0;
  }
};

const calculateAccrualBonuses = (cartData, products) => {
  let sum = 0;
  const arrProducts = !cartData.length ? products : cartData;
  for (let i = 0; i < arrProducts.length; i += 1) {
    const item = arrProducts[i].good || arrProducts[i].present;
    const newSum = item.new_price ? 0 : (item.price * 20) / 100;
    sum += newSum;
  }
  return +sum.toFixed(2);
};

const makeActionsAfterSubmit = async ({
  values, response, isAuth, router,
}) => {
  if (!isAuth && !values.newUser) {
    cookies.set('idOrder', response.data.order.id, {
      maxAge: 60 * 60 * 24,
    });
  }
  localStorage.removeItem('arrOfIdProduct');
  localStorage.removeItem('arrOfIdPresent');
  if (values.payment === 'card') {
    window.location.replace(response.data.link);
  } else {
    await router.replace('/thank-page');
  }
};

const registerBeforeSendOrder = async (setErrorForExistedUser, values) => {
  const responseRegister = await registration(
    {},
    {
      snp: `${values.user_name} ${values.user_surname} ${values.user_patronymic}`,
      email: values.user_email,
      password: values.user_password,
      password_confirmation: values.user_password,
      mailing: 1,
      role_id: 2,
      phone: values.user_phone,
    },
  );
  if (responseRegister.status) {
    cookies.set('token', responseRegister.data.token, {
      maxAge: 60 * 60 * 24,
    });
  } else {
    setErrorForExistedUser(
      'пользователь с такой почтой или телефоном уже зарегистрирован',
    );
  }

  return responseRegister;
};

const Order = () => {
  const router = useRouter();

  const isAuth = useSelector(isAuthSelector);
  const isDataReceivedForCart = useSelector(isDataReceivedSelectorForCart);
  const isDataReceivedForProducts = useSelector(
    isDataReceivedSelectorForProducts,
  );

  const userData = useSelector(userDataSelector);
  const cartData = useSelector(cartDataSelector);
  const products = useSelector(productsSelector);
  const bonuses = useSelector(bonusesDataSelector);

  const [countBonuses, setCountBonuses] = useState(0);
  const [promoCodeResult, setPromoCodeResult] = useState(null);
  const [arrOptions, setArrOptions] = useState([]);
  const [arrOptionsCitiesShops, setArrOptionsCitiesShops] = useState([]);
  const [arrOptionsShops, setArrOptionsShops] = useState([]);
  const [errorForExistedUser, setErrorForExistedUser] = useState(null);

  const calculateSumProducts = () => {
    const totalSum = calculateSumWithoutStock(cartData, products);

    if (promoCodeResult && promoCodeResult.status) {
      return +(
        totalSum
        - (totalSum * promoCodeResult.data.discount) / 100
        - countBonuses
      ).toFixed(2);
    }

    return +(totalSum - countBonuses).toFixed(2);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getCitiesShops(setArrOptionsCitiesShops);
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
      dispatch(getBonuses({}));
    } else {
      dispatch(
        getProductsData(
          {},
          {
            goods: localStorage.getItem('arrOfIdProduct') || '[]',
            presents: localStorage.getItem('arrOfIdPresent') || '[]',
          },
        ),
      );
    }
  }, [isAuth]);

  if (!isDataReceivedForProducts && !isDataReceivedForCart) {
    return <Loader />;
  }

  const onSubmit = async (values) => {
    const url = isAuth ? 'registered' : 'unregistered';
    let responseRegister;
    if (values.newUser) {
      responseRegister = await registerBeforeSendOrder(
        setErrorForExistedUser,
        values,
      );
    }

    if ((responseRegister && responseRegister.status) || !values.newUser) {
      const response = await createOrder(
        {},
        {
          ...values,
          newUser: (values.newUser && 1) || null,
          delivery_city:
            (values.delivery_city && values.delivery_city.label)
            || (values.id_shop && values.shop_city.label),
          delivery_post_office:
            values.delivery_post_office && values.delivery_post_office.label,
          call: values.call ? 1 : 0,
          goods: localStorage.getItem('arrOfIdProduct') || null,
          presents: localStorage.getItem('arrOfIdPresent') || null,
          id_shop: values.id_shop && values.id_shop.value,
          delivery_cost: calculateSumForDelivery(values.delivery),
          cart_ids:
            (!!cartData.length
              && JSON.stringify(cartData.map(item => item.id)))
            || null,
          address: values.address || (values.id_shop && values.id_shop.label),
          bonuses: countBonuses,
        },
        url,
      );

      await makeActionsAfterSubmit({
        values,
        response,
        router,
        isAuth,
      });
    }
  };

  const getTemplateForDelivery = (valueRadio) => {
    switch (valueRadio) {
      case 'Новая почта':
        return (
          <div>
            <Field
              name="delivery_city"
              component={renderSelect({
                placeholder: 'Город',
                classNameWrapper: styles.selectWrapperBig,
                viewType: 'userForm',
                promiseOptions: getArrOptionsCities,
                onChangeCustom: e => getNewPostOffice(e, setArrOptions),
              })}
            />
            <Field
              name="delivery_post_office"
              options={arrOptions}
              component={renderSelect({
                placeholder: 'Отделение НП',
                classNameWrapper: styles.selectWrapperBig,
                viewType: 'userForm',
              })}
            />
          </div>
        );
      case 'Новая почта адрес':
        return (
          <Field name="address">
            {({ input }) => (
              <PlacesAutocomplete {...input}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className={styles.searchPanel}>
                    <div className={styles.inputSearchAddressWrapper}>
                      <input
                        {...getInputProps({
                          placeholder: 'Введите адресс',
                          className: styles.inputSearchAddress,
                        })}
                      />
                      <IconArrow className={styles.iconSelectAddress} />
                    </div>
                    {suggestions.length > 0 && (
                      <ul className={styles.listAddresses}>
                        {suggestions.map(suggestion => (
                          <li
                            className={styles.itemAddress}
                            {...getSuggestionItemProps(suggestion)}
                          >
                            <span>{suggestion.description}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </PlacesAutocomplete>
            )}
          </Field>
        );
      case 'Самовывоз из магазина':
        return (
          <div>
            <Field
              name="shop_city"
              options={arrOptionsCitiesShops}
              component={renderSelect({
                placeholder: 'Город',
                classNameWrapper: styles.selectWrapperBig,
                viewType: 'userForm',
                onChangeCustom: (e) => {
                  getCityShops(setArrOptionsShops, e.value);
                },
              })}
            />
            <Field
              name="id_shop"
              options={arrOptionsShops}
              component={renderSelect({
                placeholder: 'Отделение магазина',
                classNameWrapper: styles.selectWrapperBig,
                viewType: 'userForm',
              })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit, invalid, values, submitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.orderContent}>
              <div className={styles.orderSteps}>
                <DropDownWrapper id="info" title="Информация">
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <Field
                        name="user_surname"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={
                          userData.snp ? userData.snp.split(' ')[0] : ''
                        }
                      >
                        {renderInput({
                          placeholder: 'Фамилия',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="user_name"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={
                          userData.snp ? userData.snp.split(' ')[1] : ''
                        }
                      >
                        {renderInput({
                          placeholder: 'Имя',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="user_patronymic"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={
                          userData.snp ? userData.snp.split(' ')[2] : ''
                        }
                      >
                        {renderInput({
                          placeholder: 'Отчество',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="user_email"
                        validate={composeValidators(required, emailValidation)}
                        defaultValue={userData.email || ''}
                      >
                        {renderInput({
                          placeholder: 'E-mail',
                          type: 'email',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="user_phone"
                        defaultValue={userData.phone || ''}
                        validate={composeValidators(required, numberValidation)}
                        parse={formatString('+38 (099) 999 99 99')}
                      >
                        {renderInput({
                          placeholder: '+38 (____) ___ __ __',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      {values.newUser && (
                      <Field
                        name="user_password"
                        validate={composeValidators(
                          required,
                          passwordValidation,
                        )}
                        defaultValue={userData.email || ''}
                      >
                        {renderInput({
                          placeholder: 'Пароль',
                          type: 'password',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      )}
                    </div>
                    {!isAuth && router.query.shouldAuth === 'true' && (
                    <Field
                      name="newUser"
                      type="checkbox"
                      render={renderCheckbox({
                        name: 'info',
                        title: 'Создать аккаунт',
                        classNameWrapper: styles.checkboxWrapper,
                        classNameWrapperForLabel: styles.checkboxLabel,
                        classNameWrapperForLabelBefore: styles.labelBefore,
                      })}
                    />
                    )}
                  </div>
                </DropDownWrapper>
                <DropDownWrapper title="Доставка" id="delivery">
                  <Field name="delivery" defaultValue="Новая почта">
                    {({ input }) => (
                      <div>
                        <RadioButton
                          name={input.name}
                          title="Новая Почта"
                          value="Новая почта"
                          checked={input.value === 'Новая почта'}
                          onChange={input.onChange}
                          inputName="Новая почта"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="Новая Почта адрес"
                          value="Новая почта адрес"
                          checked={input.value === 'Новая почта адрес'}
                          onChange={input.onChange}
                          inputName="Новая почта адрес"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="Самовывоз из магазина GIULIA"
                          value="Самовывоз из магазина"
                          checked={input.value === 'Самовывоз из магазина'}
                          onChange={input.onChange}
                          inputName="Самовывоз из магазина"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                      </div>
                    )}
                  </Field>
                  {getTemplateForDelivery(values.delivery)}
                </DropDownWrapper>
                <DropDownWrapper title="Оплата" id="pay">
                  <Field name="payment" defaultValue="card">
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
                  {}
                  <div className={styles.discount}>
                    {isAuth && (
                    <div className={styles.discountItem}>
                      <h2 className={styles.discountTitle}>
                        Бонусов:{' '}
                        <span className={styles.discountCount}>
                          {calculateBonusSum(bonuses)}
                        </span>
                      </h2>
                      <Field name="bonuses">
                        {renderInput({
                          placeholder: '00, 00 ₴',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.discountField,
                        })}
                      </Field>
                      <button
                        onClick={() => setCountBonuses(Number(values.bonuses))
                          }
                        className={styles.discountButton}
                        type="button"
                        disabled={
                            calculateBonusSum(bonuses)
                              < Number(values.bonuses)
                            || Number(values.bonuses)
                              > (calculateSumWithoutStock(cartData, products) * 20)
                                / 100
                            || (promoCodeResult && promoCodeResult.status)
                          }
                      >
                        Применить
                      </button>
                      <p className={styles.promoCodeMessage}>
                        {(calculateBonusSum(bonuses)
                            < Number(values.bonuses)
                            && 'У вас недостаточно бонусов')
                            || (Number(values.bonuses)
                              > (calculateSumWithoutStock(cartData, products) * 20)
                                / 100
                              && 'вы не можете использовать бонусов, больше чем 20% от суммы')
                            || (values.bonuses && values.bonuses.length > 0
                              && promoCodeResult
                              && promoCodeResult.status
                              && 'вы не можете использовать промокоды и бонусы вместе')}
                      </p>
                    </div>
                    )}
                    <div className={styles.discountItem}>
                      <h2 className={styles.discountTitle}>Промокод</h2>
                      <Field name="promo_code">
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
                              code: values.promo_code,
                            },
                          ).then(response => setPromoCodeResult(response));
                        }}
                        className={styles.discountButton}
                        type="button"
                        disabled={!!countBonuses}
                      >
                        Применить
                      </button>
                      <p className={styles.promoCodeMessage}>
                        {(promoCodeResult
                          && `Промокод ${
                            !promoCodeResult.status ? 'не' : ''
                          } действителен`)
                          || (countBonuses > 0
                            && values.promo_code && values.promo_code.length > 0
                            && 'вы не можете использовать промокоды и бонусы вместе')}
                      </p>
                    </div>
                  </div>
                </DropDownWrapper>
                <div className={styles.saleConfirm}>
                  <h2 className={styles.orderTitle}>Комментарий к заказу</h2>
                  <Field name="description">
                    {renderInput({
                      placeholder: 'Ваши пожелания',
                      type: 'text',
                      classNameWrapper: styles.orderFieldWrapper,
                      classNameWrapperForInput: styles.orderField,
                      viewTypeForm: 'profileForm',
                    })}
                  </Field>
                </div>
              </div>
              <div className={styles.saleTotalBlock}>
                <div className={styles.totalPriceItemTitle}>
                  <h2 className={styles.title}>
                    {cartData.length === 0 ? products.length : cartData.length}{' '}
                    Товара на сумму:
                  </h2>
                  <Link href="/cart">
                    <a className={styles.linkEdit}>Изменить</a>
                  </Link>
                </div>
                <hr className={styles.totalPriceLineFirst} />
                <div className={styles.totalPriceItem}>
                  <p className={styles.totalPriceDesc}>Доставка:</p>
                  <p className={styles.totalPriceValue}>
                    {calculateSumForDelivery(values.delivery)} ₴
                  </p>
                </div>
                <div className={styles.totalPriceItem}>
                  <p className={styles.totalPriceDesc}>Сумма заказа:</p>
                  <p className={styles.totalPriceValue}>
                    {calculateSumProducts()} ₴
                  </p>
                </div>
                <hr className={styles.totalPriceLineSecond} />
                <div className={styles.totalPriceItemAll}>
                  <p className={styles.totalPriceDescAll}>Итого:</p>
                  <p className={styles.totalPriceValue}>
                    {calculateSumProducts()
                      + calculateSumForDelivery(values.delivery)} ₴
                  </p>
                </div>
                <Button
                  buttonType="submit"
                  title="Оформить заказ"
                  disabled={
                    invalid
                    || submitting
                    || (!cartData.length && !products.length)
                  }
                  viewType="black"
                  classNameWrapper={styles.totalPriceButton}
                />
                {errorForExistedUser && <p>{errorForExistedUser}</p>}
                <Field
                  name="call"
                  type="checkbox"
                  render={renderCheckbox({
                    name: 'notConfirmOrder',
                    title: 'Не звонить для подтверждения заказа',
                    classNameWrapper: styles.notConfirmWrapper,
                    classNameWrapperForLabel: styles.checkboxLabel,
                    classNameWrapperForLabelBefore: styles.labelBefore,
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
                        {calculateTotalSum(cartData, products)} ₴
                      </p>
                    </div>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDescRed}>Скидка:</p>
                      <p className={styles.discountContentPriceRed}>
                        {promoCodeResult && promoCodeResult.status
                          ? (-calculateSumWithoutStock(cartData, products)
                              * promoCodeResult.data.discount)
                              / 100
                          : countBonuses} ₴
                      </p>
                    </div>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDesc}>
                        Оплачено бонусами:
                      </p>
                      <p className={styles.discountContentPrice}>
                        {-countBonuses || 0} ₴
                      </p>
                    </div>
                    <hr className={styles.discountContentLine} />
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDescGreen}>
                        Начислено бонусов:
                      </p>
                      <p className={styles.discountContentPriceGreen}>
                        +{calculateAccrualBonuses(cartData, products)} ₴
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
