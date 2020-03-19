import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import TermsOfUseWrapper from '../../components/Wrappers/Info/TermsOfUse/TermsOfUse';
import Recovery from './recovery';
import { getTerms } from '../../services/Info/term-of-use';

const TermsOfUse = ({ termsData }) => (
  <NavPanel
    routerValues={['Главная', 'Пользовательское соглашение']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <TermsOfUseWrapper termsData={termsData} />
  </NavPanel>
);

Recovery.getInitialProps = async () => {
  const termsData = await getTerms({});

  return {
    termsData: termsData.data,
  };
};

export default TermsOfUse;
