import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavAbout';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import AboutWrapper from '../../components/Wrappers/About/About/About';
import { getAboutText } from '../../services/About/about';

const About = ({ aboutData }) => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'О магазине',
    }]}
    mainRoute="about"
    arrOfNavItems={arrOfNavItems}
  >
    <AboutWrapper aboutData={aboutData} />
  </NavPanel>
);

About.getInitialProps = async () => {
  const aboutData = await getAboutText({});

  return {
    aboutData: aboutData.data,
  };
};

export default About;
