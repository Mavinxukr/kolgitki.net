import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  ViberShareButton,
  ViberIcon,
} from 'react-share';
import PropTypes from 'prop-types';
import { MAIN_DOMAIN } from '../../constants';
import IconExit from '../../public/svg/Group600.svg';
import styles from './SharePopup.scss';

const SharePopup = ({ closePopup, content }) => {
  const correctUrl = `${MAIN_DOMAIN}${content}`;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.buttonExit}
        onClick={() => closePopup()}
      >
        <IconExit />
      </button>
      <FacebookShareButton url={correctUrl}>
        <FacebookIcon />
      </FacebookShareButton>
      <TelegramShareButton url={correctUrl}>
        <TelegramIcon />
      </TelegramShareButton>
      <ViberShareButton url={correctUrl}>
        <ViberIcon />
      </ViberShareButton>
    </div>
  );
};

SharePopup.propTypes = {
  closePopup: PropTypes.func,
  content: PropTypes.string,
};

export default SharePopup;
