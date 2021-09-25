import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from '../../services/MarvelService';
import decoration from '../../resources/img/vision.png';
import { useEffect } from "react";

const App = () => {
    const m = new MarvelService();
    useEffect(()=>{
        m.getAllCharacters()
    })
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;