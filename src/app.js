const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./routes/v1/index");
const errorHandler = require("./middlewares/error");
const cors = require("cors");
const ApiError = require("./utils/ApiError");

app.use(cors());

app.use((req,res,next)=>{
    console.log("inside app.js");
    next();
})
app.use("/v1",routes);
// handle error
app.use(errorHandler.errorConverter);
app.use(errorHandler.errorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;