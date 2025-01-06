import { Container } from "@/components/container";
import Link from "next/link";


export function DashboardHeader(){
    return(
        <Container>
            <header className="w-full p-3 bg-slate-900 flex gap-6 rounded-sm my-6 ">
                <Link className="text-white hover:font-bold" href={"/dashboard"}>
                    Chamados
                </Link>

                <Link className="text-white hover:font-bold" href={"/dashboard/customer"}>
                    Clientes
                </Link>
            </header>
        </Container>
    )
}