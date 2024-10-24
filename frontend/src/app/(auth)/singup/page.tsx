"use client";
import { Input } from "@/components/input";
import { singupSchema } from "@/schemas/singupSchema";
import type { SingUp } from "@/schemas/singupSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SingUp>({
    resolver: zodResolver(singupSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("http://localhost:3333/auth/singup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (!response.ok) {
      setError("root", { type: "manual", message: resData.error });
      return;
    }
    if (resData.error) {
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
        <h1 className="text-center text-2xl">Cadastrar</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto my-4 flex flex-col"
        >
          {errors.root && (
            <span className="px-4 text-xs text-primary">
              {errors.root.message}
            </span>
          )}
          <Input
            type="email"
            {...register("email")}
            placeholder="Digite seu email"
          />
          {errors.email && (
            <span className="-mb-2 px-4 text-xs text-primary">
              <ErrorMessage errors={errors} name="email" />
            </span>
          )}
          <Input
            type="password"
            {...register("password")}
            placeholder="Digite sua senha"
          />
          {errors.password && (
            <span className="-mb-2 px-4 text-xs text-primary">
              <ErrorMessage errors={errors} name="password" />
            </span>
          )}
          <Input
            type="password"
            {...register("repassword")}
            placeholder="Digite sua senha novamente"
          />
          {errors.repassword && (
            <span className="-mb-2 px-4 text-xs text-primary">
              <ErrorMessage errors={errors} name="repassword" />
            </span>
          )}
          <button
            type="submit"
            className="mt-6 rounded-full bg-primary p-1 px-4 text-black transition-all hover:bg-white"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
