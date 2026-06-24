import express from "express";

import portalController from "../controller/portalController.js";

const router = express.Router();

router.post("/add", portalController.addJob);
router.get("/all",portalController.alljobs)
router.get("/:id",portalController.specifyJob)
router.patch("/:id",portalController.updateJob)
router.delete("/:id",portalController.deleteJob)

export default router;
