const express = require('express');
const router = express.Router();
const knex = require('../database-conection/db')

/*  GET ALL  */
router.get('/', (req, res) => {
    knex.select("*")
        .from("category")
        .then((categories) => {
            return res.status(200).json(categories);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})

/*  POST  */
router.post('/',  (req, res) => {
    const {alias, title} = req.body;
    knex("category")
        .insert({
            alias: alias,
            title: title,
        })
        .then(category => {
            res.status(201).json(category[0]);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  UPDATE BY ID */
router.put('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const {alias, title} = req.body;
    try {
        const exists = await knex("category").where({id: categoryId}).first();
        if (!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            const category = await knex("category").where({id: categoryId})
                .update({
                    alias: alias,
                    title: title,
                })
            res.status(204).send();
           // res.status(200).json(message: "Resource with id " + category[0] + " successfully updated."});
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }

})
/*  DELETE BY ID  */
router.delete('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id);
    try{
        const exists = await knex("category").where({id: categoryId}).first();
        if(!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            knex("category")
                .where({id: categoryId})
                .del()
                .then(delCategory => {
                    res.status(200).json({message: "Successfully deleted category resource with id " + delCategory + "."})
                })
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
})
module.exports = router;