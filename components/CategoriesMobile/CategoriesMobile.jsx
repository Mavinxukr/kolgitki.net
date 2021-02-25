import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MobileSideBar from '../MobileSideBar/MobileSideBar';
import styles from './CategoriesMobile.scss';
import CategoriesList from '../CategoriesList/CategoriesList';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';

const CategoriesMobile = ({
  allCategories,
  usedCategories,
  classNameWrapper,
  pathname,
  router,
  setCategoryInFilters,
  clearCategotyInFilters,
  filters,
  sale
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  return (
    <>
      <button
        type="button"
        className={cx(styles.button, classNameWrapper)}
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
          allCategories={allCategories}
          usedCategories={usedCategories}
          setCategoryInFilters={setCategoryInFilters}
          clearCategotyInFilters={clearCategotyInFilters}
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
