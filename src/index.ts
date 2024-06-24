import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import userRoutes from './routes/UserRoutes'
import projectsRoutes from './routes/ProjectRoutes'
import swaggerUi from 'swagger-ui-express'
import { connect } from "./service/database"
	
dotenv.config();
	
const app: Express = express();

const port = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL || "";

connect(DATABASE_URL);

app.use(cors({
    origin: "*"
}))
app.use(express.json())
	
app.get("/", (_req: Request, res: Response) => {
  res.send("Working!");
});

app.use("/users/", userRoutes);
app.use("/projects/", projectsRoutes);

app.use(
    "/swagger", /* endereço do swagger */
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: ".public/swagger.json",
      },
    })
);

// Better return on route not found //
app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({
    message: "Route not Found",
  });
});
//
	
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
