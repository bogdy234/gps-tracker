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
    console.log(item);
    console.log("item", item);
    const query = { _id: item.id };
    PositionModel.findOneAndUpdate(query, item.newValue)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  delete: (item, success, fail) => {
    PositionModel.deleteOne(item)
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  readBetweenDates: (item, success, fail) => {
    const { startDate, endDate, terminalId } = item;
    PositionModel.find({
      date: { $gt: startDate, $lt: endDate },
      terminalId,
    })
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
  readAll: (item, success, fail) => {
    const { terminalId } = item;
    PositionModel.find({
      terminalId,
    })
      .then((data) => success(data))
      .catch((error) => fail(error));
  },
};

module.exports = PositionService;
