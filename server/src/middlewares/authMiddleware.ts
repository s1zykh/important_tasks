import { NextFunction, Response } from "express";
import pkg from "jsonwebtoken";
import UserDTO from "../dtos/user-dto.js";
import ApiError from "../exceptions/apiError.js";
import { IUserAttributes, IRequestWithUser } from "../types/IUser.js";
import tokenService from "../services/tokenService.js";

function authMiddleware(
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.Unauthorized());
    }

    const bearer: string = authorizationHeader.split(" ")[0];
    if (bearer !== "Bearer") {
      return next(ApiError.ForbiddenError());
    }

    const accessToken: string = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.JsonWebTokenError());
    }

    const userTokenData: any = tokenService.validateAccessToken(accessToken);

    if (!userTokenData) {
      return next(ApiError.ForbiddenError());
    }

    if (userTokenData instanceof pkg.JsonWebTokenError) {
      return next(ApiError.JsonWebTokenError());
    }

    const userDto = new UserDTO(userTokenData as IUserAttributes);
    req.user = userDto;
    next();
  } catch (error: any) {
    return next(ApiError.InternalError(error.message, error));
  }
}

export default authMiddleware;
