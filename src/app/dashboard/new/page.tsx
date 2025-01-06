import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";


export default async function New() {



    const session = await getServerSession(authOptions)


    if (!session || !session.user) {
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userID: session.user.id
        }
    })

    async function formAction(formData:FormData){
        "use server"

        const name = formData.get("name")
        const descirption = formData.get("descirption")
        const customer = formData.get("customer")

        

        if(!name || !descirption || !customer){
            return
        }
        

        const ticketPrisma = await  prismaClient.ticket.create({
            data:{
                name:name as string,
                description: descirption as string,
                customerId : customer as string,
                userID: session?.user.id as string,
                status: "ABERTO" 

            }
        })

       

        redirect("/dashboard")
    }

    return (
        <Container>
            <main>
                <div className="flex">
                    <Link href={"/dashboard"} className="px-3 py-1 text-center bg-black text-white rounded hover:scale-110 duration-300">Voltar</Link>
                    <h1 className="text-2xl ml-3 font-bold">Novo chamado</h1>
                </div>

                <form action={formAction} className="flex flex-col my-6">
                    <label>Novo chamado</label>
                    <input name="name" placeholder="Digite o novo do chamado" className="px-2 h-11 py-1 border-2 mb-3 border-gray-200 rounded " />

                    <label>Descreva o problema</label>
                    <textarea name="descirption" placeholder="Descreva o problema" className="px-2 py-1 h-26 border-2  mb-3 border-gray-200 rounded resize-none " />


                    {customers.length !== 0 && (
                        <>
                            <label>Selecione o cliente</label>
                            <select name="customer" className="px-2 h-11 py-1 border-2 mb-3 border-gray-200 rounded ">
                                {customers.map((customer => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                )))}
                            </select>
                        </>
                    )}


                    <button type="submit" disabled={customers.length === 0}  className="px-2 py-1 rounded h-11 text-white bg-blue-500 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed">Cadastrar</button>
                </form>

                {customers.length === 0 && (
                    <h1 >Nenhum cliente cadastrado, <Link href={"/dashboard/customer/new"} className="text-blue-500 font-medium">Cadastrar cliente</Link></h1>
                )}


            </main>

        </Container>
    )
}