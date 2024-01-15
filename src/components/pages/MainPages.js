import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchingByName from "../searchingByName/SearchingByName";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharLoaded = (id) => {
        setChar(id);
    }

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">                            
                    <ErrorBoundary>
                        <CharList onCharLoaded={onCharLoaded}/>
                    </ErrorBoundary>
                    <div>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <SearchingByName/>
                        </ErrorBoundary>
                    </div>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </ErrorBoundary>
        </>
    )
}

export default MainPage