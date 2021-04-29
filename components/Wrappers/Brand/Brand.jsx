import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Brand.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Products from '../Products/Products';
import Loader from '../../Loader/Loader';
import {
  getCatalogProducts,
  getCatalogProductsSuccess
} from '../../../redux/actions/catalogProducts';
import { getCorrectWordCount, parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';
import { getAllFilters } from '../../../services/home';
import {
  isDataReceivedForCatalogProducts,
  dataCatalogProductsSelector
} from '../../../utils/selectors';
import { withResponse } from '../../hoc/withResponse';
import ReactPlayer from 'react-player';
import { getBrandById } from '../../../services/brand';

const Brand = ({
  filters: serverFilters,
  brandData: serverData,
  filterList: serverFilterList,
  goods: serverGoods,
  isDesktopScreen
}) => {
  const [updateData, setUpdateData] = useState(false);
  const [filters, setFilters] = useState(serverFilters);
  const [brandData, setBrandData] = useState(serverData);
  const [filterList, setFilterList] = useState(serverFilterList);

  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);
  const loading = useSelector(state => state.catalogProducts.isFetch);

  const router = useRouter();
  const dispatch = useDispatch();

  console.log(router);
  const replaceFilters = f => {
    const repFiltr = {};
    Object.keys(f).map(filter => {
      if (filter === 'dencity' || filter === 'materials') {
        repFiltr.attribute = `${f[filter]}${
          repFiltr.hasOwnProperty('attribute') ? '|' + repFiltr.attribute : ''
        }`;
      } else {
        repFiltr[filter] = f[filter];
      }
    });
    return repFiltr;
  };

  const getProductHandle = data => {
    dispatch(getCatalogProducts({}, data));
  };

  const importFiltersInQuery = f => {
    let query = '';
    Object.keys(f).map(filter => (query += `${filter}=${f[filter]}&`));
    query = query.slice(0, -1);

    router.push(`${router.asPath.split('?')[0]}?${query}`);
  };

  async function loadFilters() {
    const responseFilters = await getAllFilters({});
    setFilterList(responseFilters.data);
  }
  async function loadBrand() {
    const responseBrand = await getBrandById({}, router.query.bid);
    setBrandData(responseBrand.data);

    const f = { ...router.query };
    f.brands = responseBrand.data.name;
    delete f.bid;

    setFilters(f);

    getProductHandle({
      ...replaceFilters(f)
    });
  }

  useEffect(() => {
    if (!filterList) {
      loadFilters();
    }
    if (!brandData) {
      loadBrand();
    }
    if (serverGoods) {
      dispatch(getCatalogProductsSuccess(serverGoods));
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      if (!brandData || router.query.bid !== brandData.slug) {
        loadBrand();
      } else {
        const f = { ...router.query };
        f.brands = brandData.name;
        delete f.bid;

        setFilters(f);

        getProductHandle({
          ...replaceFilters(f)
        });
      }
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!isDataReceived || !filters || !catalog || !filterList || !brandData) {
    return <Loader />;
  }

  if (document.querySelector('.ql-align-center')) {
    document.querySelector('.ql-align-center').style.textAlign = 'center';
  }
  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.BrandMainInfo}>
          <BreadCrumbs
            routerName="brands"
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/'
              },
              {
                id: 2,
                name: 'Бренды',
                nameUa: 'Бренди',
                pathname: 'brands'
              },
              {
                id: 3,
                name: brandData.slug,
                nameUa: brandData.slug
              }
            ]}
          />
          {(isDesktopScreen &&
            (catalog.data.length ? (
              <p>
                {getCorrectWordCount(
                  catalog.data.length,
                  parseText(
                    cookies,
                    ['товар', 'товара', 'товаров'],
                    ['товар', 'товару', 'товарів']
                  )
                )}
              </p>
            ) : (
              <p>Нет результатов</p>
            ))) || (
            <h3 className={styles.titleBrand}>
              {parseText(cookies, brandData.name, brandData.name_ua)}
            </h3>
          )}
        </div>

        <h1 className={styles.brandsTitle}>
          {parseText(cookies, brandData.name, brandData.name_ua)}
        </h1>
        {brandData.image_link && (
          <img
            className={styles.brandPicture}
            alt={brandData.name}
            src={brandData.image_link}
          />
        )}
        <div className={styles.info}>
          <div
            className={styles.brandDesc}
            dangerouslySetInnerHTML={{
              __html: parseText(
                cookies,
                brandData.description,
                brandData.description_ua
              )
            }}
          />
          {brandData.video_url && (
            <ReactPlayer
              className={styles.brandVideo}
              url={brandData.video_url}
            />
          )}
        </div>

        <div className={styles.titleBlock}>
          <h1>Каталог</h1>
        </div>

        <Products
          usedFilters={filters}
          usedCategories={null}
          clearCategory={() =>
            router.push({
              pathname: '/brands/[bid]',
              query: { bid: router.query.bid }
            })
          }
          selectedCategory={
            router.query.hasOwnProperty('categories')
              ? { id: JSON.parse(router.query.categories)[0] }
              : null
          }
          allCategories={null}
          setCategory={category => {
            importFiltersInQuery({
              brands: router.query.bid,
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
          allFiltersSizes={filterList[3].sizes}
          allFilrersBrands={filterList[0].brands}
          allFilrersColors={filterList[0].colors}
          allFilrersMaterials={filterList[1].attributes[0].value}
          allFilrersDensity={filterList[1].attributes[1].value}
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
        />
      </div>
    </MainLayout>
  );
};

Brand.propTypes = {
  brandData: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    description: PropTypes.string,
    description_ua: PropTypes.string
  }),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Brand);
