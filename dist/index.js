/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst AppModule = __webpack_require__(/*! ./app.module */ \"./src/app.module.js\");\nconst { URIGenerator, RouteConfig } = __webpack_require__(/*! ./configs/route */ \"./src/configs/route/index.js\");\nconst { SecurityConfig } = __webpack_require__(/*! ./configs/security */ \"./src/configs/security/index.js\");\nconst { RepositoryConfig } = __webpack_require__(/*! ./configs/repository */ \"./src/configs/repository/index.js\");\n\nclass App {\n  constructor () {\n    this.appModule = new AppModule();\n\n    this.app = express();\n    this.expressRouter = express.Router();\n    this.router = new RouteConfig();\n    this.security = new SecurityConfig();\n    this.repository = new RepositoryConfig();\n\n    this._registerRoute = this._registerRoute.bind(this);\n    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);\n  }\n\n  _registerRoute (uri, httpMethod, boundAction) {\n    this.expressRouter.route(uri)[httpMethod](boundAction);\n  }\n\n  _createRouteBoundAction (controllerClass, method, isSecure) {\n    const result = [\n      (req, res) => {\n        this._buildControllerInstance(controllerClass, req, res)[method]();\n      }];\n\n    if (isSecure) {\n      result.unshift(\n        this.security.authenticate()\n      );\n    }\n\n    return result;\n  }\n\n  _buildControllerInstance (ControllerClass, req, res) {\n    return new ControllerClass(\n      {\n        params: req.params,\n        query: req.query,\n        headers: req.headers,\n        body: req.body,\n        repository: this.repository,\n        uriGenerator: new URIGenerator(),\n        send: (statusCode, resource, location) => {\n          if (location) {\n            res.location(location);\n          }\n          res.status(statusCode).send(resource);\n        }\n      }\n    );\n  }\n\n  start () {\n    this.appModule.initiateModule();\n    this.app.use(express.json({ limit: \"30mb\" }));\n    this.app.use(express.urlencoded({ limit: \"30mb\", extended: true }));\n\n    this.app.use(function (req, res, next) {\n      res.header(\"Access-Control-Allow-Origin\", \"*\");\n      res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, x-auth-token\");\n      next();\n    });\n\n    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);\n    this.app.use(\"/api/v1\", this.expressRouter);\n\n    const port = process.env.PORT;\n    this.app.listen(port, () => console.log(`Server listening on port: ${port}`));\n  }\n}\n\nmodule.exports = App;\n\n\n//# sourceURL=webpack://express-rest-api/./src/app.js?");

/***/ }),

/***/ "./src/app.module.js":
/*!***************************!*\
  !*** ./src/app.module.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const UserModule = __webpack_require__(/*! ./modules/user/user.module */ \"./src/modules/user/user.module.js\");\n\nclass AppModule {\n  initiateModule () {\n    this.userModule = new UserModule();\n  }\n}\n\nmodule.exports = AppModule;\n\n\n//# sourceURL=webpack://express-rest-api/./src/app.module.js?");

/***/ }),

/***/ "./src/base/index.js":
/*!***************************!*\
  !*** ./src/base/index.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const BaseModule = __webpack_require__(/*! ./modules/base.module */ \"./src/base/modules/base.module.js\");\nconst BaseController = __webpack_require__(/*! ./infrastructure/base.controller */ \"./src/base/infrastructure/base.controller.js\");\nconst BaseRoutes = __webpack_require__(/*! ./infrastructure/base.routes */ \"./src/base/infrastructure/base.routes.js\");\n\nmodule.exports = { BaseModule, BaseController, BaseRoutes };\n\n\n//# sourceURL=webpack://express-rest-api/./src/base/index.js?");

/***/ }),

/***/ "./src/base/infrastructure/base.controller.js":
/*!****************************************************!*\
  !*** ./src/base/infrastructure/base.controller.js ***!
  \****************************************************/
/***/ ((module) => {

eval("class BaseController {\n  constructor ({ params, query, headers, body, send, uriGenerator, repository }) {\n    this.uriGenerator = uriGenerator;\n    this.params = params;\n    this.query = query;\n    this.headers = headers;\n    this.body = body;\n    this.send = send;\n    this.repository = repository;\n  }\n\n  error (err) {\n    const status = err.statusCode || err.status;\n    const statusCode = status || 500;\n    this.send(statusCode, err.message);\n  }\n\n  success (data) {\n    this.send(200, data);\n  }\n}\n\nmodule.exports = BaseController;\n\n\n//# sourceURL=webpack://express-rest-api/./src/base/infrastructure/base.controller.js?");

/***/ }),

