const app= require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

mongoose.connect(config.mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
    console.log(`connected to db at ${config.mongoURL}`);
}).catch((e)=>{
    console.log("errorInDB",e);
});
 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
