import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { mainRouter } from "./router/main.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// API
app.use("/api/v1/", mainRouter);
// Create project
// Edit project
// Usage 
// Workplace list
// project list 
// project details
// delete project
// create workplace
// delete workplace
// get workplace
// upload document
// edit document
// delete document
// get document
// health check
app.get('/healthy', (req, res) => {
    res.json({
        "message": "Yeah I am alive"
    });
});
app.listen(3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map