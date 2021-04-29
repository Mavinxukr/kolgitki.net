import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MobileSideBar from '../MobileSideBar/MobileSideBar';
import styles from './CategoriesMobile.scss';
import CategoriesList from '../CategoriesList/CategoriesList';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';

const CategoriesMobile = ({
  usedCategories,
  allCategories,
  selectedCategory,
  setLink,
  clear
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const setCategoryAndClose = slug => {
    setLink(slug);
    setIsOpenSideBar(false);
  };

  return (
    <>
      <button
        type="button"
        className={cx(styles.button)}
        onClick={() => setIsOpenSideBar(true)}
      >
        {parseText(cookies, 'Категории', 'Категорії')}
      </button>
      <MobileSideBar
        title={parseText(cookies, 'Категории', 'Категорії')}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
      >
        <CategoriesList
          usedCategories={usedCategories}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setLink={setCategoryAndClose}
          clear={clear}
        />
      </MobileSideBar>
    </>
  );
};

CategoriesMobile.propTypes = {
  classNameWrapper: PropTypes.string,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categories: PropTypes.array
};

export default CategoriesMobile;
