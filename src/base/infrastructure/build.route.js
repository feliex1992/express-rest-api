class BuildRoute {
  constructor (controllerClass, routes) {
    this.controllerClass = controllerClass;
    this.routes = routes;
    this.httpMethod = "get";
  }

  pushRoutes (uri, action, isSecure) {
    this.routes.push({
      controllerClass: this.controllerClass,
      uri,
      httpMethod: this.httpMethod,
      action,
      isSecure
    });
  }

  get (uri, action, isSecure = false) {
    this.httpMethod = "get";
    this.pushRoutes(uri, action, isSecure);
  }

  post (uri, action, isSecure = false) {
    this.httpMethod = "post";
    this.pushRoutes(uri, action, isSecure);
  }

  put (uri, action, isSecure = false) {
    this.httpMethod = "put";
    this.pushRoutes(uri, action, isSecure);
  }

  delete (uri, action, isSecure = false) {
    this.httpMethod = "delete";
    this.pushRoutes(uri, action, isSecure);
  }
}

module.exports = BuildRoute;
