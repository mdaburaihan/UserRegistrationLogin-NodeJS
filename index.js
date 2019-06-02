const config = require('config');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log("FATL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err =>  console.error('Could Not Connect to MongoDB...',err));
 mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port,  () => console.log(`Listening to port ${port}...`));