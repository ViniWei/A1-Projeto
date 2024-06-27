import { Route, Post, Body, Delete, Get, Controller } from 'tsoa'
import { UserModel as User } from '../models/UserModel'

@Route("users")
export default class UserController extends Controller {

    @Get("/getAll")
    public async getAll() {
        try {
            const userList = User.find();
            return userList;
        } catch {
            return "Internal server error";
        }
    }

    @Post("/login")
    public async login(@Body() body: { email: string, password: string }) : Promise<{sucess: boolean, user?: object}> {
        try {
            const user = await User.findOne({email: body.email}).exec();

            if (!user) {
                return { sucess: false }; 
            }

            if (user.password != body.password) {
                return { sucess: false }; 
            }

            console.log(user)
            return { sucess: true, user: { name: user.name, email: user.email, password: user.password } }; 
        } catch {
            return { sucess: false }; 
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

    @Post("/update/{id}")
    public async update(id: string, @Body() body: { name: string, email: string, password: string }): Promise<string> {

        try {

            const data = new User({
                _id: id,
                name: body.name,
                email: body.email,
                password: body.password
            })

            const user = await User.findByIdAndUpdate(id, data);
            console.log("user:", user);
            if (!user) {
                return "User not found"
            }

            return "User updated";
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
