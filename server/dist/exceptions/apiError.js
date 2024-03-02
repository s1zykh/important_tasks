class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    //    static BadValidation(errors: unknown[] = []): ApiError {
    //     return new ApiError(422, "Ошибка при валидации", errors);
    //   }
    static Unauthorized() {
        return new ApiError(401, "Пользователь не авторизован");
    }
}
export default ApiError;
