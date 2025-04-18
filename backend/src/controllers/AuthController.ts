// backend/src/controllers/AuthController.ts
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Simulação de login
  if (username === "admin" && password === "admin") {
    return res.json({ token: "fake-jwt-token" });
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
};
