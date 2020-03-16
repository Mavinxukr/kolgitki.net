import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import IconArrow from '../../public/svg/Group6212.svg';
import styles from './Pagination.scss';

const Pagination = ({
  pageCount, action, params, currentPage,
}) => {
  console.log(currentPage);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      previousLabel={(
        <Link href={{
          pathname: '/Blog',
          query: {
            page: currentPage - 1,
            ...params,
          },
        }}
        >
          <IconArrow className={styles.paginationArrowLeft} />
        </Link>
      )}
      nextLabel={(
        <Link href={{
          pathname: '/Blog',
          query: {
            page: currentPage + 1,
            ...params,
          },
        }}
        >
          <IconArrow className={styles.paginationArrowRight} />
        </Link>
      )}
      hrefBuilder={numPage => `/Blog?page=${numPage}`}
      breakLabel="..."
      breakLinkClassName={styles.breakDots}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      disabledClassName={styles.disabledArrow}
      previousLinkClassName={styles.previousButton}
      nextLinkClassName={styles.nextButton}
      forcePage={currentPage - 1}
      onPageChange={data => dispatch(action({ page: data.selected + 1, ...params }))
      }
      containerClassName={styles.pagination}
      pageLinkClassName={styles.paginationPageButton}
      subContainerClassName="pages pagination"
      activeLinkClassName={styles.paginationPageButtonActive}
    />
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  action: PropTypes.func,
  params: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Pagination;
