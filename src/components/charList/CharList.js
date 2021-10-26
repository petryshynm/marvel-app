import './charList.scss';
import { useEffect ,useState, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Loader } from '../loader/loader';

const CharList = ({setCharId}) => {
    const {loading,  getAllCharacters} = useMarvelService();
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const itemRefs = useRef([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const focusOnItem = (id) =>{
        itemRefs.current.forEach(item=>item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
   
    const renderChars = () =>{
        return chars.map((char,i)=>{
            const {id,thumbnail, name} = char;
            let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail.endsWith('image_not_available.jpg')) imgStyle = {'objectFit' : 'fill'};
            return <li 
            onClick={(e)=>{
                setCharId(id)
                focusOnItem(i)
            }} 
            onKeyPress={(e)=>{
                if(e.key==' ' || e.key == 'Enter'){
                    setCharId(id)
                    focusOnItem(i)
                }
            }}
            key={id} 
            className="char__item"
            ref={(el)=>itemRefs.current[i]=el}>
                <img src={thumbnail} style={imgStyle} alt="Character"/>
                <div className="char__name">{name}</div>
            </li>
        })
    }
    
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setChars(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    useEffect(()=>{
        onRequest(offset, true);
    },[])

    return (
        <div className="char__list">
            {loading && !newItemLoading? <Loader/> : 
                <ul className="char__grid">
                    {renderChars(chars)}
                </ul>
            }
            <button 
                disabled={newItemLoading}
                className="button button__main button__long" 
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={()=>onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;