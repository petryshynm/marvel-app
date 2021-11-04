import './SingleComic.scss';
import { useState,  useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader } from '../loader/loader';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

const SingleComic = () => {
    const {id} = useParams();
    const [comic, setComic] = useState();
    const {loading, getComics} = useMarvelService();
    
    useEffect(() => {
        getComics(id)
            .then(data => setComic(data))
            .catch(data => console.log(data))
        
    }, [id]);

    if(loading) return <Loader/>
    return (
        <>
            <AppBanner/>
            {comic ? <View comic={comic}/> : <Error/>} 
        </>
    )
}

const Error = () => {
    return (
        <>
            <p style={{"textAlign": 'center', 'fontSize': '24px', 'marginTop': '30px', 'fontWeight': 'bold'}}>There`s any comic</p>
            <Link to="/comics" className="single-comic__back">Back to all</Link>

        </>
    )
}

const View = ({comic}) => {

    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;