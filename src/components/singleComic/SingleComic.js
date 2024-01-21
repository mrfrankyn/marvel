import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleComic.scss';

const setContent = (process, comic) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'confirmed': 
            return <View comic={comic}/>;
            break;
        case 'error':
            return <ErrorMessage/>
            break;
    }
}

const SingleComic = (props) => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null); 
    const {loading, error, getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId).then(onComicLoaded).then(() => setProcess('confirmed'));
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                {setContent(process, comic)}
            </div>
        </>
        
    )
}

    const View = ({comic}) => {
        const {title, description, page, price, language, urlImage} = comic;
        console.log(comic);
        return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title}`}
                />
                <title>{title}</title>
            </Helmet> 
            <img src={urlImage} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{page} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
        )

}

export default SingleComic;


// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

// import AppBanner from '../appBanner/AppBanner';
// import useMarvelService from '../../services/MarvelService';
// import Skeleton from '../skeleton/Skeleton';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Spinner from '../spinner/Spinner';
// import './singleComic.scss';


// const SingleComic = (props) => {

//     const {comicId} = useParams();
//     const [comic, setComic] = useState(null); 
//     const {loading, error, getComic, clearError} = useMarvelService();

//     useEffect(() => {
//         updateComic();
//     }, [comicId]);

//     const updateComic = () => {
//         clearError();
//         getComic(comicId).then(onComicLoaded);
//     }

//     const onComicLoaded = (comic) => {
//         setComic(comic);
//     }

//     const skeleton = comic || loading || error ? null : <Skeleton/>;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading ? <Spinner/> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

//     return (
//         <>
//             <AppBanner/>
//             <div className="single-comic">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         </>
        
//     )
// }

//     const View = ({comic}) => {
//         const {title, description, pageCount, price, language, urlImage} = comic;
    
//         return (
//         <>
//             <Helmet>
//                 <meta
//                     name="description"
//                     content={`${title}`}
//                 />
//                 <title>{title}</title>
//             </Helmet> 
//             <img src={urlImage} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount} pages</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </>
//         )

// }

// export default SingleComic;