/***/ "./src/base/infrastructure/base.routes.js":
/*!************************************************!*\
  !*** ./src/base/infrastructure/base.routes.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const BuildRoute = __webpack_require__(/*! ./build.route */ \"./src/base/infrastructure/build.route.js\");\n\nclass BaseRoutes {\n  constructor (controllerClass) {\n    this.routes = [];\n    this.buildRoute = new BuildRoute(controllerClass, this.routes);\n    this.ControllerClass = controllerClass;\n  }\n}\n\nmodule.exports = BaseRoutes;\n\n\n//# sourceURL=webpack://express-rest-api/./src/base/infrastructure/base.routes.js?");

/***/ }),

/***/ "./src/base/infrastructure/build.route.js":
/*!************************************************!*\
  !*** ./src/base/infrastructure/build.route.js ***!
  \************************************************/
/***/ ((module) => {

eval("class BuildRoute {\n  constructor (controllerClass, routes) {\n    this.controllerClass = controllerClass;\n    this.routes = routes;\n    this.httpMethod = \"get\";\n  }\n\n  pushRoutes (uri, action, isSecure) {\n    this.routes.push({\n      controllerClass: this.controllerClass,\n      uri,\n      httpMethod: this.httpMethod,\n      action,\n      isSecure\n    });\n  }\n\n  get (uri, action, isSecure = false) {\n    this.httpMethod = \"get\";\n    this.pushRoutes(uri, action, isSecure);\n  }\n\n  post (uri, action, isSecure = false) {\n    this.httpMethod = \"post\";\n    this.pushRoutes(uri, action, isSecure);\n  }\n\n  put (uri, action, isSecure = false) {\n    this.httpMethod = \"put\";\n    this.pushRoutes(uri, action, isSecure);\n  }\n\n  delete (uri, action, isSecure = false) {\n    this.httpMethod = \"delete\";\n    this.pushRoutes(uri, action, isSecure);\n  }\n}\n\nmodule.exports = BuildRoute;\n\n\n//# sourceURL=webpack://express-rest-api/./src/base/infrastructure/build.route.js?");

/***/ }),

/***/ "./src/base/modules/base.module.js":
/*!*****************************************!*\
  !*** ./src/base/modules/base.module.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { routesList } = __webpack_require__(/*! ../../configs/route */ \"./src/configs/route/index.js\");\n// const { repositoriesList } = require(\"../../configs/repository\");\n\nclass BaseModule {\n  constructor ({ routes, repositories }) {\n    routesList.push(...routes);\n    // repositoriesList.push(...repositories);\n  }\n}\n\nmodule.exports = BaseModule;\n\n\n//# sourceURL=webpack://express-rest-api/./src/base/modules/base.module.js?");

/***/ }),

/***/ "./src/configs/repository/index.js":
/*!*****************************************!*\
  !*** ./src/configs/repository/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { repositoriesList, RepositoryConfig } = __webpack_require__(/*! ./repository-config */ \"./src/configs/repository/repository-config.js\");\n\nmodule.exports = {\n  repositoriesList,\n  RepositoryConfig\n};\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/repository/index.js?");

/***/ }),

/***/ "./src/configs/repository/repository-config.js":
/*!*****************************************************!*\
  !*** ./src/configs/repository/repository-config.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("const repositoriesList = [];\n\nclass RepositoryConfig {\n  constructor () {\n    if (repositoriesList.length > 0) {\n      return repositoriesList.reduce(\n        (result, current) => {\n          return Object.assign(result, current);\n        }\n      );\n    } else {\n      return [];\n    }\n  }\n}\n\nmodule.exports = { repositoriesList, RepositoryConfig };\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/repository/repository-config.js?");

/***/ }),

/***/ "./src/configs/route/index.js":
/*!************************************!*\
  !*** ./src/configs/route/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { routesList, RouteConfig } = __webpack_require__(/*! ./route-config */ \"./src/configs/route/route-config.js\");\nconst URIGenerator = __webpack_require__(/*! ./uri-generator */ \"./src/configs/route/uri-generator.js\");\n\nmodule.exports = {\n  routesList,\n  RouteConfig,\n  URIGenerator\n};\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/route/index.js?");

/***/ }),

