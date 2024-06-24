require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");


require("./db/adminSDKConfig");
const adminRouter = require("./routers/route"); 

const PORT = process.env.PORT || 2000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/views/partials")

app.use(cookieParser());
app.use(adminRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(static_path));

app.set("view engine", "hbs");
hbs.registerPartials(partials_path);
app.set("views", template_path);


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}/`);
});

module.exports = app;