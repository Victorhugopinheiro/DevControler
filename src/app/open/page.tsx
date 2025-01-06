"use client"

import { Container } from "@/components/container";
import { InputComponent } from "@/components/forminput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { string, z, ZodFunction } from "zod";
import { OpenChamado } from "./openchamado";
import { api } from "@/lib/api";
const schema = z.object({
    email: z.string().email("Digite um email válido").min(1, "O campo email é obrigatório")
})

type FormData = z.infer<typeof schema>



export interface CustomerProps {
    id: string;
    name: string

}

export default function Open() {

    const [customer, setCustomer] = useState<CustomerProps | null>(null)

    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function getDataZod(data:FormData){

        const response = await api.get("/api/customer",{
            params:{
                email: data.email
            }
        })

        if(response.data === null){
            setError("email", {type:"custom", message:"Ops, email não encontrado!"})
            return
        }
        console.log(response.data, "testeeeee")
        
        setCustomer({
            id: response.data.id,
            name: response.data.name
        })

    }

    function changedVoid(){
        setCustomer(null)

        setValue("email", "")
    }

    return (
        
            <main className="w-full max-w-2xl flex flex-col justify-center mx-auto">
                <h1 className="text-2xl font-bold text-center mt-28 pb-10 ">Abrir Chamado</h1>
                <div className="w-full">


                    {customer ? (
                        <div className="flex items-center justify-between">
                            <p><strong>Cliente selecionado: </strong>{customer.name}</p>

                            <button onClick={changedVoid} className="text-red-500">
                                <FiX size={26}/>
                            </button>
                        </div>

                    ) : (
                        <form onSubmit={handleSubmit(getDataZod)}>
                            <div className="flex flex-col gap-3">
                                <InputComponent register={register} name="email" placeholder="Digite seu email" error={errors.email?.message} type="text" />
                                <button type="submit" className="flex items-center justify-center  gap-2 bg-blue-500 w-full h-11 rounded font-bold text-white">Procurar cliente <FiSearch size={26} /></button>
                            </div>
                        </form>
                    )}
                </div>

                {customer !== null && <OpenChamado customer={customer} />}
            </main>
        
    )
}