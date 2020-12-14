import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SideBarFilter from '../SideBarFilter/SideBarFilter';
import Categories from '../Categories/Categories';
import styles from './CategoriesMobile.scss';

const CategoriesMobile = ({
  classNameWrapper,
  productsLength,
  pathname,
  router,
  categories,
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx(styles.button, classNameWrapper)}
        onClick={() => setIsOpenSideBar(true)}
      >
        Категории
      </button>
      <SideBarFilter
        title="Категории"
        pathname={pathname}
        router={router}
        productsLength={productsLength}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
      >
        <Categories
          router={router}
          pathname={pathname}
          setIsOpenSideBar={setIsOpenSideBar}
          isMobile
          arrSubCategories={categories}
        />
      </SideBarFilter>
    </>
  );
};

CategoriesMobile.propTypes = {
  classNameWrapper: PropTypes.string,
  productsLength: PropTypes.number,
  pathname: PropTypes.string,
  router: PropTypes.object,
  categories: PropTypes.array,
};

export default CategoriesMobile;
