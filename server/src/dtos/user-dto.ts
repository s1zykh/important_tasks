import { IUserAttributes } from "../types/IUser.js";

export default class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model: IUserAttributes) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
