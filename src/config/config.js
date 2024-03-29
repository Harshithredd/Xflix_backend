const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config();

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000), 
    //MONGODB_URL: Joi.string().required().description("Mongo DB url"),
})

// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

// module.exports ={
//     env: envVars.NODE_ENV,
//     port: envVars.PORT,
// }
module.exports = {
    env:process.env.NODE_ENV,
    port :process.env.PORT,
    mongoURL : process.env.MONGODB_URL
}