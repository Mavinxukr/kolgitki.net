import React from 'react';
import IconDelivery from '../../assets/svg/free-delivery2.svg';
import IconCard from '../../assets/svg/credit-cards-payment.svg';
import IconGift from '../../assets/svg/gift.svg';
import IconQuestion from '../../assets/svg/question.svg';
import MainLayout from '../UIComponents/MainLayout/MainLayout';
import Styles from './OptPageComponent.module.scss';

const InfoCard = ({ title, desc, children }) => (
  <article className={Styles.OptPageComponent__Card}>
    <h3 className={Styles.OptPageComponent__CardTitle}>{children} {title}</h3>
    <p className={Styles.OptPageComponent__CardDesc}>{desc}</p>
  </article>
);

const Input = ({ placeholder, width }) => <input type="text" style={{ width: `${width}` }} className={Styles.OptPageComponent__Field} placeholder={placeholder} />;

const OptPageComponent = () => (
  <MainLayout>
    <div className={Styles.OptPageComponent}>
      <div className={Styles.OptPageComponent__BreadCrumbs}>
        <a href="/" className={Styles.OptPageComponent__BreadCrumbsLink}>Главная</a>
        <a href="/" className={Styles.OptPageComponent__BreadCrumbsLink}>/ Оптовым покупателям</a>
      </div>
      <div className={Styles.OptPageComponent__Content}>
        <h2 className={Styles.OptPageComponent__Title}>Оптовым покупателям</h2>
        <InfoCard
          title="Зачем становится оптовым покупателям?"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconQuestion className={Styles.OptPageComponent__Icon} />
        </InfoCard>
        <InfoCard
          title="Сборка заказа"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconGift className={Styles.OptPageComponent__Icon} />
        </InfoCard>
        <InfoCard
          title="Доставка"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconDelivery className={Styles.OptPageComponent__Icon} />
        </InfoCard>
        <InfoCard
          title="Оплата"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconCard className={Styles.OptPageComponent__Icon} />
        </InfoCard>
        <div className={Styles.OptPageComponent__RequestBlock}>
          <form className={Styles.OptPageComponent__Form}>
            <h2 className={Styles.OptPageComponent__FormTitle}>Отправить заявку</h2>
            <div className={Styles.OptPageComponent__InputGroup}>
              <Input placeholder="* Имя" width="221px" />
              <Input placeholder="* + 380 ( ___ ) ___ - __ - __" width="255px" />
            </div>
            <Input placeholder="* E-mail" width="528px" />
            <textarea placeholder="Комментарий" className={Styles.OptPageComponent__TextField} />
            <button type="button" className={Styles.OptPageComponent__FormButton}>Отправить</button>
          </form>
          <div className={Styles.OptPageComponent__Info}>
            <h2 className={Styles.OptPageComponent__InfoTitle}>Контакты</h2>
            <p className={Styles.OptPageComponent__InfoEmail}>hello@kolgot.net</p>
            <p className={Styles.OptPageComponent__Numbers}>
              <span className={Styles.OptPageComponent__Number}>0 (800) 645 323 55</span>
              <span className={Styles.OptPageComponent__Number}>0 (800) 645 323 55</span>
              <span className={Styles.OptPageComponent__Number}>0 (800) 645 323 55</span>
            </p>
            <button className={Styles.OptPageComponent__ButtonTelegram} type="button">Telegram</button>
            <button type="button" className={Styles.OptPageComponent__ButtonViber}>Viber</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default OptPageComponent;
