import React from 'react';
import { replaceNoveltyFilters } from '../../components/Wrappers/NoveltyPage/helpers';
import NoveltyPage from '../../components/Wrappers/NoveltyPage/NoveltyPage';
import { getAllCategories } from '../../services/home';
import { getNovelty, getNoveltyFilters } from '../../services/novelty';
import { buildFiltersBySlug, replaceFilter } from '../../utils/products';

export default NoveltyPage;

NoveltyPage.getInitialProps = async ({query}) => {
    const noveltyFilters = await getNoveltyFilters();
    // const responseAllCategories = await  getAllCategories({})

    let allFilters = replaceFilter(noveltyFilters)

    allFilters.materials = allFilters.attributes[0].value;
    allFilters.density = allFilters.attributes[1].value;
    delete allFilters.attributes

    const filters = { ...query };

    
    const usedFilters = buildFiltersBySlug(filters, allFilters)

    const otherFilters = {...filters}
    delete otherFilters.colors;
    delete otherFilters.sizes;
    delete otherFilters.brands;
    delete otherFilters.density;
    delete otherFilters.materials;

    let filtersForRequest = replaceNoveltyFilters(usedFilters)

    const novelty = await getNovelty({}, {
        ...filtersForRequest,
        ...otherFilters
    });



    return {
        novelty: novelty.data,
        noveltyFilters,
        usedFilters,
        categoryData: null,
        otherFilters,
        // allCategories: responseAllCategories.data
    }; 
};
