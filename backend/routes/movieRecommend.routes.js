import { Router } from "express";
import { getRecommendations } from "../controller/movieRecommend.controller.js";

const router = Router()

router.post("/recommend", getRecommendations)

export default router