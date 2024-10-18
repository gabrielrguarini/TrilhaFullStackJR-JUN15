import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string({ message: "Título obrigatório" })
    .min(4, { message: "Mínimo de 4 letras" }),
  body: z
    .string({ message: "Título obrigatório" })
    .min(4, { message: "Mínimo de 4 letras" }),
});
