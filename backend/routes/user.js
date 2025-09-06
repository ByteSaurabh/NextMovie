import express from 'express';
import User from '../models/User.js';
const router = express.Router();

// Create user document if not exists
router.post('/:uid', async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      user = new User({ uid: req.params.uid, favourites: [], watched: [] });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's lists
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ favourites: user.favourites, watched: user.watched });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to favourites (uses real Firebase UID)
router.post('/:uid/favourites', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { $addToSet: { favourites: req.body.movie } },
      { new: true, upsert: true }
    );
    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to watched (uses real Firebase UID)
router.post('/:uid/watched', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { $addToSet: { watched: req.body.movie } },
      { new: true, upsert: true }
    );
    res.json(user.watched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from favourites (uses real Firebase UID)
router.delete('/:uid/favourites', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { $pull: { favourites: { id: req.body.movieId } } },
      { new: true }
    );
    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from watched (uses real Firebase UID)
router.delete('/:uid/watched', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { $pull: { watched: { id: req.body.movieId } } },
      { new: true }
    );
    res.json(user.watched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
