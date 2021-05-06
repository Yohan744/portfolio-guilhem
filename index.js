const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const axios = require('axios')
const cors = require('cors')

app.use(cors())

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.use(express.static('public'))
http.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

// -- ExpressJS -- //
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const requestShots = async (key,link) => {
    const response = await axios.get(`https://api.dribbble.com/v2/user/shots?access_token=${key}`)
    try {
        app.get(link, (req,res) => {
            res.send(response.data)
        })
    } catch (err) {
        console.log(err)
    }
}

const requestUser = async (key,link) => {
    const response = await axios.get(`https://api.dribbble.com/v2/user/?access_token=${key}`)
    try {
        app.get(link, (req,res) => {
            res.send(response.data)
        })
    } catch (err) {
        console.log(err)
    }
}

requestShots(process.env.API_KEY_GUILHEM,"/getProjectGuilhem")
requestUser(process.env.API_KEY_GUILHEM,"/getUser")


