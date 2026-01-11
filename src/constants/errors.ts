/**
 * Error Codes and HTTP Status Codes
 */

export const errorCodes = {
  // HTTP Status Codes
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_403_FORBIDDEN: 403,
  HTTP_404_NOT_FOUND: 404,
  HTTP_500_INTERNAL_SERVER_ERROR: 500,
  HTTP_503_SERVICE_UNAVAILABLE: 503,

  // Application Error Codes
  CAFE_NOT_FOUND: 'CAFE_NOT_FOUND',
  INVALID_SLUG: 'INVALID_SLUG',
  DATABASE_ERROR: 'DATABASE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];

export const errorMessages: Record<ErrorCode, string> = {
  [errorCodes.HTTP_400_BAD_REQUEST]: 'Solicitud inválida',
  [errorCodes.HTTP_401_UNAUTHORIZED]: 'No autorizado',
  [errorCodes.HTTP_403_FORBIDDEN]: 'Acceso denegado',
  [errorCodes.HTTP_404_NOT_FOUND]: 'No encontrado',
  [errorCodes.HTTP_500_INTERNAL_SERVER_ERROR]: 'Error del servidor',
  [errorCodes.HTTP_503_SERVICE_UNAVAILABLE]: 'Servicio no disponible',
  [errorCodes.CAFE_NOT_FOUND]: 'Café no encontrado',
  [errorCodes.INVALID_SLUG]: 'Slug de café inválido',
  [errorCodes.DATABASE_ERROR]: 'Error de base de datos',
  [errorCodes.VALIDATION_ERROR]: 'Error de validación',
};
