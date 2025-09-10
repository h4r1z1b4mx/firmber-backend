import { Router } from "express";

const router = Router();

router.get('/',(req,res)=> {
    // list the projects
});

router.get('/',  ()=> {
    // To get the particular project
});

router.post('/create', (req, res) => {
    // create a project
});

router.post('/edit', (req, res) => {
    // edit the project like delete multiple documents
});

router.delete('/', (req, res) => {
    // delete a documents
});



export const projectRouter = router;