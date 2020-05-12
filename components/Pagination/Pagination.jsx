import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import IconArrow from '../../public/svg/Group6212.svg';
import { setFiltersInCookies } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import { withResponse } from '../hoc/withResponse';
import styles from './Pagination.scss';

const Pagination = ({
  pageCount, currentPage, pathName, isDesktopScreen,
}) => {
  const router = useRouter();

  return (
    <ReactPaginate
      previousLabel={<IconArrow className={styles.paginationArrowLeft} />}
      nextLabel={<IconArrow className={styles.paginationArrowRight} />}
      breakLabel="..."
      breakLinkClassName={styles.breakDots}
      pageCount={pageCount}
      marginPagesDisplayed={(isDesktopScreen && 2) || 1}
      pageRangeDisplayed={(isDesktopScreen && 5) || 3}
      disabledClassName={styles.disabledArrow}
      previousLinkClassName={styles.previousButton}
      nextLinkClassName={styles.nextButton}
      forcePage={currentPage - 1}
      onPageChange={(data) => {
        setFiltersInCookies(cookies, {
          ...cookies.get('filters'),
          page: data.selected + 1,
        });
        router.push({
          pathname: pathName,
          query: router.query,
        });
      }}
      containerClassName={styles.pagination}
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
};

export default withResponse(Pagination);