/***/ "./src/configs/route/route-config.js":
/*!*******************************************!*\
  !*** ./src/configs/route/route-config.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable array-callback-return */\nconst RoutesCollection = __webpack_require__(/*! ./routes.collection */ \"./src/configs/route/routes.collection.js\");\n\nconst routesList = [];\n\nclass RouteConfig {\n  constructor () {\n    this.routeBuilders = routesList;\n  }\n\n  registerRoutes (registerRouteCallback, createRouteBoundAction) {\n    this.routeBuilders.map((builder) => {\n      const routes = builder.getRoutes();\n      routes.map((routeData) => {\n        RoutesCollection.addRouteData(\n          routeData.controllerClass,\n          routeData.action,\n          {\n            uri: routeData.uri, httpMethod: routeData.httpMethod\n          }\n        );\n        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);\n        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);\n      });\n    });\n  }\n}\n\nmodule.exports = { routesList, RouteConfig };\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/route/route-config.js?");

/***/ }),

/***/ "./src/configs/route/routes.collection.js":
/*!************************************************!*\
  !*** ./src/configs/route/routes.collection.js ***!
  \************************************************/
/***/ ((module) => {

eval("const dataRoutes = [];\n\nclass RoutesCollection {\n  static addRouteData (controller, action, routeData) {\n    routeData.controller = controller.name;\n    routeData.action = action;\n\n    if (!RoutesCollection[controller.name]) RoutesCollection[controller.name] = {};\n\n    RoutesCollection[controller.name] = Object.assign({}, RoutesCollection[controller.name], {\n      [action]: routeData\n    });\n\n    const checkDouble = dataRoutes.filter((dataRoute) => {\n      return dataRoute.httpMethod === routeData.httpMethod && dataRoute.uri === routeData.uri;\n    });\n    if (checkDouble.length > 0) {\n      throw new Error(`Duplicate route uri: ${routeData.uri} methode: ${routeData.httpMethod}!`);\n    }\n    dataRoutes.push(routeData);\n  }\n}\n\nmodule.exports = RoutesCollection;\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/route/routes.collection.js?");

/***/ }),

/***/ "./src/configs/route/uri-generator.js":
/*!********************************************!*\
  !*** ./src/configs/route/uri-generator.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const queryString = __webpack_require__(/*! query-string */ \"query-string\");\nconst RoutesCollection = __webpack_require__(/*! ./routes.collection */ \"./src/configs/route/routes.collection.js\");\n\nclass URIGenerator {\n  getURI (controllerAction, params, id) {\n    const routeMeta = controllerAction.split(\"_\");\n    const routeData = RoutesCollection[routeMeta[0]][routeMeta[1]];\n    const uri = params ? this._bindParams(routeData.uri, params) : routeData.uri;\n    return {\n      id: id || routeData.action,\n      method: routeData.method,\n      uri\n    };\n  }\n\n  _bindParams (uri, params) {\n    let match;\n    let replacement;\n    let uriParam = uri;\n    const replacedParams = [];\n\n    // eslint-disable-next-line no-cond-assign\n    while (match = /:([\\w_]+)\\??/ig.exec(uriParam)) {\n      replacement = params[match[1]].toString() || \"\";\n      if (replacement === \"\") {\n        uriParam = uriParam.replace(`/${match[0]}`, \"\");\n      } else {\n        uriParam = uriParam.replace(match[0], replacement);\n        replacedParams.push(match[1]);\n      }\n    }\n\n    const paramsForQueryString = {};\n    Object.keys(params).forEach((p) => {\n      if (!replacedParams.includes(p)) {\n        paramsForQueryString[p] = params[p];\n      }\n    });\n\n    if (Object.keys(paramsForQueryString).length > 0) {\n      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;\n    }\n\n    return uriParam;\n  }\n}\n\nmodule.exports = URIGenerator;\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/route/uri-generator.js?");

/***/ }),

/***/ "./src/configs/security/index.js":
/*!***************************************!*\
  !*** ./src/configs/security/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const SecurityConfig = __webpack_require__(/*! ./security.config */ \"./src/configs/security/security.config.js\");\n\nmodule.exports = { SecurityConfig };\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/security/index.js?");

/***/ }),

/***/ "./src/configs/security/security.config.js":
/*!*************************************************!*\
  !*** ./src/configs/security/security.config.js ***!
  \*************************************************/
/***/ ((module) => {

eval("class SecurityConfig {\n  authenticate () {\n    return [\n      (req, res, next) => {\n        if (req.headers[\"x-auth-token\"] !== \"test\") {\n          return res.status(400).send(\"Un Authorization!!!\");\n        }\n\n        next();\n      }\n    ];\n  }\n}\n\nmodule.exports = SecurityConfig;\n\n\n//# sourceURL=webpack://express-rest-api/./src/configs/security/security.config.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const dotEnv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nconst App = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\ndotEnv.config();\n\nconst app = new App();\napp.start();\n\n\n//# sourceURL=webpack://express-rest-api/./src/main.js?");

/***/ }),

