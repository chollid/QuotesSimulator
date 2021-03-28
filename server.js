const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://chollid:chollid@cluster0.v6enn.mongodb.net/QuoteSimulator?retryWrites=true&w=majority'

app.set('view-engine', 'ejs')
// app.set("views", "views")


MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client=> {
    const db = client.db('quotes-simulator')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(express.static('public'))
    // app.use(express.json())

    // My GET function - sends html to browser
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
        .then(results => {
            // Pass quotes into the Express' render method
            res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.log(error))
        res.sendFile(__dirname + '/index.html')
        res.render('index.ejs', {})
        res.render(views, local)
    })
    // My POST function - posts data to DB
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.listen(3000, function() {
        console.log("listening on 3000")
    })
})
.catch(error => console.log(error))
