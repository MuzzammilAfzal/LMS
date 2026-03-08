import express from "express"
import { aiChat, searchWithAi } from "../controllers/aiController.js"

let aiRouter = express.Router()

aiRouter.post("/search",searchWithAi)
aiRouter.post("/chat",aiChat)

export default aiRouter