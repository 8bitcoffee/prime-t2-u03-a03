const express = require('express'); // importing express package

const artistListArray = require('./modules/artist.js'); // importing from modules folder
const songListArray = require('./modules/song.js'); // importing from modules folder

const app = express(); // creating app
const PORT = 5001; // defining port


app.use(express.json()); // for POST requests 

app.use(express.static('server/public')); // limiting access

// GET for artists
app.get('/artist', (req, res) => {
    res.send(artistListArray);
});

// TODO - Add GET for songs

// GET for songs
app.get('/song', (req,res) => {
    res.send(songListArray);
})

// POST for artists via the form
app.post('/artist', (req,res) => {
    console.log(req.body);
    artistListArray.push(req.body);
    res.sendStatus(201);
})

// POST for songs via the form
app.post('/song', (req,res) => {
    console.log(req.body);
    songListArray.push(req.body);
    res.sendStatus(201);
})

// Starting node
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
