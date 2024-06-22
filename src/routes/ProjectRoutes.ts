import express, { Request, Response } from "express";
import ProjectController from '../controllers/ProjectController'

const router = express.Router()

router.get("/getAll", async (_req: Request, res: Response) => {
    const controller = new ProjectController();
    const response = await controller.getAll();
    return res.send(response)
})

router.post("/create", async (req: Request, res: Response) => {
    const controller = new ProjectController();
    const response = await controller.create(req.body);
    return res.send(response)
})

//router.put("/update/:id", async (req: Request, res: Response) => {
//    const id = req.params.id;
//
//    const controller = new UserController();
//    const response = await controller.update(id, req.body);
//    return res.send(response)
//})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    const controller = new ProjectController();
    const response = await controller.remove(id);
    return res.send(response)
})

export default router;
