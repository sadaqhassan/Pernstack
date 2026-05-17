import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { pooling } from './Db/Conndb.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());


app.post('/add-task',async(req,res)=>{
    const {name} = req.body
    try {
        const newTask = await pooling.query(`
            INSERT INTO TASKS (name) VALUES($1)
            `,[name]);
        res.send(newTask);
    } catch (error) {
        console.log(error)
    }
})


// ..getTsks

app.get('/',async(req,res)=>{
    try {
        const getTasks = await pooling.query(
            `
            select * from tasks 
            `
        )
        res.send(getTasks);
    } catch (error) {
        console.log(error)
    }
}
);

const port = process.env.PORT

app.listen(port,()=>console.log("server is running..."));