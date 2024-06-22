import { Route, Post, Body, Delete, Get, Controller } from 'tsoa'
import { ProjectModel as Project } from '../models/ProjectModel'


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
    public async create(@Body() body: { name: string, userId: string, cards: Array<{id: string, name: string, priority: Number, columnIndex: Number }>}): Promise<string> {
        const data = new Project({
            name   : body.name,
            userId : body.userId,
            cards  : []
        })

        try {
            await data.save();
            return "Ok"
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
                return "Project deleted"
            } catch {
                return "Internal server error";
            }
    }
}
