"use client"

import { api } from "@/lib/api"
import { CustomerProps } from "@/utils/customer.type"
import { useRouter } from "next/navigation"

export function CardComponent({ customer }: { customer: CustomerProps }) {

    const router = useRouter()

    async function deleteCustomer() {
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id:customer.id
                }
            })
            router.refresh()
            
        }catch (error) {
            console.log(error, "Em card", customer.id)
        }
    }

    return (
        <article className="flex flex-col gap-3 py-1 px-2 border-2 border-gray-300">
            <span><strong>Nome: </strong>{customer.name}</span>
            <span><strong>Email: </strong>{customer.email}</span>
            <span><strong>Telefone: </strong>{customer.phone}</span>

            <button onClick={deleteCustomer} className="w-24 rounded bg-red-600 hover:scale-105 duration-300 ">Deletar</button>
        </article>
    )
}