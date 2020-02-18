import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import FavouriteWrapper from '../../components/Wrappers/Profile/Favourite/Favourite';
import { getFavourites } from '../../redux/actions/favourite';

const Favourites = () => (
  <NavPanel
    routerValues={['Главная', 'Личный кабинет', 'Избранные']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <FavouriteWrapper />
  </NavPanel>
);

Favourites.getInitialProps = async ({ store }) => {
  store.dispatch(getFavourites({}));
};

export default Favourites;
