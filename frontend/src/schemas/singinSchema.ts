import { z } from "zod";

export const singinSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório" })
    .email({ message: "Coloque um email válido" }),
  password: z
    .string({ message: "Email é obrigatório" })
    .min(4, { message: "Senha deve ter pelo menos 4 caracteres" }),
});

export type SingIn = z.infer<typeof singinSchema>;
