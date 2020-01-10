import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order.scss';
import MainLayout from '../../Layout/Global/Global';
import Input from '../../Layout/Input/Input';
import Checkbox from '../../Layout/Checkbox/Checkbox';

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

const Order = () => (
  <MainLayout>
    <div className={styles.content}>
      <div className={styles.orderContent}>
        <div className={styles.orderSteps}>
          <DropDownWrapper id="info" title="Информация">
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <Input
                  addClassNameForInput={styles.fieldWrapper}
                  placeholder="Фамилия"
                  type="text"
                  viewType="info"
                />
                <Input
                  addClassNameForInput={styles.fieldWrapper}
                  placeholder="Имя"
                  type="text"
                  viewType="info"
                />
                <Input
                  addClassNameForInput={styles.fieldWrapper}
                  placeholder="Отчество"
                  type="text"
                  viewType="info"
                />
                <Input
                  addClassNameForInput={styles.fieldWrapper}
                  placeholder="E-mail"
                  type="text"
                  viewType="info"
                />
                <Input
                  addClassNameForInput={styles.fieldWrapper}
                  placeholder="+38 (____) ___ __ __"
                  type="text"
                  viewType="info"
                />
              </div>
              <Checkbox
                classNameForCheckbox={styles.checkboxWrapper}
                id="info"
                title="Создать аккаунт"
              />
            </form>
          </DropDownWrapper>
        </div>
        <div className={styles.orderInfo}>hello</div>
      </div>
    </div>
  </MainLayout>
);

DropDownWrapper.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Order;
