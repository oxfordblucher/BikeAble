const router = require("express").Router();
const userRoutes = require("./users");

// Book routes
router.use("/users", userRoutes);

router.route("/")
  .get(BikeController.findAll)
  .post(BikeController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(BikeController.findById)
  .put(BikeController.update)
  .delete(BikeController.remove);

module.exports = router;
