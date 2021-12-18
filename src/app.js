const express = require("express");

const AppModule = require("./app.module");
const { URIGenerator, RouteConfig } = require("./configs/route");
const { SecurityConfig } = require("./configs/security");
const { RepositoryConfig } = require("./configs/repository");

class App {
  constructor () {
    this.appModule = new AppModule();

    this.app = express();
    this.expressRouter = express.Router();
    this.router = new RouteConfig();
    this.security = new SecurityConfig();
    this.repository = new RepositoryConfig();

    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
  }

  _registerRoute (uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  _createRouteBoundAction (controllerClass, method, isSecure) {
    const result = [
      (req, res) => {
        this._buildControllerInstance(controllerClass, req, res)[method]();
      }];

    if (isSecure) {
      result.unshift(
        this.security.authenticate()
      );
    }

    return result;
  }

  _buildControllerInstance (ControllerClass, req, res) {
    return new ControllerClass(
      {
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body,
        repository: this.repository,
        uriGenerator: new URIGenerator(),
        send: (statusCode, resource, location) => {
          if (location) {
            res.location(location);
          }
          res.status(statusCode).send(resource);
        }
      }
    );
  }

  start () {
    this.appModule.initiateModule();
    this.app.use(express.json({ limit: "30mb" }));
    this.app.use(express.urlencoded({ limit: "30mb", extended: true }));

    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
      next();
    });

    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);
    this.app.use("/api/v1", this.expressRouter);

    const port = process.env.PORT;
    this.app.listen(port, () => console.log(`Server listening on port: ${port}`));
  }
}

module.exports = App;
