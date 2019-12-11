const Log = require("./log");

module.exports = sequelize => ({
  Log: Log(sequelize)
});
