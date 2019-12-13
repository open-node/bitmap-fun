module.exports = sequelize => {
  const { Sequelize } = sequelize;

  const Model = sequelize.define(
    "log",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        comment: "主键ID"
      },
      userId: {
        type: Sequelize.STRING,
        comment: "所属用户ID"
      },
      red: {
        type: Sequelize.TEXT,
        comment: "红色函数主体"
      },
      green: {
        type: Sequelize.TEXT,
        comment: "绿色函数主体"
      },
      blue: {
        type: Sequelize.TEXT,
        comment: "蓝色函数主体"
      },
      code: {
        type: Sequelize.TEXT,
        comment: "v2 code"
      }
    },
    {
      comment: "记录",
      freezeTableName: true,
      instanceMethods: {},
      classMethods: {},
      hooks: {}
    }
  );

  return Model;
};
