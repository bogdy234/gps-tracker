const express = require("express");
const positionService = require("./Service");

const positionRouter = express.Router();

positionRouter.route("").post(createPosition);

function createPosition(request, response) {
  const value = request.body;

  positionService.create(
    value,
    (data) => response.status(201).json(data),
    (error) => response.status(400).json(error)
  );
}

const deletePosition = (req, res) => {
  const value = req.body;

  positionService.delete(
    value,
    () => res.status(201).json("Succesfully Deleted!"),
    (error) => {
      res.status(400).json(error);
    }
  );
};

positionRouter.route("").delete(deletePosition);

module.exports = positionRouter;
