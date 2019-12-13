const util = require("util");
const jsonBody = util.promisify(require("body/json"));
const Sequelize = require("sequelize");
const Storage = require("./src/storage/");
const { store: opt } = require("./configs/");

let store = null;

/* if you open the initializer feature, please implement the initializer function, as below: */
module.exports.initializer = async (context, callback) => {
  const sequelize = new Sequelize(opt.name, opt.user, opt.pass, opt);
  await sequelize.query("SET time_zone='+0:00'");
  store = new Storage(sequelize);
  await store.init();
  callback();
};

module.exports.item = async (req, resp, context) => {
  resp.setHeader("Content-Type", "Application/json");

  const id = req.queries.id;

  try {
    const log = await store.item(id);
    if (!log) {
      resp.setStatusCode(404);
      resp.send(
        JSON.stringify({
          code: "ResourceNotFound",
          message: "Resource not found."
        })
      );
    } else {
      resp.setStatusCode(200);
      resp.send(JSON.stringify(log));
    }
  } catch (e) {
    resp.setStatusCode(500);
    resp.send(e.message);
  }
};

module.exports.list = async (req, resp, context) => {
  resp.setHeader("Content-Type", "Application/json");

  const uid = req.headers["x-auth-uuid"];

  try {
    const ls = await store.list(uid, req.queries);
    resp.setStatusCode(200);
    resp.send(JSON.stringify(ls));
  } catch (e) {
    resp.setStatusCode(500);
    resp.send(e.message);
  }
};

module.exports.save = async (req, resp, context) => {
  resp.setHeader("Content-Type", "Application/json");

  const uid = req.headers["x-auth-uuid"];
  const { code, red, green, blue } = await jsonBody(req);

  try {
    const log = await store.add(red, green, blue, code, uid);
    resp.setStatusCode(201);
    resp.send(JSON.stringify(log));
  } catch (e) {
    resp.setStatusCode(500);
    resp.send(e.message);
  }
};
