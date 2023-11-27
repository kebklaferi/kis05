const express = require('express');
const router = express.Router();
const knex = require('../database-conection/db')

/*  GET ALL  */
router.get('/', (req, res) => {
    knex.select("*")
        .from("brand")
        .then((brands) => {
            return res.status(200).json(brands);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})

/*  POST  */
router.post('/',  (req, res) => {
    const {alias, title} = req.body;
    knex("brand")
        .insert({
            alias: alias,
            title: title,
        })
        .then(brand => {
            res.status(201).json(brand[0]);
        })
        .catch(error => {
            console.log("Database error: " + error);
            res.status(500).json({error: "Internal server error."});
        })
})
/*  UPDATE BY ID */
router.put('/:id', async (req, res) => {
    const brandId = parseInt(req.params.id);
    const {alias, title} = req.body;
    try {
        const exists = await knex("brand").where({id: brandId}).first();
        if (!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            const brand = await knex("brand").where({id: brandId})
                .update({
                    alias: alias,
                    title: title,
                })
            res.status(204).send();
            // res.status(200).json(message: "Resource with id " + brand[0] + " successfully updated."});
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }

})
/*  DELETE BY ID  */
router.delete('/:id', async (req, res) => {
    const brandId = parseInt(req.params.id);
    try{
        const exists = await knex("brand").where({id: brandId}).first();
        if(!exists) {
            res.status(404).json({
                error: "Resource not found."
            })
        } else {
            knex("brand")
                .where({id: brandId})
                .del()
                .then(delBrand => {
                    res.status(200).json({message: "Successfully deleted brand resource with id " + delBrand + "."})
                })
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
})
module.exports = router;
