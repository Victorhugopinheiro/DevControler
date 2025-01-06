
import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";






export default async function NewCustomer() {
   
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    return(
        <Container>
            <main>
                <div className="flex gap-3">
                    <Link className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-110 duration-300" href={"/dashboard/customer"}>Voltar</Link>

                    <h1 className="text-2xl font-bold">Novo cliente</h1>
                </div>


               <NewCustomerForm userID={session.user.id}/>
            </main>
        </Container>
    )
}


