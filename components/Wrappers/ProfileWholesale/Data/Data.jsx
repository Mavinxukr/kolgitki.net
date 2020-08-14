import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import cx from 'classnames';
import styles from './Data.scss';
import UserData from '../../UserData/UserData';
import Button from '../../../Layout/Button/Button';
import { renderInput } from '../../../../utils/renderInputs';
import { addWorker, deleteWorker } from '../../../../redux/actions/workers';
import { workersDataSelector } from '../../../../utils/selectors';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import {
  composeValidators,
  required,
  snpValidation,
  emailValidation,
} from '../../../../utils/validation';

const Data = ({ changeEditValue }) => {
  const [isEditWorkMates, setIsEditWorkMates] = useState(false);

  const workers = useSelector(workersDataSelector);

  const dispatch = useDispatch();

  const classNameForWorkMatesInfo = cx(styles.workMatesInfo, {
    [styles.workMatesInfoNoPadding]: !isEditWorkMates,
  });

  const onSubmit = (values) => {
    dispatch(addWorker({}, values));
    setIsEditWorkMates(false);
  };

  return (
    <UserData changeEditValue={changeEditValue} isEditWorkMates={isEditWorkMates}>
      <div>
        <div className={styles.workMatesBLock}>
          <h3 className={cx(styles.workMatesTitle, {
            [styles.workMatesTitleEdit]: isEditWorkMates,
          })}
          >
            {parseText(cookies, 'Сотрудники', 'Співробітники')}
          </h3>
          <div className={classNameForWorkMatesInfo}>
            {workers.map(item => (
              <div className={styles.workMatesInfoWrapper} key={item.id}>
                <div>
                  <p>{item.name}</p>
                  <p className={styles.workMatesEmail}>{item.email}</p>
                </div>
                {isEditWorkMates ? (
                  <button
                    onClick={() => dispatch(deleteWorker({}, { worker_id: item.id }))
                    }
                    className={styles.itemButtonDelete}
                    type="button"
                  >
                    {parseText(cookies, 'Удалить', 'Видалити')}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        {isEditWorkMates ? (
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.workMatesFormWrapper}>
                  <p className={styles.addWorkMatesText}>
                    {parseText(cookies, 'Добавить сотрудника', 'Додати співробітника')}
                  </p>
                  <div className={styles.workMatesFormInfo}>
                    <Field
                      name="name"
                      validate={composeValidators(required, snpValidation)}
                      render={renderInput({
                        placeholder: 'ФИО',
                        placeholderUa: 'ПІБ',
                        classNameWrapper: styles.inputWrapper,
                        viewTypeForm: 'profileForm',
                        type: 'text',
                      })}
                    />
                    <Field
                      name="email"
                      validate={composeValidators(required, emailValidation)}
                      render={renderInput({
                        placeholder: 'Email',
                        placeholderUa: 'Email',
                        classNameWrapper: styles.inputWrapper,
                        viewTypeForm: 'profileForm',
                        type: 'email',
                      })}
                    />
                  </div>
                </div>
                <Button
                  title="Добавить сотрудника"
                  titleUa="Додати співробітника"
                  classNameWrapper={cx(
                    styles.workMatesButton,
                    styles.workMatesButtonForm,
                  )}
                  viewType="auth"
                  buttonType="submit"
                  disabled={invalid || submitting}
                />
              </form>
            )}
          />
        ) : null}
        {!isEditWorkMates ? (
          <Button
            title="Добавить сотрудника"
            titleUa="Додати співробітника"
            classNameWrapper={styles.workMatesButton}
            viewType="auth"
            buttonType="submit"
            onClick={() => setIsEditWorkMates(true)}
          />
        ) : null}
      </div>
      <hr className={styles.line} />
    </UserData>
  );
};

Data.propTypes = {
  changeEditValue: PropTypes.func,
};

export default Data;
