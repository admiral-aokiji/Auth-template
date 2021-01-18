const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('home'))
router.get('/u', ensureAuthenticated, (req, res) =>
  res.render('user-home')
);
module.exports = router