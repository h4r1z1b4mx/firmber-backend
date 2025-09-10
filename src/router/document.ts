import { Router } from "express";

const router = Router();

router.get('/',(req,res)=> {
    // list the document
});

router.post('/upload', (req, res) => {
    // to upload the document
});

router.post('/edit', (req, res) => {
    // edit the project like delete multiple documents
});

router.delete('/', (req, res) => {
    // delete a documents
});



export const documentRouter = router;