const BuildRoute = require("./build.route");

class BaseRoutes {
  constructor (controllerClass) {
    this.routes = [];
    this.buildRoute = new BuildRoute(controllerClass, this.routes);
    this.ControllerClass = controllerClass;
  }
}

module.exports = BaseRoutes;
