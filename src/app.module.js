const UserModule = require("./modules/user/user.module");

class AppModule {
  initiateModule () {
    this.userModule = new UserModule();
  }
}

module.exports = AppModule;
