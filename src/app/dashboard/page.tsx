import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ComponentTbody } from "./components/tbody";
import Link from "next/link";
import prismaClient from "@/lib/prisma";
import { useContext } from "react";
import { ModalContext } from "@/context/modal";
import { Modal } from "./components/modal";
import { ButtonRefresh } from "./components/refresh";



export default async function Dashoboard() {

    const session = await getServerSession(authOptions)

    console.log(session, "estou na página de dashboard")

    if (!session || !session?.user) {
        redirect("/")
    }

    const ticketsData = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userID: session.user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            created_at: "asc"
        }
    })






    return (
        <Container>
            <main className="my-6">


                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">
                        Chamados
                    </h1>
                    <div className="flex items-center gap-3 my-3">
                        
                    <ButtonRefresh/>

                        <Link className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-110 duration-300" href={"/dashboard/new"}>
                            Abrir chamado
                        </Link>
                    </div>
                </div>

                <table className="min-w-full">
                    <thead>
                        <tr className="font-medium">
                            <td className="pl-1">
                                CLIENTE
                            </td>

                            <td className="hidden sm:table-cell">
                                DATA CADASTRO

                            </td>

                            <td>
                                STATUS
                            </td>

                            <td>
                                #
                            </td>
                        </tr>
                    </thead>

                    <tbody className="w-full  bg-blue-300">
                        {ticketsData.map((ticket) => (
                            <ComponentTbody ticket={ticket} customer={ticket.customer} key={ticket.id} />
                        ))}




                    </tbody>
                </table>
                {ticketsData.length === 0 && (
                    <h1 className="font-bold  text-2xl text-center w-full my-16">Nenhum chamado pendente</h1>
                )}




            </main>
        </Container>
    )
}