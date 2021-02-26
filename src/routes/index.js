
const express = require("express");
const router = express.Router();

// create my routes:

router.get("/", function(req, res) {
    res.render("index.html", { title: "SafeText - BETA(v1.0)" });
});

router.get("/acerca-de", (req, res) => {
    res.render("acerca-de.html", { title: "Acerca de - SafeText v1.0" });
})

// exports my routes:
module.exports = router;
