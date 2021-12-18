const { BaseRoutes } = require("../../../../base");
const CommandController = require("../controller/command.controller");

class CommandRoutes extends BaseRoutes {
  constructor () {
    super(CommandController);
  }

  getRoutes () {
    this.buildRoute.post("/user", "createUser");
    this.buildRoute.put("/user", "updateUser");
    this.buildRoute.delete("/user", "deleteUser");

    return this.routes;
  }
}

module.exports = CommandRoutes;
