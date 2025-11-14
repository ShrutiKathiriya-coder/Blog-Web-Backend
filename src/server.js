require('dotenv').config();
const express = require('express')
const morgan = require('morgan')

require("./config/db.config")

const PORT = process.env.PORT || 4000; 
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'))

app.use('/api',require('./routes/'))

app.listen(PORT, (err) => {
    if (err) {
        console.log("server is not connected");
        return false;

    }
    console.log("server is connected");

})