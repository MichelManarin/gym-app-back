import { Request, Response } from "express";
import { ApiResponse } from "../../../infrastructure/http/api.response";

export class ChallengeController {
  constructor() { }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const mockData = [
        { id: "1", externalId: "1", title: "Caminhada Semanal 🔥", steps: "10000 Passos" },
        { id: "2", externalId: "2", title: "Corrida de Quarta 🏃‍♂️", steps: "Completar 5 km" },
        { id: "3", externalId: "3", title: "Meditação Diária 🧘", steps: "10 mins" },
        { id: "4", externalId: "4", title: "Musc. Semanal 💪", steps: "2 horas" },
        { id: "5", externalId: "9999", title: "Adicionar", steps: "-" },
      ];

      ApiResponse.success(res, mockData, "Dados recuperados com sucesso");
    } catch (error) {
      ApiResponse.error(res, error, "Erro ao recuperar os dados");
    }
  }
}
