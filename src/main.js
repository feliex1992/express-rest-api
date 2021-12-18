const dotEnv = require("dotenv");

const App = require("./app");

dotEnv.config();

const app = new App();
app.start();
