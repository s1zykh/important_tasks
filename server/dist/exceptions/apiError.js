class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static BadValidation(errors = []) {
        return new ApiError(422, "Ошибка при валидации", errors);
    }
    static Unauthorized() {
        return new ApiError(401, "Пользователь не авторизован");
    }
    static TokenExpiredError() {
        return new ApiError(401, "Срок действия токена истек");
    }
    static JsonWebTokenError() {
        return new ApiError(401, "Недействительный токен");
    }
    static ForbiddenError() {
        return new ApiError(403, "Запрещенный");
    }
    static InternalError(message, errors) {
        return new ApiError(500, message, errors);
    }
}
export default ApiError;
