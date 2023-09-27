console.log('script sourced');

getArtists();
getSongs();

function getArtists() {
    // Axios GET request
    axios.get('/artist').then((response) => {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        contentDiv.innerHTML = "";
        for(let artist of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); // ALWAYS add .catch
}
// TODO Add Axios request for /songs and display on DOM


/**
 * Gets song list from server via Axios and appends to DOM
 */
function getSongs() {
    // Getting song list from server
    axios.get('/song').then((response) => {
        console.log(response.data); // logging song list
        let songsFromServer = response.data; // assigning to variable for readability
        let songContent = document.querySelector('#songTableBody'); // <tbody> where song info is added
        songContent.innerHTML = ""; // Clearing <tbody> innerHTML to update
        for (let song of songsFromServer) {
            // adding <tr> for each song and <td> on header pattern
            songContent.innerHTML += `
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                </tr>
            `;
        }

    })
    .catch((error) => { // generic error catch
        console.error(error);
        alert("Something went wrong!");
    })
}

/**
 * Takes form values and sends them to the server. Server side will update
 * the data. Then calls getArtists() to clear and update DOM
 * @param {Object} event // event object from form onSubmit()
 */
function addArtist(event) {

    event.preventDefault(); // Preventing refresh

    let artistName = document.querySelector('#artist-name').value; // value from form
    document.querySelector('#artist-name').value = ""; // clearing form input
    let artistBirth = document.querySelector('#artist-birth').value; // value from form
    document.querySelector('#artist-birth').value  = ""; // clearing form input
    let artistDeath = document.querySelector('#artist-death').value; // value from form
    document.querySelector('#artist-death').value = ""; // clearing form input

    // Sending formatted object to server to be added to data
    axios.post('/artist', {
        name: artistName,
        born: artistBirth,
        died: artistDeath
    }).then((response) => {
        console.log("POST SUCCESSFUL");
        getArtists(); // Calling to update DOM
    })
}

/**
 * Takes form values and sends them to the server. Server side will update
 * the data. Then calls getSongs() to clear and update DOM
 * @param {Object} event // event object from form onSubmit()
 */
function addSong(event) {

    event.preventDefault(); // Preventing refresh

    let songName = document.querySelector('#song-name').value; // value from form
    document.querySelector('#song-name').value = ""; // clearing form input
    let songArtist = document.querySelector('#song-artist').value; // value from form
    document.querySelector('#song-artist').value  = ""; // clearing form input

    // Sending formatted object to server to be added to data
    axios.post('/song', {
        title: songName,
        artist: songArtist
    }).then((response) => {
        console.log("POST SUCCESSFUL");
        getSongs(); // Calling to update DOM
    })
}
