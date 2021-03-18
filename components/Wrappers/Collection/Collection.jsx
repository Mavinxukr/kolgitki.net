import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getCollectionById } from '../../../services/collction';
import { getAllCategories } from '../../../services/home';
import { withResponse } from '../../hoc/withResponse';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../Layout/Global/Global';
import Loader from '../../Loader/Loader';
import { ProductTitle } from '../../ProductTitle/ProductTitle';
import Products from '../Products/Products';
import styles from './Collection.scss';

const Collection = ({
  collection: serverCollection,
  categories: serverCategories,
  isDesktopScreen
}) => {
  const [collection, setCollection] = useState(serverCollection);
  const [categories, setCategories] = useState(serverCategories);
  const router = useRouter();

  useEffect(() => {
    async function loadCollection() {
      if (localStorage.getItem('getAllCategories')) {
        setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
      } else {
        const categories = await getAllCategories({});
        setCategories(categories.data);
        localStorage.setItem(
          'getAllCategories',
          JSON.stringify(categories.data)
        );
      }
      const collection = await getCollectionById(router.query.slug);
      setCollection(collection);
    }

    if (!serverCollection) {
      loadCollection();
    }
  }, []);

  if (!collection) {
    return <Loader></Loader>;
  }
  const getUsedCategories = () => {
    let usedCategories = [];
    collection.data.forEach(item => {
      item.categories.forEach(category => {
        if (!usedCategories.some(item => item.id === category.id)) {
          usedCategories.push(category);
        }
      });
    });
    return usedCategories;
  };
  const getUsedSizes = () => {
    const usedSizes = [];

    // collection.data.forEach(item => {
    //   item?.size.forEach(size => {
    //     if (!usedSizes.some(item => item.id === size.id)) {
    //       usedSizes.push(size);
    //     }
    //   });
    // });

    return usedSizes;
  };

  const getUsedBrands = () => {
    const usedBrands = [];

    collection.data.forEach(item => {
      if (!usedBrands.some(brand => brand.id === item.brand.id)) {
        usedBrands.push(item.brand);
      }
    });

    return usedBrands;
  };

  const getUsedColors = () => {
    const usedColors = [];
    collection.data.forEach(item => {
      item.colors.forEach(color => {
        if (!usedColors.some(item => item.id === color.id)) {
          usedColors.push(color);
        }
      });
    });

    return usedColors;
  };

  return (
    <MainLayout>
      <div className={styles.catalog}>
        <div className={styles.header}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/'
              },
              {
                id: collection.id,
                name: collection.name,
                nameUa: collection.name_ua,
                pathname: '/'
              }
            ]}
          />
        </div>
        <ProductTitle
          categoryName={{
            name: collection.name,
            name_ua: collection.name_ua
          }}
          countGoods={collection.data.length}
        ></ProductTitle>
        {/* <Products
          usedFilters={{}}
          usedCategories={getUsedCategories()}
          allCategories={categories}
          setFilter={() => console.log(1)}
          clearFilters={() => console.log(1)}
          setSorting={() => console.log(1)}
          removeFilter={() => console.log(1)}
          setPage={() => console.log(1)}
          productsList={collection}
          classNameWrapper={styles.productsWrapper}
          getProductsList={() => console.log(1)}
          path="/collection"
          allFiltersSizes={getUsedSizes()}
          allFilrersBrands={getUsedBrands()}
          allFilrersColors={getUsedColors()}
          allFilrersMaterials={[]}
          allFilrersDensity={[]}
          loading={false}
          isProducts={true}
          // isSale={false}
          // isPresent={false}
        /> */}
      </div>
    </MainLayout>
  );
};

export default withResponse(Collection);
