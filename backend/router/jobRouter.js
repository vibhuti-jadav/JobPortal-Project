import express from "express";

import portalController from "../controller/portalController.js";

const router = express.Router();

router.post("/add", portalController.addJob);

export default router;
