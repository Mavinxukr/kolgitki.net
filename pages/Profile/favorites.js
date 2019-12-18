import React from 'react';
import { arrOfNavItems } from './dataForNavItems';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ProfileFavourite from '../../components/Profile/ProfileFavourite/ProfileFavourite';

const Favourites = () => (
  <NavPanel arrOfNavItems={arrOfNavItems}>
    <ProfileFavourite />
  </NavPanel>
);

export default Favourites;
