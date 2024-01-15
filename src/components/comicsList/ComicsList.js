import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newLoading, setNewLoading] = useState(false);
    const {loading, error, getComicsList} = useMarvelService();
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        onLoadMore(offset, true);
        // getComicsList().then(onComicsLoaded);
    }, [])

    const onLoadMore = (offset, initial) => {
        initial ? setNewLoading(false) : setNewLoading(true);
        getComicsList(offset).then(onComicsLoaded);
    }
    
    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) { 
            ended = true;
        }
        
        setComicList(comicsList => [...comicsList, ...newComicsList]);
        setNewLoading(newLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(setCharEnded => ended);
        // setComicList(comicsList);
        // renderItems(comicsList);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            // let imgStyle = {'objectFit' : 'cover'};
            // if (item.urlImage === 'undefined') {
            //     item.urlImage === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            //     imgStyle = {'objectFit' : 'unset '};
            // }
            return (
                <li 
                    className="comics__item"
                    key={i}
                    tabIndex={0}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.urlImage} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}$</div>
                        </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
            
        )
    }

    const itemsList = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newLoading ? <Spinner/> : null;
    return (
        <>
            <Helmet>
                    <meta
                        name="description"
                        content="Page with list of our comics"
                    />
                    <title>Comics page</title>
            </Helmet>
            <div className="comics__list">
                {errorMessage}
                {spinner}
                {itemsList}
                <button className="button button__main button__long"
                    onClick={() => onLoadMore(offset)}
                    disabled={newLoading}
                    style={{"display": charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        </>
            
    )
}

export default ComicsList;