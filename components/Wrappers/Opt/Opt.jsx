import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import IconDelivery from '../../../public/svg/free-delivery2.svg';
import IconCard from '../../../public/svg/credit-cards-payment.svg';
import IconGift from '../../../public/svg/gift.svg';
import IconQuestion from '../../../public/svg/question.svg';
import MainLayout from '../../Layout/Global/Global';
import styles from './Opt.scss';

const InfoCard = ({ title, desc, children }) => (
  <article className={styles.card}>
    <h4 className={styles.cardTitle}>
      {children} {title}
    </h4>
    <p className={styles.cardDesc}>{desc}</p>
  </article>
);

const Opt = () => (
  <MainLayout>
    <div className={styles.opt}>
      <BreadCrumbs items={['Главная', 'Оптовым покупателям']} />
      <div className={styles.content}>
        <h2 className={styles.title}>Оптовым покупателям</h2>
        <InfoCard
          title="Зачем становится оптовым покупателям?"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconQuestion className={styles.icon} />
        </InfoCard>
        <InfoCard
          title="Сборка заказа"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconGift className={styles.icon} />
        </InfoCard>
        <InfoCard
          title="Доставка"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconDelivery className={styles.icon} />
        </InfoCard>
        <InfoCard
          title="Оплата"
          desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
        >
          <IconCard className={styles.icon} />
        </InfoCard>
        {/* <div className={styles.RequestBlock}> */}
        {/*  <form className={styles.Form}> */}
        {/*    <h2 className={styles.FormTitle}>Отправить заявку</h2> */}
        {/*    <div className={styles.InputGroup}> */}
        {/*      <Input placeholder="* Имя" width="221px" /> */}
        {/*      <Input placeholder="* + 380 ( ___ ) ___ - __ - __" width="255px" /> */}
        {/*    </div> */}
        {/*    <Input placeholder="* E-mail" width="528px" /> */}
        {/*    <textarea placeholder="Комментарий" className={styles.TextField} /> */}
        {/*    <button type="button" className={styles.FormButton}>Отправить</button> */}
        {/*  </form> */}
        {/*  <div className={styles.Info}> */}
        {/*    <h2 className={styles.InfoTitle}>Контакты</h2> */}
        {/*    <p className={styles.InfoEmail}>hello@kolgot.net</p> */}
        {/*    <p className={styles.Numbers}> */}
        {/*      <span className={styles.Number}>0 (800) 645 323 55</span> */}
        {/*      <span className={styles.Number}>0 (800) 645 323 55</span> */}
        {/*      <span className={styles.Number}>0 (800) 645 323 55</span> */}
        {/*    </p> */}
        {/*    <button className={styles.ButtonTelegram} type="button">Telegram</button> */}
        {/*    <button type="button" className={styles.ButtonViber}>Viber</button> */}
        {/*  </div> */}
        {/* </div> */}
      </div>
    </div>
  </MainLayout>
);

InfoCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.node
};

export default Opt;
