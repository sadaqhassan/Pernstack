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
        res.json({success:true,newTask});
    } catch (error) {
        console.log(error)
    }
})


// ..getTsks

app.get('/get-tasks',async(req,res)=>{
    try {
        const getTasks = await pooling.query(
            `
            SELECT * FROM TASKS 
            `
        );
        res.json({data:getTasks.rows});
    } catch (error) {
        console.log(error)
    }
}
);


app.delete('/delete-task/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const task = await pooling.query(`
            DELETE FROM  tasks WHERE id = $1
            `,[id]);
            res.json({success:true,message:"deleted successfully"})
    } catch (error) {
        console.log(error)
    }
})

app.put('/update-task/:id',async(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    try {
        const task = await pooling.query(
            `
            UPDATE  tasks SET name = $2 WHERE id = $1 RETURNING *
            `[id,name]
        );

        res.json({success: true , message:"update succesfully"})
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT

app.listen(port,()=>console.log("server is running..."));