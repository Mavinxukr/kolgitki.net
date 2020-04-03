import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import SiteMapWrapper from '../../components/Wrappers/About/SiteMap/SiteMap';

const SiteMap = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Карта сайта',
    }]}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <SiteMapWrapper />
  </NavPanel>
);

export default SiteMap;
