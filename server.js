const fs = require('fs');
const path = require ('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// wildcard. any route that isn't defined will recieve this response
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
	console.log(`API server on port ${PORT}`);
});

