import { z } from "zod";

export const singUpSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório." })
    .email({ message: "Coloque um emáil válido." }),
  password: z
    .string({ message: "Senha é obtigatório." })
    .min(4, { message: "Senha deve conter ao menos 4 caracteres." }),
});
