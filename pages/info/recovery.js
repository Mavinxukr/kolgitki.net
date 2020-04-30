import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import RecoveryWrapper from '../../components/Wrappers/Info/Recovery/Recovery';
import { getExchange } from '../../services/Info/recovery';

const Recovery = ({ exchangeData }) => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Возврат / Обмен',
    }]}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <RecoveryWrapper exchangeData={exchangeData} />
  </NavPanel>
);

Recovery.getInitialProps = async () => {
  const exchangeData = await getExchange({});

  return {
    exchangeData: exchangeData.data,
  };
};

export default Recovery;
