import express from 'express';
import User from '../models/Auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
const router = express.Router();
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
import fetchUser from '../middleware/FetchUser.js';


router.post('/user',
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
    , async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({ username: req.body.username })

            if (user) {
                res.status(400).json({ message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                username: req.body.username,
                password: secPass
            })

            const data = {
                user: {
                    id: user._id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);

            res.status(201).json({ message: "User created successfully", user, authToken });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    })


router.post('/login',
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }), async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid username or password" });
            }

            const data = {
                user: {
                    id: user._id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);

            res.status(200).json({success: true,  message: "Login successful", user, authToken });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    })


router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
})


export default router;