import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(8, { message: "Minimo de 8 caracteres" }),
  body: z.string().min(8, { message: "Minimo de 8 caracteres" }),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
