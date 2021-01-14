import React, { useState } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ButtonFavourite.scss';
import {
  addToFavourite,
  deleteFromFavourite,
} from '../../redux/actions/favourite';
import IconLike from '../../public/svg/like-border.svg';
import { parseText } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import { cookies } from '../../utils/getCookies';

const ButtonFavourite = ({
  item,
  newItem,
  isDesktopScreen,
  classNameWrapper,
}) => {
  const [productIsFavorite, setProductIsFavorite] = useState(
    newItem.isFavorite,
  );

  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={cx(styles.addToFavourite, classNameWrapper, {
        [styles.addedToFavourite]: productIsFavorite,
      })}
      onClick={(e) => {
        setProductIsFavorite(!productIsFavorite);
        const key = (item.good && 'good_id') || (item.present && 'present_id');
        if (productIsFavorite) {
          dispatch(
            deleteFromFavourite(
              {},
              { [`${key}s`]: JSON.stringify([newItem.id]) },
              key === 'present_id',
            ),
          );
        } else {
          dispatch(
            addToFavourite({}, { [key]: newItem.id }, key === 'present_id'),
          );
        }
      }}
    >
      <IconLike />
      {isDesktopScreen && parseText(cookies, 'В избранное', 'В обране')}
    </button>
  );
};

ButtonFavourite.propTypes = {
  item: PropTypes.shape({
    good: PropTypes.object,
    present: PropTypes.object,
  }),
  newItem: PropTypes.shape({
    isFavorite: PropTypes.bool,
    id: PropTypes.number,
  }),
  isDesktopScreen: PropTypes.bool,
  classNameWrapper: PropTypes.string,
};

export default withResponse(ButtonFavourite);
