import { Router } from "express";
import jwt from 'jsonwebtoken';
import { authRouter } from "./auth/auth.js";
import { prismaClient } from "../db/index.js";
import { authMiddleware } from "../middleware.js";
const router = Router();
router.use('/auth', authRouter);
router.get('/', authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id,
        }, select: {
            email: true,
            name: true,
            workplaces: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    projects: {
                        select: {
                            id: true,
                            name: true,
                            document_count: true,
                            createdAt: true,
                            workplaceId: true,
                            documents: {
                                select: {
                                    id: true,
                                    name: true,
                                    s3_link: true,
                                    document_type: true,
                                    projectId: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    res.json({
        user
    });
});
export const userRouter = router;
//# sourceMappingURL=user.js.map