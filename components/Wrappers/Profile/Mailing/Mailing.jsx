import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthSelector, userDataSelector } from '../../../../utils/selectors';
import Checkbox from '../../../Checkbox/Checkbox';
import Button from '../../../Layout/Button/Button';
import Loader from '../../../Loader/Loader';
import styles from './Mailing.scss';
import { editCurrentUserData } from '../../../../redux/actions/currentUser';

const ProfileMailing = () => {
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(userDataSelector);

  const [isMailingByEmail, setIsMailingByEmail] = useState(false);
  const [isMailingBySMS, setIsMailingBySMS] = useState(false);

  useEffect(() => {
    setIsMailingByEmail(!!userData.mailing);
    setIsMailingBySMS(!!userData.sms_mailing);
  }, [userData]);

  const dispatch = useDispatch();

  if (!isAuth) {
    return <Loader />;
  }

  return (
    <div className={styles.profileMailing}>
      <h3>Рассылки</h3>
      <p className={styles.desc}>Виды рассылок</p>
      <p className={styles.text}>
        Новые товары в магазине и акции на просмотренные вами товары Информация
        о скидках, промокодах и акциях Периодически мы проводим акции со
        скидками, розыгрышами, промокодами, которые могут помочь сэконмить на
        покупки или получить несколько товаров по цене одного.
      </p>
      <hr className={styles.line} />
      <p className={styles.select}>Отправляем вам на</p>
      <div>
        <Checkbox
          checked={isMailingByEmail}
          title="E-mail"
          onChange={setIsMailingByEmail}
          classNameWrapper={styles.checkboxWrapper}
          name="email"
          classNameWrapperForLabel={styles.checkboxLabel}
          classNameWrapperForLabelBefore={styles.labelBefore}
        />
        <Checkbox
          checked={isMailingBySMS}
          title="SMS"
          onChange={setIsMailingBySMS}
          name="sms"
          classNameWrapper={styles.checkboxWrapper}
          classNameWrapperForLabel={styles.checkboxLabel}
          classNameWrapperForLabelBefore={styles.labelBefore}
        />
      </div>
      <Button
        viewType="red"
        buttonType="button"
        classNameWrapper={styles.button}
        title="Сохранить"
        onClick={() => {
          dispatch(
            editCurrentUserData(
              {},
              {
                mailing: Number(isMailingByEmail),
                sms_mailing: Number(isMailingBySMS),
              },
            ),
          );
        }}
      />
    </div>
  );
};

export default ProfileMailing;
