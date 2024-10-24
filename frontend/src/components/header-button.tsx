import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginButton() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return (
    <button
      className="cursor-pointer rounded-md bg-primary px-2 font-semibold text-black transition-all hover:bg-white"
      onClick={async () => {
        "use server";
        if (token) {
          (await cookies()).delete("token");
          redirect("/singin");
        }
        redirect("/singin");
      }}
    >
      {token ? "Sair" : "Entrar"}
    </button>
  );
}
