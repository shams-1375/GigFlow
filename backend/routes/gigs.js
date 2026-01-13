import express from "express";
import Gig from "../models/Gig.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my", auth, async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.userId })
    .populate("ownerId", "name");

  res.json(gigs);
});

// Get single gig by id (VERY IMPORTANT)
router.get("/:id", async (req, res) => {
  const gig = await Gig.findById(req.params.id)
    .populate("ownerId", "name");

  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  res.json(gig);
});


// GET ALL GIGS (open + assigned)
router.get("/", async (req, res) => {
  const gigs = await Gig.find()
    .populate("ownerId", "name");
  res.json(gigs);
});

// CREATE GIG
router.post("/", auth, async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.userId,
    status: "open"
  });

  res.json(gig);
});

router.delete("/:id", auth, async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  // Only owner can delete
  if (gig.ownerId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await gig.deleteOne();
  res.json({ message: "Gig deleted successfully" });
});

export default router;
