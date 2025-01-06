import Image from "next/image";
import heroImg from "../assets/hero.svg"

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center min-h-[calc(100vh-64px)] gap-3">
      <h2 className="text-xl md:text-2xl">Gerencie sua empresa</h2>

      <h1 className="text-blue-400 text-2xl font-bold md:text-3xl">Atendimentos ao cliente</h1>
      <Image src={heroImg} alt="Imagem Home" width={600} priority={true} quality={100} className="max-w-sm md:max-w-xl mt-8" />
      
    </div>
  );
}
