import { Router } from "express";
import {
  createPartnerSchema,
  getParnerSchema,
  searchPartnerSchema,
} from "../schemas/partners.schema";

import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/schemaValidation";

import {
  getAllPartners,
  getPartner,
  createPartner,
  searchPartner,
} from "../controllers/partners.controller";

const router = Router();

router.get("/", getAllPartners);

router.get("/search", validateQuery(searchPartnerSchema), searchPartner);

router.get("/:id", validateParams(getParnerSchema), getPartner);

router.post("/", validateBody(createPartnerSchema), createPartner);

export default router;
