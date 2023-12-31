const express = require('express');
const router = express.Router();
const knex = require('../database-conection/db')

router.get('/', (req, res) => {
    knex.select("*")
        .from("product")
        .then((products) => {
            return res.status(200).json(products);
        }).catch(error => {
        res.status(500).json(error);
    })
})
router.post('/', (req, res) => {
    const {alias, title, brand_id, category_id} = req.body;
    knex("product")
        .insert({
            alias: alias,
            title: title,
            brand_id: brand_id,
            category_id: category_id,
        })
        .returning("id")
        .then(product => {
            res.status(201).json(product);
        }).catch(error => {
        res.status(500).json(error);
    })
})
/*  UPDATE  */
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
            if(!product)
                res.status(404).json({
                    error: "Resource not found."
                })
            res.status(204).send();
            //res.status(200).json(product);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    knex("products")
        .where({
            id: productId
        })
        .del(
            ["id", "title"]
        )
        .then(delProduct => {
            if(!delProduct)
                res.status(404).json({
                    error: "Resource not found."
                })
            res.status(200).json(delProduct);
            //res.status(204).send();
        })
        .catch(error => {
            res.status(500).json(error);
        })
})
module.exports = router;