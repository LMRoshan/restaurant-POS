import express from 'express';
import Product from '../models/Product.js';
import fetchUser from '../middleware/FetchUser.js';

const router = express.Router();

router.post('/addProd', fetchUser, async (req, res) => {
    const {name, price, category} = req.body
    try {
        let product = await Product.create({name, price, category, username: req.user.username});
        res.status(201).json({message: "Product created successfully", product})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
})

router.get('/getProd', fetchUser, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({message: "Products retrieved successfully", products})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
})

export default router;