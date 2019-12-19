import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileFavourite from '../../components/Profile/ProfileFavourite/ProfileFavourite';

const Favourites = () => (
  <NavPanel
    routerValues={['Главная', '/ Личный кабинет', '/ Избранные']}
    mainRoute="Profile"
    arrOfNavItems={arrOfNavItems}
  >
    <ProfileFavourite />
  </NavPanel>
);

export default Favourites;
