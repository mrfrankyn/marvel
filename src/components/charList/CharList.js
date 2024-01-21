// import { Component } from 'react/cjs/react.production.min';

import { useState, useRef, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newLoading) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
            break;
        case 'loading':
            return newLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

/*с использованием class*/
// class CharList extends Component {

//     state = {
//         charList: [],
//         loading: true,
//         error: false,
//         offset: 210,
//         newLoading: false,
//         charEnded: false
//     }
    
//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.onLoadMore();
//     }

//     onCharListLoaded = (newCharList) => {
//         /*Проверка если персонажи закончились*/
//         let ended = false;
//         if (newCharList.length < 9) {
//             ended = true;
//         }
        
//         /*offset и charList берется из state*/
//         this.setState(({offset, charList}) => ({
//             charList: [...charList, ...newCharList],
//             loading: false,
//             newLoading: false,
//             offset: offset + 9,
//             charEnded: ended
//         }))
//     }

//     onNewCharListLoading = () => {
//         this.setState({
//             newLoading: true
//         })
//     }

//     onLoadMore = (offset) => {
//         this.onNewCharListLoading();
//         this.marvelService.getAllCharacters(offset)
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }

//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false
//         })
//     }

//     // Этот метод создан для оптимизации, 
//     // чтобы не помещать такую конструкцию в метод render
//     renderItems(arr) {
//         const items =  arr.map((item) => {
//             let imgStyle = {'objectFit' : 'cover'};
//             if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                 imgStyle = {'objectFit' : 'unset'};
//             }
            
//             return (
//                 <li 
//                     className="char__item"
//                     key={item.id} onClick={() => this.props.onCharLoaded(item.id)}>
//                         <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
//                         <div className="char__name">{item.name}</div>
//                 </li>
//             )
//         });
//         // А эта конструкция вынесена для центровки спиннера/ошибки
//         return (
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }


//     render() {
//         const {charList, loading, error, newLoading, offset, charEnded} = this.state;
        
//         const items = this.renderItems(charList);

//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;
//         return (
//             <div className="char__list">
//                 <ul className="char__grid">
//                     {errorMessage}
//                     {spinner}
//                     {content}
//                 </ul>
//                 <button 
//                     onClick={() => this.onLoadMore(offset)} 
//                     className="button button__main button__long" 
//                     disabled={newLoading}
//                     style={{"display": charEnded ? 'none' : 'block'}}>
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         )
//     } 
// }
/*с использованием class*/

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newLoading, setNewLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onLoadMore(offset, true);
    }, [])
    /*запускается после рендеринга*/

    const onLoadMore = (offset, initial) => {
        initial ? setNewLoading(false) : setNewLoading(true);
        // setNewLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    // const onNewCharListLoading = () => {
    //     setNewLoading(true);
    // }

    const onCharListLoaded = (newCharList) => {
        /*Проверка если персонажи закончились*/
        let ended = false;
        if (newCharList.length < 9) { 
            ended = true;
        }
        
        /*offset и charList берется из state*/
        setCharList(charList => [...charList, ...newCharList]);
        // setLoading(false);
        setNewLoading(newLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(setCharEnded => ended);
    }

    // const onError = () => {
    //     setError(true);
    //     setLoading(false);
    // }

    const itemRefs = useRef([]);

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset '};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id} 
                    onClick={() => {
                        props.onCharLoaded(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    // const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(charList), newLoading)}
            <button 
                onClick={() => onLoadMore(offset)} 
                className="button button__main button__long" 
                disabled={newLoading}
                style={{"display": charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

// CharList.propsTypes = {
//     onCharSelected: PropTypes.func.isRequired
// }

export default CharList;