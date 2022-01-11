const express = require("express");
const positionService = require("./Service");

const positionRouter = express.Router();

function createPosition(request, response) {
  const value = request.body;

  positionService.create(
    value,
    (data) => response.status(201).json(data),
    (error) => {
      console.log(error);
      return response.status(400).json(error);
    }
  );
}

const readPosition = (req, res) => {
  const value = req.body;

  positionService.read(
    value,
    (data) => res.status(201).json(data),
    (error) => res.status(400).json(error)
  );
};

const updatePosition = (req, res) => {
  const value = req.body;

  positionService.update(
    value,
    (data) => res.status(201).json(data),
    (error) => res.status(400).json(error)
  );
};

const deletePosition = (req, res) => {
  const value = req.body;

  positionService.delete(
    value,
    () =>
      res.status(201).json({ message: "Successfully Deleted!", deleted: true }),
    (error) => res.status(400).json({ message: error, deleted: false })
  );
};

const readPositionBetweenDates = (req, res) => {
  const value = req.query;
  positionService.readBetweenDates(
    value,
    (data) => res.status(201).json(data),
    (error) => res.status(400).json(error)
  );
};

const readAllPositions = (req, res) => {
  const value = req.query;
  positionService.readAll(
    value,
    (data) => res.status(201).json(data),
    (error) => res.status(400).json(error)
  );
};

positionRouter.route("").post(createPosition);
positionRouter.route("").get(readPosition);
positionRouter.route("").put(updatePosition);
positionRouter.route("").delete(deletePosition);
positionRouter.route("/date").get(readPositionBetweenDates);
positionRouter.route("/readAll").get(readAllPositions);

module.exports = positionRouter;
