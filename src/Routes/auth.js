const express = require("express");
const { getUsers } = require("../Controllers/authController");
const Route = express.Router();

Route.get("/getusers", getUsers);

module.exports = Route;
