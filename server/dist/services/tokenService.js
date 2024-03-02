import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Tokens } from "../models/models.js";
dotenv.config();
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Tokens.findOne({ where: { UserId: userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        }
        const token = await Tokens.create({ UserId: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await Tokens.destroy({ where: { refreshToken } });
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await Tokens.findOne({ where: { refreshToken } });
        return tokenData;
    }
}
export default new TokenService();
