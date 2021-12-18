/* eslint-disable array-callback-return */
const RoutesCollection = require("./routes.collection");

const routesList = [];

class RouteConfig {
  constructor () {
    this.routeBuilders = routesList;
  }

  registerRoutes (registerRouteCallback, createRouteBoundAction) {
    this.routeBuilders.map((builder) => {
      const routes = builder.getRoutes();
      routes.map((routeData) => {
        RoutesCollection.addRouteData(
          routeData.controllerClass,
          routeData.action,
          {
            uri: routeData.uri, httpMethod: routeData.httpMethod
          }
        );
        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      });
    });
  }
}

module.exports = { routesList, RouteConfig };
