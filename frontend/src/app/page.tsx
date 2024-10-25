import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-screen-xl flex-1">
        <div className="mt-10 flex w-1/2 flex-col items-center justify-center">
          <h1 className="text-4xl">
            Crie e edite seus <span className="text-primary">projetos</span>
          </h1>
          <p>
            Crie sua conta, para poder postar e editar seus projetos livremente.
          </p>
          <Link href={"/singin"} className="mt-5 rounded-full border-2 p-2 px-4 hover:bg-white hover:text-black">
            Cadastre-se
          </Link>
        </div>
        <div className="relative mt-10 bg-mapa bg-contain">
          <Image
            src={"/crianca.avif"}
            height={300}
            width={500}
            style={{ objectFit: "contain" }}
            alt="Criança com um headset"
          />
        </div>
      </main>
    </>
  );
}
