const userBL = require("../models/userBL");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, resp) => {
  try {
    const users = await userBL.getAllUsers();

    return resp.json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
