import z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок должен быть не короче 3 символов")
    .max(15, "Куда так много..."),
  description: z.string().max(30, "Слишком длинное описание").optional(),
  isUrgent: z.boolean().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
