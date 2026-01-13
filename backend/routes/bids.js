import express from "express";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE BID
router.post("/:gigId", auth, async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);
  if (!gig) return res.status(404).json({ message: "Gig not found" });

  // owner cannot bid
  if (gig.ownerId.toString() === req.userId) {
    return res.status(403).json({ message: "Owner cannot bid" });
  }

  // cannot bid if assigned
  if (gig.status === "assigned") {
    return res.status(400).json({ message: "Gig already assigned" });
  }

  const bid = await Bid.create({
  gigId: gig._id,
  freelancerId: req.userId,
  message: req.body.message,
  price: req.body.price
});


  res.json(bid);
});

router.get("/gig/:gigId", auth, async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId })
    .populate("freelancerId", "name");

  res.json(bids);
});

// HIRE
router.patch("/:bidId/hire", auth, async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  const gig = await Gig.findById(bid.gigId);

  if (gig.ownerId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Bid.updateMany(
    { gigId: gig._id },
    { status: "rejected" }
  );

  bid.status = "hired";
  await bid.save();

  gig.status = "assigned";
  await gig.save();

  res.json({ message: "Freelancer hired" });
});

// REJECT BID
router.patch("/:bidId/reject", auth, async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  const gig = await Gig.findById(bid.gigId);

  if (gig.ownerId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  bid.status = "rejected";
  await bid.save();

  res.json({ message: "Bid rejected" });
});

export default router;
