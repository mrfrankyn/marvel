// import { Component } from 'react/cjs/react.production.min';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();
    
    // const marvelService = new MarvelService();
    
    useEffect(() => {
        updateChar();
    }, [props.charId])
    
    const updateChar = () => {
        const {charId} = props

        if (!charId) {
            return;
        }
        clearError();
        // onCharLoading();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            // указывать state в http.hook не нужно так как процесс асин
    }

    const onCharLoaded = (char) => {
        setChar(char);
        // setLoading(false);
    }

    // const onCharLoading = () => {
    //     setLoading(true);
    // }

    // const onError = () => {
    //     setLoading(false);
    //     setError(true);        
    // }

    
    // useEffect((prevProps, prevState) => {
    //     const [charId] = props;
        
    //     // updateChar();

    //     if(props.charId !== prevProps.charId) {
    //         updateChar();
    //     }
    // })

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

// class CharInfo extends Component {
    
//     state = {
//         char: null,
//         loading: false,
//         error: false
//     }
    
//     marvelService = new MarvelService();
    

//     componentDidMount() {
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if(this.props.charId !== prevProps.charId) {
//             this.updateChar();
//         }
//     }
    
//     updateChar = () => {
//         const {charId} = this.props

//         if (!charId) {
//             return;
//         }

//         this.onCharLoading();

//         this.marvelService.getCharacter(charId).then(this.onCharLoaded)
//         .catch(this.onError);
//     }

//     onCharLoaded = (char) => {
//         this.setState({
//             char,
//             loading:false
//         })
//     }

//     onCharLoading = () => {
//         this.setState({
//             loading: true
//         })
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true
//         })
//     }

//     render() {
//         const {char, loading, error} = this.state;
//         const skeleton = char ||loading || error ? null : <Skeleton/>;
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error || !char) ? <View char={char}/> : null; 
        
//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         )
//     } 
    
// }

const View = ({data}) => {
    const {name, thumbnail, description, wiki, homepage, comics} = data;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is not any comics for this character'}
                {comics.map((item, i) => {
                    if(i < 10) {
                        // eslint-disable-next-line
                        return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                        
                    }
                })}
            </ul>
        </>
    )
    
}

CharInfo.propTypes = {
    charId: PropTypes.number 
}


export default CharInfo;