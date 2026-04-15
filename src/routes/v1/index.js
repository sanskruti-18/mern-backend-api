const express = require("express");

const { InfoController } = require("../../controllers");
const postRoutes = require('./post-routes');
const router = express.Router();
console.log("Inside v1 routes");
router.use('/posts',postRoutes);
router.get("/info", InfoController.info);

module.exports = router;