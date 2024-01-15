import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b5ec556c0d08a078245067f3ad7a45df';
    const _apiComicsLimit = 'limit=8';
    const _apiLimit = 'limit=9';
    const _baseOffset = 210
    
    // getResource = async (url) => {
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     }

    //     return await res.json();
    // }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getComicsList = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?${_apiComicsLimit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?${_apiLimit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        // if (res.data.results.length > 0) {
        //     return _transformCharacter(res.data.results[0]);
        // } else {
        //     return undefined;
        // }
        return _transformCharacter(res.data.results[0]);
    }

    // const _transformSingleComic = (comic) => {
    //     if (comic.images && comic.images[0] && comic.images[0].path) {
    //         return {
    //             id: comic.id,
    //             title: comic.title ? comic.title : 'NOT AVAILABLE',
    //             urlImage: comic.images[0].path + '.' + comic.images[0].extension,
    //             price: comic.prices[0].price ? `${comic.prices[0].price} $` : 'NOT AVAILABLE',
    //             description: comic.description ? comic.description : 'NOT AVAILABLE',
    //             pageCount: comic.pageCount ? comic.pageCount : 'NOT AVAILABLE',
    //             language: comic.textObjects.language ? comic.textObjects.language :  'NOT AVAILABLE'
    //         }
    //     } else {
    //         return {
    //             id: comic.id,
    //             title: comic.title ? comic.title : 'NOT AVAILABLE',
    //             urlImage: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
    //             price: comic.prices[0].price ? `${comic.prices[0].price} $` : 'NOT AVAILABLE',
    //             language: comic.textObjects.language ? comic.textObjects.language :  'NOT AVAILABLE',
    //             pageCount: comic.pageCount ? 'NOT AVAILABLE' : comic.pageCount,
    //             description: comic.description ? comic.description : 'NOT AVAILABLE',
    //         }
    //     }
    // }
    
    const _transformComics = (comic) => {
        if (comic.images && comic.images[0] && comic.images[0].path) {
            return {
                id: comic.id,
                title: comic.title ? comic.title : 'NOT AVAILABLE',
                urlImage: comic.images[0].path + '.' + comic.images[0].extension,
                price: comic.prices[0].price
            }
        } else {
            return {
                id: comic.id,
                title: comic.title ? comic.title : 'NOT AVAILABLE',
                urlImage: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
                price: comic.prices[0].price
            }
        }
       
    }
    
    const _transformCharacter = (char) => {
        if (char) {
            return {
                id: char.id,
                name: char.name,
                description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items,
                failure: false
            }
        } else {
            return {}
        }

    }

    // const _transformCharacterByName = (char) => {
    //     console.log(char);
    //     if (char === undefined) {
    //         return null
    //     } else {
    //         return {
    //             name: char.name
    //         }
    //     }
        
    // }

    return {loading, error, clearError, getAllCharacters, getCharacter, getComicsList, getComic, getCharacterByName}
    
} 

export default useMarvelService;