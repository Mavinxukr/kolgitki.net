import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const withResponse = Component => props => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumDesktopScreen = useMediaQuery({
    query: '(min-device-width: 991px)'
  });
  const isSmallMobileScreen = useMediaQuery({ query: '(max-width: 530px)' });
  const isMobileScreenForSiteMap = useMediaQuery({
    query: '(max-width: 390px)'
  });
  const isMobileScreenForBlog = useMediaQuery({ query: '(max-width: 626px)' });
  const isScreenForProduct = useMediaQuery({ query: '(max-width: 1375px)' });
  const isScreenForProductSmall = useMediaQuery({
    query: '(max-width: 1189px)'
  });

  return (
    <Component
      {...props}
      isMobileScreen={isMobileScreen}
      isDesktopScreen={isDesktopScreen}
      isMediumDesktopScreen={isMediumDesktopScreen}
      isSmallMobileScreen={isSmallMobileScreen}
      isMobileScreenForSiteMap={isMobileScreenForSiteMap}
      isMobileScreenForBlog={isMobileScreenForBlog}
      isScreenForProduct={isScreenForProduct}
      isScreenForProductSmall={isScreenForProductSmall}
    />
  );
};
