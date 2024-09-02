const express = require("express")
const { GenerateNewShortURL } = require("../controllers/url")
const router = express.Router();

router.post("/", GenerateNewShortURL);

module.exports = router;