import React from 'react';
import { replaceNoveltyFilters } from '../../components/Wrappers/NoveltyPage/helpers';
import NoveltyPage from '../../components/Wrappers/NoveltyPage/NoveltyPage';
import { getCategoryBySlug } from '../../services/home';
import { getNovelty, getNoveltyFilters } from '../../services/novelty';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

export default NoveltyPage;

NoveltyPage.getInitialProps = async ({query, res}) => {
    const noveltyFilters = await getNoveltyFilters();

    console.log('[...slug]');

    let allFilters = replaceFilter(noveltyFilters)

    allFilters.materials = allFilters.attributes[0].value;
    allFilters.density = allFilters.attributes[1].value;
    delete allFilters.attributes

    const filters = { ...query };

    let category = null;

    if(query.hasOwnProperty('slug')){
        const requestCategories = await getCategoryBySlug(filters.slug[filters.slug.length - 1]);
        category = await requestCategories.data;
        delete filters.slug;
    }

    const usedFilters = buildFiltersBySlug(filters, allFilters)

    const otherFilters = {...filters}
    delete otherFilters.colors;
    delete otherFilters.sizes;
    delete otherFilters.brands;
    delete otherFilters.density;
    delete otherFilters.materials;

    let filtersForRequest = replaceNoveltyFilters(usedFilters)
    if(category){
        filtersForRequest.categories = JSON.stringify([category.id])
    }
 
    const novelty = await getNovelty({}, {
        ...filtersForRequest,
        ...otherFilters
    });

    return {
        novelty: novelty.data,
        noveltyFilters,
        usedFilters,
        categoryData: category,
        otherFilters,
    }; 
};
