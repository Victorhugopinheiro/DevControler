"use client"

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { FiLock, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";



export function Header() {

    const { data, status } = useSession()

    console.log(status)


    async function login(){

        await signIn() 
    }

    async function logout(){

        await signOut() 
    }

    return (
        <header className="w-full flex justify-center items-center h-16 shadow-sm ">
            <div className="w-full max-w-7xl px-2 flex justify-between items-center">
                <Link href={"/"}>
                    <h1 className="text-2xl font-bold hover:tracking-widest duration-500"><span className="text-blue-400">Dev</span>Controle</h1>
                </Link>

                {status === "unauthenticated" && (
                    <div className="flex items-center gap-9">
                        <button onClick={login}>
                            <FiLock size={26} />
                        </button>

                    </div>
                )}

                {status === "loading" && (
                    <div className="flex items-center gap-9 animate-spin">
                        <button>
                            <FaSpinner size={26} />
                        </button>

                    </div>
                )}


                {status === "authenticated" && (
                    <div className="flex items-center gap-9">
                        <Link href={"/dashboard"}><FiUser size={26} /></Link>
                        <button onClick={logout}>
                            <FiLogOut size={26} />
                        </button>
                    </div>
                )}
            </div>

        </header>
    )
}