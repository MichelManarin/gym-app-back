import { Response } from "express"

export class ApiResponse {
  static success(res: Response, data: any, message: string = "Operação bem-sucedida", statusCode: number = 200): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, error: any, message: string = "Ocorreu um erro", statusCode: number = 500): void {
    res.status(statusCode).json({
      success: false,
      message,
      error: error instanceof Error ? error.message : error,
    });
  }
}
