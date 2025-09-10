import { Router } from "express";
import { authMiddleware } from "../middleware.js";
const router = Router();

router.get('/',authMiddleware, (req, res) =>{
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    
});

router.post('/create',() => {
    // to create a workplace
});

router.delete('/delete', () => {
    // to delete a workplace
});

export const workplaceRouter = router;