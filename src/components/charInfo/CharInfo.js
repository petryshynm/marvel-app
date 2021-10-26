import './charInfo.scss';
import { useState, useEffect} from 'react';
import { Loader } from '../loader/loader';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({charInfoId}) => {
    const {loading,  getCharacter} = useMarvelService();
    const [charInfo, setCharInfo] = useState(null);


    useEffect(()=>{
        if(charInfoId){
            getCharacter(charInfoId)
                .then((data)=>{
                    setCharInfo(data)
                })
        }
    }, [charInfoId])

    const renderInfo = () => {
        const {thumbnail, name, homepage, wiki, description,comics} = charInfo;
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail.endsWith('image_not_available.jpg')) imgStyle = {'objectFit' : 'fill'};
        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} style={imgStyle} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}    
                </div>
                {comics.length ? <div className="char__comics">Comics:</div> : null}  
                <ul className="char__comics-list">
                    {comics.map((item,i)=><li key={i} className="char__comics-item">{item.name}</li>)}
                </ul>
            </>
        )
    }
    const loader = loading ? <Loader/> : null;
    const skeleton = !(charInfo || loading) ? <Skeleton/> : null;
    const char = !loading && !skeleton ? renderInfo() : null;

    return (
        <div className="char__info">
            {skeleton}
            {loader}
            {char}
        </div>
    )
}

export default CharInfo;