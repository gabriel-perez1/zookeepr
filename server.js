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

app.get('/api/animals', (req, res) => {
	let results = animals;
	if (req.query) {
		results = filterByQuery(req.query, results); // req.query is multifaceted
	}
	res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals); // req.param is specific to a single property
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/animals', (req, res) => {
  // req.body is where incoming content will be
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is invalid, send 400 back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted');
  } else {
  // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

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

