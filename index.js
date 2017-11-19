import app from "./app"

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require("underscore");
const expressQSParser = require('express-qs-parser');
const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cookieParser());

let qsParserMiddleware = expressQSParser({
    params: {
        filters: /([\w-_]+)(\>|<|\=|\!=)([\w_-]+)/g,
        order: /(-?)([\w\s]+)/
    },
    storage: 'parsedQuery'
});
app.use(qsParserMiddleware);

let products = [
    {
        id: 1,
        review: "norm"
    },
    {
        id: 2,
        review: "good"
    },
    {
        id: 3,
        review: "bad"
    },
    {
        id: 4,
        review: "norm"
    }
]

let users = {
    "user1": {
        password: "123",
        username: "elUser",
        email: "elEmail"
    },
    "user2": {
        password: "456",
        username: "elOtroUser",
        email: "elOtroEmail"
    },
    "user3": {
        password: "789",
        username: "aquelUser",
        email: "aquelEmail"
    }
}


app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get("/", (req, res)=>{
    console.log("Cookies: ", req.cookies)
    res.status(200).json(req.parsedQuery);
})

app.get('/api/products', (req, res)=>{

    res.json(products)
})

app.get('/api/products/:id', (req, res)=>{

    const product = _.find(products, (element)=> {

        return element.id == req.params.id;
    });

    if(product === undefined){
        res.status(404)
            .json({message: "Product not found"})
    }

    res.json(product)
})

app.get('/api/products/:id/reviews', (req, res)=>{

    const product = _.find(products, (element)=> {

        return element.id == req.params.id;
    });

    if(product === undefined){
        res.status(404)
            .json({message: "Review not found"})
    }

    res.json({"review": product.review})
})

app.post('/api/products', (req, res)=>{
    let product = req.body;
    data.push(product)
    res.status(204).send()

    res.json({ok: true})
})

app.post('/auth', (req, res)=>{
    let user = req.body;

    if(users[user.name].password === user.password){

        res.status(200).json(
            {
                "code": 200,
                "message": "OK",
                "data":{
                    "user": {
                        "email": users[user.name].username,
                        "username": users[user.name].email
                    }
                },
                "token": jwt.sign(user, '123456', { expiresIn: 60 * 60 })
            }
        ).send()
    }
    else{
        res.status(404).json({
            "code": 404,
            "message": "Not found",
            "data": {}
        }).send()
    }
})
