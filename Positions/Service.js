const PositionModel = require("./Model");

const PositionService = {
  create: (item, success, fail) => {
    PositionModel.create(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  read: (item, success, fail) => {
    PositionModel.find(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  update: (item, success, fail) => {
    PositionModel.updateOne(item.old, item.new)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  delete: (item, success, fail) => {
    PositionModel.deleteOne(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
};

module.exports = PositionService;
