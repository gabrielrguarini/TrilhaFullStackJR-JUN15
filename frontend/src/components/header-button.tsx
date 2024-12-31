"use client";
import { Logout } from "@/actions/actions";
import Cookies from "js-cookie";

export default async function LoginButton() {
  const token = Cookies.get("token");
  return (
    <button
      className="cursor-pointer rounded-md bg-primary px-2 text-white transition-all hover:bg-black"
      onClick={() => Logout()}
    >
      {token ? "Sair" : "Entrar"}
    </button>
  );
}
