"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { singinSchema } from "@/schemas/singinSchema";
import type { SingIn } from "@/schemas/singinSchema";
import { ErrorMessage } from "@hookform/error-message";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SingIn>({
    resolver: zodResolver(singinSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("http://localhost:3333/auth/singin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      setError("email", { type: "manual", message: resData.error });
      return;
    }
    Cookies.set("token", resData.token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    router.replace("/admin");
  };

  return (
    <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col items-center justify-center">
      <div className="m-auto min-w-80">
        <h1 className="text-center text-2xl">Entrar</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto my-4 flex flex-col"
        >
          <Input
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && (
            <span className="px-4 text-xs text-primary">
              <ErrorMessage errors={errors} name="email" />
            </span>
          )}
          <Input
            type="password"
            {...register("password")}
            placeholder="Digite sua senha"
          />
          {errors.password && (
            <span className="px-4 text-xs text-primary">
              <ErrorMessage errors={errors} name="password" />
            </span>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-6 rounded-full bg-primary p-1 px-4 text-black transition-all hover:bg-white"
          >
            {isSubmitting ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
