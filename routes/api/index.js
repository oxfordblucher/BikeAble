const router = require("express").Router();
const userRoutes = require("../users");

// Book routes
router.use("/api/users", userRoutes);

module.exports = router;
