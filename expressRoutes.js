const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("HOMEPAGE!");
})

app.get('/dogs', (req, res) => {
    res.send("<h1>I am dog, WOOF WOOF!!</h1>");
})

app.post('/chickens', function createChicken(req, res) {
    res.send("YOU CREATED A NEW CHICKEN (not really) post request");
})

app.get('/chickens', (req, res) => {
    res.send("YOU CREATED A NEW CHICKEN BOK! BOK!(not really) get request");
})


const greetings = {
    en: "hello!",
    fr: "bonjour",
    ic: "hallo",
    js: "konnichiwa"
}

app.get("/greet/:language", (req, res) => {
    const lang = req.params.language;
    const greeting = greetings[lang];
    if (!greeting) {
        return res.send("invalid language!!")
    }
    return res.send(greeting);
})

app.get('/search' , (req, res) => {
    //set defaults like this, when a term or sort is entered, it will override it
    const {term='piggies', sort='top'} = req.query;
    return res.send(`Search Page! Term is: ${term}. Sort is: ${sort}`);
})

app.get('/show-me-headers', (req, res) => {
    res.send(req.headers);
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language'];
    res.send(`your language is: ${lang} `);
})

app.post('/register', (req, res) => {
    res.send(`Welcome, ${req.body.username}`);
})

app.listen(3000, () => {
    console.log('App on port 3000');
})