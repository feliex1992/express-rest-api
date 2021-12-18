const dataRoutes = [];

class RoutesCollection {
  static addRouteData (controller, action, routeData) {
    routeData.controller = controller.name;
    routeData.action = action;

    if (!RoutesCollection[controller.name]) RoutesCollection[controller.name] = {};

    RoutesCollection[controller.name] = Object.assign({}, RoutesCollection[controller.name], {
      [action]: routeData
    });

    const checkDouble = dataRoutes.filter((dataRoute) => {
      return dataRoute.httpMethod === routeData.httpMethod && dataRoute.uri === routeData.uri;
    });
    if (checkDouble.length > 0) {
      throw new Error(`Duplicate route uri: ${routeData.uri} methode: ${routeData.httpMethod}!`);
    }
    dataRoutes.push(routeData);
  }
}

module.exports = RoutesCollection;
