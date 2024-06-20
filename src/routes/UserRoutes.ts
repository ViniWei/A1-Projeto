import express, { Request, Response } from "express";
import UserController from '../controllers/UserController'

const router = express.Router()

router.get("/getAll", async (req: Request, res: Response) => {
    console.log("req:", req.body);
    const controller = new UserController();
    const response = await controller.getAll();
    return res.send(response)
})

router.post("/create", async (req: Request, res: Response) => {
    console.log("req:", req.body);
    const controller = new UserController();
    const response = await controller.create(req.body);
    return res.send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)

    const controller = new UserController();
    const response = await controller.remove(id);
    return res.send(response)
})

export default router;
