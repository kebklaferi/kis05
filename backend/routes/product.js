const express = require('express');
const router = express.Router();
const knex = require('../database-conection/db')

/*  GET ALL */
router.get('/', (req, res) => {
    knex.select("*")
        .from("product")
        .then((products) => {
            return res.status(200).json(products);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  POST  */
router.post('/', (req, res) => {
    console.log(req.body)
    const {alias, title, brand_id, category_id} = req.body;
    knex("product")
        .insert({
            alias: alias,
            title: title,
            brand_id: brand_id,
            category_id: category_id,
        })
        .then(product => {
            res.status(201).json(product);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  UPDATE BY ID */
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const {alias, title, brand_id, category_id} = req.body;
    knex("product")
        .where({
            id: productId
        })
        .update({
            alias: alias,
            title: title,
            brand_id: brand_id,
            category_id: category_id,
        })
        .then(product => {
            if (!product)
                res.status(404).json({
                    error: "Resource not found."
                })
            res.status(204).send();
            //res.status(200).json(product);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  DELETE BY ID  */
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    knex("product")
        .where({
            id: productId
        })
        .del()
        .then(delProduct => {
            if (!delProduct)
                res.status(404).json({
                    error: "Resource not found."
                })
            res.status(200).json({message: "Successfully deleted product resource with id " + delProduct + "."});
            //res.status(204).send();
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
module.exports = router;