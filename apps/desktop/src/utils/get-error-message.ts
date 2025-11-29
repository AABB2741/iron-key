import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string | null {
  if (
    isAxiosError(error) &&
    error.response?.data &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return null;
}
