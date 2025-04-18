// backend/src/controllers/MessageController.ts
import { Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
  const { to, message } = req.body;

  // Simulação de envio de mensagem
  console.log(`Enviando mensagem para ${to}: ${message}`);
  return res.json({ status: "Mensagem enviada" });
};

export const getMessages = async (req: Request, res: Response) => {
  const messages = [
    { id: 1, from: "cliente1", message: "Olá" },
    { id: 2, from: "cliente2", message: "Preciso de ajuda" }
  ];
  return res.json(messages);
};
