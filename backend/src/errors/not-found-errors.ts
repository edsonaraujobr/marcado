import { CustomError } from "./custom.errors.js";

export class NotFoundError extends CustomError {
  constructor({
    message,
    additionalInfo,
  }: {
    message: string;
    additionalInfo?: string;
  }) {
    super({
      code: 404,
      message,
      additionalInfo,
    });
    this.name = "notFoundError";
  }
}
