import { Link } from 'react-router-dom';
import './SingleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <>  
            <img src={thumbnail} alt={name}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleCharacterLayout;