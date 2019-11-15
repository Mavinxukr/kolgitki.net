import React from 'react';
import Header from '../Header/Header';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import Footer from '../Footer/Footer';
import './MainLayout.scss';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    <HeaderInfo />
    { children }
    <Footer />
  </div>
);

export default MainLayout;
