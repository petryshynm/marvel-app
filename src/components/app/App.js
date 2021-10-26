import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from '../../services/MarvelService';
import decoration from '../../resources/img/vision.png';
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
    const [charInfoId, setCharId] = useState(null);
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <RandomChar/>
                <div className="char__content">
                    <CharList setCharId={setCharId}/>
                    <CharInfo charInfoId={charInfoId}/>
                </div> */}
                <AppBanner/>
                <ComicsList />
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;