import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavItemsProfile';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import FavouriteWrapper from '../../components/Wrappers/Profile/Favourite/Favourite';
import { getFavourites } from '../../redux/actions/favourite';

const Favourites = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Личный кабинет',
      pathname: '/Profile/favourites',
    },
    {
      id: 3,
      name: 'Избранные',
    }]}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
    isLogout
  >
    <FavouriteWrapper />
  </NavPanel>
);

Favourites.getInitialProps = async ({ store }) => {
  store.dispatch(getFavourites({}));
};

export default Favourites;
