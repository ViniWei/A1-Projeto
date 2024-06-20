import { Route, Post, Body, Delete, Get } from 'tsoa'
import { UserModel as User } from '../models/UserModel'

@Route("users")
export default class UserController {
    @Get("/getAll")
    public async getAll() {
        try {
            const userList = User.find();
            return userList;
        } catch {
            return "Internal server error";
        }
    }

    @Post("/create")
    public async create(@Body() body: { name: string, email: string, password: string }): Promise<string> {
        const data = new User({
            name: body.name,
            email: body.email,
            password: body.password
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
                const user = await User.findByIdAndDelete(id);

                if (!user) {
                    return "User not found";
                }
                return "User deleted"
            } catch {
                return "Internal server error";
            }
    }
}
