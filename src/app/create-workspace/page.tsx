"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspace } from "@/lib/actions/workspaces.action";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name is too long" }),
  description: z.string().min(2).max(30),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", description: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    await createWorkspace(values);
    reset();
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border p-6">
          <h1 className="text-2xl font-bold mb-1">Create Workspace</h1>
          <p className="text-sm text-gray-500 mb-6">
            Create your workspace by filling out the form below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/80"
                placeholder="My Workspace"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Team Management"
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-button px-4 py-2 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
