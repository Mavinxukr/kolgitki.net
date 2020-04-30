import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const withResponse = Component => (props) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopScreen = useMediaQuery({ query: '(min-device-width: 769px)' });
  const isSmallMobileScreen = useMediaQuery({ query: '(max-width: 530px)' });
  const isMobileScreenForSiteMap = useMediaQuery({ query: '(max-width: 390px)' });

  return (
    <Component
      {...props}
      isMobileScreen={isMobileScreen}
      isDesktopScreen={isDesktopScreen}
      isSmallMobileScreen={isSmallMobileScreen}
      isMobileScreenForSiteMap={isMobileScreenForSiteMap}
    />
  );
};