/***/ "./src/modules/user/command/controller/command.controller.js":
/*!*******************************************************************!*\
  !*** ./src/modules/user/command/controller/command.controller.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { BaseController } = __webpack_require__(/*! ../../../../base */ \"./src/base/index.js\");\n\nclass CommandController extends BaseController {\n  async createUser () {\n    try {\n      this.success(\"Success Create User.\");\n    } catch (err) {\n      this.error(err);\n    }\n  }\n\n  async updateUser () {\n    try {\n      this.success(\"Success Update User.\");\n    } catch (err) {\n      this.error(err);\n    }\n  }\n\n  async deleteUser () {\n    try {\n      this.success(\"Success Delete User.\");\n    } catch (err) {\n      this.error(err);\n    }\n  }\n}\n\nmodule.exports = CommandController;\n\n\n//# sourceURL=webpack://express-rest-api/./src/modules/user/command/controller/command.controller.js?");

/***/ }),

/***/ "./src/modules/user/command/route/command.routes.js":
/*!**********************************************************!*\
  !*** ./src/modules/user/command/route/command.routes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { BaseRoutes } = __webpack_require__(/*! ../../../../base */ \"./src/base/index.js\");\nconst CommandController = __webpack_require__(/*! ../controller/command.controller */ \"./src/modules/user/command/controller/command.controller.js\");\n\nclass CommandRoutes extends BaseRoutes {\n  constructor () {\n    super(CommandController);\n  }\n\n  getRoutes () {\n    this.buildRoute.post(\"/user\", \"createUser\");\n    this.buildRoute.put(\"/user\", \"updateUser\");\n    this.buildRoute.delete(\"/user\", \"deleteUser\");\n\n    return this.routes;\n  }\n}\n\nmodule.exports = CommandRoutes;\n\n\n//# sourceURL=webpack://express-rest-api/./src/modules/user/command/route/command.routes.js?");

/***/ }),

/***/ "./src/modules/user/query/controller/query.controller.js":
/*!***************************************************************!*\
  !*** ./src/modules/user/query/controller/query.controller.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { BaseController } = __webpack_require__(/*! ../../../../base */ \"./src/base/index.js\");\n\nclass QueryController extends BaseController {\n  async getUser () {\n    try {\n      this.success(\"Success Get User.\");\n    } catch (err) {\n      this.error(err);\n    }\n  }\n}\n\nmodule.exports = QueryController;\n\n\n//# sourceURL=webpack://express-rest-api/./src/modules/user/query/controller/query.controller.js?");

/***/ }),

/***/ "./src/modules/user/query/route/query.routes.js":
/*!******************************************************!*\
  !*** ./src/modules/user/query/route/query.routes.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { BaseRoutes } = __webpack_require__(/*! ../../../../base */ \"./src/base/index.js\");\nconst QueryController = __webpack_require__(/*! ../controller/query.controller */ \"./src/modules/user/query/controller/query.controller.js\");\n\nclass QueryRoutes extends BaseRoutes {\n  constructor () {\n    super(QueryController);\n  }\n\n  getRoutes () {\n    this.buildRoute.get(\"/user\", \"getUser\");\n\n    return this.routes;\n  }\n}\n\nmodule.exports = QueryRoutes;\n\n\n//# sourceURL=webpack://express-rest-api/./src/modules/user/query/route/query.routes.js?");

/***/ }),

/***/ "./src/modules/user/user.module.js":
/*!*****************************************!*\
  !*** ./src/modules/user/user.module.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { BaseModule } = __webpack_require__(/*! ../../base */ \"./src/base/index.js\");\nconst CommandRoutes = __webpack_require__(/*! ./command/route/command.routes */ \"./src/modules/user/command/route/command.routes.js\");\nconst QueryRoutes = __webpack_require__(/*! ./query/route/query.routes */ \"./src/modules/user/query/route/query.routes.js\");\n\nclass UserModule extends BaseModule {\n  constructor () {\n    super({\n      routes: [\n        new QueryRoutes(),\n        new CommandRoutes()\n      ]\n    });\n  }\n}\n\nmodule.exports = UserModule;\n\n\n//# sourceURL=webpack://express-rest-api/./src/modules/user/user.module.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("query-string");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;