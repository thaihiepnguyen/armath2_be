import express, {Express, Request, Response} from 'express';
import 'dotenv/config'
import db from './util/db.js';
import { log } from 'console';
 // Add type declaration for the imported module
const app : Express = express();
//Test the connection
app.get('/', async (req: Request, res: Response) => {
    // try{
    //     const result=await db.raw('SELECT *  FROM users');
    //     log(result);
    // }
    // catch(err){
    //     console.log(err);
    // }
    res.send("Hello World!!!");
})

// Start the server
app.listen(process.env.PORT, () => {
    //try to connect to the database
    try{
        db.raw('SELECT 1+1 as result').then(() => {
            console.log('Database connected');
        })
    }
    catch(err){
        console.log(err);
    }
    console.log(`Server is running on port http://127.0.0.1:${process.env.PORT}`);
})