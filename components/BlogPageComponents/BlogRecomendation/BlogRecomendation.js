import React from 'react';
import { data } from "./data";
import Styles from './BlogRecomendation.module.scss';

const BlogRecomendation = () => (
  <aside className={Styles.BlogRecomendation}>
    <h2 className={Styles.BlogRecomendation__Title}>Рекомендации</h2>
    <div className={Styles.BlogRecomendation__Cards}>
      {
        data.map(item => (
          <article className={Styles.BlogRecomendation__Card} key={item.id}>
            <h2 className={Styles.BlogRecomendation__CardTitle}>{item.name}</h2>
            <button className={`${Styles.BlogRecomendation__CardButton} ${Styles.BlogRecomendation__CardButtonBlue}`} type="button">#Новости</button>
            <button className={`${Styles.BlogRecomendation__CardButton} ${Styles.BlogRecomendation__CardButtonRed}`} type="button">#Статьи</button>
          </article>
        ))
      }
    </div>
  </aside>
);

export default BlogRecomendation;
