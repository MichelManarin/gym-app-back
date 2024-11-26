import { Request, Response } from "express";
import { ApiResponse } from "../../../infrastructure/http/api.response";

export class MetricController {
  constructor() { }

  async getInformation(req: Request, res: Response): Promise<void> {
    try {
      const period = req.query.period || "Hoje";

      const mockData = {
        period: period,
        calories: {
          consumed: 1500,
          burned: 1200,
        },
        steps: 2546,
        sleep: "8h 46m",
        workout: "1h 26m",
        meditation: "0 mins",
      };

      ApiResponse.success(res, mockData, "Dados recuperados com sucesso");
    } catch (error) {
      ApiResponse.error(res, error, "Erro ao recuperar os dados");
    }
  }
}
