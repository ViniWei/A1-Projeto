import { Route, Post, Body, Delete } from 'tsoa'
import { UserModel } from '../models/UserModel'

@Route("users")
export default class UserController {
    @Post("/create")
    public async create(@Body() body: { name: string, email: string, password: string }): Promise<string> {
        const data = new UserModel({
            name: body.name,
            email: body.email,
            password: body.password
        })

        try {
            await data.save()
            return "Ok"
        } catch (error) {
            return JSON.stringify(error)
        }
    }

    @Delete("/remove/{id}")
    public async remove(id: string): Promise<string> {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            console.log("user:", user);

            if (!user) {
                return "User not found"
            }

            return "User deleted"
        } catch (error) {
            return JSON.stringify(error)
        }
    }
}
