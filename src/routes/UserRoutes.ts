import express, { Request, Response } from "express";
import UserController from '../controllers/UserController'

const router = express.Router()

router.post("/create", async (req: Request, res: Response) => {
    console.log("req:", req);
    const controller = new UserController();
    const response = await controller.create(req.body);
    return res.send(response)
})

export default router;
