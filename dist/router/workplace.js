import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { WorkplaceSchema } from "../types/index.js";
import { prismaClient } from "../db/index.js";
const router = Router();
router.get('/', authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const workplaces = await prismaClient.workplace.findMany({});
    res.json({
        workplaces
    });
});
router.get('/:workplaceId', authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const workplaceId = req.params.workplaceId;
    const workplace = await prismaClient.workplace.findUnique({
        where: {
            //@ts-ignore
            id: workplaceId,
            userId: id
        }, select: {
            name: true,
            projects: {
                select: {
                    name: true,
                    id: true,
                    createdAt: true,
                    document_count: true,
                    documents: {
                        select: {
                            id: true,
                            name: true,
                            s3_link: true,
                            projectId: true,
                        }
                    }
                }
            }
        }
    });
    if (!workplace) {
        res.status(404).json({
            message: "workplace is not present"
        });
    }
    res.status(200).json({
        data: workplace
    });
});
router.post('/create', authMiddleware, async (req, res) => {
    // to create a workplace
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = WorkplaceSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    await prismaClient.workplace.create({
        data: {
            //@ts-ignore
            name: parsedData.data?.name,
            projects: {
                create: []
            }
        }
    });
    res.status(200).json({
        message: "Workplace created successfully"
    });
});
router.delete('/delete/:workplaceId', authMiddleware, async (req, res) => {
    // to delete a workplace
    //@ts-ignore
    const id = req.id;
    const workplaceId = req.params.workplaceId;
    await prismaClient.workplace.delete({
        where: {
            //@ts-ignore
            id: workplaceId,
            userId: id
        }
    });
    res.status(200).json({
        message: "deleted a workplace"
    });
});
export const workplaceRouter = router;
//# sourceMappingURL=workplace.js.map