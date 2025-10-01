import express from "express"
const router = express.Router()
import { findDm } from "../controller/conversation-dm.controller.js"

router.post("/findId", findDm)

export {router}