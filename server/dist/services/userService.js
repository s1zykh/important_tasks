import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import mailService from "./mailService.js";
import { Users } from "../models/models.js";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/apiError.js";
dotenv.config();
class UserService {
    async registration(email, password) {
        const candidate = await Users.findOne({
            where: { email },
        });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password.toString(), 7);
        const activationLink = uuidv4();
        const user = (await Users.create({
            email,
            password: hashPassword,
        }));
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto,
        };
    }
    async activate(activationLink) {
        const user = (await Users.findOne({
            where: { activationLink },
        }));
        if (!user) {
            throw ApiError.BadRequest("Неккоректная ссылка активации");
        }
        user.isActivated = true;
        user.save();
    }
}
export default new UserService();
