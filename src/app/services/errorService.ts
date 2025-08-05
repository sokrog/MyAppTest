import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export class ApplicationError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as ApiError).data.message === 'string'
  );
};

export const formatError = (error: unknown): string => {
  if (error instanceof ApplicationError) {
    return error.message;
  }

  if (isApiError(error)) {
    return error.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as FetchBaseQueryError | SerializedError;
    
    // Handle API errors
    if ('status' in error && 'data' in error) {
      const endpoint = action.meta?.arg && typeof action.meta.arg === 'object' && 'endpointName' in action.meta.arg
        ? action.meta.arg.endpointName
        : 'unknown';
      
      console.error('API Error:', {
        status: error.status,
        data: error.data,
        endpoint,
      });
    }
    // Handle other errors
    else if ('message' in error) {
      console.error('Action Error:', {
        message: error.message,
        name: error.name,
        code: error.code,
        action: action.type,
      });
    }
  }

  return next(action);
};

export const handleError = (error: unknown): ApplicationError => {
  if (error instanceof ApplicationError) {
    return error;
  }

  if (isApiError(error)) {
    return new ApplicationError(
      error.data.message,
      String(error.status),
      error.data.errors
    );
  }

  if (error instanceof Error) {
    return new ApplicationError(error.message);
  }

  return new ApplicationError('An unexpected error occurred');
};