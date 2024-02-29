import { body } from "express-validator";
// import { UserRoles } from '../models/IUser.js'

const authValidation = [
  body("email")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Обязательное поле!")
    .toLowerCase()
    .isEmail()
    .withMessage("Некорректный Email"),
  body("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Обязательное поле!")
    .isLength({ min: 8, max: 256 })
    .withMessage("Не менее 8 и не более 256 символов"),
  body("roles")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Нет роли"),
];

export default authValidation;
