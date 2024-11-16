const express = require('express'); // Import Express
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const app = express();              // Initialize Express app

const port = process.env.PORT || 3000; // Use environment PORT or default to 3000
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/', require('./routes'));

app.use('/', require('./routes'));
// Start listening on the specified port



mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else(
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        })
    )
});

