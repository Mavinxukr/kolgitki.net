import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import formatString from 'format-string-by-pattern';
import { Field, Form } from 'react-final-form';
import styles from './Order.scss';
import MainLayout from '../../Layout/Global/Global';
import RadioButton from '../../RadioButton/RadioButton';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getCartData } from '../../../redux/actions/cart';
import { getProductsData } from '../../../redux/actions/products';
import { getBonuses } from '../../../redux/actions/bonuses';
import { checkPromoCode } from '../../../services/order';
import {
  calculateTotalSum,
  calculateBonusSum,
  createArrForRequestProducts,
  getArrOptionsCities,
  getNewPostOffice,
} from '../../../utils/helpers';

import {
  composeValidators,
  emailValidation,
  required,
  snpValidation,
  numberValidation,
} from '../../../utils/validation';
import {
  renderInput,
  renderCheckbox,
  renderSelect,
} from '../../../utils/renderInputs';
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

const Order = () => {
  const onSubmit = values => console.log(values);

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

  const calculateSumProducts = () => {
    const totalSum = calculateTotalSum(cartData, products);

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
    if (isAuth) {
      dispatch(getCartData({}));
      dispatch(getBonuses({}));
    } else {
      dispatch(
        getProductsData({
          good_ids: createArrForRequestProducts('arrOfIdProduct'),
        }),
      );
    }
  }, [isAuth]);

  if (!isDataReceivedForProducts && !isDataReceivedForCart) {
    return <Loader />;
  }

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
                        name="sername"
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
                        name="name"
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
                        name="patronymic"
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
                        name="e-mail"
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
                        name="numberPhone"
                        validate={composeValidators(required, numberValidation)}
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
                        type="checkbox"
                        render={renderCheckbox({
                          name: 'info',
                          title: 'Создать аккаунт',
                          classNameWrapper: styles.checkboxWrapper,
                          classNameWrapperForLabel: styles.checkboxLabel,
                          classNameWrapperForLabelBefore: styles.labelBefore,
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
                  <Field
                    name="city"
                    component={renderSelect({
                      placeholder: 'Город',
                      classNameWrapper: styles.selectWrapperBig,
                      viewType: 'userForm',
                      promiseOptions: getArrOptionsCities,
                      onChangeCustom: e => getNewPostOffice(e, setArrOptions),
                    })}
                  />
                  <Field
                    name="numberPost"
                    options={arrOptions}
                    component={renderSelect({
                      placeholder: 'Отделение НП',
                      classNameWrapper: styles.selectWrapperBig,
                      viewType: 'userForm',
                    })}
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
                          <span className={styles.discountCount}>
                            {calculateBonusSum(bonuses)}
                          </span>
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
                            if (
                              calculateBonusSum(bonuses) >= Number(values.bonus)
                            ) {
                              setCountBonuses(Number(values.bonus));
                            }
                          }}
                          className={styles.discountButton}
                          type="button"
                          disabled={
                            calculateBonusSum(bonuses) < Number(values.bonus)
                          }
                        >
                          Применить
                        </button>
                        {calculateBonusSum(bonuses) < Number(values.bonus) ? (
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
                      {promoCodeResult && (
                      <p className={styles.promoCodeMessage}>
                          Промокод {!promoCodeResult.status && 'не'} действителен
                      </p>
                      )}
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
                      viewTypeForm: 'profileForm',
                    })}
                  </Field>
                </div>
              </div>
              <div className={styles.saleTotalBlock}>
                <div className={styles.totalPriceItemTitle}>
                  <h2 className={styles.title}>
                    {cartData.length} Товара на сумму:
                  </h2>
                  <Link href="/cart">
                    <a className={styles.linkEdit}>Изменить</a>
                  </Link>
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
                  <p className={styles.totalPriceValue}>
                    {calculateSumProducts() + 278},00 ₴
                  </p>
                </div>
                <Button
                  buttonType="submit"
                  title="Оформить заказ"
                  disabled={invalid || submitting}
                  viewType="black"
                  classNameWrapper={styles.totalPriceButton}
                />
                <Field
                  name="notConfirmOrder"
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
                        {calculateTotalSum(cartData, products)},00 ₴
                      </p>
                    </div>
                    <div className={styles.discountContentItem}>
                      <p className={styles.discountContentDescRed}>Скидка:</p>
                      <p className={styles.discountContentPriceRed}>
                        {promoCodeResult && promoCodeResult.status
                          ? (-calculateTotalSum(cartData, products)
                              * promoCodeResult.data.discount)
                            / 100 + countBonuses
                          : countBonuses}
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
