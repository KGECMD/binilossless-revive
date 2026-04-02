// HiFi API Manager for KGECMD/binilossless-revive

const axios = require('axios');

const APIs = [
    'https://monochrome-api.samidy.com',
    'https://api.monochrome.tf',
    'https://geeked.wtf',
    'https://hifi.geeked.wtf',
];

let cache = {};

const fetchFromApi = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching from API:', error);
        throw new Error('API request failed');
    }
};

const searchTracks = async (query) => {
    const cacheKey = `search_${query}`;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    for (const api of APIs) {
        try {
            const data = await fetchFromApi(`${api}/search?query=${query}`);
            cache[cacheKey] = data;
            return data;
        } catch (e) {
            continue;
        }
    }
    throw new Error('No results found');
};

const getTrack = async (trackId, quality = '3072kbps') => {
    const cacheKey = `track_${trackId}_${quality}`;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }
    for (const api of APIs) {
        try {
            const data = await fetchFromApi(`${api}/tracks/${trackId}?quality=${quality}`);
            cache[cacheKey] = data;
            return data;
        } catch (e) {
            continue;
        }
    }
    throw new Error('Track not found');
};

module.exports = { searchTracks, getTrack };