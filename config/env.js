

const z = require("zod");
require("dotenv").config();//load env variables from .env file into process.env



const env = z.object({
    // What does coerce mean? => Force convert “Take whatever value comes (string/number) and convert it into a number.”
    PORT: z.coerce.number().default(3000),

    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),

    JWT_SECRET: z.string().min(10)
}).parse(process.env);// parse will check the process.env with the schema we provided and return the parsed object

module.exports = env;

// INTERVIEW-READY EXPLANATION

// I use Zod to validate environment variables at startup, ensuring the app fails fast if configuration is invalid. I load dotenv once in the env module and create a reusable MySQL connection pool using mysql2/promise, which is shared across routes for efficient and concurrent database access.