
const express = require("express");
const router = express.Router();

// create my routes:

router.get("/", function(req, res) {
    res.render("index.html", { title: "ChatApp" });
});

// router.get("*", function(req, res) {
//     res.send("404 not found");
// });

// exports my routes:
module.exports = router;
