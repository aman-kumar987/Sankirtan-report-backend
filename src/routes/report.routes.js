import express from "express";
const router = express.Router();

import { addReport, groupWiseReport, groupReportByName } from "../controllers/reports.controllers.js";

router.post("/add-report", addReport);
router.get("/groups", groupWiseReport);
router.get("/get-group-report", groupReportByName);

export default router;