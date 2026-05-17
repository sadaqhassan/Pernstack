import { Pool } from "pg"

export const pooling  = new Pool({
    user : process.env.user,
    host : process.env.host,
    password : process.env.password,
    port : process.env.port,
    database  :process.env.database
});
