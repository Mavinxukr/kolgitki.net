import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
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
import { createBodyForRequestCatalog } from '../../../utils/helpers';
import styles from './BlogArticle.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const BlogArticle = ({ blogData }) => {
  const catalog = useSelector(dataCatalogProductsSelector);
  const isDataReceived = useSelector(isDataReceivedForCatalogProducts);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(router.query),
      ),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getCatalogProducts(
        {},
        createBodyForRequestCatalog(router.query),
      ),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs items={['Главная', 'Новости', `${router.query.slug}`]} />
        <div className={styles.infoWrapper}>
          <Recommendations classNameWrapper={styles.recommendationWrapper} />
          <div className={styles.mainInfo}>
            <Link href="/Blog">
              <a className={styles.linkBack}>Назад</a>
            </Link>
            <div className={styles.text}>
              <h2>{blogData.name}</h2>
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
                <p className={styles.date}>{blogData.created_at}</p>
              </div>
            </div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: blogData.text }}
            />
            {/* <DynamicComponentWithNoSSRSlider /> */}
            <div className={styles.player}>
              <ReactPlayer
                width="100%"
                height="100%"
                url={blogData.video}
                controls
              />
            </div>
            <p className={styles.descSeo}>
              Если реклама предназначена для того, чтобы он узнал, то необходимо
              много повторений. рекламодатели должны быть осторожны, потому что
              слишком много повторений может привести к усталости потребителей,
              и сообщение может упасть на «уши».
            </p>
            <Link href="/Blog">
              <a className={styles.linkBack}>Назад</a>
            </Link>
          </div>
        </div>
        <hr className={styles.line} />
        <Products
          products={catalog}
          classNameWrapper={styles.productsWrapper}
          pathname="/Blog/[bid]"
          router={router}
          action={getCatalogProducts}
        />
      </div>
    </MainLayout>
  );
};

BlogArticle.propTypes = {
  blogData: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    created_at: PropTypes.string,
    video: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default BlogArticle;
