import express from "express"
import {router as authRoutes} from "./apps/auth/auth.routes.js"
import {router as conversationRoutes} from "./apps/conversation/routes/conversation.routes.js"
import { httpAuthenticate } from "./apps/auth/httpAuthenticate.js"
const router = express.Router()


router.use("/auth", authRoutes)
router.use("/conversation", httpAuthenticate, conversationRoutes)

export {router}