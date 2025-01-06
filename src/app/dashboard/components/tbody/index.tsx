"use client"

import { api } from "@/lib/api";
import prismaClient from "@/lib/prisma";
import { CustomerProps } from "@/utils/customer.type";
import { TicketsProps } from "@/utils/tickets/tickets.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FiCopy, FiShare, FiTrash } from "react-icons/fi";
import { Modal } from "../modal";
import { ModalContext } from "@/context/modal";

interface TicketsAndCustomers{
    ticket:TicketsProps
    customer:CustomerProps | null
}




export function ComponentTbody({ticket, customer}:TicketsAndCustomers) {

    const {controleModal, modalBoolean, getTicktsandCustomers, tickets } = useContext(ModalContext)
     
 
    
    const router = useRouter()

    async function changedStatus(){

        const changed = api.patch("/api/ticket",{
            id: ticket.id
        })

        router.refresh()
        
    }

    function changedModal(){
        controleModal()

        getTicktsandCustomers({
            customer: customer,
            ticket: ticket
        })
    }

    

    return (
        <>
            <tr className="h-16 border-b-2 border-b-slate-200 last:border-b-0 bg-slate-100 rounded hover:bg-slate-200 duration-300">
                <td className="pl-1">
                    {ticket.name}
                </td>

                <td className="hidden sm:table-cell">
                    {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>

                <td>
                    <span className="px-3 py-1 rounded bg-green-500">
                        {ticket.status}
                    </span>
                </td>

                <td>
                    <button onClick={changedStatus} className="mr-3 hover:scale-110 duration-300">
                        <FiTrash size={24} color="red"/>
                    </button>

                    <button >
                        <FiCopy onClick={changedModal} className="text-blue-500 hover:scale-110 duration-300" size={24} />
                    </button>
                </td>
            </tr>

           


        </>
    )
}