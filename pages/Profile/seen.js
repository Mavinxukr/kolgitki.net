import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import Viewed from '../../components/Wrappers/Profile/Viewed/Viewed';
import { getViewedProducts } from '../../services/product';

const Seen = ({ viewedProducts }) => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Просмотренные']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <Viewed viewedProducts={viewedProducts} />
  </NavPanel>
);

Seen.getInitialProps = async () => {
  const viewedProducts = await getViewedProducts({});

  return {
    viewedProducts: viewedProducts.data,
  };
};

export default Seen;
