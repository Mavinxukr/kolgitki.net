import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactPaginate from 'react-paginate';
import IconArrow from '../../public/svg/Group6212.svg';
import { withResponse } from '../hoc/withResponse';
import styles from './Pagination.scss';
import { animateScroll as scroll } from 'react-scroll';

const Pagination = ({ pageCount, currentPage, isDesktopScreen, setPage }) => {
  const classNameForPagination = cx(styles.pagination, {
    [styles.threeItemsPagination]: pageCount === 3,
    [styles.twoItemsPagination]: pageCount === 2,
    [styles.fourItemsPagination]: pageCount === 4
  });

  return (
    <ReactPaginate
      previousLabel={<IconArrow className={styles.paginationArrowLeft} />}
      nextLabel={<IconArrow className={styles.paginationArrowRight} />}
      breakLabel="..."
      breakLinkClassName={styles.breakDots}
      pageCount={pageCount}
      marginPagesDisplayed={(isDesktopScreen && 2) || 1}
      pageRangeDisplayed={(isDesktopScreen && 5) || 2}
      disabledClassName={styles.disabledArrow}
      previousLinkClassName={styles.previousButton}
      nextLinkClassName={styles.nextButton}
      forcePage={currentPage - 1}
      onPageChange={data => {
        setPage(data.selected + 1);
        scroll.scrollTo(0, {
          duration: 400,
          smooth: true
        });
      }}
      containerClassName={classNameForPagination}
      pageLinkClassName={styles.paginationPageButton}
      subContainerClassName="pages pagination"
      activeLinkClassName={styles.paginationPageButtonActive}
    />
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  pathName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isBlog: PropTypes.bool
};

export default withResponse(Pagination);
