const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()


//Update environment variables
// require('./dotenv')

const connectionString = 'mongodb+srv://chollid:chollid@cluster0.v6enn.mongodb.net/QuoteSimulator?retryWrites=true&w=majority'




MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client=> {
    console.log("Connected to Database")
    const db = client.db('quotes-simulator')
    const quotesCollection = db.collection('quotes')


    //===============================
    // Middlewares
    //==============================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json()) // Teaches server to accept JSON
    app.use(express.static('public'))
    // app.use(express.json())


    //===============================
    // Routes
    //===============================

    // My GET function - sends html to browser
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(quotes => {
            // Pass quotes into the Express' render method
            res.render('index.ejs', { quotes: quotes })
        })
        .catch(error => console.log(error))
        // res.sendFile(__dirname + '/index.html')
        // res.render('index.ejs', {})
        // res.render(views, local)
    })

    // My POST function - posts data to DB
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        // console.log(req.body)
        quotesCollection.findOneAndUpdate(
            { name: 'Steve Jobs' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                },
            },
            {
                upsert: true
            }
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    //==============================
    // Listen
    //=============================
    app.listen(3000, function() {
        console.log("listening on 3000")
    })
})
.catch(error => console.log(error))
