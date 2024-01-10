import { Router } from "express";
import { Ping } from "../Controllers/Ping.js";
import { VisitCookie } from "../Controllers/VisitCookie.js";
const router = Router();
router.get('/visit',VisitCookie);
router.get('/ping', Ping);
router
export default router

