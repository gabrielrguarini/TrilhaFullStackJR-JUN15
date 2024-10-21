import { singin } from "@/actions/singin";
import { Input } from "@/components/input";

export default function SignIn() {
  return (
    <main className="mx-auto mt-[-61px] flex min-h-screen w-full max-w-screen-xl flex-1 flex-col items-center justify-center">
      <div className="m-auto min-w-80">
        <h1 className="text-center text-2xl">Cadastrar-se</h1>
        <form action={singin} className="m-auto my-4 flex flex-col">
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="repassword"
            placeholder="Digite sua senha novamente"
          />
          <button
            type="submit"
            className="mt-6 rounded-full bg-primary p-1 px-4 text-black"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
