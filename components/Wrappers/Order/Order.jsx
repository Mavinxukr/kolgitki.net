import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import Sticky from 'sticky-js';
import { useSelector, useDispatch } from 'react-redux';
import formatString from 'format-string-by-pattern';
import { Field, Form } from 'react-final-form';
import PlacesAutocomplete from 'react-places-autocomplete';
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
  getCorrectPrice,
  parseText,
  getCorrectWordCount,
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
import { withResponse } from '../../hoc/withResponse';
import {
  isAuthSelector,
  userDataSelector,
  isDataReceivedSelectorForCart,
  isDataReceivedSelectorForProducts,
  bonusesDataSelector,
  productsSelector,
  cartDataSelector,
} from '../../../utils/selectors';
import styles from './Order.scss';

const DropDownWrapper = ({
  title,
  children,
  id,
  isCorrectFields,
  isOpenAccordionGlobal,
  setIsOpenAccordionGlobal,
}) => {
  const [isOpenAccordion, setIsOpenAccordion] = useState(isOpenAccordionGlobal);

  useEffect(() => {
    if (isOpenAccordionGlobal) {
      setIsOpenAccordion(true);
    }
  }, [isOpenAccordionGlobal]);
  return (
    <div className={styles.dropDownBlock}>
      <input type="checkbox" id={id} className={styles.field} />
      <ul className={styles.dropDownList} uk-accordion="multiple: true;">
        <li
          className={cx({
            'uk-open': !isOpenAccordionGlobal,
          })}
        >
          <label
            className={cx(
              styles.dropDownWrapperController,
              'uk-accordion-title',
              {
                [styles.dropDownWrapperControllerRotate]: isOpenAccordion,
              },
            )}
            htmlFor={id}
            onClick={() => {
              setIsOpenAccordion(!isOpenAccordion);
              if (isOpenAccordionGlobal) {
                setIsOpenAccordionGlobal(false);
              }
            }}
          >
            <span>{title}</span>
            {isCorrectFields && (
              <span className={styles.edit}>
                {parseText(cookies, 'Редактировать', 'Редагувати')}
              </span>
            )}
          </label>
          <div className="uk-accordion-content" hidden={isOpenAccordionGlobal}>
            {children}
          </div>
        </li>
      </ul>
    </div>
  );
};

const calculateSumForDelivery = (value, sum) => {
  switch (true) {
    case sum > 499:
      return 0;
    case value === 'Новая почта':
      return 55;
    case value === 'Новая почта адрес':
      return 69;
    default:
      return 0;
  }
};

const calculateAccrualBonuses = cartData => Math.floor((cartData * 20) / 100);

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
  cookies.remove('formData');
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
    await cookies.set('token', responseRegister.data.token, {
      maxAge: 60 * 60 * 24,
    });
  } else {
    setErrorForExistedUser(
      parseText(
        cookies,
        'пользователь с такой почтой или телефоном уже зарегистрирован',
        'користувач з такою поштою або телефоном вже зареєстрований',
      ),
    );
  }

  return responseRegister;
};

const getCorrectFieldsUser = errors => !errors.user_surname
  && !errors.user_name
  && !errors.user_patronymic
  && !errors.user_phone
  && !errors.user_email;

const checkExistData = (form, user) => !!(
  (form?.user_name || (user?.snp && user.snp.split(' ')[0]))
  && (form?.user_surname || (user?.snp && user.snp.split(' ')[1]))
  && (form?.user_phone || user?.user_phone)
  && (form?.user_email || user?.user_email)
  && (form?.user_patronymic || (user?.snp && user.snp.split(' ')[2]))
);

