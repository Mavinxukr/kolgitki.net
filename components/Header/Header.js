import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Styles from './Header.module.scss';
import IconLocation from '../../assets/svg/location.svg';
import IconSearch from '../../assets/svg/search.svg';
import IconLike from '../../assets/svg/like.svg';
import IconUser from '../../assets/svg/user.svg';
import IconCart from '../../assets/svg/cart.svg';

const Header = () => (
  <header className={Styles.Header}>
    <Container className={Styles.Header__Container}>
      <Row className={Styles.Header__Row}>
        <Col xl="3" className={Styles.Header__Column}>
          <img src="/images/logo_cut.png" className={Styles.Header__Logo} alt="logo" />
        </Col>
        <Col xl="6" className={`${Styles.Header__Column} ${Styles.Header__ColumnCenter}`}>
          <nav className={Styles.Header__Nav}>
            <ul className={Styles.Header__NavItems}>
              <li className={Styles.Header__NavItem}>
                <a className={Styles.Header__NavLink} href="/">Sale</a>
              </li>
              <li className={Styles.Header__NavItem}>
                <a className={Styles.Header__NavLink} href="/">Новинки</a>
              </li>
              <li className={Styles.Header__NavItem}>
                <a className={Styles.Header__NavLink} href="/">Женщинам</a>
              </li>
              <li className={Styles.Header__NavItem}>
                <a className={Styles.Header__NavLink} href="/">Мужчинам</a>
              </li>
              <li className={Styles.Header__NavItem}>
                <a className={Styles.Header__NavLink} href="/">Детям</a>
              </li>
            </ul>
          </nav>
        </Col>
        <Col xl="3" className={`${Styles.Header__Column} ${Styles.Header__ColumnRight}`}>
          <div className={Styles.Header__Icons}>
            <a href="/" className={Styles.Header__IconLink}>
              <IconLocation className={Styles.Header__Icon} />
            </a>
            <a href="/" className={Styles.Header__IconLink}>
              <IconSearch className={Styles.Header__Icon} />
            </a>
            <a href="/" className={Styles.Header__IconLink}>
              <IconLike className={Styles.Header__Icon} />
            </a>
            <a href="/" className={Styles.Header__IconLink}>
              <IconUser className={Styles.Header__Icon} />
            </a>
            <a href="/" className={Styles.Header__IconLink}>
              <IconCart className={Styles.Header__Icon} />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
