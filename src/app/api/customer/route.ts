import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import PrismaClient from "@/lib/prisma"
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Redirect } from "next";



export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Sem usuário na rota back-end customer" }, { status: 401 })
    }





    const { searchParams } = new URL(request.url)

    const customerId = searchParams.get("id")

    if (!customerId) {
        NextResponse.json({ message: "Error: sem id do usuario" }, { status: 400 })
    }


    //Verificando se cliente tem ticket aberto
    const customerHasTicked = await PrismaClient.ticket.findFirst({
        where:{
            customerId: customerId
        }
    })

    if(customerHasTicked){
        return NextResponse.json({ message: "Failed Req" }, { status: 400 })
    }


    //////////////////////////////


    try {
        await prismaClient.customer.delete({
            where:{
                id:customerId as string
            }
        })

        return NextResponse.json({ message: "Customer Deleted" }) 

    }catch (error) {
        return NextResponse.json({ message: "Failed Req" }, { status: 400 })
    }
}


export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    { !session || !session.user } {
        NextResponse.json({ message: "Error: sem usuario" }, { status: 401 })
    }

    const { name, email, phone, address, userID } = await request.json()

    try {

        await PrismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userID: userID

            }
        })

        return NextResponse.json({ message: "cliente cadastrado" })


    } catch (err) {
        return NextResponse.json({ message: "Failed Req" }, { status: 400 })
    }




}


export async function GET(request: Request){

    const { searchParams } = new URL(request.url)

    const customer = searchParams.get("email")

    if(!customer || customer=== null){
        return NextResponse.json({error:"Email não encontrado"}, {status:400})
    }

    try{
        const myCustomer = await PrismaClient.customer.findFirst({
            where:{
                email: customer as string
            }
        })

        return NextResponse.json(myCustomer)

    }catch(error){
        return NextResponse.json({error:"Error"}, {status:401})
    }
}




