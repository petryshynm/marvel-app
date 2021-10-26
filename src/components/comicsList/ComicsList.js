import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import { useEffect, useState, useRef} from 'react/cjs/react.development';
import { Loader } from '../loader/loader';

const ComicsList = ({setComicsId}) => {
    const {loading,  getAllComics} = useMarvelService();
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
   
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) ended = true;
        setComics(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(charEnded => ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)


    }

    useEffect(()=>{
        onRequest(offset, true);
    },[])

    const renderComics = () =>{
        const items = comics.map((item, i) => {
            const {id,thumbnail, title, price} = item;
            let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail.endsWith('image_not_available.jpg')) imgStyle = {'objectFit' : 'contain'};
            return (
                <a href="#">
                    <li 
                        className="comics__item" 
                        key={id}
                        onClick={(e)=>{
                            setComicsId(i)
                            // focusOnItem(i)
                        }} 
                        onKeyPress={(e)=>{
                            if(e.key==' ' || e.key == 'Enter'){
                                setComicsId(i)
                                // focusOnItem(i)
                            }
                        }}>
                        <img src={thumbnail} style={imgStyle} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </li>
                </a>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    

    return (
        <div className="comics__list">
            {loading && !newItemLoading? <Loader/> : renderComics(comics)}
            <button 
            disabled={newItemLoading}
            className="button button__main button__long" 
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={()=>onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;