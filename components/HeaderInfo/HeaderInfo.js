import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Styles from './HeaderInfo.module.scss';
import IconClothes from '../../assets/svg/clothes.svg';
import IconSale from '../../assets/svg/sale.svg';
import IconDelivery from '../../assets/svg/free-delivery.svg';

const HeaderInfo = () => (
  <div className={Styles.HeaderInfo}>
    <Container className={Styles.HeaderInfo__Container}>
      <Row className={Styles.HeaderInfo__Row}>
        <Col xl="3">
          <p className={`${Styles.HeaderInfo__Item} ${Styles.HeaderInfo__Number}`}>044 495 523 395</p>
        </Col>
        <Col xl="3" className={Styles.HeaderInfo__Column}>
          <p className={Styles.HeaderInfo__IconBlockOne}>
            <IconClothes className={Styles.HeaderInfo__Icon} />
          </p>
          <p className={Styles.HeaderInfo__Item}>Магазин в вашем городе</p>
        </Col>
        <Col xl="3" className={Styles.HeaderInfo__Column}>
          <p className={Styles.HeaderInfo__IconBlockTwo}>
            <IconSale className={Styles.HeaderInfo__IconBlockOne} />
          </p>
          <p className={Styles.HeaderInfo__Item}>Низкие цены</p>
        </Col>
        <Col xl="3" className={Styles.HeaderInfo__Column}>
          <p className={Styles.HeaderInfo__IconBlockThree}>
            <IconDelivery className={Styles.HeaderInfo__Icon} />
          </p>
          <p className={Styles.HeaderInfo__Item}>Бесплатная доставка от 500 грн</p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default HeaderInfo;
