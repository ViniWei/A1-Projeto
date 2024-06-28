import express, { Request, Response } from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/getAll", async (_req: Request, res: Response) => {
  const controller = new UserController();
  const response = await controller.getAll();
  return res.status(200).send(response);
});

// router.get("/getById/:id", async (_req: Request, res: Response) => {
//   const controller = new UserController();
//   const { id } = _req.params;
//   const response = await controller.getById(id);
//   return res.send(response);
// });

router.post("/create", async (req: Request, res: Response) => {
  const controller = new UserController();
  const response = await controller.create(req.body);
  return res.status(201).send(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const controller = new UserController();
  const response = await controller.login(req.body);
  return res.status(200).send(response);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const controller = new UserController();
  const response = await controller.update(id, req.body);
  return res.status(200).send(response);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const controller = new UserController();
  const response = await controller.remove(id);
  return res.status(204).send(response);
});

export default router;
