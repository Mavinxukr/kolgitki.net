import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const withResponse = Component => (props) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopScreen = useMediaQuery({ query: '(min-device-width: 1024px)' });

  return (
    <Component
      {...props}
      isMobileScreen={isMobileScreen}
      isDesktopScreen={isDesktopScreen}
    />
  );
};
