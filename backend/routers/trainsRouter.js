const express = require("express");
const {
  getRouters,
  postRout,
  patchRout,
  deleteRout,
  findBy,
  sortByDate,
  generateId,
} = require("../controllers/trainsController");

const router = express.Router();

router
  .route("/")
  .get(sortByDate, getRouters)
  .post(generateId, postRout)
  .patch(patchRout);

router.route("/filter").get(findBy);

router.route("/:id").delete(deleteRout);

module.exports = router;
