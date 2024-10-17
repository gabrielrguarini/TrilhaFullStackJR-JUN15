import { z } from "zod";

export const editUserSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório." })
    .email({ message: "Coloque um emáil válido." }),
});
