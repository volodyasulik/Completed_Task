const express = require("express");
const { getCitysList, addCity } = require("../controllers/cityController");
const { generateId } = require("../controllers/trainsController");

const router = express.Router();

router.route("/").get(getCitysList).post(generateId, addCity);

module.exports = router;
