const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://chollid:chollid@cluster0.v6enn.mongodb.net/QuoteSimulator?retryWrites=true&w=majority'

app.listen(3000, function() {
    console.log("listening on 3000")
})

app.use(bodyParser.urlencoded({ extended: true}))

// My GET function - sends html to browser
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')``
})

// Myh POST function - posts data to DB
app.post('/quotes', (req, res) => {
    console.log(req.body)
})

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    console.log("Connected to DataBase")
})
