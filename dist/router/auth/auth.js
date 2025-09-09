import { Router } from "express";
import jwt from 'jsonwebtoken';
import { SigninScheme, SignupSchema } from "../../types/index.js";
import { prismaClient } from "../../db/index.js";
import { JWT_PASSWORD } from "../../config.js";
const router = Router();
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const userExists = await prismaClient.user.findFirst({
        //@ts-ignore
        where: {
            email: parsedData.data?.email
        }
    });
    if (userExists) {
        res.status(403).json({
            message: "User already exists"
        });
    }
    await prismaClient.user.create({
        data: {
            //@ts-ignore
            email: parsedData.data?.email,
            //@ts-ignore
            password: parsedData.data?.password
        }
    });
    res.json({
        message: "Account created successfully"
    });
});
router.post("/login", async (req, res) => {
    const body = req.body;
    const parsedData = SigninScheme.safeParse(body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const user = await prismaClient.user.findFirst({
        //@ts-ignore
        where: {
            email: parsedData.data?.email,
            password: parsedData.data?.password
        }
    });
    if (!user) {
        res.status(403).json({
            message: "Sorry credentials are incorrect"
        });
    }
    //Sign the jwt
    const token = jwt.sign({
        //@ts-ignore
        id: user.id
    }, JWT_PASSWORD);
    res.json({
        token: token
    });
});
export const authRouter = router;
//# sourceMappingURL=auth.js.map