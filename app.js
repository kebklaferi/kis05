const express = require("express");
const productRouter = require('./backend/routes/product')
const ingredientRouter = require('./backend/routes/category')
const categoryRouter = require('./backend/routes/ingredient')

const app = express();

//app.use(express.static("frontend"));
app.use('/products', productRouter);
app.use('/ingredients', productRouter);
app.use('/categories', productRouter);

app.listen(3000, () => {
    console.log("App is listening on port 3000.")
})