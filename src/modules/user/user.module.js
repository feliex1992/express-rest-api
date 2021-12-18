const { BaseModule } = require("../../base");
const CommandRoutes = require("./command/route/command.routes");
const QueryRoutes = require("./query/route/query.routes");

class UserModule extends BaseModule {
  constructor () {
    super({
      routes: [
        new QueryRoutes(),
        new CommandRoutes()
      ]
    });
  }
}

module.exports = UserModule;
