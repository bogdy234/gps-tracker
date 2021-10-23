const PositionModel = require("./Model");

const PositionService = {
  create: (item, success, fail) => {
    PositionModel.create(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  delete: (item, success, fail) => {
    PositionModel.findOneAndDelete(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
};

module.exports = PositionService;
