const express = require("express");
const router = express.Router();
const videosRoute = require("./videos.route");

router.use("/videos",videosRoute);

module.exports = router;