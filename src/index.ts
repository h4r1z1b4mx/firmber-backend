import express from "express";
import cors from 'cors';
import  dotenv from 'dotenv'
import { userRouter } from "./router/user.js";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());


// API
app.use("/api/v1/user",userRouter);



// health check
app.get('/healthy',(req, res) => {
    res.json({
        "message":"Yeah I am alive"
    });
}); 




app.listen(3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});