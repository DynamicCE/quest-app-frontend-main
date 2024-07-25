interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const handleError = (error: unknown): string => {
  const apiError = error as ApiError;
  return apiError.response?.data?.message || "An unexpected error occurred";
};
