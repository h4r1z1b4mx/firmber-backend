import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { prismaClient } from "../db/index.js";
import { parse } from "path";
const router = Router();
router.get('/', authMiddleware, async (req, res) => {
    // list the projects
    //@ts-ignore
    const id = req.id;
    const projects = await prismaClient.project.findMany({
        where: {
            //@ts-ignore
            userId: id
        }
    });
    res.json(projects);
});
router.get('/:projectId', authMiddleware, async (req, res) => {
    // To get the particular project
    //@ts-ignore
    const id = req.id;
    const { projectId } = req.params;
    const project = await prismaClient.project.findUnique({
        where: {
            //@ts-ignore
            id: parseInt(projectId),
            userId: id
        }
    });
    res.json(project);
});
router.post('/create', authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    await prismaClient.project.create({
        data: {
            //@ts-ignore
            name: body.name,
            document_count: body.document_count,
            //@ts-ignore
            userId: id,
            //@ts-ignore
            workplaceId: body.workplaceId,
            documents: { create: [] }
        }
    });
    res.json({
        message: "Project created successfully"
    });
});
router.post('/edit', authMiddleware, async (req, res) => {
    // edit the project like delete multiple documents
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    const selectedProject = req.body.selectedProject;
    await prismaClient.project.deleteMany({
        where: {
            //@ts-ignore
            id: {
                in: selectedProject
            }
        },
    });
    res.json({
        message: "Project updated successfully"
    });
});
router.delete('/:projectId', authMiddleware, async (req, res) => {
    const { projectId } = req.params;
    await prismaClient.project.delete({
        where: {
            //@ts-ignore
            id: parseInt(projectId)
        }
    });
    res.json({
        message: "Project deleted successfully"
    });
});
export const projectRouter = router;
//# sourceMappingURL=project.js.map