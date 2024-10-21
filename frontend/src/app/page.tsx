import Image from "next/image";

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
          <button className="mt-5 rounded-full border-2 p-2 px-4 hover:bg-white hover:text-black">
            Cadastre-se
          </button>
        </div>
        <div className="bg-mapa relative mt-10 bg-contain">
          {/* <Image
            src={"/mapa.avif"}
            height={300}
            width={500}
            objectFit="cover"
            alt="Criança com um headset"
            className="absolute right-20 z-0"
          /> */}
          <Image
            src={"/crianca.avif"}
            height={300}
            width={500}
            style={{ objectFit: "contain" }}
            alt="Criança com um headset"
            className="z-50"
          />
        </div>
      </main>
    </>
  );
}
