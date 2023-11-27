const express = require('express');
const router = express.Router();
const knex = require('../database-conection/db')
const {del} = require("express/lib/application");

/*  GET ALL  */
router.get('/', (req, res) => {
    knex.select("*")
        .from("ingredient")
        .then((ingredients) => {
            return res.status(200).json(ingredients);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})

/*  POST  */
router.post('/',  (req, res) => {
    const {alias, title, brand_id, category_id} = req.body;
    knex("ingredient")
        .insert({
            alias: alias,
            title: title,
            brand_id: brand_id,
            category_id: category_id,
        })
        .returning("id")
        .then(ingredient => {
            res.status(201).json(ingredient);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  UPDATE BY ID  */
router.put('/:id', async (req, res) => {
    const ingredientId = parseInt(req.params.id);
    const {alias, title, brand_id, category_id} = req.body;
    try {
        const exists = await knex("ingredient").where({id: ingredientId}).first();
        if (!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            const ingredient = await knex("ingredient").where({id: ingredientId})
                .update({
                    alias: alias,
                    title: title,
                    brand_id: brand_id,
                    category_id: category_id,
                })
            res.status(201).send();
            //res.status(200).json(ingredient);
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }

})
/*  DELETE BY ID  */
router.delete('/:id', async (req, res) => {
    const ingredientId = parseInt(req.params.id);
    try{
        const exists = await knex("ingredient").where({id: ingredientId}).first();
        if(!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            knex("ingredient")
                .where({id: ingredientId})
                .del(["id", "title"])
                .then(delIngredient => {
                    res.status(200).json(delIngredient)
                })
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
})
module.exports = router;