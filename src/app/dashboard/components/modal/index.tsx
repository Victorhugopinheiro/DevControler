import { Container } from "@/components/container";
import { ModalContext } from "@/context/modal";
import { HtmlHTMLAttributes, useContext, useRef } from "react";


export function Modal() {


    const { controleModal, tickets } = useContext(ModalContext)

    const modalRef = useRef<HTMLDivElement | null>(null)

    const getClickSection = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            controleModal()
        }
    }

    return (



        <div className="w-full absolute bg-gray-600/80 min-h-screen" onClick={getClickSection}>
            <div className="w-full absolute inset-0 bg-gray-600 opacity-80 h-screen flex justify-center items-center">
                <div ref={modalRef} className="bg-white max-w-xl absolute w-10/12 h-1/3 p-2 rounded md:w-8/12 lg:w-1/2">
                    <div className="flex justify-between ">
                        <h1 className="font-bold text-2xl  text-black">Detalhe do chamado</h1>

                        <button onClick={controleModal} className="px-3 py-2 rounded bg-red-600 font-bold text-black hover:scale-105 duration-300">Fechar</button>
                    </div>

                    <div className="mb-3 border-gray-200">
                        <p><strong>Nome: </strong>{tickets?.ticket.name}</p>

                        <p><strong>Descrição:</strong></p>
                        <span>{tickets?.ticket.description}</span>
                    </div>

                    <div className="mb-3 border-b-2 border-gray-200"></div>

                    <div>
                        <strong>Detalhe do cliete</strong>

                        <p><strong>Nome: </strong>{tickets?.customer?.name}</p>

                        <p><strong>Telefone: </strong>{tickets?.customer?.phone}</p>

                        <p><strong>Email: </strong>{tickets?.customer?.email}</p>

                        <p><strong>Endereço: </strong>{tickets?.customer?.address}</p>


                    </div>
                </div>
            </div>

        </div>

    )
}