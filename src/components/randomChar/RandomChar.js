import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import React, {useState, useEffect} from 'react';
import MarvelService from '../../services/MarvelService';
const RandomChar = () => {
    const m = new MarvelService();
    const randId = Math.floor(Math.random()*(1011400-1011000)+1011000);
    const [charData, setChar] = useState({});
    const [charId, setId] = useState(randId);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true)
        m.getCharacter(charId)
            .then(char =>{
                setChar(char);
                setLoading(false);
            })
    }, [charId])

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                {loading ? <div>Loading</div> : 
                    <>
                        <img src={charData.thumbnail} alt="Random character" className="randomchar__img"/>
                        <div className="randomchar__info">
                            <p className="randomchar__name">{charData.name}</p>
                            <p className="randomchar__descr">
                                {charData.description}
                            </p>
                            <div className="randomchar__btns">
                                <a href={charData.homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={charData.wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={()=>setId(randId)}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;