import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";


export const MainPage = () => {
    const [charInfoId, setCharId] = useState(null);

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList setCharId={setCharId}/>
                <CharInfo charInfoId={charInfoId}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}