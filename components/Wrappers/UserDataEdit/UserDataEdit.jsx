import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import styles from './UserDataEdit.scss';
import { isAuthSelector, userDataSelector } from '../../../utils/selectors';
import { editCurrentUserData } from '../../../redux/actions/currentUser';
import Loader from '../../Loader/Loader';
import ChangePasswordForm from '../../ChangePasswordForm/ChangePasswordForm';
import Button from '../../Layout/Button/Button';
import IconArrow from '../../../public/svg/Path167.svg';
import { withResponse } from '../../hoc/withResponse';
import {
  composeValidators,
  snpValidation,
  emailValidation,
  required,
  numberValidation,
} from '../../../utils/validation';
import { getArrOptionsCities, getNewPostOffice } from '../../../utils/helpers';
import { renderInput, renderSelect } from '../../../utils/renderInputs';

const UserDataEdit = ({ changeEditValue, isDesktopScreen }) => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  const dispatch = useDispatch();

  const [arrOptionsPostOffices, setArrOptionsPostOffices] = useState([]);

  if (!isAuth) {
    return <Loader />;
  }
  const onSubmit = (values) => {
    dispatch(
      editCurrentUserData(
        {},
        {
          ...values,
          department_post:
            (values.department_post && values.department_post.label) || '',
          city: (values.city && values.city.label) || '',
          address: values.address,
          role_id: userData.role.id,
          mailing: userData.mailing,
        },
      ),
    );
    changeEditValue(false);
  };

  return (
    <div className={styles.profileDataEdit}>
      <h3>Мои данные</h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid, submitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>ФИО</p>
              <Field
                name="snp"
                defaultValue={userData.snp}
                validate={composeValidators(required, snpValidation)}
              >
                {renderInput({
                  placeholder: 'ФИО',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Номер телефона</p>
              <Field
                name="phone"
                defaultValue={userData.phone || ''}
                validate={composeValidators(required, numberValidation)}
                parse={formatString('+99 (999) 999 99 99')}
              >
                {renderInput({
                  placeholder: 'введите номер',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Почта</p>
              <Field
                name="email"
                defaultValue={userData.email}
                validate={composeValidators(required, emailValidation)}
              >
                {renderInput({
                  placeholder: 'введите email',
                  type: 'email',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <div className={styles.formItem}>
              <p className={styles.fieldLabel}>Дата рождения</p>
              <Field
                name="date_birth"
                defaultValue={userData.date_birth || ''}
                validate={required}
                parse={formatString('99.99.9999')}
              >
                {renderInput({
                  placeholder: 'Дата рождения',
                  type: 'text',
                  viewTypeForm: 'userForm',
                  classNameWrapperForInput: styles.input,
                  classNameWrapper: styles.inputWrapper,
                })}
              </Field>
            </div>
            <hr className={styles.line} />
            <div className={styles.formGroup}>
              <p className={styles.formGroupTitle}>Адрес доставки</p>
              <div className={styles.formGroupChild}>
                <Field
                  name="city"
                  component={renderSelect({
                    placeholder: userData.city || 'Город',
                    classNameWrapper: styles.selectWrapper,
                    viewType: 'userDataEdit',
                    promiseOptions: getArrOptionsCities,
                    onChangeCustom: (e) => {
                      getNewPostOffice(e, setArrOptionsPostOffices);
                    },
                  })}
                />
                <Field
                  name="department_post"
                  options={arrOptionsPostOffices}
                  component={renderSelect({
                    placeholder: userData.department_post || 'Отделение НП',
                    classNameWrapper: styles.selectWrapper,
                    viewType: 'userDataEdit',
                  })}
                />
                <Field name="address">
                  {({ input }) => (
                    <PlacesAutocomplete {...input}>
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                      }) => (
                        <div className={styles.searchPanel}>
                          <div className={styles.inputSearchAddressWrapper}>
                            <input
                              {...getInputProps({
                                placeholder:
                                  userData.address || 'Введите адресс',
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
                <Button
                  classNameWrapper={styles.formGroupButton}
                  buttonType="submit"
                  title="Сохранить"
                  viewType={isDesktopScreen ? 'black' : 'auth'}
                  disable={invalid || submitting}
                />
              </div>
            </div>
            <hr className={`${styles.line} ${styles.secondLine}`} />
          </form>
        )}
      />
      <h5>Пароль</h5>
      <ChangePasswordForm isUserEdit viewTypeButton={isDesktopScreen ? 'white' : 'auth'} />
    </div>
  );
};

UserDataEdit.propTypes = {
  changeEditValue: PropTypes.func,
};

export default withResponse(UserDataEdit);
