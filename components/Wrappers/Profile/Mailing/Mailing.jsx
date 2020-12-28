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
  const [isNews, setIsNews] = useState(false);
  const [isPromo, setIsPromo] = useState(false);

  useEffect(() => {
    setIsMailingByEmail(!!userData.mailing);
    setIsMailingBySMS(!!userData.sms_mailing);
    setIsNews(!!userData.type_mailing_news);
    setIsPromo(!!userData.type_mailing_promo);
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
      <h4 className={styles.secondTitle}>
        {parseText(cookies, 'Виды рассылки', 'Види розсилок')}
      </h4>
      <Checkbox
        checked={isNews}
        title="Новости, акции компании"
        titleUa="Новини, акціїкомпанії"
        onChange={setIsNews}
        classNameWrapper={styles.checkboxWrapper}
        name="news"
        nameUa="news"
        classNameWrapperForLabel={styles.checkboxLabel}
        classNameWrapperForLabelBefore={styles.labelBefore}
      />
      <p className={styles.text}>
        {parseText(
          cookies,
          'Новые товары в магазине и акции на просмотренные вами товары',
          'Нові товари в магазині і акції на переглянуті вами товари',
        )}
      </p>
      <Checkbox
        checked={isPromo}
        title="Промокоды, скидки и акции"
        titleUa="Промокоди, знижки та акції"
        onChange={setIsPromo}
        classNameWrapper={styles.checkboxWrapper}
        name="promo"
        nameUa="promo"
        classNameWrapperForLabel={styles.checkboxLabel}
        classNameWrapperForLabelBefore={styles.labelBefore}
      />
      <p className={styles.text}>
        {parseText(
          cookies,
          'Информация о скидках, промокодах и акциях Периодически мы проводим акции со скидками, розыгрышами, промокодами, которые могут помочь сэконмить на покупки или получить несколько товаров по цене одного.',
          'Інформація про знижки, промокодом і акціях Періодично ми проводимо акції з знижками, розіграшами, промокодом, які можуть допомогти секонміть на покупки або отримати кілька товарів за ціною одного.',
        )}
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
      {isMailingBySMS !== !!userData.sms_mailing
      || isMailingByEmail !== !!userData.mailing
      || isNews !== userData.type_mailing_news
      || isPromo !== userData.type_mailing_promo ? (
        <Button
          viewType={
            (!isMailingBySMS
              && !isMailingByEmail
              && !isNews
              && !isPromo
              && 'footerButton')
            || 'red'
          }
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
                  type_mailing_news: Number(isNews),
                  type_mailing_promo: Number(isPromo),
                },
              ),
            );
          }}
        />
        ) : null}
    </div>
  );
};

export default ProfileMailing;
