// async and await er kaj 2 tar je kono ekta dia korle hobe
// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = ` https://api.lyrics.ovh/suggest/${searchText}`

//     // load data 
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);

// }


// .then dia kaj 
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`

    // load data 
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something Went Wrong, please try again later'));
}


const displaySongs = songs => {
    const songContainer = document.getElementById('song-Container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
         <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}">
        </audio>
        </div>
         <div class="col-md-3 text-md-right text-center">
         <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);

    });
}
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later');
    }


}

// .then dia kaj r sob thik thakbe 

// const getLyric  = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
// fetch(url)
// .then(res => res.json())
// .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}
// etar kaj ta upore 
const displayError = error => {
    const errorTag = document.getElementById('error-massage');
    errorTag.innerText = error;
}