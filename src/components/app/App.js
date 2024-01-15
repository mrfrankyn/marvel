// import { Component } from "react/cjs/react.production.min";
/*С использованием class*/
// import { useState } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PropTypes from 'prop-types';

import AppHeader from "../appHeader/AppHeader";
// import {ComicsPage, MainPage, Page404, SingleComic} from '../pages/index';
import CharInfo from "../charInfo/CharInfo";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPages'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../singleComic/SingleComic'));
const SingleChar = lazy(() => import('../SingleChar/SingleChar'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));

// class App extends Component {

//     state = {
//         selectedCharId: null
//     }

//     onCharLoaded = (id) => {
//         this.setState({selectedCharId : id})
//     }
    /*С использованием class*/    

const App = () => {

    // const [selectedChar, setChar] = useState(null);

    // const onCharLoaded = (id) => {
    //     setChar(id);
    // }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route exact path='/comics' element={<ComicsPage/>}/>
                            <Route exact path="/comics/:comicId" element={<SingleComic/>} />
                            <Route path="*" element={<Page404/>}/> 
                            <Route path="/characters/:charId" element={<SingleChar/>} />
                        </Routes>
                    </Suspense> 
                    {/* <ErrorBoundary>
                        <SingleComic/>
                    </ErrorBoundary> */}
                </main>
            </div>
        </Router>
    )

}

CharInfo.propTypes = {
    onCharLoaded: PropTypes.element.isRequired
}

export default App;