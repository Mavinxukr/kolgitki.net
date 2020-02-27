import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import ContactsWrapper from '../../components/Wrappers/Contacts/Contacts';

const Contacts = () => (
  <NavPanel
    routerValues={['Главная', 'Контакты']}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <ContactsWrapper />
  </NavPanel>
);

export default Contacts;
