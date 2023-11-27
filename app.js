const express = require("express");
const productRouter = require('./backend/routes/product')
const brandRouter = require('./backend/routes/brand')
const categoryRouter = require('./backend/routes/category')
const ingredientRouter = require('./backend/routes/ingredient')
const bodyParser = require("body-parser");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(express.static("frontend"));
app.use('/products', productRouter);
app.use('/brands', brandRouter);
app.use('/ingredients', ingredientRouter);
app.use('/categories', categoryRouter);

app.listen(3000, () => {
    console.log("App is listening on port 3000.")
})