import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import MainLayout from '../../Layout/Global/Global';
import Recommendations from '../../Recommendations/Recommendations';
import Loader from '../../Loader/Loader';
import { dataBlogProductsSelector } from '../../../utils/selectors';
import {
  getBlogProducts,
  getBlogProductsSuccess
} from '../../../redux/actions/blogProducts';
import { parseText, getCorrectWordCount } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './BlogArticle.scss';
import { withResponse } from '../../hoc/withResponse';
import { getAllBlogFilters } from '../../../services/home';
import { getRecommendations } from '../../../services/blog';
import { getDataBySlug } from '../../../services/article';
import { BlogArticleProducts } from './BlogArticleProducts/BlogArticleProducts';
import { BlogArticleBreadCrumbs } from './BlogArticleBreadCrumbs/BlogArticleBreadCrumbs';
import { replaceFilters } from './helpers';
import { buildFiltersBySlug, replaceFilter } from '../../../utils/products';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../SimpleSlider/SimpleSlider'),
  { ssr: false }
);

const blogContent = data => {
  const stringContent = parseText(cookies, data.text, data.text_uk);
  const arrContent = stringContent.split(/(\/\/\/\w+\/\/\/)/);
  const content = arrContent.map((item, index) => {
    if (/(\/\/\/\w+\/\/\/)/.test(item)) {
      return (
        <DynamicComponentWithNoSSRSlider
          isArticle
          images={
            data.sliders.filter(
              slider => slider.tag === item.match(/(\w+)/)[0]
            )[0].images
          }
          classNameWrapper={styles.sliderWrapper}
        />
      );
    } else {
      return (
        <div
          key={index}
          className={styles.textArticle}
          dangerouslySetInnerHTML={{ __html: item }}
        ></div>
      );
    }
  });

  return content;
};

