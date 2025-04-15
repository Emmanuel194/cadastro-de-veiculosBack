import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  archiveVehicle,
  unarchiveVehicle,
  deleteVehicle,
} from "../controllers/vehicles.controller";

const router = Router();

router.post("/", createVehicle);
router.get("/", getVehicles);
router.put("/:id", updateVehicle);
router.patch("/:id/archive", archiveVehicle);
router.patch("/:id/unarchive", unarchiveVehicle);
router.delete("/:id", deleteVehicle);

export default router;
