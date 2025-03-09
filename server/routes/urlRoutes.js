const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectToUrl,
  listUrls,
} = require("../controllers/urlController");
const { verifyToken } = require("../middleware/token.middleware");

router.post("/shorten", verifyToken, shortenUrl);
router.get("/urls/list", verifyToken, listUrls);
router.get("/:id", redirectToUrl);

module.exports = router;
