"use client"

import { Modal } from "@/app/dashboard/components/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketsProps } from "@/utils/tickets/tickets.type";
import { createContext, ReactNode, useState } from "react";

interface ModalProps{
    controleModal: () => void;
    modalBoolean: boolean
    tickets: TicketProps | undefined
    getTicktsandCustomers: (data:TicketProps) => void
}

interface TicketProps{
    customer:CustomerProps | null;
    ticket:TicketsProps
}


export const ModalContext = createContext({} as ModalProps)

export const ModalProvider = ({children}:{children:ReactNode}) => {

    const[modalBoolean, SetModalBoolean] = useState(false)

    const [tickets, setTickets] = useState<TicketProps>()



    function controleModal(){
        SetModalBoolean(!modalBoolean)
    }

    function getTicktsandCustomers(data:TicketProps){
        setTickets(data)

    }


    return(
        <ModalContext value={{controleModal, modalBoolean, tickets, getTicktsandCustomers}}>
            {modalBoolean && <Modal/>}
            {children}
        </ModalContext>
    )

}
