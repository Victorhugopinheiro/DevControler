import { InputComponent } from "@/components/forminput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerProps } from "../page"
import { api } from "@/lib/api"

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    description: z.string().min(1, "Descreva o seu problema")
})

type FormData = z.infer<typeof schema>





export function OpenChamado ({customer}:{customer:CustomerProps}) {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })


   async function generateTicket (data:FormData){
        const response = await api.post("/api/ticket",{
            name:data.name,
            description:data.description,
            customerId: customer.id
        })


    }
    

    return(
        <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit(generateTicket)}>
            <InputComponent placeholder="Digite o nome do problema" name="name" register={register} type="text" error={errors.name?.message}/>


            <textarea className="resize-none w-full h-32 border-2 border-gray-200 rounded" placeholder="Descreva seu problema" id="description" {...register("description")}>  </textarea>
            {errors.description?.message && <p className="text-red-500 mt-1">{errors.description.message}</p>}

            <button type="submit" className="w-full px-2 py-1 bg-blue-500 rounded h-11 text-white font-bold">Cadastrar</button>

        </form>
    )
}