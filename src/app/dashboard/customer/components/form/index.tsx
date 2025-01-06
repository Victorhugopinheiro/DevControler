"use client"

import { Container } from "@/components/container";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputComponent } from "@/components/forminput";
import axios from "axios";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";



const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigátorio"),
    email: z.string().email("Digite um email valido").min(1, "O campo email é obrigatório"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "Digite um telefone válido ex: (11) 999999999"
    }),
    address: z.string()
})


type FormData = z.infer<typeof schema>


export function NewCustomerForm({ userID }: { userID: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })


    const router = useRouter()

    async function funcaoZod(data: FormData) {

        const response = await api.post("/api/customer", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userID: userID
        })

        router.refresh()

        router.replace("/dashboard/customer")


    }

    return (
        <form onSubmit={handleSubmit(funcaoZod)} className="flex flex-col my-10">
            <label>Nome completo</label>
            <InputComponent placeholder="Digite seu nome completo..." type="text" name="name"
                error={errors.name?.message}
                register={register} />


            <section className="flex flex-col gap-3 sm:flex-row my-3">
                <div className="flex-1">

                    <label>Telefone</label>
                    <InputComponent placeholder="Ex: (11) 999999999" type="text" name="phone"
                        error={errors.phone?.message}
                        register={register} />

                </div>

                <div className="flex-1">

                    <label>Email</label>
                    <InputComponent placeholder="Digite seu nome completo..." type="email" name="email"
                        error={errors.email?.message}
                        register={register} />

                </div>
            </section>

            <label >Endereço</label>
            <InputComponent placeholder="Endereço completo" type="text" name="address"
                error={errors.address?.message}
                register={register} />


            <button type="submit" className="w-full rounded h-10 px-2 my-1 bg-blue-500 text-white font-bold">Cadastrar</button>
        </form>

    )
}


