import { Model } from "sequelize";

export interface IUserAttributes extends Model {
  id: number;
  email: string;
  password: string;
  isActivated: boolean;
}
