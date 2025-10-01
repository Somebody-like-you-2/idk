import express from "express"
import {postSignup, postLogin} from "./auth.controller.js"




const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);


export { router}