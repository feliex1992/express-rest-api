const { routesList } = require("../../configs/route");
// const { repositoriesList } = require("../../configs/repository");

class BaseModule {
  constructor ({ routes, repositories }) {
    routesList.push(...routes);
    // repositoriesList.push(...repositories);
  }
}

module.exports = BaseModule;
