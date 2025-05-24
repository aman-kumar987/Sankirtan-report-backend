import express from "express";

const router = express.Router();

import { allGroups, byGroupName } from "../controllers/admin.controllers.js";

router.post("/all-groups", allGroups);
router.post("/admin/group-by-name", byGroupName);

export default router;