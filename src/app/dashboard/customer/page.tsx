import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ComponentTbody } from "../components/tbody";
import { CardComponent } from "./components/card";
import PrismaClient from "@/lib/prisma"


export default async function Customer() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }



    const customers = await PrismaClient.customer.findMany({
        where:{
            userID: session.user.id
        }
    })

    return (
        <Container>
            <main>
                <div className="flex items-center justify-between my-3">
                    <h1 className="text-2xl font-bold">
                        Meus clientes
                    </h1>

                    <Link className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-110 duration-300" href={"/dashboard/customer/new"}>
                        Novo cliente
                    </Link>
                </div>


                <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {customers.map((customer => (
                        <CardComponent key={customer.id} customer={customer} />
                    )))}

                    



                </section>
            </main>
        </Container>
    )
}