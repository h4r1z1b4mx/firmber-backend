import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { prismaClient } from "../db/index.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
const router = Router();
const storage  = multer.memoryStorage();
const upload = multer({storage});

const s3 = new S3Client({
  region: process.env.PUBLIC_AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});


router.get('/', authMiddleware, async (req, res) => {
    try {
        // list the document
        //@ts-ignore
        const id = req.id;
        const documents = await prismaClient.document.findMany({
            where: {
                project: {
                    userId: id
                }
            },
            include: {
                project: {
                    select: {
                        name: true,
                        workplace: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch documents" });
    }
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
   console.log("Hi there");
    try {
      // @ts-ignore
      const id = req.id;
      const body = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const key = `${id}/${body.workplaceId}/${body.projectId}/${body.documentType}/${Date.now()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.PUBLIC_AWS_S3_BUCKET_NAME || "",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

        console.log("Step 1: File received", file.originalname);
        console.log("Step 2: Uploading to S3...");
        await s3.send(command);
        console.log("Step 3: Uploaded to S3");

      const s3Link = `https://${process.env.PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.PUBLIC_AWS_REGION}.amazonaws.com/${key}`;

      await prismaClient.document.create({
        data: {
          // @ts-ignore
          name: body.documentType,
          // @ts-ignore
          projectId: parseInt(body.projectId), // This should be projectId, not workplaceId
          
          s3_link: s3Link,
          // @ts-ignore
          document_type: body.documentType, // Use document_type to match schema
        },
      });

      res.json({ message: "Document uploaded successfully",name: body.documentType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "File upload failed" });
    }
  }
);
router.post('/edit', authMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        const { documentId, name, document_type } = req.body;
        
        if (!documentId) {
            return res.status(400).json({ message: "Document ID is required" });
        }

        // First check if the document belongs to the user through project
        const document = await prismaClient.document.findFirst({
            where: {
                id: documentId,
                project: {
                    userId: id
                }
            }
        });

        if (!document) {
            return res.status(404).json({ message: "Document not found or access denied" });
        }

        const updatedDocument = await prismaClient.document.update({
            where: {
                id: documentId
            },
            data: {
                ...(name && { name }),
                ...(document_type && { document_type })
            }
        });

        res.json({
            message: "Document updated successfully",
            document: updatedDocument
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update document" });
    }
});

router.delete('/:documentId', authMiddleware, async (req, res) => {
    try {
        const { documentId } = req.params;
        //@ts-ignore
        const userId = req.id;

        if (!documentId) {
            return res.status(400).json({ message: "Document ID is required" });
        }

        const docId = parseInt(documentId);
        if (isNaN(docId)) {
            return res.status(400).json({ message: "Invalid document ID" });
        }

        // First check if the document belongs to the user
        const document = await prismaClient.document.findFirst({
            where: {
                id: docId,
                project: {
                    userId: userId
                }
            }
        });

        if (!document) {
            return res.status(404).json({ message: "Document not found or access denied" });
        }

        await prismaClient.document.delete({
            where: {
                id: docId
            }
        });
        
        res.json({
            message: "Document deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete document" });
    }
});



export const documentRouter = router;