import { CustomError } from "./custom.errors.js";

export class MaximumAgeError extends CustomError {
  constructor({
    message,
    additionalInfo,
  }: {
    message: string;
    additionalInfo?: string;
  }) {
    super({
      code: 400,
      message,
      additionalInfo,
    });
    this.name = "MaximumAgeError";
  }
}
