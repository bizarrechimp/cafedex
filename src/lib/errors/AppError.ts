/**
 * Custom Application Error Classes
 * Provides typed error handling with HTTP status codes
 */

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class CafeNotFoundError extends AppError {
  constructor(slug: string) {
    super(`Café con slug "${slug}" no encontrado`, 404);
    Object.setPrototypeOf(this, CafeNotFoundError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Error de conexión a la base de datos') {
    super(message, 500);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'Timeout en la solicitud') {
    super(message, 504);
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Demasiadas solicitudes') {
    super(message, 429);
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}