const Order = ({ isDesktopScreen }) => {
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
  const [isCorrectFieldsUser, setIsCorrectFieldsUser] = useState(false);
  const [isCorrectFieldsDelivery, setIsCorrectFieldsDelivery] = useState(false);
  const [isOpenAccordionUser, setIsOpenAccordionUser] = useState(false);
  const [isOpenAccordionDelivery, setIsOpenAccordionDelivery] = useState(false);
  const [priceValue, setPriceValue] = useState(1);

  const calculateSumProducts = () => {
    const totalSum = calculateTotalSum(cartData, products);
    const sumWithoutStock = calculateSumWithoutStock(cartData, products);
    if (sumWithoutStock === 0) {
      setPriceValue(0);
    }

    if (promoCodeResult && promoCodeResult.status) {
      return +(
        totalSum
        - (sumWithoutStock * promoCodeResult.data.discount) / 100
        - countBonuses
      );
    }

    return +(totalSum - countBonuses);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getCitiesShops(setArrOptionsCitiesShops);
    setIsCorrectFieldsUser(checkExistData(cookies.get('formData'), userData));
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartData({}));
      dispatch(getBonuses({}));
    } else {
      dispatch(getBonuses({}, true));
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
            || (values.shop_id && values.shop_city.label),
          delivery_post_office:
            values.delivery_post_office && values.delivery_post_office.label,
          call: values.call ? 1 : 0,
          goods: localStorage.getItem('arrOfIdProduct') || null,
          presents: localStorage.getItem('arrOfIdPresent') || null,
          shop_id: values.shop_id && values.shop_id.value,
          delivery_cost: calculateSumForDelivery(
            values.delivery,
            calculateSumProducts(),
          ),
          cart_ids:
            (!!cartData.length
              && JSON.stringify(cartData.map(item => item.id)))
            || null,
          delivery_address:
            values.delivery_address || (values.shop_id && values.shop_id.label),
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

  const getTemplateForDelivery = (values) => {
    switch (values.delivery) {
      case 'Новая почта':
        return (
          <div>
            <Field
              name="delivery_city"
              validate={required}
              component={renderSelect({
                placeholder: 'Город',
                placeholderUa: 'Місто',
                classNameWrapper: `UserDataEdit_selectWrapper ${styles.selectWrapperBig}`,
                viewType: 'userForm',
                promiseOptions: getArrOptionsCities,
                onChangeCustom: e => getNewPostOffice(e, setArrOptions),
              })}
            />
            <Field
              userData={userData}
              name="delivery_post_office"
              options={arrOptions}
              validate={required}
              component={renderSelect({
                placeholder: 'Отделение НП',
                placeholderUa: 'Відділення НП',
                classNameWrapper: `UserDataEdit_selectWrapper ${styles.selectWrapperBig}`,
                viewType: 'userForm',
                onChangeCustom: () => {
                  setIsCorrectFieldsDelivery(true);
                  setIsOpenAccordionDelivery(true);
                },
              })}
            />
          </div>
        );
      case 'Новая почта адрес':
        return (
          <Field name="delivery_address">
            {({ input }) => (
              <PlacesAutocomplete {...input}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className={styles.searchPanel}>
                    <div className={styles.inputSearchAddressWrapper}>
                      <input
                        {...getInputProps({
                          placeholder: parseText(
                            cookies,
                            'Введите адресс',
                            'Введіть адресу',
                          ),
                          className: styles.inputSearchAddress,
                          onBlur: (e) => {
                            input.onBlur(e);
                            setIsCorrectFieldsDelivery(!!values.address);
                            setIsOpenAccordionDelivery(!!values.address);
                          },
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
              validate={required}
              component={renderSelect({
                placeholder: 'Город',
                placeholderUa: 'Місто',
                classNameWrapper: `UserDataEdit_selectWrapper ${styles.selectWrapperBig}`,
                viewType: 'userForm',
                onChangeCustom: (e) => {
                  getCityShops(setArrOptionsShops, e.value);
                },
              })}
            />
            <Field
              name="shop_id"
              options={arrOptionsShops}
              validate={required}
              component={renderSelect({
                placeholder: 'Отделение магазина',
                placeholderUa: 'Відділення магазину',
                classNameWrapper: `UserDataEdit_selectWrapper ${styles.selectWrapperBig}`,
                viewType: 'userForm',
                onChangeCustom: () => {
                  setIsCorrectFieldsDelivery(true);
                  setIsOpenAccordionDelivery(true);
                },
              })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const sticky = new Sticky('.Order_saleTotalBlockWrapper');

  return (
    <MainLayout>
      <div className={styles.content}>
        {!isDesktopScreen && (
          <h3 className={styles.mainTitle}>
            {parseText(cookies, 'Оформление заказа', 'Оформлення замовлення')}
          </h3>
        )}
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, values, errors }) => (
            <form
              onBlur={() => cookies.set('formData', values)}
              onSubmit={handleSubmit}
              className={styles.orderContent}
              data-sticky-container
            >
              <div className={styles.orderSteps}>
                <DropDownWrapper
                  id="info"
                  title={parseText(cookies, 'Информация', 'Інформація')}
                  isCorrectFields={isCorrectFieldsUser}
                  setCorrectFields={setIsCorrectFieldsUser}
                  isOpenAccordionGlobal={isOpenAccordionUser}
                  setIsOpenAccordionGlobal={setIsOpenAccordionUser}
                >
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <Field
                        name="user_surname"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={
                          cookies.get('formData')?.user_surname
                          || (userData.snp && userData.snp.split(' ')[0])
                          || ''
                        }
                      >
                        {renderInput({
                          placeholder: 'Фамилия',
                          placeholderUa: 'Прізвище',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                          onBlurCustom: () => {
                            setIsCorrectFieldsUser(
                              getCorrectFieldsUser(errors),
                            );
                            setIsOpenAccordionUser(
                              getCorrectFieldsUser(errors),
                            );
                          },
                        })}
                      </Field>
                      <Field
                        name="user_name"
                        validate={composeValidators(required, snpValidation)}
                        defaultValue={
                          cookies.get('formData')?.user_name
                          || (userData.snp && userData.snp.split(' ')[1])
                          || ''
                        }
                      >
                        {renderInput({
                          placeholder: 'Имя',
                          placeholderUa: "Ім'я",
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                          onBlurCustom: () => {
                            setIsCorrectFieldsUser(
                              getCorrectFieldsUser(errors),
                            );
                            setIsOpenAccordionUser(
                              getCorrectFieldsUser(errors),
                            );
                          },
                        })}
                      </Field>
                      <Field
                        name="user_patronymic"
                        defaultValue={
                          cookies.get('formData')?.user_patronymic
                          || (userData.snp && userData.snp.split(' ')[2])
                          || ''
                        }
                        validate={composeValidators(required, snpValidation)}
                      >
                        {renderInput({
                          placeholder: 'Отчество',
                          placeholderUa: 'По батькові',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                          onBlurCustom: () => {
                            setIsCorrectFieldsUser(
                              getCorrectFieldsUser(errors),
                            );
                            setIsOpenAccordionUser(
                              getCorrectFieldsUser(errors),
                            );
                          },
                        })}
                      </Field>
                      <Field
                        name="user_email"
                        validate={composeValidators(required, emailValidation)}
                        defaultValue={
                          cookies.get('formData')?.user_email
                          || userData.email
                          || ''
                        }
                      >
                        {renderInput({
                          placeholder: 'E-mail',
                          placeholderUa: 'E-mail',
                          type: 'email',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                          onBlurCustom: () => {
                            setIsCorrectFieldsUser(
                              getCorrectFieldsUser(errors),
                            );
                            setIsOpenAccordionUser(
                              getCorrectFieldsUser(errors),
                            );
                          },
                        })}
                      </Field>
                      <Field
                        name="user_phone"
                        validate={composeValidators(required, numberValidation)}
                        parse={formatString('+38 (099) 999 99 99')}
                        defaultValue={
                          cookies.get('formData')?.user_phone
                          || userData.phone
                          || ''
                        }
                      >
                        {renderInput({
                          placeholder: '+38 (____) ___ __ __',
                          placeholderUa: '+38 (____) ___ __ __',
                          type: 'text',
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                          onBlurCustom: () => {
                            setIsCorrectFieldsUser(
                              getCorrectFieldsUser(errors),
                            );
                            setIsOpenAccordionUser(
                              getCorrectFieldsUser(errors),
                            );
                          },
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
                            placeholderUa: 'Пароль',
                            type: 'password',
                            viewTypeForm: 'info',
                            classNameWrapper: styles.inputWrapper,
                            onBlurCustom: () => {
                              setIsCorrectFieldsUser(
                                getCorrectFieldsUser(errors),
                              );
                              setIsOpenAccordionUser(
                                getCorrectFieldsUser(errors),
                              );
                            },
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
                          titleUa: 'Створити акаунт',
                          classNameWrapper: styles.checkboxWrapper,
                          classNameWrapperForLabel: styles.checkboxLabel,
                          classNameWrapperForLabelBefore:
                            styles.labelBeforeCreateAccount,
                        })}
                      />
                    )}
                  </div>
                </DropDownWrapper>
                <DropDownWrapper
                  title="Доставка"
                  id="delivery"
                  setCorrectFields={setIsCorrectFieldsDelivery}
                  isCorrectFields={isCorrectFieldsDelivery}
                  isOpenAccordionGlobal={isOpenAccordionDelivery}
                  setIsOpenAccordionGlobal={setIsOpenAccordionDelivery}
                >
                  <Field name="delivery" defaultValue="Новая почта">
                    {({ input }) => (
                      <div>
                        <RadioButton
                          name={input.name}
                          title="Новая почта"
                          titleUa="Нова пошта"
                          value="Новая почта"
                          checked={input.value === 'Новая почта'}
                          onChange={input.onChange}
                          inputName="Новая почта"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="Новая Почта адрес"
                          titleUa="Нова пошта адреса"
                          value="Новая почта адрес"
                          checked={input.value === 'Новая почта адрес'}
                          onChange={input.onChange}
                          inputName="Новая почта адрес"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        {isAuth && (
                          <RadioButton
                            name={input.name}
                            title="Самовывоз из магазина GIULIA"
                            titleUa="Самовивіз з магазину GIULIA"
                            value="Самовывоз из магазина"
                            checked={input.value === 'Самовывоз из магазина'}
                            onChange={input.onChange}
                            inputName="Самовывоз из магазина"
                            classNameWrapper={styles.orderRadioButtonWrapper}
                          />
                        )}
                      </div>
                    )}
                  </Field>
                  {getTemplateForDelivery(values)}
                </DropDownWrapper>
                <DropDownWrapper title="Оплата" id="pay">
                  <Field name="payment" defaultValue="card">
                    {({ input }) => (
                      <div>
                        <RadioButton
                          name={input.name}
                          title="Картой"
                          titleUa="Карткою"
                          value="card"
                          checked={input.value === 'card'}
                          onChange={input.onChange}
                          inputName="card"
                          classNameWrapper={styles.orderRadioButtonWrapper}
                        />
                        <RadioButton
                          name={input.name}
                          title="При получении"
                          titleUa="При отриманні"
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
                    <div className={styles.discountItemBonuses}>
                      <h2 className={styles.discountTitle}>
                        {parseText(cookies, 'Бонусов', 'Бонусів')}:{' '}
                        <span className={styles.discountCount}>
                          {calculateBonusSum(bonuses)}
                        </span>
                      </h2>
                      <div className={styles.discountItemChild}>
                        <Field
                          name="bonuses"
                        // defaultValue={
                        //   (priceValue === 0
                        //     ? priceValue
                        //     : (getCorrectPrice(calculateSumWithoutStock(cartData, products)) * 20)
                        //       / 100)
                        // }
                        >
                          {renderInput({
                            placeholder: '0 грн',
                            placeholderUa: '0 грн',
                            type: 'number',
                            viewTypeForm: 'info',
                            classNameWrapper: styles.discountFieldBonuses,
                            classNameWrapperForInput:
                              styles.discountFieldBonusesWrapper,
                          })}
                        </Field>
                        <button
                          onClick={() => {
                            setCountBonuses(Number(values.bonuses));
                            setPriceValue(0);
                          }}
                          className={styles.discountButton}
                          type="button"
                          disabled={
                            calculateBonusSum(bonuses)
                            < Number(values.bonuses)
                            || Number(values.bonuses)
                            > (getCorrectPrice(calculateSumProducts()) * 20)
                            / 100
                            || (promoCodeResult && promoCodeResult.status)
                            || priceValue === 0
                          }
                        >
                          {parseText(cookies, 'Применить', 'Примінити')}
                        </button>
                      </div>
                      {priceValue !== 0 && (
                        <p className={styles.promoCodeMessage}>
                          {(calculateBonusSum(bonuses)
                            < Number(values.bonuses)
                            && parseText(
                              cookies,
                              'У вас недостаточно бонусов',
                              'У вас не вистачає бонусів',
                            ))
                            || (Number(values.bonuses)
                              > (getCorrectPrice(calculateSumProducts()) * 20)
                              / 100
                              && parseText(
                                cookies,
                                'вы не можете использовать бонусов, больше чем 20% от суммы',
                                'ви не можете використати бонусів більше ніж на 20% від суми',
                              ))
                            || (values.bonuses
                              && values.bonuses.length > 0
                              && promoCodeResult
                              && promoCodeResult.status
                              && parseText(
                                cookies,
                                'вы не можете использовать промокоды и бонусы вместе',
                                'ви не можете використати промокод та бонуси разом',
                              ))}
                        </p>
                      )}
                    </div>
                    <div className={styles.discountItem}>
                      <h2 className={styles.discountTitlePromo}>Промокод</h2>
                      <Field
                        name="promo_code"
                      >
                        {renderInput({
                          placeholder: 'XXX-XXX-XXX',
                          placeholderUa: 'XXX-XXX-XXX',
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
                        {parseText(cookies, 'Применить', 'Примінити')}
                      </button>
                      <p className={styles.promoCodeMessage}>
                        {(promoCodeResult
                          && `Промокод ${!promoCodeResult.status ? 'не' : ''
                          } ${parseText(
                            cookies,
                            'действителен',
                            'дійсний',
                          )} `)
                          || (countBonuses > 0
                            && values.promo_code
                            && values.promo_code.length > 0
                            && parseText(
                              cookies,
                              'вы не можете использовать промокоды и бонусы вместе',
                              'ви не можете використати промокод та бонуси разом',
                            ))}
                      </p>
                    </div>
                  </div>
                </DropDownWrapper>
                <div className={styles.saleConfirm}>
                  <h2 className={styles.orderTitle}>
                    {parseText(
                      cookies,
                      'Комментарий к заказу',
                      'Коментар до замовлення',
                    )}
                  </h2>
                  <Field
                    name="description"
                    defaultValue={cookies.get('formData')?.description || ''}
                  >
                    {renderInput({
                      placeholder: 'Ваши пожелания',
                      placeholderUa: 'Ваші побажання',
                      type: 'text',
                      classNameWrapper: styles.orderFieldWrapper,
                      classNameWrapperForInput: styles.orderField,
                      viewTypeForm: 'profileForm',
                    })}
                  </Field>
                </div>
              </div>
              <div
                data-sticky-for="768"
                data-sticky-class="is-sticky"
                data-sticky
                data-margin-top="140"
                className={styles.saleTotalBlockWrapper}
              >
                <div className={styles.saleTotalBlock}>
                  <div className={styles.totalPriceItemTitle}>
                    <h2 className={styles.title}>
                      {getCorrectWordCount(
                        cartData.length === 0
                          ? products.length
                          : cartData.length,
                        parseText(
                          cookies,
                          ['товар', 'товара', 'товаров'],
                          ['товар', 'товари', 'товарів'],
                        ),
                      )}
                      {cartData.length !== 0 && <>(ов)</>} на{' '}
                      {parseText(cookies, 'сумму', 'суму')}:{' '}
                    </h2>
                    <Link href="/cart" prefetch={false}>
                      <a className={styles.linkEdit}>
                        {parseText(cookies, 'Изменить', 'Змінити')}
                      </a>
                    </Link>
                  </div>
                  <hr className={styles.totalPriceLineFirst} />
                  <div className={styles.totalPriceItem}>
                    <p className={styles.totalPriceDesc}>Доставка:</p>
                    <p className={styles.totalPriceValue}>
                      {getCorrectPrice(
                        calculateSumForDelivery(
                          values.delivery,
                          calculateSumProducts(),
                        ),
                      )}{' '}
                      грн
                    </p>
                  </div>
                  <div className={styles.totalPriceItem}>
                    <p className={styles.totalPriceDesc}>
                      {parseText(cookies, 'Сумма заказа', 'Сума замовлення')}:
                    </p>
                    <p className={styles.totalPriceValue}>
                      {getCorrectPrice(calculateSumProducts())} грн
                    </p>
                  </div>
                  <hr className={styles.totalPriceLineSecond} />
                  <div className={styles.totalPriceItemAll}>
                    <p className={styles.totalPriceDescAll}>
                      {parseText(cookies, 'Итого', 'Разом')}:
                    </p>
                    <p className={styles.totalPriceValue}>
                      {getCorrectPrice(
                        calculateSumProducts()
                        + calculateSumForDelivery(
                          values.delivery,
                          calculateSumProducts(),
                        ),
                      )}{' '}
                      грн
                    </p>
                  </div>
                  <Button
                    buttonType="submit"
                    title="Оформить заказ"
                    titleUa="Оформити замовлення"
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
                      titleUa: 'Не телефонувати для підтвердження замовлення',
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
                      {parseText(cookies, 'Подробно', 'Детально')}
                    </label>
                    <div className={styles.discountContent}>
                      <div className={styles.discountContentItem}>
                        <p className={styles.discountContentDesc}>
                          {parseText(cookies, 'Без скидки', 'Без знижки')}:
                        </p>
                        <p className={styles.discountContentPrice}>
                          {getCorrectPrice(
                            calculateTotalSum(cartData, products),
                          )}{' '}
                          грн
                        </p>
                      </div>
                      <div className={styles.discountContentItem}>
                        <p className={styles.discountContentDescRed}>
                          {parseText(cookies, 'Скидка', 'Знижка')}:
                        </p>
                        <p className={styles.discountContentPriceRed}>
                          {promoCodeResult && promoCodeResult.status
                            ? `-${getCorrectPrice(
                              (calculateSumWithoutStock(cartData, products)
                                * promoCodeResult.data.discount)
                              / 100,
                            )}`
                            : `-${countBonuses}`}{' '}
                          грн
                        </p>
                      </div>
                      <div className={styles.discountContentItem}>
                        <p className={styles.discountContentDesc}>
                          Оплачено бонусами:
                        </p>
                        <p className={styles.discountContentPrice}>
                          -{getCorrectPrice(countBonuses) || 0} грн
                        </p>
                      </div>
                      <hr className={styles.discountContentLine} />
                      <div className={styles.discountContentItem}>
                        <p className={styles.discountContentDescGreen}>
                          {parseText(
                            cookies,
                            'Начислено бонусов',
                            'Нараховано бонусів',
                          )}
                          :
                        </p>
                        <p className={styles.discountContentPriceGreen}>
                          +
                          {getCorrectPrice(
                          calculateAccrualBonuses(calculateSumProducts()),
                        )}{' '}
                          грн
                        </p>
                      </div>
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
  isCorrectFields: PropTypes.bool,
  isOpenAccordionGlobal: PropTypes.bool,
  setIsOpenAccordionGlobal: PropTypes.func,
};

export default withResponse(Order);
