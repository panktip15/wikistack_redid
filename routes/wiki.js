const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, main } = require('../views');

router.get('/', (req, res, next) => {
  res.send(main());
});

router.post('/', (req, res, next) => {
  try {
    const page = Page.create(req.body);
    res.redirect('/wiki/add');
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
