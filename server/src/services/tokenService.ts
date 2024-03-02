import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserDto from "../dtos/user-dto.js";
import { Tokens } from "../models/models.js";
dotenv.config();
class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokenData: any = await Tokens.findOne({ where: { UserId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
    }
    const token = await Tokens.create({ UserId: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken: string) {
    const tokenData = await Tokens.destroy({ where: { refreshToken } });
    return tokenData;
  }
  async findToken(refreshToken: string) {
    const tokenData = await Tokens.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

export default new TokenService();
