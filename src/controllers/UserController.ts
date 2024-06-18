import { Route, Post, Body } from 'tsoa'
import { UserModel } from '../models/UserModel'

@Route("api/user")
export default class UserController {
    @Post("/create")
    public async create(@Body() body: { name: string, email: string, password: string }): Promise<string> {
        try {
            return body.name;
        } catch(e) {
            console.log(e);
            return JSON.stringify(e);
        }

        const data = new UserModel({
            name: body.name,
            email: body.email,
            password: body.password
        })

        try {
            data.save()
            return "Ok"
        } catch (error) {
            return JSON.stringify(error)
        }
    }
}
