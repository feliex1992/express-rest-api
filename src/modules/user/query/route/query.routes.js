const { BaseRoutes } = require("../../../../base");
const QueryController = require("../controller/query.controller");

class QueryRoutes extends BaseRoutes {
  constructor () {
    super(QueryController);
  }

  getRoutes () {
    this.buildRoute.get("/user", "getUser");

    return this.routes;
  }
}

module.exports = QueryRoutes;
