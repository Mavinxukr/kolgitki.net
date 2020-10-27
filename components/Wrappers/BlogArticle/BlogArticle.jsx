import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
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
  readFiltersFromUrl,
  setFiltersInCookies,
  parseText,
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './BlogArticle.scss';
import { withResponse } from '../../hoc/withResponse';
import { getAllCategories, getAllFilters } from '../../../services/home';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const getArrTemplate = (text, sliders) => {
  if (sliders.length) {
    const indexObject = {};
    const arrResult = sliders.map((item, index) => {
      const findIndex = text.indexOf(item.tag);
      if (index === sliders.length - 1) {
        indexObject.lastFindIndex = findIndex;
        indexObject.lastLengthTag = item.tag.length;
      }
      const startIndex = index === 0 ? 0 : findIndex + item.tag.length;
      return {
        id: index + 1,
        template: text.slice(startIndex, findIndex),
        images: item.images,
      };
    });

    return [
      ...arrResult,
      {
        id: 9,
        template: text.slice(
          indexObject.lastFindIndex + indexObject.lastLengthTag,
        ),
      },
    ];
  }

  return text;
};

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

  useEffect(() => {
    if (!cookies.get('filters') && categories.length && filters) {
      setFiltersInCookies(
        cookies,
        readFiltersFromUrl(router.asPath, categories, filters),
      );
    }

    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(cookies.get('filters')),
      ),
    );
  }, [categories, filters]);

  if (!isDataReceived || !filters || !categories.length) {
    return <Loader />;
  }

  console.log(blogData);

  return (
    <MainLayout seo={blogData}>
      <div className={styles.content}>
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Головна',
              nameUa: 'Головна',
              pathname: '/',
            },
            {
              id: 2,
              name: 'Новости',
              nameUa: 'Новини',
              pathname: '/Blog',
            },
            {
              id: 3,
              name: blogData.name,
              nameUa: blogData.name_uk,
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
              <h2 className={styles.titleArticle}>
                {parseText(cookies, blogData.name, blogData.name_uk)}
              </h2>
              <div className={styles.tagsBlock}>
                <div className={styles.tags}>
                  {blogData.tags.map(item => (
                    <span
                      style={{ background: item.color }}
                      className={styles.tag}
                      key={item.id}
                    >
                      #{parseText(cookies, item.name, item.name_ua)}
                    </span>
                  ))}
                </div>
                <p className={styles.date}>{blogData.created}</p>
              </div>
            </div>
            {(Array.isArray(
              getArrTemplate(
                parseText(cookies, blogData.text, blogData.text_uk),
                blogData.sliders,
              ),
            )
              && getArrTemplate(blogData.text, blogData.sliders).map(item => (
                <div key={item.id}>
                  <div
                    className={styles.textArticle}
                    dangerouslySetInnerHTML={{ __html: item.template }}
                  />
                  {item.images && (
                    <DynamicComponentWithNoSSRSlider
                      isArticle
                      images={item.images}
                      classNameWrapper={styles.sliderWrapper}
                    />
                  )}
                </div>
              ))) || (
              <div
                className={styles.textArticle}
                dangerouslySetInnerHTML={{
                  __html: parseText(cookies, blogData.text, blogData.text_uk),
                }}
              />
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
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1,
          })}
          pathname={`/Blog/${router.query.bid.split('/')[0]}`}
          router={router}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  categories: 1,
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
    name_uk: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    created: PropTypes.string,
    video: PropTypes.string,
    text: PropTypes.string,
    text_uk: PropTypes.string,
    id: PropTypes.number,
    sliders: PropTypes.arrayOf(PropTypes.object),
    slug: PropTypes.string,
  }),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(BlogArticle);
