import React from 'react';
import Styles from './BlogBreadCrumbs.scss';

const BlogBreadCrumbs = () => (
  <div className={Styles.BreadCrumbs}>
    <a href="/" className={Styles.BlogBreadCrumbs__Link}>Главная</a> /
    <a href="/" className={Styles.BlogBreadCrumbs__Link}>Новости</a> /
    <a href="/" className={Styles.BlogBreadCrumbs__Link}>Post 025</a>
  </div>
);

export default BlogBreadCrumbs;
