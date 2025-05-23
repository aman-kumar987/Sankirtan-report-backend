import express from "express";
const router = express.Router();

import { addReport, groupWiseReport, groupReportByName } from "../controllers/reports.controllers.js";

import { reportValidator, groupNameValidator } from "../utils/validators/report-validators.js";

router.post("/add-report", reportValidator, addReport);
router.get("/groups", groupWiseReport);
router.get("/get-group-report", groupNameValidator,groupReportByName);

export default router;