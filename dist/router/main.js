import { Router } from "express";
import { userRouter } from "./user.js";
import { workplaceRouter } from "./workplace.js";
import { projectRouter } from "./project.js";
import { documentRouter } from "./document.js";
const router = Router();
router.use('/user', userRouter);
router.use('/workplace', workplaceRouter);
router.use('/project', projectRouter);
router.use('/document', documentRouter);
router.get('/usage', (req, res) => {
    res.json({
        message: "Usage details will be here"
    });
});
export const mainRouter = router;
//# sourceMappingURL=main.js.map