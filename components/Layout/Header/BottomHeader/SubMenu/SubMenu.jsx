import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { cookies } from '../../../../../utils/getCookies';
import { parseText } from '../../../../../utils/helpers';
import { Overlay } from '../../../../Overlay/Overlay';
import styles from './SubMenu.scss';

export const SubMenu = ({
  content,
  setVisible,
  imageLink,
  setImageLink,
  parentSlug
}) => {
  return (
    <>
      <div className={styles.submenu} onMouseLeave={() => setVisible(false)}>
        <div className={styles.submenu_wrapper}>
          <ul className={styles.submenu_list}>
            {content.map(category => {
              return (
                <li
                  key={category.id}
                  className={styles.submenu_item}
                  onMouseEnter={() => setImageLink(category.image_link)}
                  onMouseLeave={() => setImageLink(null)}
                >
                  <Link href={`/products/${parentSlug}/${category.slug}`}>
                    <a className={styles.submenu_link}>
                      {parseText(cookies, category.name, category.name_ua)}
                      {category.subcategory.length > 0 && (
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLjg1NCA5LjY0M0w4LjM1NyA1LjE0OGEuNTA0LjUwNCAwIDEwLS43MTUuNzEzTDExLjc4MiAxMGwtNC4xNCA0LjEzOWEuNTA0LjUwNCAwIDEwLjcxNS43MTNsNC40OTctNC40OTVhLjUxLjUxIDAgMDAwLS43MTR6IiBmaWxsPSIjMjEyQjM2Ii8+PC9zdmc+" />
                      )}
                    </a>
                  </Link>
                  {category.subcategory.length > 0 && (
                    <ul className={styles.submenu_categories}>
                      {category.subcategory.map((subcategory, index) => {
                        if (index < 11) {
                          return (
                            <li
                              key={subcategory.id}
                              className={styles.submenu_categories_subitem}
                              onMouseEnter={() => {
                                setImageLink(subcategory.image_link);
                              }}
                              onMouseLeave={() => setImageLink(null)}
                            >
                              <Link
                                href={`/products/${parentSlug}/${category.slug}/${subcategory.slug}`}
                              >
                                <a
                                  className={styles.submenu_categories_sublink}
                                >
                                  {parseText(
                                    cookies,
                                    subcategory.name,
                                    subcategory.name_ua
                                  )}
                                </a>
                              </Link>
                            </li>
                          );
                        }
                      })}
                      <li
                        className={[
                          styles.submenu_categories_subitem,
                          styles.red
                        ].join(' ')}
                      >
                        {parseText(cookies, 'Все категории', 'Всі категорії')}
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
            <li className={styles.submenu_item}>
              <Link href={'/products'}>
                <a className={[styles.submenu_link, styles.red].join(' ')}>
                  {parseText(cookies, 'Все категории', 'Всі категорії')}
                </a>
              </Link>
            </li>
          </ul>
          <div className={styles.submenu_image}>
            {imageLink && (
              <img
                alt={parseText(
                  cookies,
                  'Изображение категории',
                  'Зображення категорії'
                )}
                src={imageLink}
              />
            )}
          </div>
        </div>
      </div>
      <Overlay></Overlay>
    </>
  );
};
