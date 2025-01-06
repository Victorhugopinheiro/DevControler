import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient();
}else{
    let GlobalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient
    }

    if(!GlobalWithPrisma.prisma){
        GlobalWithPrisma.prisma = new PrismaClient();
    }

    prisma = GlobalWithPrisma.prisma;
}

export default prisma;


