import React, { useCallback, useState, useEffect } from 'react';
import BlogCardSimple from '../BlogCardSimple/BlogCardSimple';
import SpecialBlogCard from '../SpecialBlogCard/SpecialBlogCard';
import styles from './BlogCard.scss';

export const toggleBlogCard = () => {
  const [blogStyles, setBlogStyles] = useState([styles.cardWrapper]);

  const removeShow = useCallback(() => {
    setBlogStyles(prev => prev.filter(item => item !== styles.show));
  }, []);

  const addShow = useCallback(() => {
    setBlogStyles(prev => [...prev, styles.show]);
  }, []);

  return {
    blogStyles,
    removeShow,
    addShow
  };
};

export const BlogCard = ({ blog }) => {
  const { blogStyles, removeShow, addShow } = toggleBlogCard();

  return (
    <div
      className={blogStyles.join(' ')}
      onMouseOut={removeShow}
      onMouseOver={addShow}
    >
      <BlogCardSimple item={blog} />
      <SpecialBlogCard item={blog} />
    </div>
  );
};
