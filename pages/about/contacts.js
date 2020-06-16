import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ContactsWrapper from '../../components/Wrappers/About/Contacts/Contacts';

const Contacts = () => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      nameUa: 'Головна',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Контакты',
      nameUa: 'Контакти',
    }]}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <ContactsWrapper />
  </NavPanel>
);

export default Contacts;
