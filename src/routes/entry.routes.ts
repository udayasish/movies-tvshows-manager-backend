import {
  createEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  searchEntries,
} from "../controllers/entry.controller";
import { Router } from "express";

const router = Router();

router.route("/").post(createEntry);
router.route("/").get(getAllEntries);
router.route("/search").get(searchEntries);
router.route("/:id").put(updateEntry);
router.route("/:id").delete(deleteEntry);

export default router;
