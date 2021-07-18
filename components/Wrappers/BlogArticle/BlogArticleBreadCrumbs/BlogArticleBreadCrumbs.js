import React from 'react'
import BreadCrumbs from '../../../Layout/BreadCrumbs/BreadCrumbs'

export const BlogArticleBreadCrumbs = ({blogName}) => {

    return  <BreadCrumbs  routerName="Blog" items={[
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
            ...blogName
          },
        ]}/>
}
