// A very simple server for production version of the app.
const express = require('express');
const path = require('path');

const app = express();

console.log(__dirname);

app.use(express.static(path.join(__dirname, 'build')));

app.listen(4444);

// TODOs: fix clicking text on arxiv subjects
// fix images for twitter map, firefox
// search field reappears when adding collaborators
// vertically center text in key for author connections
// make down arrows smaller
