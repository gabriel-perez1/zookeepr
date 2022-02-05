const fs = require('fs');
const path = require ('path');
const express = require('express');
const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// tells server to serve apiRoutes when client navigates to /api
app.use('/api', apiRoutes);
// tells server to serve back to html routes if / is the endpoint
app.use('/', htmlRoutes);

app.listen(PORT, () => {
	console.log(`API server on port ${PORT}`);
});

