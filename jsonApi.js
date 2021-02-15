const { response } = require('express');
const express = require('express');
const ExpressError = require('./expressError')

const app = express();

app.use(express.json());

const CANDIES = [
    {name: 'snickers', qty: 43, price: 1.50},
    {name: 'skittles', qty: 23, price: 0.99},
]

app.get('/candies', (req, res) => {
    res.json(CANDIES);
})

app.post('/candies', (req, res, next) => {
    try {
        if(req.body.name.toLowerCase() === "circus peanuts") {
            throw new ExpressError("Circus peanuts are gross, don't do that shit", 403)
        }
        
        CANDIES.push(req.body);
        res.status(201).json(CANDIES)
    } catch (e) {
        next(e)
    }
})

//default error, status 404 page cannot be found, needs to be before error handler below, but after all other routes
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})


//error handler to override express default errors 
app.use((error, req, res, next) => {
    //set default status to 500 or other status message
    let status = error.status || 500;
    let message = error.message;
    console.log(error.message);
    //set the status and alert the user
    res.status(error.status).json({error: {message, status}});
})

app.listen(3000, () => {
    console.log('App on port 3000');
})