import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthSelector, userDataSelector } from '../../../../utils/selectors';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
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
    return <Loader isSmallPage />;
  }

  return (
    <div className={styles.profileMailing}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Рассылки', 'Розсилки')}
      </h3>
      <p className={styles.text}>
        {parseText(cookies,
          '  Новые товары в магазине и акции на просмотренные вами товары Информация\n'
          + '        о скидках, промокодах и акциях Периодически мы проводим акции со\n'
          + '        скидками, розыгрышами, промокодами, которые могут помочь сэконмить на\n'
          + '        покупки или получить несколько товаров по цене одного.',
          'Нові товари в магазині і акції на переглянуті вами товари Інформація\n'
          + '        про знижки, промокодом і акціях Періодично ми проводимо акції з\n'
          + '        знижками, розіграшами, промокодом, які можуть допомогти секонміть на\n'
          + '        покупки або отримати кілька товарів за ціною одного.')}
      </p>
      <hr className={styles.line} />
      <p className={styles.select}>
        {parseText(cookies, 'Отправляем вам на', 'Відправляємо вам на')}
      </p>
      <div>
        <Checkbox
          checked={isMailingByEmail}
          title="E-mail"
          titleUa="E-mail"
          onChange={setIsMailingByEmail}
          classNameWrapper={styles.checkboxWrapper}
          name="email"
          nameUa="email"
          classNameWrapperForLabel={styles.checkboxLabel}
          classNameWrapperForLabelBefore={styles.labelBefore}
        />
        <Checkbox
          checked={isMailingBySMS}
          title="SMS"
          titleUa="SMS"
          onChange={setIsMailingBySMS}
          name="sms"
          nameUa="sms"
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
        titleUa="Зберегти"
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
