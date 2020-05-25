import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Recommendations from '../../Recommendations/Recommendations';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import {
  dataCatalogProductsSelector,
  isDataReceivedForCatalogProducts,
} from '../../../utils/selectors';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './BlogArticle.scss';
import { withResponse } from '../../hoc/withResponse';
import { getAllCategories, getAllFilters } from '../../../services/home';

const BlogArticle = ({ blogData, isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateFilters = () => {
    const filtersCookies = cookies.get('filters');
    dispatch(
      getCatalogProducts({}, createBodyForRequestCatalog(filtersCookies)),
    );
    getAllCategories({}).then(response => setCategories(response.data));
    getAllFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories[0].id)
        || 0,
    }).then(response => setFilters(response.data));
  };

  useEffect(() => {
    handleUpdateFilters();

    return () => {
      deleteFiltersFromCookie(cookies);
    };
  }, []);

  useEffect(() => {
    handleUpdateFilters();
  }, [router]);

  if (!isDataReceived || !filters || !categories.length) {
    return <Loader />;
  }

  return (
    <MainLayout seo={blogData}>
      <div className={styles.content}>
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              pathname: '/',
            },
            {
              id: 2,
              name: 'Новости',
              pathname: '/Blog',
            },
            {
              id: 3,
              name: router.query.slug,
            },
          ]}
        />
        <div className={styles.infoWrapper}>
          <Recommendations classNameWrapper={styles.recommendationWrapper} />
          <div className={styles.mainInfo}>
            <Link href="/Blog" prefetch={false}>
              <a className={styles.linkBack}>Назад</a>
            </Link>
            <div className={styles.text}>
              <h2 className={styles.titleArticle}>{blogData.name}</h2>
              <div className={styles.tagsBlock}>
                <div className={styles.tags}>
                  {blogData.tags.map(item => (
                    <span
                      style={{ background: item.color }}
                      className={styles.tag}
                      key={item.id}
                    >
                      #{item.name}
                    </span>
                  ))}
                </div>
                <p className={styles.date}>{blogData.created}</p>
              </div>
            </div>
            <div
              className={styles.textArticle}
              dangerouslySetInnerHTML={{ __html: blogData.text }}
            />
            {blogData.video && (
              <div className={styles.player}>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={blogData.video}
                  controls
                />
              </div>
            )}
            <p className={styles.descSeo}>
              Если реклама предназначена для того, чтобы он узнал, то необходимо
              много повторений. рекламодатели должны быть осторожны, потому что
              слишком много повторений может привести к усталости потребителей,
              и сообщение может упасть на «уши».
            </p>
            {isDesktopScreen && (
              <Link href="/Blog" prefetch={false}>
                <a className={styles.linkBack}>Назад</a>
              </Link>
            )}
          </div>
        </div>
        {!isDesktopScreen && (
          <Link href="/Blog" prefetch={false}>
            <a className={styles.linkBackMobile}>Назад</a>
          </Link>
        )}
        <hr className={styles.line} />
        <Products
          products={catalog}
          classNameWrapper={styles.productsWrapper}
          pathname={`/Blog/${router.query.bid.split('_')[0]}`}
          router={router}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...createBodyForRequestCatalog(cookies.get('filters')),
                  page: catalog.current_page + 1 || 1,
                },
                true,
              ),
            );
          }}
          categories={categories}
          filters={filters}
        />
      </div>
    </MainLayout>
  );
};

BlogArticle.propTypes = {
  blogData: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    created: PropTypes.string,
    video: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(BlogArticle);