const BlogArticle = ({
  recomendations: serverRecomendation,
  blog: serverBlog,
  allFilters: serverAllFilters,
  usedFilters: serverUsedFilters,
  categoryData: serverCategoryData,
  otherFilters: serverOtherFilters,
  goods: serverGoods,
  isDesktopScreen
}) => {
  const [recomendations, setRecomendation] = useState(serverRecomendation);
  const [blog, setBlog] = useState(serverBlog);
  const [allFilters, setAllFilters] = useState(serverAllFilters);
  const [otherFilters, setOtherFilters] = useState(serverOtherFilters);
  const [filtersList, setFiltersList] = useState(serverUsedFilters);

  const [updateData, setUpdateData] = useState(false);
  const [category, setCategory] = useState(serverCategoryData);

  const catalog = useSelector(dataBlogProductsSelector);
  const loading = useSelector(state => state.blogProducts.isFetch);
  // const isDataReceived = useSelector(isDataReceivedForBlogProducts);

  const router = useRouter();
  const dispatch = useDispatch();

  async function loadRecomendations() {
    const responseRecomendations = await getRecommendations({});
    if (responseRecomendations.status) {
      setRecomendation(responseRecomendations.data);
    }
  }

  async function loadFiltersList(id) {
    const responseFiltersList = await getAllBlogFilters({ post_id: id });
    const allFilterList = await responseFiltersList.data;

    //format all filters
    let allFilters = replaceFilter(allFilterList);
    allFilters.materials = allFilters.attributes[0].value;
    allFilters.density = allFilters.attributes[1].value;
    delete allFilters.attributes;

    setAllFilters(allFilters);
  }

  const getProductHandle = data => {
    dispatch(getBlogProducts({}, data));
  };

  const importFiltersInQuery = filter => {
    let query = '';
    Object.keys(filter).forEach(
      f => (query += `${f}=${filter[f].map(item => item.slug || item.crumbs)}&`)
    );

    if (otherFilters) {
      Object.keys(otherFilters).map(
        of => (query += `${of}=${otherFilters[of]}&`)
      );
    }
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  async function loadBlogData(slug) {
    const responseBlog = await getDataBySlug({}, slug);

    if (responseBlog.status) {
      loadFiltersList(responseBlog.data.id);
      setBlog(responseBlog.data);

      getProductHandle({
        ...replaceFilters({}),
        post: responseBlog.data.id
      });
    }
  }

  useEffect(() => {
    if (!recomendations) {
      loadRecomendations();
    }

    if (!blog) {
      loadBlogData(router.query.bid);
    }

    if (!filtersList || Object.keys(filtersList).length < 1) {
      const f = { ...router.query };
      delete f.bid;

      //build filters from slugs
      const usedFilters = buildFiltersBySlug(f, allFilters);

      setFiltersList(usedFilters);

      const otherFilters = { ...f };
      delete otherFilters.categories;
      delete otherFilters.colors;
      delete otherFilters.sizes;
      delete otherFilters.brands;
      delete otherFilters.density;
      delete otherFilters.materials;

      setOtherFilters(otherFilters);
    }

    if (serverGoods) {
      dispatch(getBlogProductsSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      const queryData = { ...router.query };
      delete queryData.bid;

      if (router.query.bid !== blog.slug) {
        loadBlogData(router.query.bid);
      } else {
        let categoryData = [];

        if (queryData.hasOwnProperty('categories')) {
          const categoryName = queryData.categories;
          if (allFilters.hasOwnProperty('categories')) {
            categoryData = [
              ...allFilters.categories.filter(
                category => category.crumbs === categoryName
              )
            ];
          }
          setCategory(categoryData);
          delete queryData.categories;
        }

        const usedFilters = buildFiltersBySlug(queryData, allFilters);

        setFiltersList(usedFilters);

        const otherFilters = { ...queryData };
        delete otherFilters.categories;
        delete otherFilters.colors;
        delete otherFilters.sizes;
        delete otherFilters.brands;
        delete otherFilters.density;
        delete otherFilters.materials;

        setOtherFilters(otherFilters);

        getProductHandle({
          ...replaceFilters({ ...usedFilters, categories: categoryData }),
          ...otherFilters,
          post: blog.id
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!catalog || !filtersList || !blog || !allFilters) {
    return <Loader />;
  }

  return (
    <MainLayout seo={blog}>
      <div className={styles.content}>
        <BlogArticleBreadCrumbs
          blogName={{ name: blog.name, nameUa: blog.name_uk }}
        />
        <div className={styles.infoWrapper}>
          {recomendations && (
            <Recommendations
              reverse
              classNameWrapper={styles.recommendationWrapper}
              classNameTitle={styles.recommendationTitle}
              classNameCards={styles.recommendationCards}
              classNameCard={styles.recommendationCard}
              classNameTag={styles.recommendationTag}
              classNameTitleCard={styles.recommendationTitleCard}
              recomendations={recomendations}
            />
          )}

          <div className={styles.mainInfo}>
            <Link href="/blog" prefetch={false}>
              <a className={styles.linkBack}>Назад</a>
            </Link>
            <div className={styles.text}>
              <h2 className={styles.titleArticle}>
                {parseText(cookies, blog.name, blog.name_uk)}
              </h2>
              <div className={styles.tagsBlock}>
                <div className={styles.tags}>
                  {blog.tags.map(item => (
                    <span
                      style={{ background: item.color }}
                      className={styles.tag}
                      key={item.id}
                    >
                      #{parseText(cookies, item.name, item.name_ua)}
                    </span>
                  ))}
                </div>
                <p className={styles.date}>{blog.created}</p>
              </div>
            </div>
            <div>{blogContent(blog)}</div>
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
            {category
              ? parseText(cookies, category.name, category.name_ua)
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
        <BlogArticleProducts
          allCategories={null}
          usedCategories={allFilters.categories}
          selectedCategory={category[0] || null}
          setCategory={category => {
            router.push(
              `${router.asPath.split('?')[0]}?categories=${category.crumbs}`
            );
          }}
          clearCategory={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          usedFilters={filtersList}
          otherFilters={otherFilters}
          setFilters={setFiltersList}
          clearFilters={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          setSorting={sort => {
            let queryaData = router.query;

            delete queryaData.bid;
            delete queryaData.sort_date;
            delete queryaData.sort_price;
            queryaData = { ...queryaData, ...sort };

            let query = '';
            Object.keys(queryaData).forEach(
              filter => (query += `${filter}=${queryaData[filter]}&`)
            );
            query = query.slice(0, -1);

            router.push(`${router.asPath.split('?')[0]}?${query}`);
          }}
          removeFilter={(filter, item) => {
            setFiltersList(prev => {
              const next = { ...prev };
              next[filter] = next[filter].filter(f => f.id !== item.id);
              if (!next[filter].length) {
                delete next[filter];
              }

              if (Object.keys(next).length === 0) {
                importFiltersInQuery({ categories: category });
              }

              return next;
            });
          }}
          productsList={catalog}
          action={() => {
            dispatch(
              getBlogProducts(
                {},
                {
                  ...replaceFilters({
                    ...filtersList,
                    categories: category
                  }),
                  page: catalog.current_page + 1,
                  post: blog.id
                },
                true
              )
            );
          }}
          updateProducts={() => {
            importFiltersInQuery({ ...filtersList, categories: category });
          }}
          allFiltersSizes={allFilters.sizes}
          allFiltersBrands={allFilters.brands}
          allFiltersColors={allFilters.colors}
          allFiltersMaterials={allFilters.materials}
          allFiltersDensity={allFilters.density}
          loading={loading}
          isDesktopScreen={isDesktopScreen}
        />
      </div>
    </MainLayout>
  );
};

export default withResponse(BlogArticle);
