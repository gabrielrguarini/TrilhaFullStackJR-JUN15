"use server";
import Link from "next/link";
import Logo from "./logo-svg";
import HeaderButton from "./header-button";

export const Header = async () => {
  return (
    <header className="flex items-center border-b-2 border-solid border-b-primary p-4">
      <nav className="m-auto flex max-w-screen-xl flex-1 justify-between">
        <Link href={"/"}>
          <Logo width={42} />
        </Link>
        <ul className="flex gap-8">
          <Link href={"/"}>
            <li className="">Home</li>
          </Link>
          <Link href={"/admin/projects"}>
            <li className="">Projetos</li>
          </Link>
          <li className="cursor-pointer">
            <HeaderButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
