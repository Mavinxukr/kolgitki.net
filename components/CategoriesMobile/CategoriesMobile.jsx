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
  pathname,
  router,
  setCategoryInFilters,
  clearCategotyInFilters,
  filters,
  sale
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const setCategoryAndClose = category => {
    setCategoryInFilters(category);
    setIsOpenSideBar(false);
  };

  const clearCategoryAndClose = () => {
    clearCategotyInFilters();
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
        pathname={pathname}
        router={router}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
      >
        <CategoriesList
          usedCategories={usedCategories}
          setCategoryInFilters={setCategoryAndClose}
          clearCategotyInFilters={clearCategoryAndClose}
          filters={filters}
          sale={sale}
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
