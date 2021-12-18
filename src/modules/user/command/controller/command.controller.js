const { BaseController } = require("../../../../base");

class CommandController extends BaseController {
  async createUser () {
    try {
      this.success("Success Create User.");
    } catch (err) {
      this.error(err);
    }
  }

  async updateUser () {
    try {
      this.success("Success Update User.");
    } catch (err) {
      this.error(err);
    }
  }

  async deleteUser () {
    try {
      this.success("Success Delete User.");
    } catch (err) {
      this.error(err);
    }
  }
}

module.exports = CommandController;
