const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')


const app = express();
app.use(express.json());

//db config
const db = config.get('mongoURI');

//cors
app.use(cors({ origin: true, credentials: true }));


//connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

//use Route
app.use('/api/students', require('./routes/api/students'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));