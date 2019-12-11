module.exports = {
  store: {
    host: "47.107.53.168",
    port: 3306,
    name: "bitmap",
    encode: {
      set: "utf8",
      collation: "utf8_general_ci"
    },
    user: "root",
    pass: "u>Jd<*@mei&.KvM^QwVv",
    dialect: "mysql",
    dialectOptions: {
      /** 支持大数的计算 */
      supportBigNumbers: true,
      charset: "utf8mb4"
    },
    logging: false,
    define: {
      underscored: false,
      freezeTableName: true,
      syncOnAssociation: false,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB"
    },
    syncOnAssociation: false,
    pool: {
      min: 1,
      max: 2,
      /** 单位毫秒 */
      idle: 300 * 1000
    }
  }
};
