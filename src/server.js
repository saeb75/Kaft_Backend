const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
var morgan = require("morgan");
const path = require("path");
var bodyParser = require("body-parser");
//cors
app.use(cors());

require("dotenv").config();

app.use(morgan("dev"));
mongoose
  .connect("mongodb://localhost:27017/kaft", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("mongoose conected..."));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//routes
const adminAuth = require("./Routes/Admin/auth");
const auth = require("./Routes/auth");
const categoryRoutes = require("./Routes/category");
const productRoutes = require("./Routes/Product");
const colorRoutes = require("./Routes/color");
const imageRoutes = require("./Routes/image");
const cartRoutes = require("./Routes/cart");
const featureRoutes = require("./Routes/feature");
const sliderRoutes = require("./Routes/slider");
//routes
app.use("/api", adminAuth);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", auth);
app.use("/api", colorRoutes);
app.use("/api", imageRoutes);
app.use("/api", cartRoutes);
app.use("/api", featureRoutes);
app.use("/api", sliderRoutes);
app.use("/public", express.static(path.join(__dirname + "/uploads")));
//404
app.use((req, res, next) => {
  res.status(404).json({
    msg: "Not Found Page",
    success: false,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT}`);
});
