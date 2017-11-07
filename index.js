import app from "./app"

const cookieParser = require("cookie-parser")
const _ = require("underscore")
const port = process.env.PORT || 8080;

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


app.listen(port, () => console.log(`App listening on port ${port}!`))
// app.use(express.json())

app.use(cookieParser());
app.get("/", (req, res)=>{
    console.log("Cookies: ", req.cookies)
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
