import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import withPopup from '../hoc/withPopup';
import { withResponse } from '../hoc/withResponse';
import ShareIcon from '../../public/svg/share.svg';
import styles from './ButtonShare.scss';
import SharePopup from '../SharePopup/SharePopup';

const ButtonShare = ({
  count, classNameWrapper, openPopup, shareUrl, isDesktopScreen,
}) => (
  <button
    className={cx(styles.button, classNameWrapper)}
    type="button"
    onClick={() => openPopup({
      PopupContentComponent: SharePopup,
      content: shareUrl,
    })
    }
  >
    <ShareIcon className={styles.buttonIcon} />{' '}
    {isDesktopScreen && parseText(cookies, 'Поделиться', 'Поділитися')} {count && `(${count})`}
  </button>
);

ButtonShare.propTypes = {
  count: PropTypes.number,
  openPopup: PropTypes.func,
  classNameWrapper: PropTypes.string,
  shareUrl: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(withPopup(ButtonShare));
