import Link from "next/link";
import Logo from "./logo-svg";
import { cookies } from "next/headers";

export const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return (
    <header className="flex items-center border-b-2 border-solid border-b-primary p-4">
      <nav className="m-auto flex max-w-screen-xl flex-1 justify-between">
        <Link href={"/"}>
          <Logo width={42} />
        </Link>
        <ul className="flex gap-8">
          <Link href={"#INICIO"}>
            <li className="">Home</li>
          </Link>
          <Link href={"#SOBRE"}>
            <li className="">Sobre</li>
          </Link>

          <Link href={token ? "/singin" : "/singout"}>
            <li className="rounded-md bg-primary px-2 font-semibold text-black transition-all hover:bg-white">
              {token ? "Sair" : "Entrar"}
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
