import { authOptions } from "@/lib/auth"
import prismaClient from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(request:Request){


     const session = await getServerSession(authOptions)
    
        if (!session || !session.user) {
            return NextResponse.json({ error: "Sem usuário na rota back-end customer" }, { status: 401 })
        }

        const {id} = await request.json()

        const findTicket = await prismaClient.ticket.findFirst({
            where:{
                id: id as string
            }
        })

        if(!findTicket){
            return NextResponse.json({ error: "Sem ticket" }, { status: 401 })
        }


        try{

            await prismaClient.ticket.update({
                where:{
                    id: id as string
                },
                data:{
                    status:"FECHADO"
                }
            })

            return NextResponse.json({ message: "Status do ticket atualizado" })

        }catch(error){
            return NextResponse.json({ error: "Eror" }, { status: 400 })
        }
        


}



export async function POST(request: Request){

    const {name, customerId, description} = await request.json()

    if(!name || !customerId|| !description ){
        return NextResponse.json({error:"Sem as propriedades corretas"}, {status:400})
    }

    try{

        await prismaClient.ticket.create({
            data:{
                name:name,
                description:description,
                customerId:customerId,
                status:"ABERTO"
            }
        })
        return NextResponse.json({message:"Cadastro feito com sucesso"})


    }catch(error){
        return NextResponse.json({error:"Error"}, {status:400})
    }

}