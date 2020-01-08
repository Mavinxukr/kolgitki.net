import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';
import { data } from '../components/Wrappers/Brands/data';

const API_URL = `https://api.github.com/user/repos`;

export default async params => {
    const res = await fetch(API_URL);
    const serverData = await res.json();
    return data;
}
