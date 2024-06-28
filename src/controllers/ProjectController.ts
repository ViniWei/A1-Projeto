import { Route, Post, Body, Delete, Get, Controller } from "tsoa";
import { ICard, ProjectModel as Project } from "../models/ProjectModel";
import { JsonObject } from "swagger-ui-express";

interface CardDTO {
  name: string;
  priority: number;
  columnIndex: number;
}

@Route("projects")
export default class ProjectController extends Controller {
  @Get("/getAll")
  public async getAll() {
    try {
      const projectList = Project.find();
      return projectList;
    } catch {
      return "Internal server error";
    }
  }

  @Post("/create")
  public async create(
    @Body()
    body: {
      name: string;
      userId: string;
      cards: Array<{
        id: string;
        name: string;
        priority: Number;
        columnIndex: Number;
      }>;
    }
  ): Promise<JsonObject> {
    const data = new Project({
      name: body.name,
      userId: body.userId,
      cards: [],
    });

    try {
      const project = await data.save();
      return { project };
    } catch (error) {
      return { error };
    }
  }

  @Post("/update/{id}")
  public async update(
    id: string,
    @Body()
    body: {
      name: string;
      userId: string;
      cards: Array<{
        id: string;
        name: string;
        priority: Number;
        columnIndex: Number;
      }>;
    }
  ): Promise<string> {
    try {
      const data = new Project({
        _id: id,
        name: body.name,
        userId: body.userId,
        cards: body.cards,
      });

      const project = await Project.findByIdAndUpdate(id, data);
      console.log("Project:", project);
      if (!project) {
        return "Project not found";
      }

      return "Project updated";
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Delete("/remove/{id}")
  public async remove(id: string): Promise<string> {
    try {
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        return "Project not found";
      }
      return "Project deleted";
    } catch {
      return "Internal server error";
    }
  }

  @Post("/addCard/{id}")
  public async addCard(
    id: string,
    @Body()
    card: CardDTO
  ): Promise<JsonObject> {
    try {
      const project = await Project.findById(id);

      if (!project) {
        return { error: "Project not found" };
      }

      const newCard: any = {
        name: card.name,
        priority: card.priority,
        columnIndex: card.columnIndex,
      };

      project.cards.push(newCard);
      await project.save();

      return { project };
    } catch (error) {
      return { error };
    }
  }
}
