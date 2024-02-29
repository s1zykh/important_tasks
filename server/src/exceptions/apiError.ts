class ApiError extends Error {
  status: number;
  errors: unknown[];

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string): ApiError {
    return new ApiError(400, "Некорректный запрос", [{ message }]);
  }

  //    static BadValidation(errors: unknown[] = []): ApiError {
  //     return new ApiError(422, "Ошибка при валидации", errors);
  //   }

  static Unauthorized(): ApiError {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static TokenExpiredError(): ApiError {
    return new ApiError(401, "Срок действия токена истек");
  }

  static JsonWebTokenError(): ApiError {
    return new ApiError(401, "Недействительный токен");
  }

  static ForbiddenError(): ApiError {
    return new ApiError(403, "Запрещенный");
  }

  public static InternalError(message: string, errors: unknown[]): ApiError {
    return new ApiError(500, message, errors);
  }
}

export default ApiError;
