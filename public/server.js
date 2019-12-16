var mongoose = require('mongoose');
var databaseURL = 'mongodb+srv://ask:mwdb123@assignment13-wlc5h.mongodb.net/test?retryWrites=true&w=majority';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//MongoDB Connection
mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    "use strict";
    console.log("Connected to MongoDB ", err)
});

var Product = mongoose.model('product', {
    "id": Number,
    "product": {
        "productid": Number,
        "category": String,
        "price": Number,
        "name": String,
        "inStock": Boolean
    }
});

//API to fetch products
app.get('/product/get/', (req, res) => {
    "use strict";
    Product.find({}, (err, products) => {
        var productList = {};
        products.forEach((productItem) => {productList[productItem.id] = productItem;})
        res.send(productList)
    })
})

//API to create a product
app.post('/product/create', (req, res) => {
    "use strict";
    var currentProduct = new Product(req.body);
    currentProduct.save((err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

//API to update a product
app.post('/product/update/:id', (req, res) => {
    "use strict";
    Product.updateOne(req.params, req.body, (err, data) => {
        res.redirect('/product/get');
    });
});

//API to delete a product
app.get('/product/delete/:id', (req, res) => {
    "use strict";
    Product.deleteOne(req.params, (err, data) => {
        res.redirect('/product/get');});
});

//Running the server on port 4000
var serverConnection = app.listen(4000, () => {
    "use strict";
    console.log('Server is using the port : ', serverConnection.address().port);
});

