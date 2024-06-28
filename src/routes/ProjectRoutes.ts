import express, { Request, Response } from "express";
import ProjectController from "../controllers/ProjectController";

const router = express.Router();

router.get("/getAll", async (_req: Request, res: Response) => {
  const controller = new ProjectController();
  const response = await controller.getAll();
  return res.status(200).send(response);
});

router.post("/create", async (req: Request, res: Response) => {
  const controller = new ProjectController();
  const response = await controller.create(req.body);
  return res.status(201).send(response);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const controller = new ProjectController();
  const response = await controller.update(id, req.body);
  return res.status(200).send(response);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const controller = new ProjectController();
  const response = await controller.remove(id);
  return res.status(204).send(response);
});

router.post("/addCard/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const controller = new ProjectController();
  const response = await controller.addCard(id, req.body);
  return res.status(200).send(response);
});

export default router;
