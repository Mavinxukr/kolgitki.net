import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { getFilters } from '../../../services/gift-backets';
import { getAllCategories } from '../../../services/home';
import { getPresentSets } from '../../../redux/actions/presentSets';
import {
  isDataReceivedForPresentSets,
  dataPresentSetsSelector,
} from '../../../utils/selectors';
import {
  createBodyForRequestCatalog,
  deleteFiltersFromCookie,
} from '../../../utils/helpers';
import { withResponse } from '../../hoc/withResponse';
import { cookies } from '../../../utils/getCookies';
import styles from './GiftBackets.scss';

const DynamicComponentWithNoSSRGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const GiftBackets = ({ isDesktopScreen }) => {
  const [filters, setFilters] = useState(null);
  const [categories, setCategories] = useState([]);

  const presentSets = useSelector(dataPresentSetsSelector);
  const isDataReceived = useSelector(isDataReceivedForPresentSets);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateFilters = () => {
    const filtersCookies = cookies.get('filters');
    getAllCategories({}).then(response => setCategories(response.data));
    getFilters({
      category_id:
        (filtersCookies
          && filtersCookies.categories
          && filtersCookies.categories[0].id)
        || 0,
    }).then(response => setFilters(response.data));
    dispatch(getPresentSets({}, createBodyForRequestCatalog(filtersCookies)));
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

  if (!isDataReceived || !filters) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.giftBaskets}>
        <div className={styles.header}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                pathname: '/',
              },
              {
                id: 2,
                name: 'Подарочные наборы',
              },
            ]}
          />
          <FilterIndicators
            buttonValue="Удалить все поводы"
            classNameWrapper={styles.filterIndicatorsWrapper}
            router={router}
            pathname="/gift-backets"
          />
          <p>{presentSets.data.length} товара</p>
        </div>
        <div className={styles.products}>
          {isDesktopScreen && (
            <Categories
              classNameWrapper={styles.leftSide}
              arrSubCategories={categories}
              router={router}
              pathname="/gift-backets"
            />
          )}
          <div className={styles.rightSide}>
            <div className={styles.controllersWrapper}>
              <Filter
                classNameWrapper={styles.filterWrapper}
                title="Повод для подарка"
                arrSelects={filters[2].tags}
                categoryName="tags"
                router={router}
                id="gift"
                pathname="/gift-backets"
                isGifts
              />
            </div>
            {isDesktopScreen && (
              <Sort router={router} pathname="/gift-backets" />
            )}
            <div className={styles.cards}>
              {presentSets.data.length > 0 ? (
                presentSets.data.map(item => (
                  <DynamicComponentWithNoSSRGiftProductCard
                    classNameWrapper={styles.card}
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <p className={styles.notFoundText}>Ничего не найдено</p>
              )}
            </div>
            {presentSets.data.length > 0 && (
              <div className={styles.addElements}>
                <Pagination
                  pageCount={presentSets.last_page}
                  currentPage={presentSets.current_page}
                  pathName="/gift-backets"
                />
                <Button
                  buttonType="button"
                  title="Показать ещё +25"
                  viewType="pagination"
                  disabled={
                    presentSets.current_page + 1 > presentSets.last_page
                  }
                  classNameWrapper={styles.showMoreButton}
                  onClick={() => {
                    dispatch(
                      getPresentSets(
                        {},
                        {
                          ...createBodyForRequestCatalog(
                            cookies.get('filters'),
                          ),
                          page: presentSets.current_page + 1 || 1,
                        },
                        true,
                      ),
                    );
                  }}
                />
              </div>
            )}
            <div className={styles.descBlock}>
              <h4>Чтобы оформить возврат, нужно сделать 3 шага:</h4>
              <p className={styles.descText}>
                Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был
                максимально приятным, и разработали максимально простую и
                удобную процедуру возврата.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default withResponse(GiftBackets);
