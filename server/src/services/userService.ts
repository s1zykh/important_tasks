import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

import mailService from "./mailService.js";
import { Users } from "../models/models.js";
import tokenService from "./tokenService.js";
import UserDTO from "../dtos/user-dto.js";
import { IUserAttributes } from "../types/IUser.js";
import ApiError from "../exceptions/apiError.js";

dotenv.config();

class UserService {
  async registration(email: string, password: string) {
    const candidate = await Users.findOne({
      where: { email },
    });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password.toString(), 7);
    const activationLink: string = uuidv4();
    const user = (await Users.create({
      email,
      password: hashPassword,
    })) as unknown as IUserAttributes;

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = (await Users.findOne({
      where: { activationLink },
    })) as unknown as IUserAttributes;
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    user.save();
  }

  async login(email: string, password: string) {
    const user = (await Users.findOne({
      where: { email },
    })) as unknown as IUserAttributes;
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const isPassEquals = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken); //поменять тип
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }
    const user = await Users.findByPk(userData.id);
    const userDto = new UserDTO(user as unknown as IUserAttributes);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
