var express = require('express');
var router = express.Router();
require('./schedule');

router.get("/", async(req, res) => {
  res.render("index",{title:'home'});
})

module.exports = router;
