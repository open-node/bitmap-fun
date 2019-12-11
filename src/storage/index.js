const Models = require("./models");

const dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const random = len => {
  const { length } = dict;
  let ret = "";
  for (let i = 0; i < len; i += 1) ret += dict[(Math.random() * length) | 0];

  return ret;
};

/**
 * 本地存储操作
 * @class
 * @return {Storage} Instance
 */
function Storage(sequelize) {
  // 初始化model定义
  const models = Models(sequelize);
  const { Log } = models;

  /**
   * 获取一个log
   * @memberof Storage
   * @instance
   *
   * @param {string} id 记录 ID
   * @return {Promise.<log>} 返回对应触发日志
   */
  const item = id => Log.findByPk(id);

  /**
   * 获取一个log列表根据userId
   * @memberof Storage
   * @instance
   *
   * @param {string} userId 所属用户ID
   * @return {Promise.[<log>]} 返回对应触发日志
   */
  const list = (userId, params) => {
    const where = { userId };
    const order = [["createdAt", "DESC"]];
    const offset = Math.min(5000, Math.max(params.$offset | 0, 0));
    const limit = Math.min(100, Math.max(params.$limit | 0, 1));
    return Log.findAll({ where, order, offset, limit });
  };

  /**
   * 添加一条记录
   * @memberof Storage
   * @instance
   *
   * @param {string} red 红色函数主体
   * @param {string} green 绿色函数主体
   * @param {string} blue 蓝色函数主体
   * @param {string} userId 所属用户ID
   * @return {Promise.<log>} 返回添加的记录
   */
  const add = (red, green, blue, userId) =>
    Log.create({ id: random(16), red, green, blue, userId });

  /**
   * 初始化存储
   * @memberof Storage
   * @instance
   *
   * @return {Promise.void}
   */
  const init = () => sequelize.sync();

  return {
    Log,
    init,
    item,
    list,
    add
  };
}

module.exports = Storage;
