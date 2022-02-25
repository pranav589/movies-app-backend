const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, likes });
  });
});

router.post("/getDisLikes", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Dislike.find(variable).exec((err, disLikes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, disLikes });
  });
});

router.post("/increaseLike", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  //save like info data in db
  const like = new Like(variable);
  like.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    //in case like button is already clicked, we need to decrease dislike by 1
    Dislike.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.json({ success: true, result });
    });
  });
});

router.post("/decreaseLike", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true });
  });
});

router.post("/decreaseDisLike", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true });
  });
});

router.post("/increaseDisLike", (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  //save dislike info data in db
  const disLike = new Dislike(variable);
  disLike.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    //in case dislike button is already clicked, we need to decrease like by 1
    Like.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.json({ success: true, result });
    });
  });
});

module.exports = router;
