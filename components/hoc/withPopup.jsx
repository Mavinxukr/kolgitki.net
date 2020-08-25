import React, { useState } from 'react';
import Popup from '../Popup/Popup';

const withPopup = (Component, { isOpenByDefault = false } = {}) => (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(isOpenByDefault);
  const [popupContent, setPopupContent] = useState(null);

  const closePopup = () => {
    setIsOpenPopup(false);
    document.querySelector('body').style.overflow = 'initial';
  };
  const openPopup = (propsPopup) => {
    if (propsPopup) {
      const { PopupContentComponent, content } = propsPopup;
      setPopupContent(<PopupContentComponent content={content} closePopup={closePopup} openPopup={setPopupContent} />);
    }
    setIsOpenPopup(true);
    document.querySelector('body').style.overflow = 'hidden';
  };

  return (
    <>
      <Component {...props} openPopup={openPopup} />  {/*eslint-disable-line*/}
      {isOpenPopup && (
        <Popup closePopup={closePopup}>
          {popupContent}
        </Popup>
      )}
    </>
  );
};

export default withPopup;
