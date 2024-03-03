import { Model } from "sequelize";
import { Request } from "express";
import UserDTO from "../dtos/user-dto.js";

export interface IUserAttributes extends Model {
  id: number;
  email: string;
  password: string;
  isActivated: boolean;
}

export interface IRequestWithUser extends Request {
  user?: UserDTO;
}
