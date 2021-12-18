const { BaseController } = require("../../../../base");

class QueryController extends BaseController {
  async getUser () {
    try {
      this.success("Success Get User.");
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = QueryController;
