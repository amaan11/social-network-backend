import express from "express";
import bodyParser from "body-parser";
import sequelize from "./utils/database";
import UserController from "./Controllers/UserController";
import SkillController from "./Controllers/SkillController";
import passport from "passport";

require("./utils/passport");
const app = express();

// JSON Request
app.use(bodyParser.json());

// URL encoded Form Request
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
app.use(UserController);
app.use(SkillController)
app.use("/user", passport.authenticate("jwt", { session: false }));

const port = process.env.port || 3000;

app.listen(port);

sequelize.sync(() => {
  app.listen(port);
});
