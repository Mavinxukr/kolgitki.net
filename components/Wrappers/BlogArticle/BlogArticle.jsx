import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import PropTypes, { func } from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Recommendations from '../../Recommendations/Recommendations';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import {
  dataBlogProductsSelector,
  isDataReceivedForBlogProducts
} from '../../../utils/selectors';
import {
  getBlogProducts,
  getBlogProductsSuccess
} from '../../../redux/actions/blogProducts';
import { parseText, getCorrectWordCount } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import styles from './BlogArticle.scss';
import { withResponse } from '../../hoc/withResponse';
import { getAllCategories, getAllBlogFilters } from '../../../services/home';
import { getRecommendations } from '../../../services/blog';
import { getDataBySlug } from '../../../services/article';

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
  filters: serverFilters,
  filterListFromPost: serverFiltersList,
  goods: serverGoods,
  isDesktopScreen
}) => {
  const [recomendations, setRecomendation] = useState(serverRecomendation);
  const [blog, setBlog] = useState(serverBlog);
  const [category, setCategory] = useState(null);
  const [filters, setFilters] = useState(serverFilters);
  const [filtersList, setFiltersList] = useState(serverFiltersList);
  const [updateData, setUpdateData] = useState(false);

  const catalog = useSelector(dataBlogProductsSelector);
  const loading = useSelector(state => state.blogProducts.isFetch);
  const isDataReceived = useSelector(isDataReceivedForBlogProducts);

  const router = useRouter();
  const dispatch = useDispatch();

  console.log(router);

  async function loadRecomendations() {
    const responseRecomendations = await getRecommendations({});
    if (responseRecomendations.status) {
      setRecomendation(responseRecomendations.data);
    }
  }

  async function loadFiltersList(id) {
    const responseFiltersList = await getAllBlogFilters({ post_id: id });
    setFiltersList(responseFiltersList.data);
  }

  const getProductHandle = data => {
    dispatch(getBlogProducts({}, data, true));
  };

  const importFiltersInQuery = f => {
    let query = '';
    Object.keys(f).map(filter => (query += `${filter}=${f[filter]}&`));
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  const replaceFilters = f => {
    const replaceFilters = {};
    Object.keys(f).map(filter => {
      if (filter === 'dencity' || filter === 'materials') {
        replaceFilters.attribute = `${f[filter]}${
          replaceFilters.hasOwnProperty('attribute')
            ? '|' + replaceFilters.attribute
            : ''
        }`;
      } else {
        replaceFilters[filter] = f[filter];
      }
    });
    return replaceFilters;
  };

  async function loadBlogData(slug) {
    const responseBlog = await getDataBySlug({}, slug);
    const f = { ...router.query };
    delete f.bid;

    setFilters(f);
    if (responseBlog.status) {
      loadFiltersList(responseBlog.data.id);
      setBlog(responseBlog.data);

      getProductHandle({
        ...replaceFilters(f),
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
    if (Object.keys(filters).length < 1) {
      const f = { ...router.query };
      delete f.bid;
      setFilters(f);
    }

    if (serverGoods) {
      dispatch(getBlogProductsSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      const newFilers = { ...router.query };
      delete newFilers.bid;
      if (router.query.bid !== blog.slug) {
        loadBlogData(router.query.bid);
      } else {
        setFilters(newFilers);
        getProductHandle({
          ...replaceFilters(newFilers),
          post: blog.id
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!catalog || !filtersList || !blog) {
    return <Loader />;
  }

  return (
    <MainLayout seo={blog}>
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
              name: blog.name,
              nameUa: blog.name_uk
            }
          ]}
        />
        <div className={styles.infoWrapper}>
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
        <Products
          usedFilters={filters}
          usedCategories={filtersList[0].categories}
          selectedCategory={
            router.query.hasOwnProperty('categories')
              ? { id: JSON.parse(router.query.categories)[0] }
              : null
          }
          allCategories={null}
          setCategory={category => {
            setCategory(category);
            importFiltersInQuery({
              categories: JSON.stringify([category.id])
            });
          }}
          setFilters={setFilters}
          clearFilters={() => {
            router.push(`${router.asPath.split('?')[0]}`);
          }}
          removeFilter={(filter, name) => {
            setFilters(prev => {
              const next = { ...prev };
              const list = next[filter].split('|');
              next[filter] = list.filter(item => item !== name).join('|');
              if (next[filter] === '') {
                delete next[filter];
              }
              return next;
            });
          }}
          productsList={catalog}
          updateProducts={importFiltersInQuery}
          classNameWrapper={cx(styles.productsWrapper, {
            [styles.productsWrapperMobile]: catalog?.last_page === 1
          })}
          action={() => {
            dispatch(
              getCatalogProducts(
                {},
                {
                  ...replaceFilters(filters),
                  page: catalog.current_page + 1
                },
                true
              )
            );
          }}
          allFiltersSizes={filtersList[2].sizes}
          allFilrersBrands={filtersList[0].brands}
          allFilrersColors={filtersList[0].colors}
          allFilrersMaterials={filtersList[1].attributes[0].value}
          allFilrersDensity={filtersList[1].attributes[1].value}
          loading={loading}
          setSorting={sort => {
            const f = { ...filters };
            delete f.sort_date;
            delete f.sort_price;
            importFiltersInQuery({
              ...f,
              ...sort
            });
          }}
          clearCategory={() =>
            router.push({
              pathname: '/blog/[bid]',
              query: { bid: router.query.bid }
            })
          }
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
