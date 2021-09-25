


class MarvelService{
    _apiPath = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = '43d79aef7bf47ccf622c7f460a8a2a82';
    _apiKey = 'c5d6fc8b83116d92ed468ce36bac6c62';
    getResource = async (url) => {
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Could not fetch ${url} , status: ${res.status}`)
        return await res.json();;
    }
    
    postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: data
        })
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = this.getResource(`${this._apiPath}characters?limit=9&offset=210&apikey=${this._apiKey}`);
        return res.data.results.map(this._transfromCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiPath}characters/${id}?apikey=${this._apiKey}`)
        return this._transfromCharacter(res.data.results[0]);
    }
    
    _transfromCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,208)}...` : 'There`s no information about it yet.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url

        }
    }
}

export default MarvelService;