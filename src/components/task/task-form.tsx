"use client";

import { useTaskStore } from "@/entities/task/store";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "./task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskAction } from "@/actions/task-actions";

export function TaskForm() {
  const add = useTaskStore((s) => s.add);

  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TaskSchema>({ resolver: zodResolver(taskSchema) });

  async function onsubmit(data: TaskSchema) {
    try {
      const result = await createTaskAction(data, true);

      if (result.success) {
        add({
          title: data.isUrgent ? "Urgent task: " + data.title : data.title,
          description: data.description || "",
        });
        reset();
      }
    } catch (error) {
      console.error("Error when saving in DB", error);
    }
  }

  console.log("render form");

  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex gap-2 p-5 flex-col w-100 border"
      >
        <p>Add task</p>
        <input {...register("title")} placeholder="title" className="border" />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
        <div>
          <input {...register("isUrgent")} type="checkbox" />
          <span>Urgent task!</span>
        </div>
        <input
          {...register("description")}
          placeholder="description"
          className="border"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
        <button
          type="submit"
          className={`cursor-pointer ${!isValid || !isDirty ? "bg-red-400" : "bg-green-400"} disabled:bg-gray-400`}
          disabled={isSubmitting}
        >
          Add
        </button>
      </form>
    </div>
  );
}
