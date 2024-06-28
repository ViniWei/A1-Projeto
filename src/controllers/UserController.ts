import { Route, Post, Body, Delete, Get, Controller } from "tsoa";
import { UserModel as User, UserModel } from "../models/UserModel";
import { JsonObject } from "swagger-ui-express";

@Route("users")
export default class UserController extends Controller {
  @Get("/getAll")
  public async getAll() {
    try {
      const userList = User.find();
      return userList;
    } catch {
      return { message: "Internal server error" };
    }
  }

  //   @Get("/getById/:id")
  //   public async getById(id: string) {
  //     try {
  //       const user = await User.findById(id).select("name email _id");

  //       if (!user) {
  //         return { message: "User not found" };
  //       }

  //       return user;
  //     } catch (error) {
  //       console.error("Error fetching user by ID:", error);
  //       return { message: "Internal server error" };
  //     }
  //   }

  @Post("/login")
  public async login(
    @Body() body: { email: string; password: string }
  ): Promise<{ sucess: boolean; user?: object }> {
    try {
      const user = await User.findOne({ email: body.email }).exec();

      if (!user) {
        return { sucess: false };
      }

      if (user.password != body.password) {
        return { sucess: false };
      }

      console.log(user);
      return {
        sucess: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      };
    } catch {
      return { sucess: false };
    }
  }

  @Post("/create")
  public async create(
    @Body() body: { name: string; email: string; password: string }
  ): Promise<JsonObject> {
    const data = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    try {
      const res = await data.save();
      return res;
    } catch (error) {
      return { error };
    }
  }

  @Post("/update/{id}")
  public async update(
    id: string,
    @Body() body: { name: string; email: string; password: string }
  ): Promise<JsonObject | string> {
    try {
      const data = new User({
        _id: id,
        name: body.name,
        email: body.email,
        password: body.password,
      });

      const user = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("user:", user);
      if (!user) {
        return { message: "User not found" };
      }

      return user;
    } catch (error) {
      return { error };
    }
  }

  @Delete("/delete/{id}")
  public async remove(id: string): Promise<JsonObject> {
    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return { message: "User not found" };
      }
      return { message: "User deleted" };
    } catch {
      return { message: "Internal server error" };
    }
  }
}
