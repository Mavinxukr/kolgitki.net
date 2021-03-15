import React, { useContext, useEffect, useState } from 'react';
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
  isDataReceivedForCatalogProducts
} from '../../../utils/selectors';
import { getCatalogProducts } from '../../../redux/actions/catalogProducts';
import {
  createBodyForRequestCatalog,
  readFiltersFromUrl,
  setFiltersInCookies,
  parseText,
  getCorrectWordCount
} from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './BlogArticle.scss';
import { withResponse } from '../../hoc/withResponse';
import { getAllCategories, getAllBlogFilters } from '../../../services/home';
import { BlogContext } from '../../../context/BlogContext';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../SimpleSlider/SimpleSlider'),
  { ssr: false }
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
        images: item.images
      };
    });

    return [...arrResult];
  }

  return text;
};

const BlogArticle = ({ blogData, isDesktopScreen }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(null);
  const {
    blogFilters,
    addBlogFilter,
    clearBlogFilters,
    removeBlogFilter,
    setBlogSorting,
    setBlogPage
  } = useContext(BlogContext);

  const catalog = useSelector(dataCatalogProductsSelector);
  const loading = useSelector(state => state.catalogProducts.isFetch);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();
  const dispatch = useDispatch();

  const builfFilterFromRequest = () => {
    const f = blogFilters;
    const newF = { ...f };
    if (f.hasOwnProperty('categories')) {
      // newF.category = JSON.stringify([JSON.parse(f.categories)[0].id]);
      delete newF.categories;
    }
    if (f.hasOwnProperty('attribute')) {
      newF.attribute = JSON.parse(f.attribute)
        .map(item => item.value)
        .join(',');
    }
    if (f.hasOwnProperty('brands')) {
      newF.brands = JSON.parse(f.brands)
        .map(item => item.name)
        .join(',');
    }
    if (f.hasOwnProperty('sizes')) {
      newF.sizes = JSON.stringify(JSON.parse(f.sizes).map(item => item.slug));
    }
    if (f.hasOwnProperty('colors')) {
      newF.colors = JSON.parse(f.colors)
        .map(item => item.slug)
        .join(',');
    }
    newF.post = blogData.id;
    return newF;
  };

  const handleUpdateFilters = () => {
    dispatch(getCatalogProducts({}, builfFilterFromRequest(), true));
  };

  useEffect(() => {
    handleUpdateFilters();

    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}, { post: blogData.id }, true).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }

    getAllBlogFilters({
      post_id: blogData.id
    }).then(response => setFilters(response.data));
  }, [router.query]);

  useEffect(() => {
    handleUpdateFilters();
  }, [
    blogFilters.categories,
    blogFilters.sort_data,
    blogFilters.sort_price,
    blogFilters.sort_popular,
    blogFilters.pages
  ]);

  if (!isDataReceived || !filters || !categories.length) {
    return <Loader />;
  }

  return (
    <MainLayout seo={blogData}>
      <div className={styles.content}>
        <BreadCrumbs
          routerName="Blog"
          items={[
            {
              id: 1,
              name: 'Головна',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Новости',
              nameUa: 'Новини',
              pathname: 'blog'
            },
            {
              id: 3,
              name: blogData.name,
              nameUa: blogData.name_uk
            }
          ]}
        />
        <div className={styles.infoWrapper}>
          <Recommendations classNameWrapper={styles.recommendationWrapper} />
          <div className={styles.mainInfo}>
            <Link href="/blog" prefetch={false}>
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
                blogData.sliders
              )
            ) &&
              getArrTemplate(blogData.text, blogData.sliders).map(item => (
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
                  __html: parseText(cookies, blogData.text, blogData.text_uk)
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
              <Link href="/blog" prefetch={false}>
                <a className={styles.linkBack}>Назад</a>
              </Link>
            )}
          </div>
        </div>
        {!isDesktopScreen && (
          <Link href="/blog" prefetch={false}>
            <a className={styles.linkBackMobile}>Назад</a>
          </Link>
        )}
        <hr className={styles.line} />
        <div className={styles.titleBlock}>
          <h1
            className={cx(styles.title, {
              [styles.titleCategory]: !isDesktopScreen
            })}
          >
            {blogFilters.categories
              ? parseText(
                  cookies,
                  JSON.parse(blogFilters.categories)[0].name,
                  JSON.parse(blogFilters.categories)[0].name_ua
                )
              : 'Каталог'}
          </h1>
          <p className={styles.goodsNumber}>
            {getCorrectWordCount(catalog?.total, [
              parseText(cookies, 'товар', 'товар'),
              parseText(cookies, 'товара', 'товарти'),
              parseText(cookies, 'товаров', 'товарів')
            ])}
          </p>
        </div>
        <Products
          usedFilters={blogFilters}
          usedCategories={filters[0].categories}
          setFilter={addBlogFilter}
          clearFilters={clearBlogFilters}
          setSorting={setBlogSorting}
          removeFilter={removeBlogFilter}
          setPage={setBlogPage}
          productsList={catalog}
          classNameWrapper={null}
          getProductsList={handleUpdateFilters}
          allFiltersSizes={filters[2].sizes}
          allFilrersBrands={filters[0].brands}
          allFilrersColors={filters[0].colors}
          allFilrersMaterials={filters[1].attributes[0].value}
          allFilrersDensity={filters[1].attributes[1].value}
          loading={loading}
          isProducts={true}
          isSale={false}
          isPresent={false}
          //   dispatch(
          //     getCatalogProducts(
          //       {},
          //       {
          //         post: blogData.id,
          //         page: catalog.current_page + 1 || 1,
          //       },
          //       true,
          //     ),
          //   );
          // }}
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
    slug: PropTypes.string
  }),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(BlogArticle);
