import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

import './SingleChar.scss';

const SingleChar = (props) => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();  

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            
            <AppBanner/>
            <div className="single-char">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        </> 
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;
    console.log(name, description, thumbnail);
    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content={`${name}`}
                />
                <title>{name}</title>
            </Helmet>    
            <img className="single-char__img" src={thumbnail} alt={name}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </>
    )
}

export default SingleChar;