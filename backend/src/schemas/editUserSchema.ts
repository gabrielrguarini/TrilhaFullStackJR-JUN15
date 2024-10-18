import { z } from "zod";

export const editUserSchema = z.object({
  password: z
    .string({ message: "Senha é obtigatório." })
    .min(4, { message: "Senha deve conter ao menos 4 caracteres." }),
});
