import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])
    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
                .then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// import useMarvelService from "../../services/MarvelService";
// import Spinner from "../spinner/Spinner";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Skeleton from "../skeleton/Skeleton";
// import AppBanner from "../appBanner/AppBanner";

// const SinglePage = ({Component, dataType}) => {
//     const {id} = useParams();
//     const [data, setData] = useState(null);
//     const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

//     useEffect(() => {
//         updateData()
//     }, [id])
//     console.log(id);
//     const updateData = () => {
//         clearError();

//         switch (dataType) {
//             case 'comic':
//                 getComic(id).then(onDataLoaded);
//                 break;
//             case 'character':
//                 getCharacter(id).then(onDataLoaded);
//         }
//     }

//     const onDataLoaded = (data) => {
//         setData(data);
//     }

//     const skeleton = data || loading || error ? null : <Skeleton/>;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading ? <Spinner/> : null;
//     const content = !(loading || error || !data) ? <Component data={data}/> : null;

//     return (
//         <>
//             <AppBanner/>
//             {skeleton}
//             {errorMessage}
//             {spinner}
//             {content}
//         </>
//     )
// }

// export default SinglePage;