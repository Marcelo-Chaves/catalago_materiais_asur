import { z } from "zod";

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  descricao: z
    .string()
    .min(3, "Descrição obrigatória"),

  categoria_id: z
    .number(),

  quantidade: z
    .number()
    .min(0),

  imagem: z
    .string()
    .nullable()
    .optional()
});