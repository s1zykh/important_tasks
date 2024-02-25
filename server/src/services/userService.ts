import bcrypt from "bcrypt";
import { Users } from "../models/models.js";

class userService {
  async registration(email: string, password: string) {
    const candidate = await Users.findOne({
      where: { email },
    });

    const hashPassword = await bcrypt.hash(password.toString(), 7);

    const user = await Users.create({
      email,
      password: hashPassword,
    });

    // if (candidate) {
    //   return res
    //     .status(400)
    //     .json(`Пользователь с почтовым адресом ${email} уже существует`);
    // }
  }
}
