require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://sgray54:rufus2012@cluster0.bwj7u.mongodb.net/tripmaster?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connect to DB'));


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('./public'));


const uR = require('./routes/UserRoutes');
const tR = require('./routes/TripRoutes');
app.use('/users', uR);
app.use('/trips', tR);


app.listen(PORT, () => {
    console.log("Starting Server on Port " + PORT)
});