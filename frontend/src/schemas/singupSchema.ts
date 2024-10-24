import { z } from "zod";

export const singupSchema = z
  .object({
    email: z
      .string({ message: "Email é obrigatório" })
      .email({ message: "Coloque um email válido" }),
    password: z
      .string({ message: "Email é obrigatório" })
      .min(4, { message: "Senha de ter pelo menos 4 caracteres" }),
    repassword: z
      .string({ message: "Email é obrigatório" })
      .min(4, { message: "Senha de ter pelo menos 4 caracteres" }),
  })
  .refine((fields) => fields.password === fields["repassword"], {
    message: "As senhas devem ser iguais",
    path: ["repassword"],
  });

export type SingUp = z.infer<typeof singupSchema>;
